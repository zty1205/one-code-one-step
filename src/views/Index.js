import React from 'react';
import { Card, Rate } from 'antd';
import './Index.scss'

import questions from 'assets/js/questions.js'

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
