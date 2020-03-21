import React from 'react';
import './index.scss'
import { Button } from 'antd';

ar reverse1 = function(x) {
  let f = false
  if (x < 0) {
    f = true
  }
  var str = f ? String(x).substring(1) : String(x)
  var strList = str.split('').reverse()
  for (var i = 0; i < strList.length; i++) {
    if (strList[i] === '0') {
      strList[i] = undefined
    } else {
      break; 
    }
  }
  var str = strList.filter(x => x).join('')
  var num = Number(str)
  var number = f ? -num  : num
  if (number < -Math.pow(2, 31) || number > Math.pow(2, 31) -1) {
    number = 0
  }
  return number
};

var reverse = function (x) {
  let overflow = function (x) {
    return (x >= Math.pow(2, 31) - 1 || x <= -Math.pow(2, 31)) ? 0 : x
  }
  x = overflow(x)

  let isNegative = x < 0
  if (isNegative) {
    x = -x
  }
  let a = 0
  while (x > 9) {
    a = a * 10 + x % 10 * 10 // 求余 乘10
    console.log('a = ', a)
    x = parseInt(x / 10)
    console.log('x = ', x)
  }
  a += x

  return isNegative ? overflow(-a) : overflow(a)
};

// 108 ms	35.2 MB

// 	80 ms	36.2 MB

console.log('123 expected 321', reverse(123))
// a = 30 x = 12
// a = 320 x = 1
// 相当于两辆火车 1. A的车尾去B的车尾  2. A的倒数第二 去 B 的车尾，原本B车尾*10上升一位。 3 上车采用加法

// console.log('120 expected 21', reverse(120))
// console.log('-123 expected -321', reverse(-123))
// console.log('-120 expected -21', reverse(-120))
// console.log('-(2 ^ 32)', reverse(-Math.pow(2, 32)))
// console.log('2 ^ 33', reverse(Math.pow(2, 33)))


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
