-- 196.删除重复的电子邮箱

-- 表: Person

-- +-------------+---------+
-- | Column Name | Type    |
-- +-------------+---------+
-- | id          | int     |
-- | email       | varchar |
-- +-------------+---------+
-- id是该表的主键列。
-- 该表的每一行包含一封电子邮件。电子邮件将不包含大写字母。


DELETE p1 FROM Person p1, Person p2
WHERE p1.Email = p2.Email AND p1.Id > p2.Id
