import {readFile} from 'fs/promises'
import path from 'path'
import {DateTime, Duration} from "luxon";
import type { QuerySchema } from '../../params.schema'
import {TiDBQueryExecutor, Result} from "./TiDBQueryExecutor";
import {CachedData} from "./cache/Cache";
import consola from "consola";
import {PoolConnection} from "mysql2";
import {dataQueryTimer, measure, readConfigTimer, tidbQueryCounter} from "../metrics";
import GHEventService from "../services/GHEventService";
import CollectionService from '../services/CollectionService';
import CacheBuilder, { CacheProviderTypes } from './cache/CacheBuilder';
import { QueryTemplateNotFoundError } from './QueryFactory';
import UserService from '../services/UserService';
import { resolveHours } from "../../utils/paramDefs";

const EXPLAIN_QUERY_CACHE_HOUR = 0.01;

export enum ParamType {
  ARRAY = 'array',
  DATE_RANGE = 'date-range',
  COLLECTION = 'collection',
  EMPLOYEES = 'employees'
}

export enum ParamDateRange {
  LAST_HOUR = 'last_hour',
  LAST_DAY = 'last_day',
  LAST_WEEK = 'last_week',
  LAST_MONTH = 'last_month',
}

export enum ParamDateRangeTo {
  NOW = 'now',
  LAST_VALID_DATETIME = 'last_valid_datetime',
}

export class BadParamsError extends Error {
  readonly msg: string
  constructor(public readonly name: string, message: string) {
    super(message);
    this.msg = message
  }
}

export class SQLExecuteError extends Error {
  readonly sql: string
  constructor(public readonly name: string, sql: string) {
    super(sql);
    this.sql = sql
  }
}

export async function buildParams(
  template: string, querySchema: QuerySchema, values: Record<string, any>,
  ghEventService: GHEventService, collectionService: CollectionService, userService: UserService
) {
  for (const param of querySchema.params) {
    const {
      name, replaces, template: paramTemplate, dateRangeTo = ParamDateRangeTo.LAST_VALID_DATETIME,
      default: defaultValue, type, column, pattern
    } = param;
    const value = values[name] ?? defaultValue;

    let targetValue = "";
    switch (type) {
      case ParamType.ARRAY:
        targetValue = handleArrayValue(name, value, column, pattern, paramTemplate)
        break;
      case ParamType.DATE_RANGE:
        targetValue = await handleDateRangeValue(name, value, ghEventService, dateRangeTo, column, pattern, paramTemplate)
        break;
      case ParamType.COLLECTION:
        targetValue = await handleCollectionValue(name, value, collectionService, column, pattern, paramTemplate)
        break;
        case ParamType.EMPLOYEES:
          targetValue = await handleEmployeeValue(name, value, userService, column, pattern, paramTemplate)
          break;
      default:
        targetValue = verifyParam(name, value, pattern, paramTemplate);
    }
    template = template.replaceAll(replaces, targetValue);
  }
  return template
}

function handleArrayValue(name: string, value: any, column?: string, pattern?: string, paramTemplate?: Record<string, string>) {
  const arrValues = [];

  if (Array.isArray(value)) {
    for (let v of value) {
      const targetValue = verifyParam(name, v, pattern, paramTemplate);
      arrValues.push(targetValue);
    }
  } else {
    const targetValue = verifyParam(name, value, pattern, paramTemplate);
    arrValues.push(targetValue);
  }

  return arrValues.join(', ');
}

async function handleDateRangeValue(
  name: string, value: any, ghEventService: GHEventService, dateRangeTo?: string, column?: string,
  pattern?: string, paramTemplate?: Record<string, string>
) {
  const verifiedValue = verifyParam(name, value, pattern, paramTemplate);

  let to = DateTime.now();
  if (dateRangeTo === ParamDateRangeTo.LAST_VALID_DATETIME) {
    to = DateTime.fromFormat(await ghEventService.getMaxEventTime(), "yyyy-MM-dd HH:mm:ss");
  }

  let from = to;
  if (verifiedValue === ParamDateRange.LAST_HOUR) {
    from = to.minus(Duration.fromObject({ 'hours': 1 }))
  } else if (verifiedValue === ParamDateRange.LAST_DAY) {
    from = to.minus(Duration.fromObject({ 'days': 1 }))
  } else if (verifiedValue === ParamDateRange.LAST_WEEK) {
    from = to.minus(Duration.fromObject({ 'weeks': 1 }))
  } else if (verifiedValue === ParamDateRange.LAST_MONTH) {
    from = to.minus(Duration.fromObject({ 'months': 1 }))
  }

  return `${column} >= '${from.toSQL()}' AND ${column} <= '${to.toSQL()}'`
}

