class Solution:
    def mergeAlternately(self, word1: str, word2: str) -> str:
        res = ""
        l1 = len(word1)
        l2 = len(word2)
        i = 0
        while i < l1 or i < l2:
            if i < l1:
                res += word1[i]
            if i < l2:
                res += word2[i]
            i += 1
        return res


word1 = "abc"
word2 = "pqr"
result = "apbqcr"

print("word1 = ", word1)
print("word2 = ", word2)
print("result = ", result)
sol = Solution()
print(sol.mergeAlternately(word1, word2))
