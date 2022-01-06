-- 175. 组合两个表

-- 表1: Person

-- +-------------+---------+
-- | 列名         | 类型     |
-- +-------------+---------+
-- | PersonId    | int     |
-- | FirstName   | varchar |
-- | LastName    | varchar |
-- +-------------+---------+
-- PersonId 是上表主键

-- 表2: Address

-- +-------------+---------+
-- | 列名         | 类型    |
-- +-------------+---------+
-- | AddressId   | int     |
-- | PersonId    | int     |
-- | City        | varchar |
-- | State       | varchar |
-- +-------------+---------+
-- AddressId 是上表主键

-- 编写一个 SQL 查询，满足条件：无论 person 是否有地址信息，都需要基于上述两表提供 person 的以下信息：
--  FirstName, LastName, City, State

-- 因为 内连接是从结果中删除其他被连接表中没有匹配行的所有行 会丢失  不符合 是否有地址信息 都显示的题意  所以这里使用外连接
-- 使用left join 结果集保留左表的所有行，但只包含第二个表与第一表匹配的行。第二个表相应的空行被放入NULL值。

SELECT FirstName,LastName,City,State
FROM Person LEFT JOIN Address
ON Person.PersonId = Address.PersonId
