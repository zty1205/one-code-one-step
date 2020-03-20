
[toc]

# 个人简绍
你好，我是张腾跃。邮箱zty1160051490@163.com

# 个性

## js

### 立即执行的函数
- 执行函数表达式： 在函数声明表达式后添加括号即可执行该函数, 括号内可传递参赛
- 立即执行函数：立即执行的匿名函数，可以达到保护内部变量的作用
- ***立即执行函数前面的分号不写，执行报错***
- 两种写法： (fun(){}()) 或 (fun(){})()
```
(function() {
    console.log("in () fun")
})();
-function(){
    console.log(3)
}()；
// + - ! 等运算符也可以执行立即执行函数，但是()更安全
(function(i){
    console.log(i)
})(j)；
// ==>  function (i) => {}; (j)
```


### 作用域

作用域就是变量和函数的可访问范围，控制着变量和函数的可见性与生命周期。
- 全局作用域：没有使用var，let，const关键字声明或是挂载在window对象上的
- 局部作用域：又称函数作用域，在函数体内声明，函数执行完后销毁
- ES6块级作用域：使用let关键字来声明变量，变量只在let命令所在代码块{ }内有效
- ES5如何模拟块级作用域：创建一个匿名函数（自己理解为添加了一层最近的作用域链）

### 作用域链

&emsp;&emsp;
当代码在一个环境中执行时，会创建变量对象的一个作用域链来保证对执行环境有权访问的变量和函数的有序访问。作用域第一个对象始终是当前执行代码所在环境的变量对象（VO）。最后一个是全局的window的对象。

&emsp;&emsp;
标识符的解析是沿着作用域链一级一级搜索的过程，从第一个对象开始，逐级向后回溯，直到找到同名标识符为止，找到后不再继续遍历，找不到就报错。

### Object.defineProperty和Object.defineProperties

```javascript
let s = {
    name: 1,
    age: 2
}
Object.defineProperty(s, "name", {
    configurable: false, // delete和可修改以下特性
    writable: true, // 能否修改值
    enumerable: true, // 枚举即遍历
    value: '张三,
    get: () => {},
    set: (val) => {}
})
Object.defineProperties(s, {
    name: {
        value: '张三',
        configurable: false,
        writable: true,
        enumerable: true,
        get: () => {},
        set: (val) => {}
    },
    age: {
        value: 18,
        configurable: true
    }
})
```


### 变量提升与函数提升

&emsp;&emsp;
在真正解释执行之前，JavaScript解释器会预解析代码，将变量、函数声明部分提前解释
- 使用var声明的变量会被提升到***自身作用域的顶部***
- function函数也是如此


### 如何理解闭包
- 闭包是函数和声明该函数的词法环境的组合，***这个环境包含了这个闭包创建时所能访问的所有局部变量***
- 可能产生闭包的二种情况：函数作为返回值，函数作为参数传递
- 优点：
    - 可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在函数调用后被自动清除，同时这也算是个缺点。（在函数中return一个函数出来）
    -  可用于模拟私有变量和方法
- 缺点
    - 消耗内存，影响网页性能
    - 可能会引起内存泄漏（***不再用到的内存，但是没有及时释放，就叫做内存泄漏***）


### js引擎工作方式 - wait
比如像V8（Chrome的JS引擎），它其实为了提高JS的运行性能，在运行之前会先将JS编译为本地的机器码（native machine code），然后再去执行机器码（这样速度就快很多），相信大家对JIT（Just In Time Compilation）一定不陌生吧。

### GC
- 垃圾回收机制(GC:Garbage Collection),执行环境负责管理代码执行过程中使用的内存。
- 原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。但是这个过程不是实时的，因为其开销比较大，所以垃圾回收器会按照固定的时间间隔周期性的执行。
- 垃圾回收策略：标记清除(较为常用)和引用计数。
    - 标记清除：定义和用法：当变量进入环境时，将变量标记"进入环境"，当变量离开环境时，标记为："离开环境"。某一个时刻，垃圾回收器会过滤掉环境中的变量，以及被环境变量引用的变量，剩下的就是被视为准备回收的变量。

    - 引用计数：定义和用法：引用计数是跟踪记录每个值被引用的次数。基本原理：就是变量的引用次数，被引用一次则加1，当这个引用计数为0时，被视为准备回收的对象。

### 内存泄漏
- 不再用到的内存，但是没有及时释放，就叫做内存泄漏
- 内存泄露的几种情况:
    - 当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，在IE中不会作出恰当处理，此时要先手工移除事件，不然会存在内存泄露。

    - 闭包可以维持函数内局部变量，使其得不到释放。解决：手动将该变量置为null


### eventloop（任务角度）
- task和microtask
   - task主要包含：setTimeout、setInterval、setImmediate、I/O、UI交互事件、（整体代码script）
    - microtask主要包含：Promise、process.nextTick、Mutation Observer(监听DOM树变化)
    - setImmediate和process.nextTick都是node中才有的
    - process.nextTick的优先级高于Promise(then)
    - setImmediate和process.nextTick的时间复杂度为O(1)， 高于setTimeout、setInterval的O(n) [ setTimeout这种timer类型的API，需要创建定时器对象和迭代等操作，任务的处理需要操作小根堆 ]
    (process.nexttick是异步的，且是最快执行的)

浏览器整个最基本的Event Loop：
1. queue可以看做一种数据结构，用以存储需要执行的函数
2. timer类型的API（setTimeout/setInterval）注册的函数，等到期后进入task队列
3. 其余API注册函数直接进入自身对应的task/microtask队列
4. Event Loop执行一次，从task队列中拉出一个task执行
5. Event Loop继续检查microtask队列是否为空，依次执行直至清空队列

Node的Event Loop分阶段，阶段有先后，依次是
1. expired timers and intervals，即到期的setTimeout/setInterval
2. I/O events，包含文件，网络等等
3. immediates，通过setImmediate注册的函数
4. close handlers，close事件的回调，比如TCP连接断开
5. 同步任务及每个阶段之后都会清空microtask队列

（优先清空next tick queue，即通过process.nextTick注册的函数，再清空other queue，常见的如Promise）

而和规范的区别，在于node会清空当前所处阶段的队列，即执行所有task。（如两个setTimeOut的延时相同，会被合并一起执行）

### eventloop（同步异步）

1. 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入Event Table并注册函数。
2. 当指定的事情完成时，Event Table会将这个函数移入Event Queue。
3. 主线程内的任务执行完毕为空，会去Event Queue读取对应的函数，进入主线程执行。
4. 上述过程会不断重复，也就是常说的Event Loop(事件循环)。

### new 的原理
1. 创建一个空对象，构造函数中的this指向这个空对象
2. 这个新对象被执行 [[原型]] 连接 【这个空对象的__proto__设置为即构造函数的prototype)】
3. 执行构造函数方法，属性和方法被添加到this引用的对象中
4. 如果构造函数中没有返回其它对象，那么返回this，即创建的这个的新对象，否则，返回构造函数中返回的对象。

### 原型链
（这里的构造函数是指function而不是constructor函数）
- 构造函数有一个prototype属性，指向实例对象的原型对象
- 通过同一个构造函数实例化的实例对象具有同一个原型对象
- 原型对象上定义的属性和方法，实例对象都有（原型类似于父类）
- 原型对象上的constructor属性，指向该原型对象对应的构造函数。实例对象继承类该属性，也指向构造函数
- 实例对象有的_proto_属性，指向该实例对象对应的原型对象
- 任何对象都可以看做是，通过Object()构造函数，实例化而成的实例对象 （构造函数也是一个函数对象，她的_proto_等于Object.prototype原型）

最重要的一点

Function.prototype.construtor指向它本身，Object.prototype.construtor也指向Function。

从这里可以说，所有的对象都是由Function生成的。

结论：构造器的原型链是封闭的，它借由一个匿名函数实现。即， Function.__proto__指向一个匿名函数function(){} ,匿名函数的__proto__指向Object的prototype ,Object的__proto__指向Function 的 prototype.

