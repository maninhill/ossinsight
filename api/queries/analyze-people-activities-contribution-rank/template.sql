WITH activity_contribution_last_month AS (
    SELECT actor_id, ANY_VALUE(actor_login) AS actor_login, COUNT(*) AS events
    FROM github_events ge
    WHERE
        repo_id = 41986369
        AND event_month = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m-01')
        AND actor_login NOT LIKE '%bot' AND actor_login NOT LIKE '%[bot]' AND actor_login NOT IN (SELECT /*+ READ_FROM_STORAGE(TIKV[bu]) */ login FROM blacklist_users bu)
        AND type IN (
            'IssuesEvent', 'IssueCommentEvent', 'PullRequestEvent', 'PullRequestReviewEvent', 'PullRequestReviewCommentEvent', 
            'CommitCommentEvent', 'PushEvent'
        )
    GROUP BY actor_id
    ORDER BY events DESC
    LIMIT 50
), activity_contribution_last_2nd_month AS (
    SELECT actor_id, ANY_VALUE(actor_login) AS actor_login, COUNT(*) AS events
    FROM github_events ge
    WHERE
        repo_id = 41986369
        AND event_month = DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m-01')
        AND actor_login NOT LIKE '%bot' AND actor_login NOT LIKE '%[bot]' AND actor_login NOT IN (SELECT /*+ READ_FROM_STORAGE(TIKV[bu]) */ login FROM blacklist_users bu)
        AND type IN (
            'IssuesEvent', 'IssueCommentEvent', 'PullRequestEvent', 'PullRequestReviewEvent', 'PullRequestReviewCommentEvent', 
            'CommitCommentEvent', 'PushEvent'
        )
    GROUP BY actor_id
)
SELECT
    ROW_NUMBER() OVER (ORDER BY lm.events DESC) AS row_num,
    lm.actor_id,
    lm.actor_login,
    lm.events AS last_month_events,
    COALESCE(l2m.events, 0) AS last_2nd_month_events,
    COALESCE(lm.events - l2m.events, 0) AS changes, 
    lm.events / (SELECT COALESCE(SUM(events), 0) FROM activity_contribution_last_month) AS proportion
FROM activity_contribution_last_month lm
LEFT JOIN activity_contribution_last_2nd_month l2m ON lm.actor_id = l2m.actor_id
ORDER BY lm.events DESC
LIMIT 50
;