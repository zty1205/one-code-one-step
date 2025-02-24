from typing import List


class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        for i in range(len(flowerbed)):
            if flowerbed[i] == 0:
                pre = 0 if i <= 0 else flowerbed[i - 1]
                post = 0 if i >= len(flowerbed) - 1 else flowerbed[i + 1]
                if pre == 0 and post == 0:
                    flowerbed[i] = 1
                    n -= 1
        return n <= 0


class Solution:
    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:
        flowerbed = [0] + flowerbed + [0]
        for i in range(1, len(flowerbed) - 1):
            if flowerbed[i - 1] == 0 and flowerbed[i] == 0 and flowerbed[i + 1] == 0:
                flowerbed[i] = 1
                n -= 1
        return n <= 0


flowerbed = [1, 0, 0, 0, 1]
n = 1
result = True

flowerbed = [0, 0, 1, 0, 1]
n = 1
sol = Solution()
print(sol.canPlaceFlowers(flowerbed, n))
