import React from "react";
import "./index.scss";
import { Button, Collapse } from "antd";
import questions from "assets/js/questions.js";
const { Panel } = Collapse;

function resloveAnswer(props) {
  console.log(props);
  let params = props.match.params;
  if (params && params.scret) {
    console.log("scret = ", window.atob(params.scret));
    return questions[window.atob(params.scret)];
  } else {
    return null;
  }
}

function mutil(list) {
	return <div className="mutil-p">
		{
			list.map((item, index) => {
				return <p key={index}>{item}</p>
			})
		}
	</div>
}

function mutil_ul(list) {
	return <ul className="mutil-p">
		{
			list.map((item, index) => {
				return <li key={index}>{item}</li>
			})
		}
	</ul>
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerData: resloveAnswer(props),
      showInfo: false
    };
  }
  UNSAFE_componentWillMount() {}
  componentDidMount() {
    console.log("state = ", this.state);
  }
  handleInfo() {
    this.setState(preState => {
      return {
        showInfo: !preState.showInfo
      };
    });
  }
  render() {
		const answerData = this.state.answerData
    return (
      <div className="page page-question page-sums">
        {answerData ? (
          <div>
            <h3>{answerData.id + '. ' + answerData.title}</h3>
            <section>
							{mutil(answerData.content)}
            </section>
            <section className="code-title">示例：</section>
            <article className="article-code">
							{mutil(answerData.explame)}
              <div className="btn-box">
                <Button
                  type="link"
                  size="small"
                  onClick={this.handleInfo.bind(this)}
                >
                  {this.state.showInfo ? "关闭解析" : "查看答案"}
                </Button>
              </div>
            </article>

            {this.state.showInfo ? (
              <div className="code-info">
                <div className="code-info-title">提示</div>
								{mutil_ul(answerData.info)}
                <div className="code-info-title">答案</div>
								<Collapse defaultActiveKey={['0']}>
									{
										answerData.answer.map((an, idx) => {
											return <Panel header={`答案 ${an.aid} : ${an.desc} [${an.level}]`} key={idx}>
												<pre>
													<code>
														<p>{an.content}</p>
													</code>
												</pre>
												<div>解析：</div>
												<div className='answer-explain'>{an.explain}</div>
											</Panel>
										})
									}
								</Collapse>
              </div>
            ) : null}
          </div>
        ) : (
          <div>无题</div>
        )}
      </div>
    );
  }
}
