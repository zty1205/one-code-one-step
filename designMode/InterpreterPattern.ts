/**
 * InterpreterPattern 解释器模式
 * 意图：给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子。
 * 主要解决：对于一些固定文法构建一个解释句子的解释器。
 * 何时使用：如果一种特定类型的问题发生的频率足够高，那么可能就值得将该问题的各个实例表述为一个简单语言中的句子。这样就可以构建一个解释器，该解释器通过解释这些句子来解决该问题。
 * 如何解决：构建语法树，定义终结符与非终结符。
 * 关键代码：构建环境类，包含解释器之外的一些全局信息，一般是 HashMap。
 * 应用实例：编译器、运算表达式计算。
 * 优点： 1、可扩展性比较好，灵活。 2、增加了新的解释表达式的方式。 3、易于实现简单文法。
 * 缺点： 1、可利用场景比较少。 2、对于复杂的文法比较难维护。 3、解释器模式会引起类膨胀。 4、解释器模式采用递归调用方法。
 * 使用场景： 1、可以将一个需要解释执行的语言中的句子表示为一个抽象语法树。 2、一些重复出现的问题可以用一种简单的语言来进行表达。 3、一个简单语法需要解释的场景。
 */

interface Expression {
  interpret(context: string): boolean;
}

class TerminalExpression implements Expression {
  private data: string;

  constructor(data: string) {
    this.data = data;
  }
  interpret(context: string): boolean {
    return context.indexOf(this.data) > -1;
  }
}
class OrExpression implements Expression {
  exp1: Expression = null;
  exp2: Expression = null;

  constructor(exp1: Expression, exp2: Expression) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }
  interpret(context: string): boolean {
    return this.exp1.interpret(context) || this.exp2.interpret(context);
  }
}
class AndExpression implements Expression {
  exp1: Expression = null;
  exp2: Expression = null;

  constructor(exp1: Expression, exp2: Expression) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }
  interpret(context: string): boolean {
    return this.exp1.interpret(context) && this.exp2.interpret(context);
  }
}

export function run() {
  console.log('--- 解释器模式 ---');

  // 规则：Robert 和 John 是男性
  const robert = new TerminalExpression('Robert');
  const john = new TerminalExpression('John');
  const isMale = new OrExpression(robert, john);
  const julie = new TerminalExpression('Julie');
  const married = new TerminalExpression('Married');
  const isMarriedWoman = new AndExpression(julie, married);
  console.log('John is male? ' + isMale.interpret('John'));
  console.log('Jul is a married women? ' + isMarriedWoman.interpret('Married Jul'));

  console.log('--- 解释器模式 ---');
  console.log('');
}
