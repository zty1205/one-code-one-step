import React from 'react';
import './index.scss'
import { Button } from 'antd';

var num = [2, 3, 4, 7, 11, 15], tar = 9
var nums = [2, 7, 11, 15], target = 9
var nums2 = [2, 7, 8, 11, 15], target2 = 18
var nums3 = [2, 7, 9, 9, 12, 15], target3 = 18
// 一个数 只可能是两个一大一下的数相加 或是 两个相等1/2 相加
// 太多if else 性能不好
// var isDef = function(val) {
//   return val !== undefined && val !== null && val !== ''
// }
// var twoSum = function(nums, target) {
//   var map = {}
//   // hash映射 使得查找更加方便
//   for (let i = 0; i < nums.length; i++) {
//     map[nums[i]] = i;
//   }
//   for (var i = 0; i < nums.length; i++) {
//     var delNum = target - nums[i];
//     if (isDef(map[delNum]) && map[delNum] !== i) {
//       return [i, map[delNum]]
//     }
//   }
//   return false
// }

// 执行用时 :
// 56 ms
// , 在所有 JavaScript 提交中击败了
// 98.31%
// 的用户
// 内存消耗 :
// 35.9 MB
// , 在所有 JavaScript 提交中击败了
// 13.18%
// 的用户

var twoSum = function (nums, target) {
  function findIndex(nums, i, delNum) {
    for (let idx = i + 1; idx < nums.length; idx++) {
      if (nums[idx] === delNum) {
        return idx
      }
    }
    return -1
  }
  if (!nums || nums.length < 2) {
    return []
  } else if (nums.length === 2) {
    return nums[0] + nums[1] === target ? [0, 1] : []
  } else {
    for (let i = 0; i < nums.length; i++) {
      let idx = findIndex(nums, i, target - nums[i])
      if (idx !== -1) {
        return [i, idx]
      }
    }
  }
  return []

};

// 执行用时 :
// 104 ms
// , 在所有 JavaScript 提交中击败了
// 55.28%
// 的用户
// 内存消耗 :
// 34.6 MB
// , 在所有 JavaScript 提交中击败了
// 73.68%
// 的用户

console.log('num = [2, 3, 4, 7, 11, 15], tar = 9 expect [0, 3]', twoSum(num, tar))
console.log('nums = [2, 7, 11, 15], target = 9 expect [0, 1]', twoSum(nums, target))
console.log('nums2 = [2, 7, 8, 11, 15], target2 = 18 expect [1, 3]', twoSum(nums2, target2))
console.log('nums3 = [2, 7, 9, 9, 12, 15], target3 = 18 expect [2, 3]', twoSum(nums3, target3))

twoSum(num, tar)
twoSum(nums, target)
twoSum(nums2, target2)
twoSum(nums3, target3)

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false
    }
  }
  UNSAFE_componentWillMount() {
  }
  componentDidMount() {

  }
  handleInfo() {
    this.setState(preState => {
      return {
        showInfo: !preState.showInfo
      }
    })
  }
  render() {
    return (
      <div className="page page-question page-sums">
        <h3>1. 两数之和</h3>
        <section>
          <p>给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。</p>
          <p>你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。</p>
        </section>
        <section>示例：</section>
        <article className='article-code'>
          <p>给定 nums = [2, 7, 11, 15], target = 9</p>

          <p>因为 nums[0] + nums[1] = 2 + 7 = 9</p>
          <p> 所以返回 [0, 1]</p>
          <div className="btn-box" >
            <Button type="link" size='small' onClick={this.handleInfo.bind(this)}>
              {this.state.showInfo ? '关闭解析' : '查看答案'}
            </Button>
          </div>
        </article>

        {
          this.state.showInfo ? <div className="code-info">
            <div className="code-info-title">提示</div>
            <ul>
              <li>不能对原数组进行sort</li>
              <li>本提主要考察 - 查找算法</li>
            </ul>
            <div className="code-info-title">最优答案</div>
            <div>
                
            </div>
          </div> : null
          
        }

      </div>
    );
  }
}
