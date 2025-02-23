def gcd(a, b):
    return a if b == 0 else gcd(b, a % b)


class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        if str1 + str2 != str2 + str1:
            return ""
        return str1[: gcd(len(str1), len(str2))]


str1 = "ABCABC"
str2 = "ABC"
result = "ABC"

print("str1 = ", str1)
print("str2 = ", str2)
print("result = ", result)
sol = Solution()
print(sol.gcdOfStrings(str1, str2))
