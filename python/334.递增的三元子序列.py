from typing import List
import math


class Solution:
    def increasingTriplet(self, nums: List[int]) -> bool:
        n = len(nums)
        if n < 3:
            return False
        pre = [math.inf] * n
        post = [-math.inf] * n
        for i in range(1, n):
            pre[i] = min(pre[i - 1], nums[i - 1])
        for i in range(n - 2, -1, -1):
            post[i] = max(post[i + 1], nums[i + 1])
        for i in range(1, n - 1):
            if pre[i] < nums[i] < post[i]:
                return True
        return False


case = [
    {"s": [1, 2, 3, 4, 5], "result": True},
    {"s": [5, 4, 3, 2, 1], "result": False},
    {"s": [2, 1, 5, 0, 4, 6], "result": True},
    {"s": [5, 1, 5, 5, 2, 5, 4], "result": True},
]

sol = Solution()
for i in case:
    print(sol.increasingTriplet(i["s"]), " = ", i["result"])
    assert sol.increasingTriplet(i["s"]) == i["result"]
print("all passed")
