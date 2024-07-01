// 本质不同的操作实际上只有三种：
// 在单词 B 中插入一个字符；
// 在单词 A 中插入一个字符；
// 修改单词 A 的一个字符。
// dp[i][j] 表示 A 的前 i 个字母和 B 的前 j 个字母之间的编辑距离。
// 最后一个字母相同 dp[i][j]=Math.min(dp[i][j−1]+1,dp[i−1][j]+1,dp[i−1][j−1])
// 最后一个字母不同 dp[i][j]=1+Math.min(dp[i][j−1],dp[i−1][j],dp[i−1][j−1])

var minDistance = function (word1 = '', word2 = '') {
  const n = word1.length;
  const m = word2.length;
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  // 边界状态初始化
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const left = dp[i - 1][j] + 1; // A插入
      const down = dp[i][j - 1] + 1; // B插入
      const left_down = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) {
        left_down += 1;
      }
      dp[i][j] = Math.min(left, Math.min(down, left_down));
    }
  }
  return dp[n][m];
};
