import React from 'react';
import {Card, Rate } from 'antd';
import './Index.scss'

import questions from 'assets/js/questions.js'

function content(text) {
  let cont = text ? text.join('\r\n').replace(/。/g, '。\r\n') : ''
  return <div className="popover-content">
    {cont}
  </div>
}

export default class Index extends React.Component {
  UNSAFE_componentWillMount() {
  }
  componentDidMount() {

  }
  goAnswer(index, e) {
    this.props.history.push(`/leetcode/${window.btoa(index)}`)
  }
  render() {
    return (
      <div className="page page-index">
        {
          questions.map((item, index) => <div className="card-box" key={index}>
            <Card title={item.title} hoverable={true} onClick={(e) => this.goAnswer(index, e)}>
              {/* <Popover content={content(item.content)} placement="bottomLeft" title={item.title}> */}
                <div className="card-content-box">{item.content.join(' ')}</div>
                <div className="card-content-rate">
                  <Rate tooltips='难度' value={item.difficulty} />
                  <span className="ant-rate-text">{item.dName}</span>
                </div>
              {/* </Popover> */}
            </Card>
          </div>
          )
        }
      </div>
    );
  }
}