### class

&emsp;&emsp;
ES6之前实例化对象是通过构造函数实现的，ES6后可以通过关键字class创建类（可以认为是一种语法糖）
- class中的constructor就是在实例化对象调用的构造函数，该构造函数可不写。
- 实例对象必须使用new 关键字生成
- class不可以当做函数执行
- class不存在变量提升
- ***class中定义的属性和方法都挂在原型上，所有的实例对象都有这些属性和方法。构造函数中定义的是实例的属性和方法。***
- class中可以通过static 定义静态方法，静态变量需在类外声明（calss.staticName==staticValue）。静态属性和方法只可以通过class来调用，实例不可调用
- ES5和ES6都可以使用get和set拦截存储行为.(感觉没啥用)
- class 经过babel后，就是让类等于一个通过立即执行函数放回的构造函数。 立即执行中注意通过_createClass(Constructor, protoProps, staticProps)定义构造函数，原型prop(原型属性和方法)和静态prop(静态方法)

### 继承 
继承属性，方法，静态方法
- ES6继承: 通过extends关键字
- ES5继承: 通过修改原型链实现继承 (babel用过_inherits函数实现这一过程)
- 本质： 
    - ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
    - ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。（babel也是如此）


```JavaScript
// 原型继承
function inherits(Child, Parent) {
    var F = function () {}; // 中间变量
    F.prototype = Parent.prototype;
    Child.prototype = new F(); // 拥有了父的属性，方法
    Child.prototype.constructor = Child;
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);
```


### promise

&emsp;&emsp;
所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

&emsp;&emsp;
Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。清晰的代码结构。避免出现回调地狱

Promise的pending状态，resolve后的fulfilled状态，rejecte后的rejected状态

then和catch实际上是注册异步操作成功或失败的回调函数

- Promise.prototype.then() ： 可以有两个参数，第一个是resolve的回调，第二个是reject的回调
- Promise.prototype.catch()： 相当于.then(null, rejectFun)
- Promise.prototype.finally() 【ES8】
- Promise.all(): 所有异步操作都回来
- Promise.race(): 异步操作竞赛，只返回最快的一个
- Promise.resolve()
- Promise.reject()

```JavaScript
var func = function() {
   function PFun(num) {
        return new Promise((reslove, reject) => {
            setTimeout(() => {
                if (num > 5) {
                    reslove(`reslove num = ${num}`)
                } else {
                    reject(`reject num = ${num}`)
                }
            }, 300)
        })
    }

    PFun(6).then(res => {
        console.log("p6 then res: ", res)
    }).catch(err => {
        console.log("p6 catch err: ", err)
    })
    // p6 then res: reslove num = 6

    PFun(4).then(res => {
        console.log("p6 then res: ", res)
    }).catch(err => {
        console.log("p6 catch err: ", err)
    })
    // p4 catch err: reject num = 6
```

```JavaScript
// finally
promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);

// 实现
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```


### 箭头函数
- 更简化的代码语法
- 不绑定this， 这也意味着使用call和apply是无法传递this，第一个参数就是需要传递的参数
- arguments，即没有函数的参数arguments，但可以使用剩余参数...args替代

```JavaScript
function foo(arg1,arg2) { 
    var f = (...args) => args[1]; 
    return f(arg1,arg2); 
} 
foo(1,2);  // 2
```

- 不能使用new 关键字，因为箭头函数不是一个构造函数
- 没有prototype属性
- yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作生成器。
- 如果需要放回对象字面量，可以

```
var func = () => ({foo: 1})
// 或
var func = () => {return {foo:1}}
// 两个效果一致，都是返回对象
```


### async函数

&emsp;&emsp;
async 函数是什么？一句话，它就是 Generator 函数的语法糖。

```JavaScript
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
};
```
async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。

### this
- this指的是当前的执行环境
- 一般函数时指向window, 严格模式下this绑定到undefined
- 对象调用函数的情况下，指向调用者
- 构造函数下，指向实例
- bind call apply with函数可以绑定this的指向

### bind call apply with
&emsp;&emsp;
call、apply、bind的作用是改变函数运行时this的指向

- call: call(this, arg1, arg2, ...)
- apply: apply(this, firstArg | argArray[]) // 多个参数可使用参数数组
- bind: bind(this, firstArg | argArray[]) //返回一个函数，函数内的this指向传入的this
- with: with (expression) { statement } // with'语句將某个对象添加到作用域链的顶部(window之下，没有切断作用域链，在expression中找不到定义的，仍会往window上寻找)
    - 在ES5严格模式该标签禁止使用 
    - 优点：with语句可以在不造成性能损失的情況下，减少变量的长度。其造成的附加计算量很少。使用'with'可以减少不必要的指针路径解析运算
    - 缺点：with语句使得程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，查找起来将会很慢。如果是在对性能要求较高的场合，'with'下面的statement语句中的变量，只应该包含这个指定对象的属性。
    - 缺点：with语句使得代码不易阅读，同时使得JavaScript编译器难以在作用域链上查找某个变量，难以决定应该在哪个对象上来取值。


### 改变原数组的方法
- pop(), push(),shift(),unshift()
- reverse(),sort()
- splice(index, howMany, newAddItem1, newAddItem2, ...) .. 删除项 

### toPrimitive(input，PreferredType?) 英[ˈprɪmətɪv]
 toPrimitive(input，PreferredType?) 函数将input转换成原始值，PreferredType是转化偏向
 - 如果input是原始值，则返回input
 - 如果input是对象（广义）
    - PreferredType是Number:
    1. 调用obj.valueOf(), 如果是原始值则返回，否则进入2
    2. 调用obj.toString(), 如果是原始值则返回，否则抛出 TypeError 异常
    - PreferredType是String:
    1. 调用obj.toString(), 如果是原始值则返回，否则进入2
    2. 调用obj.valueOf(), 如果是原始值则返回，否则抛出TypeError 异常
    - PreferredType未填: Date 类型的对象PreferredType默认 String，其它类型的值会被设置为 Number
- (+, -, ==)等运算符，会使得 PreferredType 为 Number，但如有有一元为String，则 PreferredType 为 String
- null和undefined是特殊的原始类型，他们不会转换成其他任何值，那么也不会调用该方法。且规范定义undefined == null


注意：

- []转换成字符串为“”
- []转换成boolean为true；
- []转换成数字为0；


### undefined 与 null
- undefined: undefined 的字面意思就是未定义的值，这个值的语义是，希望表示一个变量最原始的状态，而非人为操作的结果
- null: null 的字面意思是空值，这个值的语义是，希望表示 一个对象被人为的重置为空对象，而非一个变量最原始的状态
- 规定 undefined == null 表示其行为相似性

### == 与 ===
- === 严格相等
    - 类型相等
    - 普通类型值相等， 引用类型的地址相等
- == 相同 （带类型转换） 
    - undefined == null 
    - 使用toPrimitive转换成原始值后比较

