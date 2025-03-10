with issue_closed as (
    select
        event_month, count(distinct number) as closed
    from
        github_events ge
    where
        type = 'IssuesEvent'
        and action = 'closed'
        and repo_id = 41986369
    group by 1
), issue_opened as (
    select
        event_month, count(distinct number) as opened
    from
        github_events ge
    where
        type = 'IssuesEvent'
        and action = 'opened'
        and repo_id = 41986369
        -- Exclude Bots
        and actor_login not like '%bot%'
        and actor_login not in (select  /*+ READ_FROM_STORAGE(TIKV[bu]) */ login from blacklist_users bu)
    group by 1
)
select
    io.event_month, opened, coalesce(closed, 0) as closed
from
    issue_opened io
    join issue_closed ic on io.event_month = ic.event_month
order by 1
;