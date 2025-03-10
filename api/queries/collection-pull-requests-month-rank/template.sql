WITH prs_group_by_repo AS (
    SELECT
        repo_id,
        COUNT(DISTINCT number) AS prs
    FROM github_events
    WHERE
        type = 'PullRequestEvent'
        AND repo_id IN (41986369, 16563587, 105944401)
    GROUP BY repo_id
), m AS (
    SELECT
        DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m-01') AS `month`
    UNION
    SELECT
        DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m-01') AS `month`
), prs_group_by_month AS (
    SELECT
        event_month,
        repo_id,
        ANY_VALUE(repo_name) AS repo_name,
        COUNT(*) AS prs
    FROM github_events
    WHERE
        type = 'PullRequestEvent'
        AND action = 'opened'
        AND repo_id IN (41986369, 16563587, 105944401)
        AND event_month IN (SELECT `month` FROM m)
    GROUP BY event_month, repo_id
), prs_last_month AS (
    SELECT
        event_month,
        repo_id,
        repo_name,
        prs,
        ROW_NUMBER() OVER(ORDER BY prs DESC) AS `rank`
    FROM prs_group_by_month sgn
    WHERE
        event_month = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m-01')
), prs_last_2nd_month AS (
    SELECT
        event_month,
        repo_id,
        repo_name,
        prs,
        ROW_NUMBER() OVER(ORDER BY prs DESC) AS `rank`
    FROM prs_group_by_month sgn
    WHERE
        event_month = DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m-01')
)
SELECT
    plm.repo_id,
    plm.repo_name,
    DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m') AS current_month,
    DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m') AS last_month,
    -- PRs
    plm.prs AS current_month_total,
    plm.`rank` AS current_month_rank,
    IFNULL(pl2m.prs, 0) AS last_month_total,
    pl2m.`rank` AS last_month_rank,
    ((plm.prs - pl2m.prs) / pl2m.prs) * 100 AS total_mom,
    (plm.`rank` - pl2m.`rank`) AS rank_mom,
    pgr.prs AS total
FROM prs_group_by_repo pgr
JOIN prs_last_month plm ON pgr.repo_id = plm.repo_id
LEFT JOIN prs_last_2nd_month pl2m ON plm.repo_id = pl2m.repo_id
ORDER BY current_month_rank;