async function handleCollectionValue(
  name: string, collectionId: number, collectionService: CollectionService, column?: string, pattern?: string, 
  paramTemplate?: Record<string, string>,
): Promise<string> {
  const arrValues = [];

  const res = await collectionService.getCollectionRepos(collectionId)
  
  if (Array.isArray(res.data) && res.data.length > 0) {
    for (let item of res.data) {
      const targetValue = verifyParam(name, item.repo_id, pattern, paramTemplate);
      arrValues.push(targetValue);
    }
  } else {
    throw new BadParamsError(name, `can not get repo for collection ${collectionId}`)
  }

  return arrValues.join(', ');
}

async function handleEmployeeValue(
  name: string, companyName: string, userService: UserService, column?: string, pattern?: string, 
  paramTemplate?: Record<string, string>,
): Promise<string> {
  const arrValues = [];
  const res = await userService.getCompanyEmployees(companyName)
  
  if (Array.isArray(res.data) && res.data.length > 0) {
    for (let item of res.data) {
      const targetValue = verifyParam(name, item.login, pattern, paramTemplate);
      arrValues.push(targetValue);
    }
  } else {
    throw new BadParamsError(name, `can not get employees for company ${companyName}`)
  }

  return arrValues.map((val) => `'${val}'`).join(', ');
}

function verifyParam(name: string, value: any, pattern?: string, paramTemplate?: Record<string, string>) {
  if (pattern) {
    const regexp = new RegExp(pattern);
    if (!regexp.test(String(value))) {
      throw new BadParamsError(name, 'bad param ' + name)
    }
  }

  const targetValue = paramTemplate ? paramTemplate[String(value)] : value;
  if (targetValue === undefined || targetValue === null) {
    throw new BadParamsError(name, 'require param ' + name)
  }

  return targetValue;
}

const logger = consola.withTag('query')

export default class Query {

  public readonly path: string
  template: string | undefined = undefined
  queryDef: QuerySchema | undefined = undefined
  private readonly loadingPromise: Promise<boolean>

  constructor(
    public readonly name: string,
    public readonly cacheBuilder: CacheBuilder,
    public readonly executor: TiDBQueryExecutor,
    public readonly ghEventService: GHEventService,
    public readonly collectionService: CollectionService,
    public readonly userService: UserService
  ) {
    this.path = path.join(process.cwd(), 'queries', name)
    const templateFilePath = path.join(this.path, 'template.sql')
    const paramsFilePath = path.join(this.path, 'params.json')

    this.loadingPromise = new Promise<boolean>(async (resolve, reject) => {
      try {
        await measure(readConfigTimer.labels({ type: 'template.sql' }), async () => {
          this.template = await readFile(templateFilePath, {encoding: "utf-8"})
        })
        await measure(readConfigTimer.labels({ type: 'params.json' }), async () => {
          this.queryDef = JSON.parse(await readFile(paramsFilePath, {encoding: 'utf-8'})) as QuerySchema
        })
        resolve(true)
      } catch (err) {
        logger.log('Failed to load query template file: ', err)
        reject(new QueryTemplateNotFoundError('Failed to load query template file.'))
      }
    })
  }

  ready(): Promise<boolean> {
    return this.loadingPromise
  }

  async buildSql(params: Record<string, any>): Promise<string> {
    return buildParams(this.template!, this.queryDef!, params, this.ghEventService, this.collectionService, this.userService)
  }

