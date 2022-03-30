-- 197.上升的温度

-- 表： Weather

-- +---------------+---------+
-- | Column Name   | Type    |
-- +---------------+---------+
-- | id            | int     |
-- | recordDate    | date    |
-- | temperature   | int     |
-- +---------------+---------+
-- id 是这个表的主键
-- 该表包含特定日期的温度信息

-- 编写一个 SQL 查询，来查找与之前（昨天的）日期相比温度更高的所有日期的 id 。

-- 返回结果 不要求顺序 。

-- 查询结果格式如下例。

--  

-- 示例 1：

-- 输入：
-- Weather 表：
-- +----+------------+-------------+
-- | id | recordDate | Temperature |
-- +----+------------+-------------+
-- | 1  | 2015-01-01 | 10          |
-- | 2  | 2015-01-02 | 25          |
-- | 3  | 2015-01-03 | 20          |
-- | 4  | 2015-01-04 | 30          |
-- +----+------------+-------------+
-- 输出：
-- +----+
-- | id |
-- +----+
-- | 2  |
-- | 4  |
-- +----+
-- 解释：
-- 2015-01-02 的温度比前一天高（10 -> 25）
-- 2015-01-04 的温度比前一天高（20 -> 30）

-- answer-1 --

-- 使用 DATEDIFF 来比较两个日期类型的值。

select w2.id from Weather w1, Weather w2
where w1.Temperature < w2.Temperature 
and DATEDIFF(w2.RecordDate, w1.RecordDate) = 1

-- answer-1 --

-- answer-2 --

-- 笛卡尔积

select w1.id from Weather w1
join weather w2 
on DATEDIFF(w1.RecordDate, w2.RecordDate) = 1
and w1.Temperature > w2.Temperature

-- answer-2 --