### valueof 和 tostring
每个对象不一样，参考[valueof 和 tostring](https://www.jianshu.com/p/91ffaf79de1c)

### 类型检测
- 简单类型：Undefined, Null, Boolean, Number, String
- 复杂类型：Object, Array, Date, Function, RegExp （Symbol， Set, Map）
- typeof: 区分不了引用类型（typeof null === Object）
- instanceof: 繁琐且还能用于区分拥有原型链的类型
- constructor: 容易篡改
- Object.prototype.toString.call()： 完美(ES6的也能区分)

```javasctipt
Object.prototype.toString.call('a') === [Object String]
Object.prototype.toString.call(Null) === [Object Null]
```

### 四种for循环的区别
1.普通for循环

2.forEach
- 普通for循环简写
- 不能中断循环

3.for in

- 索引为字符串
- 无顺序（通常用于对象或json中）
- 可扩展属性也会遍历
- 为循环”enumerable“对象而设计
```
a = [1,2,3]
a.cc = '11'
```
     
4.for of
- 不支持对象的遍历
- 具有 obj[Symbol.iterator] 的数据使用，如类数组，字符串，set和map


注意：

forEach，filter，every，some会跳过空位，map会跳过空位，但是会保留这个值。

### 事件（捕获，冒泡，委托）
- 事件流描述的是从页面中接收事件的顺序。
- 类型
    - 事件冒泡流：事件的传播是从最特定的事件目标到最不特定的事件目标。即从DOM树的叶子到根。（IE）
    - 事件捕获流：事件的传播是从最不特定的事件目标到最特定的事件目标。即从DOM树的根到叶子。（网景公司）

- DOM标准规定事件流包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。
    - 事件捕获阶段：实际目标（<text>）在捕获阶段不会接收事件。也就是在捕获阶段，事件从(window ->)document到<html>再到<body>就停止了。
    - 处于目标阶段：事件在<text>上发生并处理。但是事件处理会被看成是冒泡阶段的一部分。
    - 冒泡阶段：事件又传播回文档。

**note**:
- 尽管“DOM2级事件”标准规范明确规定事件捕获阶段不会涉及事件目标，但是在IE9、Safari、Chrome、Firefox和Opera9.5及更高版本都会在捕获阶段触发事件对象上的事件。结果，就是有两次机会在目标对象上面操作事件。
- 并非所有的事件都会经过冒泡阶段 。所有的事件都要经过捕获阶段和处于目标阶段，但是有些事件会跳过冒泡阶段：如，获得输入焦点的focus事件和失去输入焦点的blur事件。


```JavaScript
/* DOM1级，只支持绑定一个函数 */
btn.onclick = function(){}
btn.onclick = null

/* DOM2，3级，支持绑定多个函数 */
// IE
btn.attachEvent('onclick', function(){})
btn.detachEvent('onclick', function(){})
// 标准
btn.addEventListener('click', function(){})
btn.removeEventListener('click', function(){})

/* 阻止默认行为 和 冒泡 */
// IE
window.event.returnValue = false // 阻止默认行为
window.event.cancelBubble = true // 阻止冒泡
// 标准
event.preventDefault() // 阻止默认行为
event.stopPropagation() // 阻止冒泡
```
- 事件委托又叫事件代理，是根据事件冒泡流，让父元素代理响应函数减少DOM的访问

### 事件event对象
响应事件的event对象
- pageX, Y: 可视区域不忽略滚动条
- clientX, Y: 可视区域忽略滚动条
- screenX, Y：屏幕区域
- offsetX, Y
- x, y
- target：事件的触发源 （事件委托时可判断事件来源）
- currentTarget：事件的响应源

### 正则和常见正则
- 语法

```JavaScript
let r = /regExp/igm
let r2 = new RegExp('regExp', 'igm')

// i 忽略大小写
// g 匹配多个
// m 多行匹配

```
- regExp 方法
    - test()
    - exec()
- string 方法
    - replace()
    - search()
    - match()
    - split()

- 模式

```
[abc] // 方括号内的任一字符
[^xyz] 不匹配这个集合中的任何一个字符 
[0-9] // 匹配0到9
(x|y|zt) // 匹配 x,y,zt中的任何一个
(x) // 匹配x保存x在名为$1...$9的变量中 (捕获)
{n} // 精确匹配n次 
{n,} // 匹配n次以上 
{n,m} // 匹配n-m次 

n+ // 至少一个 n 的字符串。
n* / 零个或多个 n 的字符串。
n? // 零个或一个 n 的字符串。
^n // 以n开头 
n$ // 以n结尾

. 任一字符
[\b] 匹配一个退格符 
\b 匹配一个单词的边界 
\B 匹配一个单词的非边界 
\cX 这儿，X是一个控制符，/\cM/匹配Ctrl-M 
\d 匹配一个字数字符，/\d/ = /[0-9]/ 
\D 匹配一个非字数字符，/\D/ = /[^0-9]/ 
\n 匹配一个换行符 
\r 匹配一个回车符 
\s 匹配一个空白字符，包括\n,\r,\f,\t,\v等 
\S 匹配一个非空白字符，等于/[^\n\f\r\t\v]/ 
\t 匹配一个制表符 
\uxxxx 查找以十六进制数 xxxx 规定的 Unicode 字符。
\v 匹配一个重直制表符 
\w 匹配一个可以组成单词的字符(alphanumeric，这是我的意译，含数字)，包括下划线，如[\w]匹配"$5.98"中的5，等于[a-zA-Z0-9] 
\W 匹配一个不可以组成单词的字符，如[\W]匹配"$5.98"中的$，等于[^a-zA-Z0-9]
```
 
### js延迟加载
- 同步
```JavaScript
< script src="file.js"> < /script >
```
同步模式，又称阻塞模式，会阻止浏览器的后续处理，停止后续的解析，只有当当前加载完成，才能进行下一步操作。所以默认同步执行才是安全的。但这样如果js中有输出document内容、修改dom、重定向等行为，就会造成页面堵塞。所以一般建议把< script >标签放在< body >结尾处，这样尽可能减少页面阻塞。

- 异步
1. 在window.onload事件中创建script标签插入到body后
2. script标签添加defer或async（HTML5）属性
    - defer: 浏览器会并行下载 file.js和其它有 defer 属性的script，而不会阻塞页面后续处理。**注**：所有的defer脚本保证是按顺序依次执行的。
    - async: async属性是HTML5新增的。作用和defer类似，但是它将在下载后尽快执行，不能保证脚本会按顺序执行。它们将在onload 事件之前完成。

```
<script src="file.js" defer> </script>
<script src="file.js" async> </script>
```

### innerHtml outerHtml document.write
- innerHtml: DOM节点的子节点不包含本身
- outerHtml: DOM节点的子节点包含本身
- doucument.write: 向文档添加HTML表达式，插入尾部

### 浏览器的距离和大小 如 clientHeight scrollTop

### CMD，AMD，CommonJs，ES6-module
1. commomjs
[commonjs](https://www.cnblogs.com/littlebirdlbw/p/5670633.html)
- 主要运用在***服务端***，如node
- 全局对象: global
- 一个文件就是一个模块，拥有单独的作用域:
    - 所有代码都运行在模块作用域，不会污染全局作用域；模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果；模块的加载顺序，按照代码的出现顺序是同步加载的
- 普通方式定义的变量、函数、对象都属于该模块内；
- 通过require来加载模块；
    - require（同步加载）基本功能：读取并执行一个JS文件，然后返回该模块的exports对象，如果没有发现指定模块会报错
- 通过exports和modul.exports来暴露模块中的内容
    - 模块内的exports：为了方便，node为每个模块提供一个exports变量，其指向module.exports，相当于在模块头部加了这句话：var exports = module.exports，在对外输出时，可以给exports对象添加方法
2. AMD：（requireJS）
- 异步模块定义是为***浏览器环境***设计的，AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行
- 用require.config()指定引用路径等，用define()定义模块，用require()加载模块

```JavaScript
// 定义独立模块
define(function() {
    ...
    return { ... }
})
// 定义含有依赖module1, module2的模块, m1,m2就是依赖的模块返回的接口
define(['module1', 'module2']， function(m1, m2) {
  ...
  return { ... }
})
// 加载
```

3. CMD
- 一个模块就是一个文件
- 对于依赖的模块AMD是提前执行或延迟执行，CMD是延迟执行
- CMD推崇依赖就近，在定义模块的时候就要声明其依赖的模块；AMD推崇依赖前置，只有在用到某个模块的时候再去require

```JavaScript
// define define(id?, deps?, factory) 字符串 id 表示模块标识，数组 deps 是模块依赖。：

define('hello', ['jquery'], function(require, exports, module) {
    // 模块内可以按需加载
    var a = require("a")
    ...
});
```

4. ES6-module
- 模块自动运行在严格模式下
- 在模块的顶级作用域创建的变量，不会被自动添加到共享的全局作用域，它们只会在模- 块顶级作用域的内部存在；
- 模块顶级作用域的 this 值为 undefined
- 对于需要让模块外部代码访问的内容，模块必须导出它们
- 使用export关键字将任意变量、函数或者类公开给其他模块
- 使用import导入模块

```JavaScript
export const a = 1;
export function() {}
// 默认导出
export default a;
// 重命名 as
export {aa as a};

import m from 'm'
import {a} from 'm'
// 重命名
import {aa as a} from 'm'
// 将m中的所有导出挂在对象example上的属性
import * as example from 'm'

```

### 深拷贝和浅拷贝

&emsp;&emsp;
简单来说，就是在拷贝复杂类型时，浅拷贝复制的是引用地址，深拷贝是拷贝一份新的属性。

&emsp;&emsp;
最简单的深拷贝就是

```javascript
JSON.parse(JSON.stringify())
```
&emsp;&emsp;
虽然简单，但是有一些缺陷：
- 对象的属性值是函数时，无法拷贝
- 原型链上的属性无法拷贝
- 不能正确的处理 Date 类型的数据
- 不能处理 RegExp
- 会忽略 symbol
- 会忽略 undefined

&emsp;&emsp;
下面是一个深拷贝的实现函数
```
 deepClone: function(obj, hash = new WeakMap()) {
    // 递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== "object") return obj; // 简单类型
    
    if (hash.has(obj)) return hash.get(obj); // 循环引用
    
    let instance = new obj.constructor();
    hash.set(obj, instance);
    
    for (let key in instance) { no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        this.deepClone(obj[key], hash);
      }
    }
  },
```


### js函数防抖和节流

&emsp;&emsp;
防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。
[防抖节流](https://www.cnblogs.com/chenqf/p/7986725.html)

- 函数防抖: debounce
    - 定义：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行。
    - 原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。
- 函数节流: throttle
    - 定义：触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。
    - 原理：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。
- 简单实现:

```javaScript
/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
function debounce(method,delay) {
    let timer = null;
    return function () {
        let self = this,
            args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            method.apply(self,args);
        },delay);
    }
}

/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件
 */
function throttle(method, mustRunDelay) {
    let timer,
        args = arguments,
        start;
    return function loop() {
        let self = this;
        let now = Date.now();
        if(!start){
            start = now;
        }
        if(timer){
            clearTimeout(timer);
        }
        if(now - start >= mustRunDelay){
            method.apply(self, args);
            start = now;
        }else {
            timer = setTimeout(function () {
                loop.apply(self, args);
            }, 50);
        }
    }
}
```


### 常见算法
- 去重
    - 使用 new Set(array[])
    - 使用 对象，Set和Map进行hash

```javascript
function unique(arr， key) {
    let map = new Map()
    return arr.filter((a) => !map.has(a[key]) && map.set(a[key], 1))
}
function unique(arr， key) {
    let map = new Set()
    return arr.filter((a) => !set.has(a[key]) && set.add(a[key]))
}
```

### 排序
Array.prototype.sort 原地算法 具体算法不知

### 字符统计
hash

## css
### position
- absolute
    - 脱离文档流，通过 top,bottom,left,right 定位。选取其最近一个最有定位设置的父级对象进行绝对定位，如果对象的父级没有设置定位属性，absolute元素将以body坐标原点进行定位，可以通过z-index进行层次分级。
- fixed
    - 生成固定定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行定位。
- relative
    - 对象不可层叠、不脱离文档流。生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
- static
    - 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。 
- sticky
    - 粘性定位，该定位基于用户滚动的位置。它的行为就像 position:relative;而当页面滚动超出目标区域时，它的表现就像position:fixed;，它会固定在目标位置。**注意**: Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari需要使用 -webkit-
- inherit
    - 从父元素继承 position 属性的值
- initial
    - 设置该属性为默认值

### display
- none: 不占空间，也不显示

- inline:
    - 设置行内元素
    - width, heigth, margin-top, margin-bottom, text-align等属性无效
    - 两个inline元素如果没有写在同一行,因为div换行空白，中间会有间隔
    
``` html
<div class="box">
    <div class="inline">inline</div>
    <div class="inline">inline</div>
</div>
```

- inherit: 从父元素继承
- list-item:
    - 元素会作为列表显示。类似li
    - 父元素需要设置padding，因为默认的列表之前的 · 在容器外面
- block：设置元素为块级元素，独占一行
    - inline-block：既具有block的宽高特性又具有inline的同行元素特性 
- flex
    - flex是一种弹性布局属性
    - 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
    - inline-flex: 内敛flex
- table：
    - 元素会作为块级表格来显示（类似table）
    - inline-table: 内联表格
    - table-row-group: 此元素会作为一个或多个行的分组来显示（类似 <tbody>）。
    - table-header-group: 此元素会作为一个或多个行的分组来显示（类似 <thead>）。
    - table-footer-group: 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。
    - table-row: 此元素会作为一个表格行显示（类似 <tr>）。
    - table-column-group: 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。
    - table-column: 此元素会作为一个单元格列显示（类似 <col>）
    - table-cell: 此元素会作为一个表格单元格显示（类似 <td> 和 <th>）
    - table-caption: 此元素会作为一个表格标题显示（类似 <caption>）

### flex
&emsp;&emsp;
Flex 布局，可以简便、完整、响应式地实现各种页面布局。

&emsp;&emsp;
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
![image](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

&emsp;&emsp;
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。

&emsp;&emsp;
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。


**容器的属性：**

- flex-direction属性：决定主轴（水平轴）的方向（即项目的排列方向）。
    - row（默认）: 水平排列，起点在左边
    - row-reverse: 水平排列，起点在右边
    - column: 垂直排列，起点在上方
    - column-reverse: 垂直排列，起点在底部
- flex-wrap属性：定义，如果一条轴线排不下，如何换行
    - nowrap（默认）: 不换行
    - wrap: 换行，第一行在顶部
    - wrap-reverse: 换行，第一行在底部
     
- flex-flow属性: flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
- justify-content属性：定义了项目在主轴上的对齐方式
    - flex-start（默认）: 往主轴开始的方向对齐
    - flex-end: 往主轴结束的方向对齐
    - center: 居中
    - space-between:两端对齐，项目之间的间隔都相等
    - space-around: 每个项目两侧的间隔相等
- align-items属性: 定义项目在交叉轴（竖直轴）上如何对齐
    - flex-start：交叉轴的起点对齐。
    - flex-end：交叉轴的终点对齐。
    - center：交叉轴的中点对齐。
    - baseline: 项目的第一行文字的基线对齐。
    - stretch（默认）：如果项目未设置高度或设为auto，将占满整个容器的高度。
- align-content属性定义了多根**轴线**的对齐方式。如果项目只有一根轴线，该属性不起作用
    - flex-start：与交叉轴的起点对齐
    - flex-end：与交叉轴的终点对齐
    - center：与交叉轴的中点对齐
    - space-between：与交叉轴两端对齐，轴线之间的间隔平均分布
    - space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍
    - stretch（默认值）：轴线占满整个交叉轴
    
- 项目的属性
    - order属性: <number> 定义项目的排列顺序。数值越小，排列越靠前，默认为0，可以取负值。
    - flex-grow属性: <number> 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。负值无效。
    - flex-shrink属性: <number> 定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。负值无效。
    - flex-basis属性: <length> | auto 定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
    - flex属性: flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
        - 两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
        - 建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
    - align-self属性允许单个项目有与其他项目不一样的对齐方式，*可覆盖align-items属性*。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch 

### tranform

&emsp;&emsp;
transform 属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行旋转、缩放、移动或倾斜。

常用
- translate ['', x, y, z, 3d]: 移动
- scale ['', x, y, z, 3d]: 缩放
- rotate ['', x, y, z, 3d]: 旋转
- perspective(n): 为 3D 转换元素定义透视视图

### transition 过渡

&emsp;&emsp;
transition: all 0 ease 0 , 是一个简写属性，用于设置四个过渡属性：
- transition-property: 规定设置过渡效果的 CSS 属性的名称
- transition-duration: 规定完成过渡效果需要多少秒或毫秒
- transition-timing-function: 规定速度效果的速度曲线
- transition-delay: 定义过渡效果何时开始

js函数：
ontransitionstart, ontransitionend

### animation 和 keyframes动画

&emsp;&emsp;
animation:	none 0 ease 0 1 normal
- animation-name: 规定需要绑定到选择器的 keyframe 名称。。
- animation-duration: 规定完成动画所花费的时间，以秒或毫秒计。
- animation-timing-function: 规定动画的速度曲线。
- animation-delay: 规定在动画开始之前的延迟。
- animation-iteration-count: 规定动画应该播放的次数。
- animation-direction: 规定是否应该轮流反向播放动画。

&emsp;&emsp;
@keyframes animation-name {keyframes-selector {css-styles;}}
- animationname: 必需的,定义animation的名称。
- keyframes-selector: 必需的,动画持续时间的百分比。
合法值：0-100% ; from (和0%相同) ; to (和100%相同)
注意： 您可以用一个动画keyframes-selectors。
- css-styles	必需的。一个或多个合法的CSS样式属性

```css
@keyframes mymove
{
    0%   {top:0px;}
    50%  {top:100px;}
    100% {top:0px;}
}

```


其他：

animation-fill-mode：

- none: 不改变默认行为。
- forwards: 当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
- backwards: 在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。
- both: 向前和向后填充模式都被应用。

js函数
onanimationend, onadimationstart等

### css单位
- %：
    - margin,padding是相对父元素的宽度计算的
    - top,left,bottom,right是相对于父元素的高度计算的
    - translate是相对自身元素来算的
- px：像素点
- em：1em等于当前元素的font-size(浏览器默认16px，可继承，em可以省略)
- rem：1rem等于html元素的font-size
- vw,vh：视口宽度被均分成100vw,视口高度被均分成100vh。视口宽高是页面的可视区域，如键盘弹起安卓的视口宽高发生变化，但iPhone不会。（安卓4.4，iOS6以上支持）
- vmax, vmin：
    - vmax = max(vw,vh)（vmax安卓4.4，iOS8以上支持）
    - vmin = min(vw,vh)（vmin安卓4.4，iOS6以上支持）

### 浮动 todo
- 使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。而对于使用absolute positioning脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它。

### 清楚浮动
浮动的元素不会撑开父容器的内容

```css
/* 清除浮动 */
.clear-f::after {
  display: block;
  height: 0;
  content: '';
  clear: both;
}
```

### 居中

### 一像素边框

```css
border-1px {
  position: relative;
}
.border-1px::after {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  transform-origin: center top;
  -webkit-transform-origin: center top;
  border-top: 1px solid #E6E6E6;
  width: 100%;
  height: 200%;
  transform: scaleY(0.5);
  -webkit-transform: scaleY(0.5);
}
```


### 常见兼容性
- 浏览器前缀

前缀 | 浏览器
---|---
-webkit- | chrome, safari
-moz- | firefox
-ms- | IE
-o- | opera

### 盒子模型 和 box-sizing

&emsp;&emsp;
一个盒子模型可分成margin(外边距), border(边框), padding(内边距), content(内容)， 四部分组成。

&emsp;&emsp;
盒子模型分为标准盒子模型和IE盒子模型。区别是: 
- 标准盒子模型中，width 和 height 指的是***内容区域的宽度和高度***。增加内边距、边框和外边距不会影响内容区域的尺寸，但是会增加元素框的总尺寸。
- IE盒子模型中，width 和 height 指的是***内容区域+padding+border***的宽度和高度。
- box-sizing: content-box|border-box|inherit;
    - content-box: 使用标准盒子模型
    - border-box: 使用IE盒子模型



### BFC
块级格式化上下文 (Block Fromatting Context)

&emsp;&emsp;
为了便于理解，我们换一种方式来重新定义BFC。一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可：
- body元素：符合下面条件
- float的值不是none。
- position的值不是static或者relative。
- display的值是inline-block、table-cell、flex、table-caption或者inline-flex
- overflow的值不是visible

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

### 特性
- 内部的Box会在垂直方向，一个接一个地放置。
- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠 （***margin坍塌***）
- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC的区域不会与float box重叠。
- - 计算BFC的高度时，浮动元素也参与计算
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
）

```html
<!-- body, container是一个BFC -->
<div class="container">
    <div class="aside">BFC</div>
    <div class="main">no - BFC</div>
</div>

<!-- 将container用一个BFC包裹 那么两个container就不会产生margin坍塌的问题 -->
<div class="over-hide">
    <div class="container">
        解决margin坍塌
    </div>
</div>
```

### FOUC 无样式内容闪烁
如果加载样式方法不当或是位置不对，如把样式放在底部。IE和FireFox的渲染逻辑是解析HTML就会直接画到页面上，这时你会看到没有样式的内容，CSS再通过不断的解析将页面重绘一遍，也就是闪烁一下突然展现样式，这就是FOUC。

### 选择器
[css选择器](http://www.w3school.com.cn/cssref/css_selectors.asp)
### css优先级
权重越高，优先级越高；同一权重内，!import优先级最高；
:not 不参与优先级计算
- 内联样式: 1000
- id选择器: 100
- class选择器,属性选择器，伪元素等:10
- 标签选择器: 1


### css3 属性和选择器
- 属性选择器（添加类似正则）[attr^=, attr$=, attr*=] 开头，结尾，包含
- 状态伪类：（:enabled, :disabled, :checked）
- 结构: (first, last, nth, only等) - (child, of-type)

### link和@import

### <img> 和 background-image
- img是一个标签元素，一个可操作的DOM对象；back-img是css的一个样式，不可操作
- img作为网页结构（内容）的一部分，是在加载结构的过程中加载；而back-img是等到结构加载完成（网页的内容全部显示以后）才开始加载
- 按照浏览器解析机制，html标签优先解析。css文件会放在head加载，但是这并不意味着它会立即执行，而是在html加载完后才执行的。
- 重要的需要优先加载的或是作为页面结构的图片最好采用img。不重要的图片最好采用background。

## html
### html语义化
- 语义化：用合理、正确的标签来展示内容，比如h1~h6定义标题。
- 优点：
    - 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
    - 有利于SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
    - 方便其他设备解析，如盲人阅读器根据语义渲染网页
    - 有利于开发和维护，语义化更具可读性，代码更好维护，与CSS3关系更和谐。
- HTML5语义化标签：article nav（导航） aside section（节，段） header footer address等

### canvas
### shadow-dom (不急)
### 块级元素，行内元素，空元素（自闭和）
- 块级元素
    - 特征：
    - 常见：a、b、span、img、input、strong、select、label、em、button、textare
- 行内元素：
    - 特征：
    - 常见：
- 空元素：
    - 特征：
    - 常见：

### html5
新元素 article， nav, footer, header
完全支持 CSS3
Video 和 Audio
2D/3D 制图，canvas,svg
本地存储
本地 SQL 数据
删除旧元素 frame, frameset center等

### css hack

&emsp;&emsp;
由于不同厂商的流览器或某浏览器的不同版本（如IE6-IE11,Firefox/Safari/Opera/Chrome等），对CSS的支持、解析不一样，导致在不同浏览器的环境中呈现出不一致的页面展现效果。这时，我们为了获得统一的页面效果，就需要针对不同的浏览器或不同版本写特定的CSS样式，我们把这个针对不同的浏览器/不同版本写相应的CSS code的过程，叫做CSS hack!

&emsp;&emsp;
CSS Hack大致有3种表现形式，CSS属性前缀法、选择器前缀法以及IE条件注释法（即HTML头部引用if IE）Hack，实际项目中CSS Hack大部分是针对IE浏览器不同版本之间的表现差异而引入的。

### src与href

- href

&emsp;&emsp;
href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系
若在文档中添加href ，浏览器会识别该文档为 CSS 文件，就会并行下载资源并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。


- src

&emsp;&emsp;
src表示引用资源，替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。
当浏览器解析到src ，会暂停其他资源的下载和处理（图片不会暂停其他资源下载），直到将该资源加载、编译、执行完毕，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

### meta
<meta> 标签提供了 HTML 文档的元数据
- <meta> 标签通常位于 <head> 区域内。
- 元数据通常以 名称/值 对出现。
- 如果没有提供 name 属性，那么名称/值对中的名称会采用 http-equiv 属性的值。

&emsp;&emsp;
***<meta name='viewport'>***
[viewport](https://www.runoob.com/w3cnote/viewport-deep-understanding.html)
- Why? :
    - 通俗的讲，移动设备上的viewport就是设备的屏幕上能用来显示我们的网页的那一块区域，但viewport又不局限于浏览器可视区域的大小，。在默认情况下，一般来讲，移动设备上的viewport都是要大于浏览器可视区域的，但带来的后果就是浏览器会出现横向滚动条。 
    - 在移动设备中，因为 分辨率 和 用户缩放 的原因，css中的1px并不完全等于设备的1px。大部分情况下可以使用 window.devicePixelRatio = 设备的物理像素 / 设备独立像素 检测比率
- How? :
    - <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"> 
    - width: 设置layout viewport的宽度，为一个正整数，或字符串"width-device"
    - initial-scale: 设置页面的初始缩放值，为一个数字，可以带小数
    - minimum-scale: 	允许用户的最小缩放值，为一个数字，可以带小数
    - maximum-scale: 	允许用户的最大缩放值，为一个数字，可以带小数
    - height: 设置layout viewport  的高度，这个属性对我们并不重要，很少使用
    - user-scalable: 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes代表允许	
    
### 图片懒加载
https://segmentfault.com/a/1190000010744417
http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
【https://caniuse.com/#search=IntersectionObserver】
IntersectionObserver，ios12后才支持

## 移动端H5
### click的300ms延迟

&emsp;&emsp;场景：移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。

方案: 
- css touch-action: touch-action的默为 auto，将其置为 none 即可移除目标元素的 300 毫秒延迟, 缺点: 新属性，可能存在浏览器兼容问题
- tap事件: zepto的tap事件, 利用touchstart和touchend来模拟click事件, 缺点: 点击穿透
- fastclick: 在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后真正的click事件阻止掉, 缺点: 脚本相对较大


## 浏览器

### URI 和 URL
- URI： Universal Resource Identifier 统一资源标志符，用来标识抽象或物理资源的一个紧凑字符串。 
- URL： Universal Resource Locator 统一资源定位符，一种定位资源的主要访问机制的字符串，一个标准的URL必须包括：protocol、host、port、path、parameter、anchor。
- URN： Universal Resource Name 统一资源名称，通过特定命名空间中的唯一名称或ID来标识资源。
- url就像地址，urn就像名字，快递员需要知道你的地址和名字才能送出快递
- URI可以进一步分为URL和URN

### cookie, session, localStorage, sessionStorage
- 存储地方：
    - session存储在服务端，其他都存储在浏览器端
- 存储大小： 
    - cookie一般为4kb，数量不超过20个
    - session大小一般没有限制
    - localStorage和sessionStorage一般都是5MB
- 存储内容：
    - cookie: key=value
    - session: session对象
    - localStorage和sessionStorage: 字符串
- 存储周期：
    - cookie: 1会话cookie，不设置过期时间，浏览器关闭即消失，存储在内存。 2正常的cookie，设置过期时间，过期后删除，存储在硬盘
    - session: 一段时间内有效，每次访问session都会是该段时间重置，关机或重启都会是session失效
    - localStorage: 除非手动删除，否则一直存在
    - sessionStorage: 仅在当前会话下有效，关闭浏览器或是页面后被清除
- 相互关系cookie-session:
    - cookie一般会存放session id 
- 相互关系localStorage，sessionStorage
    - 继承于Storage 

- indexDB： 相当于浏览器上的一个数据库

### 网页的三个层次
- 网页的结构层：由HTML或XHTML之类的标记语言负责创建。
- 网页的表示层：由CSS负责创建。
- 网页的行为层：负责回答“内容应该如何对事件做出反应”这一问题。这是 Javascript 语言和 DOM 主宰的领域。

### 输入网址的过程
1. 域名解析: [域名解析，DNS](https://www.cnblogs.com/MarcoHan/p/5295398.html)
2. 发起TCP的3次握手
3. 建立TCP连接后发起http请求
4. 服务器响应http请求，浏览器得到html代码
5. 浏览器解析html代码，并请求html代码中的资源（如js、css、图片等）
6. 浏览器对页面进行渲染呈现给用户

### HTML渲染过程
- 基本过程
1. HTML代码转化成DOM
2. CSS代码转化成CSSOM（CSS Object Model）
3. 结合DOM和CSSOM，生成一棵渲染树（包含每个节点的视觉信息）
4. 生成布局（layout），即将所有渲染树的所有节点进行平面合成
5. 将布局绘制（paint）在屏幕上

- 重排就是重新生成布局（4）
- 重绘就是重新绘制（5）
- 第4和5步合称渲染，也是最耗时的。所以要减少重排和重绘

### 浏览器缓存

- 缓存控制：优先级 Pragma -> Cache-Control -> Expires
    - Pragma旧版本，逐渐舍弃
    - Cache-Control的max-age或覆盖Expires的时间
    - 更改文件名，肯定会重新请求
- 配置
    - 服务器，Tomcat， Nginx等
    - HTTP头
    - HTML，meta标签 - http-equiv
- 缓存校验

&emsp;&emsp;
在缓存中，我们需要一个机制来验证缓存是否有效。比如服务器的资源更新了，客户端需要及时刷新缓存；又或者客户端的资源过了有效期，但服务器上的资源还是旧的，此时并不需要重新发送。缓存校验就是用来解决这些问题的，在http 1.1 中，我们主要关注下Last-Modified 和 etag 这两个字段。


```
Last-Modified
服务端在返回资源时，会将该资源的最后更改时间通过Last-Modified字段返回给客户端。客户端下次请求时通过If-Modified-Since或者If-Unmodified-Since带上Last-Modified，服务端检查该时间是否与服务器的最后修改时间一致：如果一致，则返回304状态码，不返回资源；如果不一致则返回200和修改后的资源，并带上新的时间。

If-Modified-Since和If-Unmodified-Since的区别是：
If-Modified-Since：告诉服务器如果时间一致，返回状态码304
If-Unmodified-Since：告诉服务器如果时间不一致，返回状态码412

ETag
单纯的以修改时间来判断还是有缺陷，比如文件的最后修改时间变了，但内容没变。对于这样的情况，我们可以使用etag来处理。
etag的方式是这样：服务器通过某个算法对资源进行计算，取得一串值(类似于文件的md5值)，之后将该值通过etag返回给客户端，客户端下次请求时通过If-None-Match或If-Match带上该值，服务器对该值进行对比校验：如果一致则不要返回资源。
If-None-Match和If-Match的区别是：
If-None-Match：告诉服务器如果一致，返回状态码304，不一致则返回资源
If-Match：告诉服务器如果不一致，返回状态码412
```

- cache-control
    - 符合缓存策略时，服务器不会发送新的资源，但不是说客户端和服务器就没有会话了，客户端还是会发请求到服务器的。
    - Cache-Control除了在响应中使用，在请求中也可以使用。我们用开发者工具来模拟下请求时带上Cache-Control：勾选Disable cache，刷新页面，可以看到Request Headers中有个字段Cache-Control: no-cache。


### Reflow和Repaint

- Reflow

&emsp;&emsp;
当涉及到DOM节点的布局属性发生变化时，就会重新计算该属性，浏览器会重新描绘相应的元素，此过程叫Reflow（回流或重排）。

- Repaint

&emsp;&emsp;
当影响DOM元素可见性的属性发生变化 (如 color) 时, 浏览器会重新描绘相应的元素, 此过程称为Repaint（重绘）。因此重排必然会引起重绘。


*引起Repaint和Reflow的一些操作：*

- 调整窗口大小
- 字体大小
- 样式表变动
- 元素内容变化，尤其是输入控件
- CSS伪类激活，在用户交互过程中发生
- DOM操作，DOM元素增删、修改
- width, clientWidth, scrollTop等布局宽高的计算


*给出下面几条建议：*

- 避免逐条更改样式。建议集中修改样式，例如操作className。
- 避免频繁操作DOM。创建一个documentFragment或div，在它上面应用所有DOM操作，最后添加到文档里。设置display:none的元素上操作，最后显示出来。
- 避免频繁读取元素几何属性（例如scrollTop）。绝对定位具有复杂动画的元素。
- 绝对定位使它脱离文档流，避免引起父元素及后续元素大量的回流


### 性能优化
- 压缩精简html（包括DOM的数量）,css和js
- 使用外部css和js，css写在头部，js写在底部
- 合并css文件和js文件
- 避免使用css表达式
- 使用css sprite 雪碧图
- 在不影响画质的情况下，使用合理的图片格式和压缩图片，优先使用JPG格式，如果能用css3实现动画，则尽量不使用GIF。如果能使用canvas或SVG实现，则尽量不使用图片
- 图片（小图）优先使用base64，减少请求次数。
- 使用CDN分发网络
- 启用缓存
- 减少HTTP请求次数，减少DNS查询次数（尽量减少主机名），避免重定向
- DNS预获取 link标签 ref='dns-prefetch' herf=''
- 使AJAX可缓存：get请求可在客户端缓存；post请求不能再客户端缓存，但是服务端可以缓存数据，提供请求速度。
- 使用小且可缓存的favicon.ico: 网站文件favicon.ico不管服务器有没有，都会去尝试请求这个图标，这个图片的要求
- 避免空的src
- 避免重排和重绘: 减少DOM操作，合并DOM的读写操作,使用虚拟DOM的思想
- 使用特殊的函数，优化条件渲染：window.requestAnimationFrame()， window.requestIdleCallback()

### 用户体验
- FLIP（First, Last, Invert, Play）。
FLIP技术可以以一种高性能的方式来动态的改变DOM元素的位置和尺寸，而不需要管它的布局是如何计算或渲染的（比如，height、width、float、绝对定位、Flexbox和Grid等）
尽量的使用transform来模拟布局变化
- 假设由A变到B
1. F: 记住A的位置信息
2. L: 记住B的位置信息（点击变成A）
3. I: 变回A
4. P: 执行A-B的布局变化动画

### BOM和DOM
- BOM: 浏览器对象模型
    - window：表示浏览器窗口和全局对象
    - navigator：对象包含有关访问者浏览器的信息
    - screen：对象包含有关用户屏幕的信息
    - history：对象包含浏览器的历史
    - location：对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
- DOM：文档对象模型 

### 渐进增强和优雅降级
- 渐进增强：
    - 针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

- 优雅降级：
    - 一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

### http状态码
1. 信息
- 100 Continue: 继续, 客户端应继续其请求
- 101 Switching Protocols: 切换协议
- 102 Processing: 处理将被继续执行
2. 成功
- 200 OK: 请求成功
- 201 Created: 请求已经被实现
- 202 Accepted: 服务器已接受请求，但尚未处理
- 204 No Content: 服务器成功处理，但未返回内容
3. 重定向
- 300 Multiple Choices: 被请求的资源有一系列可供选择的回馈信息， 用户或浏览器能够自行选择一个首选的地址进行重定向。
- 301 Moved Permanently: 被请求的资源已永久移动到新位置
- 302 Move temporarily: 请求的资源临时从不同的 URI响应请求
- 303 See Other: 对应当前请求的响应可以在另一个 URI 上被找到，而且客户端应当采用 GET 的方式访问那个资源
- 304 Not Modified: 所请求的资源未修改，服务器返回此状态码时，不会返回任何资源
- 305 Use Proxy: 被请求的资源必须通过指定的代理才能被访问
- 307 Temporary Redirect: 请求的资源临时从不同的URI 响应请求
4. 客户端错误
- 400 Bad Request: 语义有误，当前请求无法被服务器理解 | 请求参数有误
- 401 Unauthorized: 当前请求需要用户验证
- 403 Forbidden: 服务器已经理解请求，但是拒绝执行它
- 404 Not Found: 请求失败，请求所希望得到的资源未被在服务器上发现
- 405 Method Not Allowed: 请求行中指定的请求方法不能被用于请求相应的资源
- 408 Request Timeout: 请求超时
- 409 Conflict: 由于和被请求的资源的当前状态之间存在冲突，请求无法完成
- 410 Gone: 被请求的资源在服务器上已经不再可用，而且没有任何已知的转发地址
- 413 Request Entity Too Large: 服务器拒绝处理当前请求，因为该请求提交的实体数据大小超过了服务器愿意或者能够处理的范围
- 414 Request-URI Too Long: 请求的URI 长度超过了服务器能够解释的长度，因此服务器拒绝对该请求提供服务
- 415 Unsupported Media Type: 对于当前请求的方法和所请求的资源，请求中提交的实体并不是服务器中所支持的格式，因此请求被拒绝
5. 服务端错误
- 500 Internal Server Error: 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理
- 501 Not Implemented: 服务器不支持当前请求所需要的某个功能
- 502 Bad Gateway: 作为网关或者代理工作的服务器尝试执行请求时，从上游服务器接收到无效的响应
- 503 Service Unavailable: 由于临时的服务器维护或者过载，服务器当前无法处理请求
- 504 Gateway Timeout: 作为网关或者代理工作的服务器尝试执行请求时，未能及时从上游服务器（URI标识出的服务器，例如HTTP、FTP、LDAP）或者辅助服务器（例如DNS）收到响应
- 505 HTTP Version Not Supported: 服务器不支持，或者拒绝支持在请求中使用的 HTTP 版本

### 常见浏览器的内核 与 js引擎（一般不问）
- IE： 
    - 内核：Trident [ˈtraɪdnt]
    - js引擎：Chakra(查克拉)
- Chrome：
    - 内核： Blink
    - js引擎：V8 
- Safari：
    - 内核： WebKit
    - js引擎：SquirrelFish [ˈskwɪrəl fɪʃ]
- Firefox：
    - 内核：Gecko
    - js引擎：JagerMonkey
- Opera：
    - 内核：Blink
    - js引擎：Carakan
- 360浏览器：IE + Chrome
- QQ浏览器，百度浏览器，搜狗浏览器：IE + Webkit


### SEO，SEM
- SEM: 包括付费推广与SEO
- SEO: 搜索引擎优化
    - TKD: (title, keywords, description)
    - html语义化标签，meta信息，图片Alt信息
    - 网页加载速度，代码质量
    - 页面内容符合关键字，符合标题，内容有规律的更新
    - 合理使用robots.txt。 控制爬虫可以抓取，不可抓取那些内容
    - 去除死链接，错误链接，使用丰富的，高相关性，高质量的外链
    - 网页logo指向网站首页
    - 状态码40X，50X等展示的页面
    - 简洁合理有效的网站URL和参数
    - 添加网站地图，即网站的组织架构，网站地图一般存放在根目录下并命名为sitemap，你可以通过站长工具或者Robots文件向搜索引擎提交网站地图，加快搜索引擎的收录

### cdn加速原理
cdn：内容分化网络
参考：

https://yq.aliyun.com/articles/614866
https://baike.baidu.com/item/%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91%E7%BD%91%E7%BB%9C/4034265
https://baike.baidu.com/item/CDN%E6%8A%80%E6%9C%AF%E5%8E%9F%E7%90%86/6214374?fr=aladdin

简单理解为cache服务器和智能DNS（能自动选择Cache服务器）和DNS负载均衡

## 网络请求

### Ajax

### 跨域
- 跨域请求
    - jsonp：网页通过动态添加一个 script 元素，向服务器请求JSON数据，这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来
    - CROS： 设置允许请求的源，方法等。
    - websock：因为有了Origin（请求源）这个字段，所以WebSocket才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。
    - 对比：
    
```
jsonp
简单适用，老式浏览器全部支持，服务器改造非常小。但只支持get请求

cros
CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。但主要是服务器支持。支持所有类型的请求
```


### 请求方法
(http1.0)
- GET
- POST
- HEAD

(http1.1)
- PUT
- DELETE
- CONNECT
- OPTIONS
- TRACE

### 表单提交方式
- application/x-www-form-urlencoded: 默认的form表单提交形式，交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 会进行了 URL 转码
- multipart/form-data: 用表单上传文件时，就要让 form 的 enctype 等于这个值
- application/json
- text/xml
### websocket

## 代码规范

## node
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。

## jquery
### $(document).ready()方法和window.onload的区别
1.执行时间 
- window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。 
- $(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕。 

2.编写个数不同 
- window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个 
- $(document).ready()可以同时编写多个，并且都可以得到执行 

3.简化写法 
- window.onload没有简化写法
- $(document).ready(function(){})可以简写成$(function(){});

### jquery和原始js操作节点
### jQuery的事件委托方法bind 、live、delegate、on之间有什么区别？


## vue

### 组件化
组件就是将一段UI样式和其对应的功能作为独立的整体去看待。目的就是解耦和复用

### MVVM和MVC

**MVVM** - Model-View-ViewModel
MVVM 模式便是使用的是数据绑定基础架构
把Model用纯JavaScript对象表示，View负责显示，两者做到了最大限度的分离。

把Model和View关联起来的就是ViewModel。ViewModel负责把Model的数据同步到View显示出来，还负责把View的修改同步回Model。

### 双向绑定原理

&emsp;&emsp;
即数据变化更新视图，视图变化更新数据。（MVVM）
observer观察者， watcher订阅者，dep依赖，一堆订阅者
- 数据变化改变视图
    - 使用Object.defineProperty()劫持属性的getter和setter：
    - getter: 主要是依赖收集，依赖收集就是订阅数据变化的watcher的收集，存放在dep数组
    - setter: 主要是派发更新，当响应式数据发生变化，触发setter时，调用dep.notify()，遍历所有的watcher，调用他们的update方法更新视图
- 视图变化更新数据
    - 使用DOM元素监听事件，更新数据
    - 如输入框的input事件,下拉框的change事件，使得数据等于视图的值msg=$event.target.value


Dep 是一个类，用于依赖收集和派发更新，也就是存放watcher实例和触发watcher实例上的update。

Watcher 也是一个类，用于初始化 数据的watcher实例。它的原型上有一个 update 方法，用于派发更新。

### 生命周期

### vuex单向数据流 - 状态管理模式
![单向数据流](https://vuex.vuejs.org/flow.png)

- State (...mapState) : 数据源
- Getter (...mapGetters) : get操作劫持
- Mutation (...mapMutations) : 同步
- Action (...mapAction) : 异步
- Module: state模块化

### vue-router同步和异步组件

### vue-router三种模式
- hash: 监听onhashchange事件

```
当 一个窗口的 hash （URL 中 # 后面的部分）改变时就会触发 hashchange 事件（参见 location.hash）
```

- history: 监听popstate事件

- abstract：手动实现路由管理，用一个数组维护路由，并有go,replace等方法

### 模版编译
- 编译函数的创建：通过createCompilerCreator创建 createCompiler函数，返回compile函数，目的是柯里化，不同的环境使用不同的配置
- 编译主要分为三个步骤：
1. AST树构建：根据配置项将template编译成AST树
2. 优化：如果配置项中的optimize （英[ˈɒptɪmaɪz]）不为false，则对AST树进行优化，优化的内容是标记静态节点和静态根节点。 
3. codeGen：根据AST节点是否是slot，component，是否含有v-if，v-once等情况生成不同的模板字符串
4. 最后返回 用with包裹模板字符串的render函数和静态render函数


### nextTick
- Vue.nextTick是在执行render渲染后运行的，即在render渲染后的下一次tick（event loop最开始的时候执行）
- Vue.nextTikc的降级顺序（优先使用） Promise.then(microtask) , MutationObserver(microtask) ,  setImmediate(task) , setTimeout(fn, 0)(task)

### 虚拟 dom
- 操作DOM的代价仍旧是昂贵的，尤其是在频繁操作时，是非常非常消耗性能的，常常会出现页面卡死的情况。（频繁的重排和重绘）
- 虚拟DOM其实就是一种模拟DOM的JavaScript数据结构。

### diff 算法 （vue借鉴的SnabbDOM的diff算法）
- 完全比较两个树的复杂度是O(n^3), 而diff算法将树看成平面，时间复杂度O(n)
- 主要有两个特点:
    - 同级比较: 对于两颗DOM树，只会比较同一层级的节点，如果节点类型不同直接干掉旧的节点，而不是继续比较。
    - 就近复用: 如果节点类型相同就会对这个节点进行改造，而不是严格的比较各个属性书否相同

### spa 原理
- 单页面应用: 仅仅在web页面初始化时加载相应的HTML、JavaScript、CSS，一旦页面加载完成了，SPA不会因为用户的操作而进行页面的重新加载或跳转，而是利用 JavaScript 动态的变换HTML的内容，从而实现UI与用户的交互。
[实现spa](https://blog.csdn.net/qq_34629352/article/details/79837815)
- 方式一: window.history。 back(), forward(), go(), pushState(), replaceState()和 popState事件
- 方式二: window.location.hash。 hashchange事件

### vue VS react
- 同：
    - 虚拟DOM
    - 基于组件
- 异：
    - jsx和HTML
    - RN比weex更成熟
    - react社区更好，但更难学习

### 基本组件

## web安全
### XSS攻击全称跨站脚本攻击
- XSS根源就是没完全过滤客户端提交的数据
- 预防：
    - 使用HttpOnly的cookies
    - Java有个开源项目Anti-Samy
    - 输入输出检测
    - 字符实体转义

### CSRF跨站点请求伪造
- 攻击者盗用了你的身份，以你的名义发送恶意的请求

- 例子：
```
某电商网站A，你购买时候支付的操作是：http://www.market.com/Transfer.php?bankId=11&money=1000;
某危险网站B，他有段代码是 <img src=http://www.market.com/Transfer.php?bankId=11&money=1000>
```
你在访问A网站进行支付操作时，A网站保存了你的cookie信息，如果B网站拿到了你的cookie或者他伪造的数据刚好就是cookie里的，就能伪造你的请求，进行同样的支付操作。，那么银行卡就多扣了1000块钱

- 预防
    - 验证码(用户体验)
    - HTTP头 referer check（并非所有请求都有referer，比如 https 跳转http，页面第一次打开）
    - 参数加密。http://host/path/delete?username=md5(salt+abc) 缺点：数据分析困难，salt改变无法被用户收藏。
    - Anti sCSRF Token： 请求携带token，服务端校验

## scss

## webpack

## rollup

## browserify 简单了解

## anywhere 工具

## webview
Android系统中内置了一款高性能 webkit 内核浏览器,在 SDK 中封装为一个叫做 WebView 组件
IOS好像叫WKWebView

## 微信小程序
https://developers.weixin.qq.com/miniprogram/dev/component/ad.html

## 参考


> 40万 https://blog.csdn.net/wdlhao/article/details/79079660
> 大大全13万 https://blog.csdn.net/xm1037782843/article/details/80708533
> https://blog.csdn.net/FengyCoder/article/details/82841644
> https://blog.csdn.net/zhang6223284/article/details/82843437
> https://blog.csdn.net/liyingjie0317/article/details/80777023
> https://blog.csdn.net/weixin_39927080/article/details/79206320
