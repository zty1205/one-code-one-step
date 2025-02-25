class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        if n == 0:
            return []

        pre = [1] * n
        post = [1] * n
        result = [0] * n

        for i in range(1, n):
            pre[i] = pre[i - 1] * nums[i - 1]

        for i in range(n - 2, -1, -1):
            post[i] = post[i + 1] * nums[i + 1]

        for i in range(n):
            result[i] = pre[i] * post[i]

        return result


test = [
    {"s": [1, 2, 3, 4], "result": [24, 12, 8, 6]},
    {"s": [-1, 1, 0, -3, 3], "result": [0, 0, 9, 0, 0]},
    {"s": [0, 0], "result": [0, 0]},
]

sol = Solution()
for i in test:
    print(sol.productExceptSelf(i["s"]), " = ", i["result"])
    assert sol.productExceptSelf(i["s"]) == i["result"]
print("all passed")
