const puppeteer = require('puppeteer');
const { sleep, buildTemplate, buildFileName, writeMD, writeCodeFile } = require('./util');
const Log = require('./log');

async function getPageDataByUrl(url) {
  Log.URLPageStart(url);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, {
    timeout: 30 * 1000,
    waitUntil: [
      'load',
      'domcontentloaded',
      'networkidle0', // 在 500ms 内没有任何网络连接
      'networkidle2' // 在 500ms 内网络连接个数不超过 2 个
    ]
  });

  await page.exposeFunction('sleep', (t) => sleep(t));

  const res = await page.evaluate(async () => {
    let title = document.querySelector('[data-cypress="QuestionTitle"] a').innerText;

    const btn = document.getElementById('lang-select');
    btn.click();
    const js = document.querySelector('[data-cypress="LanguageSelector-JavaScript"]');
    js.click();

    await sleep(520);

    const parentNode = document.querySelector('.content__1Y2H .notranslate');

    let code = document.querySelector('div .view-lines').innerText;

    let virtualDom = {
      tag: parentNode.nodeName,
      type: parentNode.nodeType,
      children: [],
      text: String(parentNode.innerText).trim()
    };

    for (let i = 0; i < parentNode.children.length; i++) {
      let child = parentNode.children[i];
      virtualDom.children.push({
        tag: child.nodeName,
        type: child.nodeType,
        child: [],
        text: String(child.innerText).trim()
      });
    }

    return {
      title,
      code,
      content: virtualDom
    };
  });

  await page.close();
  await browser.close();

  Log.URLPageEnd();

  return res;
}

function convertQuestion(questions = []) {
  let htmlQuestion = '';
  let ques = questions.filter((q) => !q.startsWith('例如'));
  for (let qu of ques) {
    htmlQuestion += `// ${qu.replace(/\n/g, '\n// ')}\n`;
  }
  return htmlQuestion;
}
function convertAnswer(answers = []) {
  let htmlAnswers = '';
  for (let ans of answers) {
    let ansArr = ans.split(/\n/);
    const [input, output, explain] = ansArr;

    let i = input.replace(/输入[：:]/, input.indexOf('=') === -1 ? 'var input = ' : 'var ');
    let o = output.replace(/输出[：:]/, output.indexOf('=') === -1 ? 'var result = ' : 'var ');

    htmlAnswers += `// ${i};\n`;
    htmlAnswers += `// ${o};\n`;
    htmlAnswers += explain ? `// ${explain};\n\n` : '\n\n';
  }
  return htmlAnswers;
}

function convertQuestionDomData(data) {
  const { url, title, content, code } = data;

  let htmlContent = `\n// ${url}\n`;

  const questions = [];
  const answer = [];
  let qusFinish = true;

  const children = content.children.filter((c) => !!c.text);

  for (let i = 0; i < children.length; i++) {
    const dom = children[i];
    const { text, tag } = dom;

    switch (tag) {
      case 'PRE':
        answer.push(text);
        break;
      case 'P':
        if (text.indexOf('示例') !== -1) qusFinish = false;
        if (qusFinish) questions.push(text);
        break;
      case 'UL':
      case 'OL':
        questions.push(`提示：\n${text}`);
        break;
      default:
        break;
    }
  }

  let htmlAnswers = convertAnswer(answer);
  let htmlQuestion = convertQuestion(questions);

  const ansArea = '\n// --- answer-1 ---\n\n// --- answer-1 ---\n\n// --- answer-2 ---\n\n// --- answer-2 ---\n';

  htmlContent += `\n${htmlQuestion}\n\n${code}\n\n${ansArea}\n\n${htmlAnswers}`;

  return {
    htmlTitle: title,
    fileName: title.replace(/\s/g, ''),
    htmlContent
  };
}

async function buildByUrl(url, dist, ext) {
  const data = await getPageDataByUrl(url);

  const { htmlTitle, fileName: name, htmlContent } = convertQuestionDomData({ ...data, url });
  const template = buildTemplate(ext, {
    htmlTitle,
    htmlContent
  });
  const file = buildFileName(name, dist, ext);

  writeCodeFile(file, template);

  const { link, curNum } = writeMD(name, dist, ext);

  return {
    name,
    file,
    link,
    curNum
  };
}

module.exports = {
  buildByUrl
};
