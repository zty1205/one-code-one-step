import React from 'react';
import { Card, Rate } from 'antd';
import './Index.scss'

import questions from 'assets/js/questions.js'

var num = [2, 3, 4, 7, 11, 15], tar = 9
var nums = [2, 7, 11, 15], target = 9
var nums2 = [2, 7, 8, 11, 15], target2 = 18
var nums3 = [2, 7, 9, 9, 11, 15], target3 = 18
// 一个数 只可能是两个一大一下的数相加 或是 两个相等1/2 相加
// 太多if else 性能不好
var twoSum = function(nums, target) {
  let small = nums.filter(x => x <= target/2)
  let s_l = small.length
  let large = nums.filter(x => x > target/2 && x < target)
  let l_l = large.length
  if (s_l === 0 && l_l === 0) {
    return null
  } else if (s_l === 0) {
    return null
  } else if (l_l === 0) {
    if (s_l >= 2) {
      if (small[s_l - 1] + small[s_l - 2] === target) {
        return [s_l - 2, s_l - 1]
      } else {
        return null
      }
    } else {
      return null
    }
  } else {
    for(let i = 0; i < s_l; i++) {
      let n = small[i]
      let idx = large.findIndex(y => y === target - n)
      if (idx !== -1) {
        return [i, s_l + idx]
      }
    }
    return null
  }
};
console.log('num = [2, 3, 4, 7, 11, 15], tar = 9 expect [0, 3]', twoSum(num, tar))
console.log('nums = [2, 7, 11, 15], target = 9 expect [0, 2]', twoSum(nums, target))
console.log('nums2 = [2, 7, 8, 11, 15], target2 = 18 expect [1, 3]', twoSum(nums2, target2))
console.log('nums3 = [2, 7, 9, 9, 11, 15], target3 = 18 expect [2, 3]', twoSum(nums3, target3))

twoSum(num, tar)
twoSum(nums, target)
twoSum(nums2, target2)
twoSum(nums3, target3)

export default class Index extends React.Component {
  UNSAFE_componentWillMount() {
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="page page-index">
        {
          questions.map((item, index) => <div className="card-box" key={index}>
            <Card title={item.title}>
              <div>{item.content}</div>
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
