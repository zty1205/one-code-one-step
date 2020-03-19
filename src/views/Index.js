import React from 'react';
import { Card, Rate } from 'antd';
import './Index.scss'

import questions from 'assets/js/questions.js'

var reverse1 = function(x) {
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
