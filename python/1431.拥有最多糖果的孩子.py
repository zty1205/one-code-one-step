from typing import List


class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        m = max(candies)
        res = []
        for i in range(len(candies)):
            if candies[i] + extraCandies >= m:
                res.append(True)
            else:
                res.append(False)

        return res


class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        return [True if i + extraCandies >= max(candies) else False for i in candies]


candies = [12, 1, 12]
extraCandies = 10
result = [True, False, True]
sol = Solution()
print(sol.kidsWithCandies(candies, extraCandies))
