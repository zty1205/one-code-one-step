-- 1050.合作过至少三次的演员和导演

-- 使用 group by 聚合和 然后获取count大于3的
select actor_id, director_id from actordirector group by actor_id, director_id having count(*) >= 3