  async run <T> (
    params: Record<string, any>, refreshCache: boolean = false, conn?: PoolConnection | null, ip?: string, limit = false
  ): Promise<CachedData<T>> {
    await this.ready();

    const { cacheHours = -1, refreshHours = -1, onlyFromCache = false, cacheProvider } = this.queryDef!;
    const queryName = this.queryDef!.name || this.name;
    const cacheKey = this.getQueryKey('query', queryName, this.queryDef!, params);
    const cache = this.cacheBuilder.build(
      cacheProvider, cacheKey, cacheHours, resolveHours(params, refreshHours), onlyFromCache, refreshCache
    );

    return cache.load(async () => {
      return await measure(dataQueryTimer, async () => {
        const sql = await this.buildSql(params);

        try {
          const start = DateTime.now()
          tidbQueryCounter.labels({ query: this.name, phase: 'start' }).inc()

          let res: Result;
          if (conn) {
            res = await this.executor.executeWithConn(conn, sql, limit)
          } else {
            res = await this.executor.execute(sql, limit)
          }

          const end = DateTime.now()
          tidbQueryCounter.labels({ query: this.name, phase: 'success' }).inc()

          return {
            params: params,
            requestedAt: start,
            finishedAt: end,
            spent: end.diff(start).as('seconds'),
            sql,
            fields: res.fields,
            data: res.rows as any,
          }
        } catch (e) {
          tidbQueryCounter.labels({ query: this.name, phase: 'error' }).inc()
          if (e) {
            (e as any).sql = sql
          }
          throw e
        }
      })
    }, ip)
  }

  async explain <T> (params: Record<string, any>, refreshCache: boolean = false, conn?: PoolConnection): Promise<CachedData<T>> {
    await this.ready();

    const { cacheProvider } = this.queryDef!;
    const queryName = this.queryDef!.name || this.name;
    const cacheKey = this.getQueryKey('explain-query', queryName, this.queryDef!, params);
    const cache = this.cacheBuilder.build(
      cacheProvider, cacheKey, EXPLAIN_QUERY_CACHE_HOUR, EXPLAIN_QUERY_CACHE_HOUR, false, refreshCache
    );

    return cache.load(async () => {
      return await measure(dataQueryTimer, async () => {
        const sql = await this.buildSql(params);
        const explainSQL = `EXPLAIN ${sql}`;

        try {
          const start = DateTime.now()
          tidbQueryCounter.labels({ query: this.name, phase: 'start' }).inc()

          let explainRes: Result;
          if (conn) {
            explainRes = await this.executor.executeWithConn(conn, explainSQL)
          } else {
            explainRes = await this.executor.execute(explainSQL)
          }

          const end = DateTime.now()
          tidbQueryCounter.labels({ query: this.name, phase: 'success' }).inc()

          return {
            params: params,
            requestedAt: start,
            finishedAt: end,
            spent: end.diff(start).as('seconds'),
            sql: explainSQL,
            fields: explainRes.fields,
            data: explainRes.rows as any,
          }
        } catch (e) {
          tidbQueryCounter.labels({ query: this.name, phase: 'error' }).inc()
          if (e) {
            (e as any).sql = explainSQL
          }
          throw e
        }
      })
    })
  }

  async trace <T> (params: Record<string, any>, refreshCache: boolean = false, conn?: PoolConnection): Promise<CachedData<T>> {
    await this.ready();

    const { cacheHours = -1, refreshHours = -1, onlyFromCache = false, cacheProvider } = this.queryDef!;
    const queryName = this.queryDef!.name || this.name;
    const cacheKey = this.getQueryKey('trace-query', queryName, this.queryDef!, params);
    const cache = this.cacheBuilder.build(
      cacheProvider, cacheKey, cacheHours, resolveHours(params, refreshHours), onlyFromCache, refreshCache
    );

    return cache.load(async () => {
      return await measure(dataQueryTimer, async () => {
        const sql = await this.buildSql(params);
        const traceSQL = `TRACE FORMAT='row' ${sql}`;

        try {
          const start = DateTime.now()
          tidbQueryCounter.labels({ query: this.name, phase: 'start' }).inc()

          let traceRes: Result;
          if (conn) {
            traceRes = await this.executor.executeWithConn(conn, traceSQL)
          } else {
            traceRes = await this.executor.execute(traceSQL)
          }

          const end = DateTime.now()
          tidbQueryCounter.labels({ query: this.name, phase: 'success' }).inc()

          return {
            params: params,
            requestedAt: start,
            finishedAt: end,
            spent: end.diff(start).as('seconds'),
            sql: traceSQL,
            fields: traceRes.fields,
            data: traceRes.rows as any,
          }
        } catch (e) {
          tidbQueryCounter.labels({ query: this.name, phase: 'error' }).inc()
          if (e) {
            (e as any).sql = traceSQL
          }
          throw e
        }
      })
    })
  }

  private getQueryKey(prefix: string, queryName: string, queryDef: QuerySchema, params: Record<string, any>): string {
    return `${prefix}:${queryName}:${queryDef!.params.map(p => params[p.name]).join('_')}`;
  }
}
