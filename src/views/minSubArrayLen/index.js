import React from 'react';
import { Card, Rate } from 'antd';
import './Index.scss'

import questions from 'assets/js/questions.js'

// 给定一个含有 n 个正整数的数组和一个正整数 s ，
// 找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

// 必须是连续的

// 滑动窗口算法
var minSubArrayLen2 = function (s, nums) {
  var length = nums.length
  if (length === 0) {
    return 0
  }
  var left = 0
  var right = 0 // 左右窗口
  var sum = 0
  var min = window.Infinity
  while (right < length) {
    sum += nums[right];
    right++;
    while (sum >= s) { // 只要一满足 就是当前最短的
      min = Math.min(min, right - left);
      sum -= nums[left];
      left++;
    }
  }
  return min === window.Infinity ? 0 : min;
};

// 找到长度为一半的连续数的最大和
// 最大和小于 s 则扩大长度，大于s则缩小长度
// 小的话 扩大长度 minLen 向 maxLen靠近
// 大的话 缩小长度 max 向 minLen靠近
// 两者相等后结束

// 其实也可以为 两侧固定的窗口 在滑动。 滑动一轮后 根据和的大小 跳转窗口的宽度 知道为0或是最长
function minSubArrayLen3(s, nums) {
  var length = nums.length;
  if (length === 0) {
    return 0;
  }
  var minLen = 0, maxLen = length;
  var midLen;
  var min = -1;
  while (minLen <= maxLen) {
      //取中间的长度
      midLen = (minLen + maxLen) >>> 1;
      //判断当前长度的最大和是否大于等于 s
      if (getMaxSum(midLen, nums) >= s) {
          maxLen = midLen - 1; //减小长度
          min = midLen; //更新最小值
      } else {
          minLen = midLen + 1; //增大长度
      }
  }
  return min === -1 ? 0 : min;
}

function getMaxSum(len, nums) {
  var n = nums.length;
  var sum = 0;
  var maxSum = 0;
  // 达到长度
  for (var j = 0; j < len; j++) {
    sum += nums[j];
  }
  maxSum = sum; // 初始化 maxSum

  for (var i = len; i < n; i++) {
      // 加一个数字减一个数字，保持长度不变
      sum += nums[i];
      sum = sum - nums[i - len];
      // 更新 maxSum
      maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}

// 暴力破解
function minSubArrayLen(s, nums) {
  let length = nums.length
  if (length === 0) {
    return 0
  }
  if (nums.find(x => x >= s)) {
    return 1
  }
  let min = Infinity
  for (let i = 0; i < length - 1; i++) {
    let sum = nums[i]
    for (let j = i+1; j < length; j++) {
      sum += nums[j]
      if (sum >= s) {
        min = Math.min(min, j - i + 1)
        break
      }
    }
  }
  return min === Infinity ? 0 : min
}


var s0 = 7
var nums0 = [2, 3, 1, 2, 4, 3]
var s1 = 4
var nums1 = [1,4,4]

var s2 = 6
var nums2 = [10,2,3]

console.log('s0 = 7, nums0 = [2,3,1,2,4,3]; expected = 2 , beacuse [4, 3]', minSubArrayLen(s0, nums0))
console.log('s1 = 4, nums1 = [1,4,4]; expected = 1 , beacuse [4]', minSubArrayLen(s1, nums1))
console.log('s2 = 6, nums2 = [10,2,3]; expected = 1 , beacuse [10]', minSubArrayLen(s2, nums2))

export default class Index extends React.Component {
  UNSAFE_componentWillMount() {
  }
  componentDidMount() {

  }
  goAnswer(item, e) {
    this.props.history.push(`/${item.path}`)
  }
  render() {
    return (
      <div className="page page-index">
        {
          questions.map((item, index) => <div className="card-box" key={index}>
            <Card title={item.title} hoverable={true} onClick={(e) => this.goAnswer(item, e)}>
              <div className="card-content-box">{item.content}</div>
              <div>
              <Rate tooltips='难度' value={item.difficulty} />
                <span className="ant-rate-text">{item.dName}</span>
              </div>
            </Card>
          </div>
          )
        }
        
      </div>
    );
  }
}
