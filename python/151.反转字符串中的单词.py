class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))


case = [
    {"input": "the sky is blue", "output": "blue is sky the"},
    {"input": "  hello world!  ", "output": "world! hello"},
    {"input": "a good   example", "output": "example good a"},
]

sol = Solution()
for i in case:
    # print(i["output"], "| = |", sol.reverseWords(i["input"]), "|")
    assert sol.reverseWords(i["input"]) == i["output"]
print("all passed")
