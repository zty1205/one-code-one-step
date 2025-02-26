from typing import List


class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        i = 0
        j = 0
        while j < n:
            while i < n and nums[i] != 0:
                i += 1
            j = i
            while j < n and nums[j] == 0:
                j += 1
            if j < n:
                nums[i] = nums[j]
                nums[j] = 0


class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        n = len(nums)
        left = right = 0
        while right < n:
            if nums[right] != 0:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
            right += 1


nums = [0, 1, 0, 3, 12]
print(nums)  # [0, 1, 0, 3, 12]
sol = Solution()
sol.moveZeroes(nums)
print(nums)  # [1, 3, 12, 0, 0]
