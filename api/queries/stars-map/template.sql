WITH group_by_area AS (
    SELECT
        UPPER(u.country_code) AS country_or_area,
        COUNT(1) as cnt
    FROM github_events
    LEFT JOIN users_refined u ON github_events.actor_login = u.login
    WHERE
        repo_id IN (10270250)
        AND github_events.type = 'WatchEvent'
        AND u.country_code IS NOT NULL
    GROUP BY country_or_area
    ORDER BY cnt DESC
), s AS (
    SELECT SUM(cnt) AS total FROM group_by_area
)
SELECT country_or_area, cnt AS count, cnt / s.total AS percentage
FROM group_by_area
JOIN s ON 1 = 1
;
