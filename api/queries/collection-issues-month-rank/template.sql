WITH issues_group_by_repo AS (
    SELECT
        repo_id,
        COUNT(DISTINCT number) AS issues
    FROM github_events
    WHERE
        type = 'IssuesEvent'
        AND repo_id IN (41986369, 16563587, 105944401)
    GROUP BY repo_id
), m AS (
    SELECT
        DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m-01') AS `month`
    UNION
    SELECT
        DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m-01') AS `month`
), issues_group_by_month AS (
    SELECT
        event_month,
        repo_id,
        ANY_VALUE(repo_name) AS repo_name,
        COUNT(DISTINCT number) AS issues
    FROM github_events
    WHERE
        type = 'IssuesEvent'
        AND action = 'opened'
        AND repo_id IN (41986369, 16563587, 105944401)
        AND event_month IN (SELECT `month` FROM m)
    GROUP BY event_month, repo_id
), issues_last_month AS (
    SELECT
        event_month,
        repo_id,
        repo_name,
        issues,
        ROW_NUMBER() OVER(ORDER BY issues DESC) AS `rank`
    FROM
        issues_group_by_month sgn
    WHERE
        event_month = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m-01')
), issues_last_2nd_month AS (
    SELECT
        event_month,
        repo_id,
        repo_name,
        issues,
        ROW_NUMBER() OVER(ORDER BY issues DESC) AS `rank`
    FROM
        issues_group_by_month sgn
    WHERE
        event_month = DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m-01')
)
SELECT
    ilm.repo_id,
    ilm.repo_name,
    DATE_FORMAT(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), '%Y-%m') AS current_month,
    DATE_FORMAT(DATE_SUB(DATE_SUB(NOW(), INTERVAL DAYOFMONTH(NOW()) DAY), INTERVAL 1 MONTH), '%Y-%m') AS last_month,
    -- Issues
    ilm.issues AS current_month_total,
    ilm.`rank` AS current_month_rank,
    IFNULL(il2m.issues, 0) AS last_month_total,
    il2m.`rank` AS last_month_rank,
    ((ilm.issues - il2m.issues) / il2m.issues) * 100 AS total_mom,
    (ilm.`rank` - il2m.`rank`) AS rank_mom,
    igr.issues AS total
FROM issues_group_by_repo igr
JOIN issues_last_month ilm ON igr.repo_id = ilm.repo_id
LEFT JOIN issues_last_2nd_month il2m ON ilm.repo_id = il2m.repo_id
ORDER BY current_month_rank;
