
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Red = /** @class */ (function () {
    function Red() {
    }
    Red.prototype.fill = function () {
        console.log('::: fill red :::');
    };
    return Red;
}());
var Green = /** @class */ (function () {
    function Green() {
    }
    Green.prototype.fill = function () {
        console.log('::: fill Green :::');
    };
    return Green;
}());
var Circle$3 = /** @class */ (function () {
    function Circle() {
    }
    Circle.prototype.say = function () {
        console.log('::: Circle :::');
    };
    return Circle;
}());
var Rectangle$2 = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.say = function () {
        console.log('::: Rectangle :::');
    };
    return Rectangle;
}());
var AbstractFactory = /** @class */ (function () {
    function AbstractFactory() {
    }
    return AbstractFactory;
}());
// 形状工厂
var ShapeFactory$2 = /** @class */ (function (_super) {
    __extends(ShapeFactory, _super);
    function ShapeFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeFactory.prototype.getShape = function (shapeType) {
        var shape;
        switch (shapeType) {
            case 'CIRCLE':
                shape = new Circle$3();
                break;
            case 'RECTANGLE':
                shape = new Rectangle$2();
                break;
            default:
                shape = null;
                break;
        }
        return shape;
    };
    ShapeFactory.prototype.getColor = function () {
        return null;
    };
    return ShapeFactory;
}(AbstractFactory));
// 颜色工厂
var colorFactory = /** @class */ (function (_super) {
    __extends(colorFactory, _super);
    function colorFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    colorFactory.prototype.getShape = function () {
        return null;
    };
    colorFactory.prototype.getColor = function (colorType) {
        var color;
        switch (colorType) {
            case 'RED':
                color = new Red();
                break;
            case 'GREEN':
                color = new Green();
                break;
            default:
                color = null;
                break;
        }
        return color;
    };
    return colorFactory;
}(AbstractFactory));
// 抽象工厂
var FactoryProducer = /** @class */ (function () {
    function FactoryProducer() {
    }
    FactoryProducer.prototype.getFactory = function (choice) {
        if (choice === 'SHAPE') {
            return new ShapeFactory$2();
        }
        else if (choice === 'COLOR') {
            return new colorFactory();
        }
        else {
            return null;
        }
    };
    return FactoryProducer;
}());
function run$m() {
    console.log('--- 抽象工厂模式 ---');
    var FP = new FactoryProducer();
    var sf = FP.getFactory('SHAPE');
    var cir = sf.getShape('CIRCLE');
    cir.say();
    var cf = FP.getFactory('COLOR');
    var red = cf.getColor('RED');
    red.fill();
    console.log('--- 抽象工厂模式 ---');
    console.log('');
}

/**
 * AdapterPattern 适配器模式
 * 适配器模式（Adapter Pattern）是作为两个不兼容的接口之间的桥梁。这种类型的设计模式属于结构型模式，它结合了两个独立接口的功能。这种模式涉及到一个单一的类，该类负责加入独立的或不兼容的接口功能。举个真实的例子，读卡器是作为内存卡和笔记本之间的适配器。您将内存卡插入读卡器，再将读卡器插入笔记本，这样就可以通过笔记本来读取内存卡。
 * 我们通过下面的实例来演示适配器模式的使用。其中，音频播放器设备只能播放 mp3 文件，通过使用一个更高级的音频播放器来播放 vlc 和 mp4 文件。
 * 意图：将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
 * 主要解决：主要解决在软件系统中，常常要将一些"现存的对象"放到新的环境中，而新环境要求的接口是现对象不能满足的。
 * 何时使用： 1、系统需要使用现有的类，而此类的接口不符合系统的需要。 2、想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的一些类，包括一些可能在将来引进的类一起工作，这些源类不一定有一致的接口。 3、通过接口转换，将一个类插入另一个类系中。（比如老虎和飞禽，现在多了一个飞虎，在不增加实体的需求下，增加一个适配器，在里面包容一个虎对象，实现飞的接口。）
 * 如何解决：继承或依赖（推荐）。
 * 关键代码：适配器继承或依赖已有的对象，实现想要的目标接口。
 * 应用实例： 1、美国电器 110V，中国 220V，就要有一个适配器将 110V 转化为 220V。 2、JAVA JDK 1.1 提供了 Enumeration 接口，而在 1.2 中提供了 Iterator 接口，想要使用 1.2 的 JDK，则要将以前系统的 Enumeration 接口转化为 Iterator 接口，这时就需要适配器模式。 3、在 LINUX 上运行 WINDOWS 程序。 4、JAVA 中的 jdbc。
 * 优点： 1、可以让任何两个没有关联的类一起运行。 2、提高了类的复用。 3、增加了类的透明度。 4、灵活性好。
 * 缺点： 1、过多地使用适配器，会让系统非常零乱，不易整体进行把握。比如，明明看到调用的是 A 接口，其实内部被适配成了 B 接口的实现，一个系统如果太多出现这种情况，无异于一场灾难。因此如果不是很有必要，可以不使用适配器，而是直接对系统进行重构。 2.由于 JAVA 至多继承一个类，所以至多只能适配一个适配者类，而且目标类必须是抽象类。
 * 使用场景：有动机地修改一个正常运行的系统的接口，这时应该考虑使用适配器模式。
 * 注意事项：适配器不是在详细设计时添加的，而是解决正在服役的项目的问题。
 */
var VlcPlayer = /** @class */ (function () {
    function VlcPlayer() {
    }
    VlcPlayer.prototype.playVlc = function (fileName) {
        console.log('Playing vlc file. Name: ' + fileName);
    };
    VlcPlayer.prototype.playMp4 = function (fileName) { };
    return VlcPlayer;
}());
var Mp4Player = /** @class */ (function () {
    function Mp4Player() {
    }
    Mp4Player.prototype.playVlc = function (fileName) { };
    Mp4Player.prototype.playMp4 = function (fileName) {
        console.log('Playing mp4 file. Name: ' + fileName);
    };
    return Mp4Player;
}());
// 实现了 MediaPlayer 接口的适配器类。
var MediaAdapter = /** @class */ (function () {
    function MediaAdapter(audioType) {
        if (audioType === 'vlc') {
            this.advancedMusicPlayer = new VlcPlayer();
        }
        else if (audioType === 'mp4') {
            this.advancedMusicPlayer = new Mp4Player();
        }
    }
    MediaAdapter.prototype.play = function (audioType, fileName) {
        if (audioType === 'vlc') {
            this.advancedMusicPlayer.playVlc(fileName);
        }
        else if (audioType === 'mp4') {
            this.advancedMusicPlayer.playMp4(fileName);
        }
    };
    return MediaAdapter;
}());
// 现了 MediaPlayer 接口的实体类。
var AudioPlayer = /** @class */ (function () {
    function AudioPlayer() {
    }
    AudioPlayer.prototype.play = function (audioType, fileName) {
        //播放 mp3 音乐文件的内置支持
        if (audioType === 'mp3') {
            console.log('Playing mp3 file. Name: ' + fileName);
        }
        else if (audioType === 'vlc' || audioType === 'mp4') {
            //mediaAdapter 提供了播放其他文件格式的支持
            this.mediaAdapter = new MediaAdapter(audioType);
            this.mediaAdapter.play(audioType, fileName);
        }
        else {
            console.log('Invalid media. ' + audioType + ' format not supported');
        }
    };
    return AudioPlayer;
}());
function run$l() {
    console.log('--- 适配器模式 ---');
    var audioPlayer = new AudioPlayer();
    audioPlayer.play('mp3', 'My Heart Will Go On.mp3');
    audioPlayer.play('mp4', 'Shape of My Heart.mp4');
    audioPlayer.play('vlc', 'I believe.vlc');
    audioPlayer.play('avi', 'See You Again.avi');
    console.log('--- 适配器模式 ---');
    console.log('');
}

/**
 * BridgePattern 桥接模式
 * 意图：将抽象部分与实现部分分离，使它们都可以独立的变化。
 * 主要解决：在有多种可能会变化的情况下，用继承会造成类爆炸问题，扩展起来不灵活。
 * 关键代码：抽象类依赖实现类。
 * 优点： 1、抽象和实现的分离。 2、优秀的扩展能力。 3、实现细节对客户透明。
 * 缺点：桥接模式的引入会增加系统的理解与设计难度，由于聚合关联关系建立在抽象层，要求开发者针对抽象进行设计与编程。
 * 使用场景： 1、如果一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性，避免在两个层次之间建立静态的继承联系，通过桥接模式可以使它们在抽象层建立一个关联关系。 2、对于那些不希望使用继承或因为多层次继承导致系统类的个数急剧增加的系统，桥接模式尤为适用。 3、一个类存在两个独立变化的维度，且这两个维度都需要进行扩展。
 * 注意事项：对于两个独立变化的维度，使用桥接模式再适合不过了
 */
var RedCircle = /** @class */ (function () {
    function RedCircle() {
    }
    RedCircle.prototype.drawCircle = function (radius, x, y) {
        console.log("Drawing Circle color: red, radius: ".concat(radius, ", x: ").concat(x, ", y: ").concat(y));
    };
    return RedCircle;
}());
var GreenCircle = /** @class */ (function () {
    function GreenCircle() {
    }
    GreenCircle.prototype.drawCircle = function (radius, x, y) {
        console.log("Drawing Circle color: green, radius: ".concat(radius, ", x: ").concat(x, ", y: ").concat(y));
    };
    return GreenCircle;
}());
var Shape = /** @class */ (function () {
    function Shape(drawAPI) {
        this.drawAPI = drawAPI;
    }
    return Shape;
}());
var Circle$2 = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, radius, drawAPI) {
        var _this = _super.call(this, drawAPI) || this;
        _this.x = x;
        _this.y = y;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.draw = function () {
        this.drawAPI.drawCircle(this.radius, this.x, this.y);
    };
    return Circle;
}(Shape));
function run$k() {
    console.log('--- 桥接模式 ---');
    var redCircle = new Circle$2(100, 100, 10, new RedCircle());
    var greenCircle = new Circle$2(100, 100, 10, new GreenCircle());
    redCircle.draw();
    greenCircle.draw();
    console.log('--- 桥接模式 ---');
    console.log('');
}

/**
 * BuilderPattern 建造者模式
 * 建造者模式（Builder Pattern）使用多个简单的对象一步一步构建成一个复杂的对象。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。一个 Builder 类会一步一步构造最终的对象。该 Builder 类是独立于其他对象的。
 * 意图：将一个复杂的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。
 * 主要解决：主要解决在软件系统中，有时候面临着"一个复杂对象"的创建工作，其通常由各个部分的子对象用一定的算法构成；由于需求的变化，这个复杂对象的各个部分经常面临着剧烈的变化，但是将它们组合在一起的算法却相对稳定。
 * 关键代码：建造者：创建和提供实例，导演：管理建造出来的实例的依赖关系。
 * 应用实例： 1、去肯德基，汉堡、可乐、薯条、炸鸡翅等是不变的，而其组合是经常变化的，生成出所谓的"套餐"。 2、JAVA 中的 StringBuilder。
 * 优点： 1、建造者独立，易扩展。 2、便于控制细节风险。
 * 缺点： 1、产品必须有共同点，范围有限制。 2、如内部变化复杂，会有很多的建造类。
 * 使用场景： 1、需要生成的对象具有复杂的内部结构。 2、需要生成的对象内部属性本身相互依赖。
 * 注意事项：与工厂模式的区别是：建造者模式更加关注与零件装配的顺序。
 */
var Burger = /** @class */ (function () {
    function Burger() {
    }
    Burger.prototype.name = function () {
        return 'Burger';
    };
    Burger.prototype.price = function () {
        return 12;
    };
    return Burger;
}());
var Drink = /** @class */ (function () {
    function Drink() {
    }
    Drink.prototype.name = function () {
        return 'Drink';
    };
    Drink.prototype.price = function () {
        return 6;
    };
    return Drink;
}());
var Chicken = /** @class */ (function () {
    function Chicken() {
    }
    Chicken.prototype.name = function () {
        return 'Chicken';
    };
    Chicken.prototype.price = function () {
        return 20;
    };
    return Chicken;
}());
// 导演，管理建造出来的实例的依赖关系
var Meal = /** @class */ (function () {
    function Meal() {
        this.items = [];
    }
    Meal.prototype.addItem = function (item) {
        this.items.push(item);
    };
    Meal.prototype.getCost = function () {
        return this.items.reduce(function (pre, cur) {
            pre += cur.price();
            return pre;
        }, 0);
    };
    Meal.prototype.showItems = function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            console.log("".concat(item.name(), ": ").concat(item.price(), "\uFFE5"));
        }
    };
    return Meal;
}());
// 建造者
var MealBuilder = /** @class */ (function () {
    function MealBuilder() {
    }
    MealBuilder.prototype.burgerCombo = function () {
        var meal = new Meal();
        meal.addItem(new Burger());
        meal.addItem(new Drink());
        return meal;
    };
    MealBuilder.prototype.chickenCombo = function () {
        var meal = new Meal();
        meal.addItem(new Chicken());
        meal.addItem(new Drink());
        return meal;
    };
    return MealBuilder;
}());
function run$j() {
    console.log('--- 建造者模式 ---');
    var mealBuilder = new MealBuilder();
    var bc = mealBuilder.burgerCombo();
    console.log('burgerCombo套餐: ', bc.getCost());
    bc.showItems();
    var cc = mealBuilder.chickenCombo();
    console.log('chickenCombo套餐: ', cc.getCost());
    cc.showItems();
    console.log('--- 建造者模式 ---');
    console.log('');
}

/**
 * ChainOfResponsibilityPattern 责任链模式
 * 意图：避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。
 * 主要解决：职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。
 * 何时使用：在处理消息的时候以过滤很多道。
 * 如何解决：拦截的类都实现统一接口。
 * 关键代码：Handler 里面聚合它自己，在 HandlerRequest 里判断是否合适，如果没达到条件则向下传递，向谁传递之前 set 进去。
 * 应用实例： 1、红楼梦中的"击鼓传花"。 2、JS 中的事件冒泡。 3、JAVA WEB 中 Apache Tomcat 对 Encoding 的处理，Struts2 的拦截器，jsp servlet 的 Filter。
 * 优点： 1、降低耦合度。它将请求的发送者和接收者解耦。 2、简化了对象。使得对象不需要知道链的结构。 3、增强给对象指派职责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任。 4、增加新的请求处理类很方便。
 * 缺点： 1、不能保证请求一定被接收。 2、系统性能将受到一定影响，而且在进行代码调试时不太方便，可能会造成循环调用。 3、可能不容易观察运行时的特征，有碍于除错。
 * 使用场景： 1、有多个对象可以处理同一个请求，具体哪个对象处理该请求由运行时刻自动确定。 2、在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。 3、可动态指定一组对象处理请求。
 */
var AbstractLogger = /** @class */ (function () {
    function AbstractLogger() {
    }
    AbstractLogger.prototype.setNextLogger = function (nextLogger) {
        this.nextLogger = nextLogger;
    };
    AbstractLogger.prototype.logMessage = function (level, message) {
        if (this.level <= level) {
            this.write(message);
        }
        if (this.nextLogger) {
            this.nextLogger.logMessage(level, message);
        }
    };
    AbstractLogger.INFO = 1;
    AbstractLogger.DEBUG = 2;
    AbstractLogger.ERROR = 3;
    return AbstractLogger;
}());
var ConsoleLogger = /** @class */ (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    ConsoleLogger.prototype.write = function (message) {
        console.log('Console Logger: ' + message);
    };
    return ConsoleLogger;
}(AbstractLogger));
var ErrorLogger = /** @class */ (function (_super) {
    __extends(ErrorLogger, _super);
    function ErrorLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    ErrorLogger.prototype.write = function (message) {
        console.log('Error Logger: ' + message);
    };
    return ErrorLogger;
}(AbstractLogger));
var FileLogger = /** @class */ (function (_super) {
    __extends(FileLogger, _super);
    function FileLogger(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    FileLogger.prototype.write = function (message) {
        console.log('File Logger: ' + message);
    };
    return FileLogger;
}(AbstractLogger));
function run$i() {
    console.log('--- 责任链模式 ---');
    var errorLogger = new ErrorLogger(AbstractLogger.ERROR);
    var fileLogger = new FileLogger(AbstractLogger.DEBUG);
    var consoleLogger = new ConsoleLogger(AbstractLogger.INFO);
    errorLogger.setNextLogger(fileLogger);
    fileLogger.setNextLogger(consoleLogger);
    errorLogger.logMessage(AbstractLogger.INFO, ' -- info level -- ');
    errorLogger.logMessage(AbstractLogger.DEBUG, ' -- debug level -- ');
    errorLogger.logMessage(AbstractLogger.ERROR, ' -- error level -- ');
    console.log('--- 责任链模式 ---');
    console.log('');
}

/**
 * CommandPattern 命令模式
 * 将一个请求封装成一个对象，从而使您可以用不同的请求对客户进行参数化。
 * 主要解决：在软件系统中，行为请求者与行为实现者通常是一种紧耦合的关系，但某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时，这种无法抵御变化的紧耦合的设计就不太合适。
 * 何时使用：在某些场合，比如要对行为进行"记录、撤销/重做、事务"等处理，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如何将"行为请求者"与"行为实现者"解耦？将一组行为抽象为对象，可以实现二者之间的松耦合。
 * 如何解决：通过调用者调用接受者执行命令，顺序：调用者→命令→接受者。
 * 关键代码：定义三个角色：1、received 真正的命令执行对象 2、Command 3、invoker 使用命令对象的入口
 * 应用实例：struts 1 中的 action 核心控制器 ActionServlet 只有一个，相当于 Invoker，而模型层的类会随着不同的应用有不同的模型类，相当于具体的 Command。
 * 优点： 1、降低了系统耦合度。 2、新的命令可以很容易添加到系统中去。
 * 缺点：使用命令模式可能会导致某些系统有过多的具体命令类。
 * 使用场景：认为是命令的地方都可以使用命令模式，比如： 1、GUI 中每一个按钮都是一条命令。 2、模拟 CMD。
 * 注意事项：系统需要支持命令的撤销(Undo)操作和恢复(Redo)操作，也可以考虑使用命令模式，
 */
var Stock = /** @class */ (function () {
    function Stock() {
        this.name = 'ABC';
        this.quantity = 10;
    }
    Stock.prototype.buy = function () {
        console.log("Stock buy ".concat(this.name, " ").concat(this.quantity));
    };
    Stock.prototype.sell = function () {
        console.log("Stock sell ".concat(this.name, " ").concat(this.quantity));
    };
    return Stock;
}());
// 实体命令类 BuyStock 和 SellStock
var BuyStock = /** @class */ (function () {
    function BuyStock(abcStock) {
        this.abcStock = abcStock;
    }
    BuyStock.prototype.execute = function () {
        this.abcStock.buy();
    };
    return BuyStock;
}());
var SellStock = /** @class */ (function () {
    function SellStock(abcStock) {
        this.abcStock = abcStock;
    }
    SellStock.prototype.execute = function () {
        this.abcStock.sell();
    };
    return SellStock;
}());
// 命令调用类
var Broker = /** @class */ (function () {
    function Broker() {
        this.orderList = [];
    }
    Broker.prototype.takeOrder = function (order) {
        this.orderList.push(order);
    };
    Broker.prototype.placeOrders = function () {
        for (var _i = 0, _a = this.orderList; _i < _a.length; _i++) {
            var order = _a[_i];
            order.execute();
        }
        this.orderList = [];
    };
    return Broker;
}());
function run$h() {
    console.log('--- 命令模式 ---');
    var abcStock = new Stock();
    var buyStockOrder = new BuyStock(abcStock);
    var sellStockOrder = new SellStock(abcStock);
    var broker = new Broker();
    broker.takeOrder(buyStockOrder);
    broker.takeOrder(sellStockOrder);
    broker.placeOrders();
    console.log('--- 命令模式 ---');
    console.log('');
}

/**
 * CompositePattern 组合模式
 * 意图：将对象组合成树形结构以表示"部分-整体"的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。
 * 主要解决：它在我们树型结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以像处理简单元素一样来处理复杂元素，从而使得客户程序与复杂元素的内部结构解耦。
 * 何时使用： 1、您想表示对象的部分-整体层次结构（树形结构）。 2、您希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象。
 * 关键代码：树枝内部组合该接口，并且含有内部属性 List，里面放 Component。
 * 应用实例： 1、算术表达式包括操作数、操作符和另一个操作数，其中，另一个操作数也可以是操作数、操作符和另一个操作数。 2、在 JAVA AWT 和 SWING 中，对于 Button 和 Checkbox 是树叶，Container 是树枝。
 * 优点： 1、高层模块调用简单。 2、节点自由增加。
 * 缺点：在使用组合模式时，其叶子和树枝的声明都是实现类，而不是接口，违反了依赖倒置原则。
 * 使用场景：部分、整体场景，如树形菜单，文件、文件夹的管理。
 */
var Employee = /** @class */ (function () {
    function Employee(name, dept) {
        this.name = name;
        this.dept = dept;
        this.staff = [];
    }
    Employee.prototype.add = function (e) {
        this.staff.push(e);
    };
    return Employee;
}());
function run$g() {
    console.log('--- 组合模式 ---');
    var CEO = new Employee('zty', 'CEO');
    var sale = new Employee('s-header', 'sale');
    var s1 = new Employee('s1', 'sale');
    var s2 = new Employee('s2', 'sale');
    CEO.add(sale);
    sale.add(s1);
    sale.add(s2);
    console.log('CEO = ', CEO);
    console.log('--- 组合模式 ---');
    console.log('');
}

/**
 * DecoratorPattern 装饰器模式
 * 意图：动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。
 * 主要解决：一般的，我们为了扩展一个类经常使用继承方式实现，由于继承为类引入静态特征，并且随着扩展功能的增多，子类会很膨胀。
 * 何时使用：在不想增加很多子类的情况下扩展类。
 * 关键代码： 1、Component 类充当抽象角色，不应该具体实现。 2、修饰类引用和继承 Component 类，具体扩展类重写父类方法。
 * 应用实例： 1、孙悟空有 72 变，当他变成"庙宇"后，他的根本还是一只猴子，但是他又有了庙宇的功能。 2、不论一幅画有没有画框都可以挂在墙上，但是通常都是有画框的，并且实际上是画框被挂在墙上。在挂在墙上之前，画可以被蒙上玻璃，装到框子里；这时画、玻璃和画框形成了一个物体。
 * 优点：装饰类和被装饰类可以独立发展，不会相互耦合，装饰模式是继承的一个替代模式，装饰模式可以动态扩展一个实现类的功能。
 * 缺点：多层装饰比较复杂。
 * 使用场景： 1、扩展一个类的功能。 2、动态增加功能，动态撤销。
 * 注意事项：可代替继承。
 */
var Circle$1 = /** @class */ (function () {
    function Circle() {
    }
    Circle.prototype.draw = function () {
        console.log('Shape: Circle');
    };
    return Circle;
}());
// 实现了 Shape 接口的抽象装饰类。
var ShapeDecorator = /** @class */ (function () {
    function ShapeDecorator(decoratedShape) {
        this.decoratedShape = decoratedShape;
    }
    ShapeDecorator.prototype.draw = function () {
        this.decoratedShape.draw();
    };
    return ShapeDecorator;
}());
// 扩展了 ShapeDecorator 类的实体装饰类。
var RedShapeDecorator = /** @class */ (function (_super) {
    __extends(RedShapeDecorator, _super);
    function RedShapeDecorator(decoratedShape) {
        return _super.call(this, decoratedShape) || this;
    }
    RedShapeDecorator.prototype.draw = function () {
        this.decoratedShape.draw();
        this.setRedBorder(this.decoratedShape);
    };
    RedShapeDecorator.prototype.setRedBorder = function (decoratedShape) {
        console.log('Border Color: Red');
    };
    return RedShapeDecorator;
}(ShapeDecorator));
function run$f() {
    console.log('--- 装饰器模式 ---');
    var circle = new Circle$1();
    var redCircle = new RedShapeDecorator(new Circle$1());
    circle.draw();
    console.log('after Decorator');
    redCircle.draw();
    console.log('--- 装饰器模式 ---');
    console.log('');
}

/**
 * FacadePattern 外观模式
 * 意图：为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。
 * 主要解决：降低访问复杂系统的内部子系统时的复杂度，简化客户端之间的接口。
 * 何时使用： 1、客户端不需要知道系统内部的复杂联系，整个系统只需提供一个"接待员"即可。 2、定义系统的入口。
 * 如何解决：客户端不与系统耦合，外观类与系统耦合。
 * 关键代码：在客户端和复杂系统之间再加一层，这一层将调用顺序、依赖关系等处理好。
 * 应用实例： 1、去医院看病，可能要去挂号、门诊、划价、取药，让患者或患者家属觉得很复杂，如果有提供接待人员，只让接待人员来处理，就很方便。 2、JAVA 的三层开发模式。
 * 优点： 1、减少系统相互依赖。 2、提高灵活性。 3、提高了安全性。
 * 缺点：不符合开闭原则，如果要改东西很麻烦，继承重写都不合适。
 * 使用场景： 1、为复杂的模块或子系统提供外界访问的模块。 2、子系统相对独立。 3、预防低水平人员带来的风险。
 * 注意事项：在层次化结构中，可以使用外观模式定义系统中每一层的入口。
 */
var Rectangle$1 = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.draw = function () {
        console.log(' Rectangle ::: draw() ');
    };
    return Rectangle;
}());
var Square$2 = /** @class */ (function () {
    function Square() {
    }
    Square.prototype.draw = function () {
        console.log(' Square ::: draw() ');
    };
    return Square;
}());
// 创建一个外观类。
var ShapeMaker = /** @class */ (function () {
    function ShapeMaker() {
        this.rectangle = new Rectangle$1();
        this.square = new Square$2();
    }
    ShapeMaker.prototype.drawSquare = function () {
        this.square.draw();
    };
    ShapeMaker.prototype.drawRectangle = function () {
        this.rectangle.draw();
    };
    return ShapeMaker;
}());
function run$e() {
    console.log('--- 外观模式 ---');
    var shapeMaker = new ShapeMaker();
    shapeMaker.drawRectangle();
    shapeMaker.drawSquare();
    console.log('--- 外观模式 ---');
    console.log('');
}

/**
 * FactoryPattern 工厂模式
 * 定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。
 * 优点： 1、一个调用者想创建一个对象，只要知道其名称就可以了。 2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。 3、屏蔽产品的具体实现，调用者只关心产品的接口。
 * 缺点：每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。
 * 使用场景： 1、日志记录器：记录可能记录到本地硬盘、系统事件、远程服务器等，用户可以选择记录日志到什么地方。 2、数据库访问，当用户不知道最后系统采用哪一类数据库，以及数据库可能有变化时。 3、设计一个连接服务器的框架，需要三个协议，"POP3"、"IMAP"、"HTTP"，可以把这三个作为产品类，共同实现一个接口。
 * 注意事项：作为一种创建类模式，在任何需要生成复杂对象的地方，都可以使用工厂方法模式。有一点需要注意的地方就是复杂对象适合使用工厂模式，而简单对象，特别是只需要通过 new 就可以完成创建的对象，无需使用工厂模式。如果使用工厂模式，就需要引入一个工厂类，会增加系统的复杂度。
 */
var Circle = /** @class */ (function () {
    function Circle() {
    }
    Circle.prototype.say = function () {
        console.log('::: Circle :::');
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.say = function () {
        console.log('::: Rectangle :::');
    };
    return Rectangle;
}());
var Square$1 = /** @class */ (function () {
    function Square() {
    }
    Square.prototype.say = function () {
        console.log('::: Square :::');
    };
    return Square;
}());
var ShapeFactory$1 = /** @class */ (function () {
    function ShapeFactory() {
    }
    ShapeFactory.prototype.getShape = function (shapeType) {
        var shape;
        switch (shapeType) {
            case 'CIRCLE':
                shape = new Circle();
                break;
            case 'RECTANGLE':
                shape = new Rectangle();
                break;
            case 'Square':
                shape = new Square$1();
                break;
            default:
                shape = null;
                break;
        }
        return shape;
    };
    return ShapeFactory;
}());
function run$d() {
    console.log('--- 工厂模式 ---');
    var sf = new ShapeFactory$1();
    var shape = sf.getShape('CIRCLE');
    shape.say();
    console.log('--- 工厂模式 ---');
    console.log('');
}

/**
 * FilterPattern 过滤器模式
 * 过滤器模式（Filter Pattern）或标准模式（Criteria Pattern）是一种设计模式，这种模式允许开发人员使用不同的标准来过滤一组对象，通过逻辑运算以解耦的方式把它们连接起来。
 * 这种类型的设计模式属于结构型模式，它结合多个标准来获得单一标准。
 * js Array中的filter就属于该模式
 */
var Person = /** @class */ (function () {
    function Person(name, gender) {
        this.name = name;
        this.gender = gender;
    }
    return Person;
}());
var CriteriaMale = /** @class */ (function () {
    function CriteriaMale() {
    }
    CriteriaMale.prototype.meetCriteria = function (persons) {
        var ps = [];
        for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
            var p = persons_1[_i];
            if (p.gender === 'Male') {
                ps.push(p);
            }
        }
        return ps;
    };
    return CriteriaMale;
}());
var CriteriaFemale = /** @class */ (function () {
    function CriteriaFemale() {
    }
    CriteriaFemale.prototype.meetCriteria = function (persons) {
        var ps = [];
        for (var _i = 0, persons_2 = persons; _i < persons_2.length; _i++) {
            var p = persons_2[_i];
            if (p.gender === 'Female') {
                ps.push(p);
            }
        }
        return ps;
    };
    return CriteriaFemale;
}());
function run$c() {
    console.log('--- 过滤器模式 ---');
    var persons = [
        new Person('Robert', 'Male'),
        new Person('John', 'Male'),
        new Person('Laura', 'Female'),
        new Person('Diana', 'Female')
    ];
    var male = new CriteriaMale();
    var female = new CriteriaFemale();
    console.log('males ', male.meetCriteria(persons));
    console.log('females ', female.meetCriteria(persons));
    console.log('--- 过滤器模式 ---');
    console.log('');
}

/**
 * FlyweightPattern 享元模式
 * 意图：运用共享技术有效地支持大量细粒度的对象。
 * 主要解决：在有大量对象时，有可能会造成内存溢出，我们把其中共同的部分抽象出来，如果有相同的业务请求，直接返回在内存中已有的对象，避免重新创建。
 * 何时使用： 1、系统中有大量对象。 2、这些对象消耗大量内存。 3、这些对象的状态大部分可以外部化。 4、这些对象可以按照内蕴状态分为很多组，当把外蕴对象从对象中剔除出来时，每一组对象都可以用一个对象来代替。 5、系统不依赖于这些对象身份，这些对象是不可分辨的。
 * 如何解决：用唯一标识码判断，如果在内存中有，则返回这个唯一标识码所标识的对象。
 * 关键代码：用 HashMap 存储这些对象。
 * 应用实例： 1、JAVA 中的 String，如果有则返回，如果没有则创建一个字符串保存在字符串缓存池里面。 2、数据库的数据池。
 * 优点：大大减少对象的创建，降低系统的内存，使效率提高。
 * 缺点：提高了系统的复杂度，需要分离出外部状态和内部状态，而且外部状态具有固有化的性质，不应该随着内部状态的变化而变化，否则会造成系统的混乱。
 * 使用场景： 1、系统有大量相似对象。 2、需要缓冲池的场景。
 * 注意事项： 1、注意划分外部状态和内部状态，否则可能会引起线程安全问题。 2、这些类必须有一个工厂对象加以控制。
 */
var Square = /** @class */ (function () {
    function Square(color) {
        this.color = color;
    }
    Square.prototype.setX = function (x) {
        this.x = x;
    };
    Square.prototype.draw = function () {
        console.log("Square draw color: ".concat(this.color, ", x: ").concat(this.x));
    };
    return Square;
}());
// 创建一个工厂，生成基于给定信息的实体类的对象。
var ShapeFactory = /** @class */ (function () {
    function ShapeFactory() {
    }
    ShapeFactory.getSquare = function (color) {
        var square = this.map.get(color);
        if (square == null) {
            square = new Square(color);
            this.map.set(color, square);
            console.log("Creating Square of color : ".concat(color));
        }
        return square;
    };
    ShapeFactory.map = new Map();
    return ShapeFactory;
}());
function run$b() {
    console.log('--- 享元模式 ---');
    var colors = ['Red', 'Yellow', 'Blue'];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function getRandomX() {
        return Math.floor(Math.random() * 100);
    }
    for (var i = 0; i < 10; ++i) {
        var square = ShapeFactory.getSquare(getRandomColor());
        square.setX(getRandomX());
        square.draw();
    }
    console.log('--- 享元模式 ---');
    console.log('');
}

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
var TerminalExpression = /** @class */ (function () {
    function TerminalExpression(data) {
        this.data = data;
    }
    TerminalExpression.prototype.interpret = function (context) {
        return context.indexOf(this.data) > -1;
    };
    return TerminalExpression;
}());
var OrExpression = /** @class */ (function () {
    function OrExpression(exp1, exp2) {
        this.exp1 = null;
        this.exp2 = null;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    OrExpression.prototype.interpret = function (context) {
        return this.exp1.interpret(context) || this.exp2.interpret(context);
    };
    return OrExpression;
}());
var AndExpression = /** @class */ (function () {
    function AndExpression(exp1, exp2) {
        this.exp1 = null;
        this.exp2 = null;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    AndExpression.prototype.interpret = function (context) {
        return this.exp1.interpret(context) && this.exp2.interpret(context);
    };
    return AndExpression;
}());
function run$a() {
    console.log('--- 解释器模式 ---');
    // 规则：Robert 和 John 是男性
    var robert = new TerminalExpression('Robert');
    var john = new TerminalExpression('John');
    var isMale = new OrExpression(robert, john);
    var julie = new TerminalExpression('Julie');
    var married = new TerminalExpression('Married');
    var isMarriedWoman = new AndExpression(julie, married);
    console.log('John is male? ' + isMale.interpret('John'));
    console.log('Jul is a married women? ' + isMarriedWoman.interpret('Married Jul'));
    console.log('--- 解释器模式 ---');
    console.log('');
}

/**
 * IteratorPattern 迭代器模式
 * 意图：提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示。
 * 主要解决：不同的方式来遍历整个整合对象。
 * 何时使用：遍历一个聚合对象。
 * 如何解决：把在元素之间游走的责任交给迭代器，而不是聚合对象。
 * 关键代码：定义接口：hasNext, next。
 * 应用实例：JAVA 中的 iterator。
 * 优点： 1、它支持以不同的方式遍历一个聚合对象。 2、迭代器简化了聚合类。 3、在同一个聚合上可以有多个遍历。 4、在迭代器模式中，增加新的聚合类和迭代器类都很方便，无须修改原有代码。
 * 缺点：由于迭代器模式将存储数据和遍历数据的职责分离，增加新的聚合类需要对应增加新的迭代器类，类的个数成对增加，这在一定程度上增加了系统的复杂性。
 * 使用场景： 1、访问一个聚合对象的内容而无须暴露它的内部表示。 2、需要为聚合对象提供多种遍历方式。 3、为遍历不同的聚合结构提供一个统一的接口。
 * 注意事项：迭代器模式就是分离了集合对象的遍历行为，抽象出一个迭代器类来负责，这样既可以做到不暴露集合的内部结构，又可让外部代码透明地访问集合内部的数据。
 */
var NameRepository = /** @class */ (function () {
    function NameRepository() {
        this.names = ['Robert', 'John', 'Julie', 'Lora'];
        this.index = 0;
    }
    NameRepository.prototype.getIterator = function () {
        return {
            hasNext: this.hasNext.bind(this),
            next: this.next.bind(this)
        };
    };
    NameRepository.prototype.hasNext = function () {
        if (this.index < this.names.length) {
            return true;
        }
        return false;
    };
    NameRepository.prototype.next = function () {
        if (this.hasNext()) {
            return this.names[this.index++];
        }
        return null;
    };
    return NameRepository;
}());
function run$9() {
    console.log('--- 迭代器模式 ---');
    var namesRepository = new NameRepository();
    for (var iter = namesRepository.getIterator(); iter.hasNext();) {
        var name_1 = iter.next();
        console.log('Name: ' + name_1);
    }
    console.log('--- 迭代器模式 ---');
    console.log('');
}

/**
 * MediatorPattern 中介者模式
 * 意图：用一个中介对象来封装一系列的对象交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。
 * 主要解决：对象与对象之间存在大量的关联关系，这样势必会导致系统的结构变得很复杂，同时若一个对象发生改变，我们也需要跟踪与之相关联的对象，同时做出相应的处理。
 * 何时使用：多个类相互耦合，形成了网状结构。
 * 如何解决：将上述网状结构分离为星型结构。
 * 关键代码：对象 Colleague 之间的通信封装到一个类中单独处理。
 * 应用实例： 1、中国加入 WTO 之前是各个国家相互贸易，结构复杂，现在是各个国家通过 WTO 来互相贸易。 2、机场调度系统。 3、MVC 框架，其中C（控制器）就是 M（模型）和 V（视图）的中介者。
 * 优点： 1、降低了类的复杂度，将一对多转化成了一对一。 2、各个类之间的解耦。 3、符合迪米特原则。
 * 缺点：中介者会庞大，变得复杂难以维护。
 * 使用场景： 1、系统中对象之间存在比较复杂的引用关系，导致它们之间的依赖关系结构混乱而且难以复用该对象。 2、想通过一个中间类来封装多个类中的行为，而又不想生成太多的子类。
 * 注意事项：不应当在职责混乱的时候使用。
 */
// 创建中介类
var ChatRoom = /** @class */ (function () {
    function ChatRoom() {
    }
    ChatRoom.showMessage = function (user, message) {
        console.log("".concat(new Date().toLocaleTimeString(), " ").concat(user.getName(), ": ").concat(message));
    };
    return ChatRoom;
}());
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.getName = function () {
        return this.name;
    };
    User.prototype.sendMessage = function (message) {
        ChatRoom.showMessage(this, message);
    };
    return User;
}());
function run$8() {
    console.log('--- 中介者模式 ---');
    var robert = new User('Robert');
    var john = new User('John');
    robert.sendMessage('Hi! John!');
    john.sendMessage('Hello! Robert!');
    console.log('--- 中介者模式 ---');
    console.log('');
}

/**
 * MementoPattern 备忘录模式
 * 意图：在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。
 * 主要解决：所谓备忘录模式就是在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。
 * 何时使用：很多时候我们总是需要记录一个对象的内部状态，这样做的目的就是为了允许用户取消不确定或者错误的操作，能够恢复到他原先的状态，使得他有"后悔药"可吃。
 * 如何解决：通过一个备忘录类专门存储对象状态。
 * 关键代码：客户不与备忘录类耦合，与备忘录管理类耦合。
 * 应用实例： 1、后悔药。 2、打游戏时的存档。 3、Windows 里的 ctrl + z。 4、IE 中的后退。 5、数据库的事务管理。
 * 优点： 1、给用户提供了一种可以恢复状态的机制，可以使用户能够比较方便地回到某个历史的状态。 2、实现了信息的封装，使得用户不需要关心状态的保存细节。
 * 缺点：消耗资源。如果类的成员变量过多，势必会占用比较大的资源，而且每一次保存都会消耗一定的内存。
 * 使用场景： 1、需要保存/恢复数据的相关状态场景。 2、提供一个可回滚的操作。
 * 注意事项： 1、为了符合迪米特原则，还要增加一个管理备忘录的类。 2、为了节约内存，可使用原型模式+备忘录模式。
 */
// Memento包含了要被恢复的对象的状态
var Memento = /** @class */ (function () {
    function Memento(state) {
        this.state = state;
    }
    Memento.prototype.getState = function () {
        return this.state;
    };
    return Memento;
}());
// Originator 创建并在 Memento 对象中存储状态
var Originator = /** @class */ (function () {
    function Originator() {
    }
    Originator.prototype.setState = function (state) {
        this.state = state;
    };
    Originator.prototype.getState = function () {
        return this.state;
    };
    Originator.prototype.saveStateToMemento = function () {
        return new Memento(this.state);
    };
    Originator.prototype.getStateFromMemento = function (memento) {
        this.state = memento.getState();
    };
    return Originator;
}());
// Caretaker 对象负责从 Memento 中恢复对象的状态。
var CareTaker = /** @class */ (function () {
    function CareTaker() {
        this.mementoList = [];
    }
    CareTaker.prototype.add = function (m) {
        this.mementoList.push(m);
    };
    CareTaker.prototype.get = function (index) {
        return this.mementoList[index];
    };
    return CareTaker;
}());
function run$7() {
    console.log('--- 备忘录模式 ---');
    var originator = new Originator();
    var careTaker = new CareTaker();
    originator.setState('State #1');
    originator.setState('State #2');
    careTaker.add(originator.saveStateToMemento());
    originator.setState('State #3');
    careTaker.add(originator.saveStateToMemento());
    originator.setState('State #4');
    console.log('Current State: ' + originator.getState());
    originator.getStateFromMemento(careTaker.get(0));
    console.log('First saved State: ' + originator.getState());
    originator.getStateFromMemento(careTaker.get(1));
    console.log('Second saved State: ' + originator.getState());
    console.log('originator = ', originator);
    console.log('careTaker = ', careTaker);
    console.log('--- 备忘录模式 ---');
    console.log('');
}

/**
 * ObserverPattern 观察者模式
 * 意图：定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。
 * 主要解决：一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。
 * 何时使用：一个对象（目标对象）的状态发生改变，所有的依赖对象（观察者对象）都将得到通知，进行广播通知。
 * 如何解决：使用面向对象技术，可以将这种依赖关系弱化。
 * 关键代码：在抽象类里有一个 ArrayList 存放观察者们。
 * 应用实例： 1、拍卖的时候，拍卖师观察最高标价，然后通知给其他竞价者竞价。 2、西游记里面悟空请求菩萨降服红孩儿，菩萨洒了一地水招来一个老乌龟，这个乌龟就是观察者，他观察菩萨洒水这个动作。
 * 优点： 1、观察者和被观察者是抽象耦合的。 2、建立一套触发机制。
 * 缺点： 1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。 2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。 3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。
 * 使用场景：
 * 一个抽象模型有两个方面，其中一个方面依赖于另一个方面。将这些方面封装在独立的对象中使它们可以各自独立地改变和复用。
 * 一个对象的改变将导致其他一个或多个对象也发生改变，而不知道具体有多少对象将发生改变，可以降低对象之间的耦合度。
 * 一个对象必须通知其他对象，而并不知道这些对象是谁。
 * 需要在系统中创建一个触发链，A对象的行为将影响B对象，B对象的行为将影响C对象……，可以使用观察者模式创建一种链式触发机制。
 * 注意事项： 1、避免循环引用。 2、如果顺序执行，某一观察者错误会导致系统卡壳，一般采用异步方式。
 */
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.getState = function () {
        return this.state;
    };
    Subject.prototype.setState = function (state) {
        this.state = state;
        this.notifyAllObservers();
    };
    Subject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.notifyAllObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update();
        }
    };
    return Subject;
}());
// 创建实体观察者类。
var Observer = /** @class */ (function () {
    function Observer() {
    }
    return Observer;
}());
var BinaryObserver = /** @class */ (function (_super) {
    __extends(BinaryObserver, _super);
    function BinaryObserver(subject) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subject.attach(_this);
        return _this;
    }
    BinaryObserver.prototype.update = function () {
        console.log('Binary String: ' + this.subject.getState().toString(2));
    };
    return BinaryObserver;
}(Observer));
var HexadecimalObserver = /** @class */ (function (_super) {
    __extends(HexadecimalObserver, _super);
    function HexadecimalObserver(subject) {
        var _this = _super.call(this) || this;
        _this.subject = subject;
        _this.subject.attach(_this);
        return _this;
    }
    HexadecimalObserver.prototype.update = function () {
        console.log('Hexadecimal String: ' + this.subject.getState().toString(16));
    };
    return HexadecimalObserver;
}(Observer));
function run$6() {
    console.log('--- 观察者模式 ---');
    var subject = new Subject();
    new HexadecimalObserver(subject);
    new BinaryObserver(subject);
    console.log('First state change: 28');
    subject.setState(28);
    console.log('Second state change: 10');
    subject.setState(10);
    console.log('--- 观察者模式 ---');
    console.log('');
}

/**
 * PrototypePattern 原型模式
 * 原型模式（Prototype Pattern）是用于创建重复的对象，同时又能保证性能。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。
 * 这种模式是实现了一个原型接口，该接口用于创建当前对象的克隆。当直接创建对象的代价比较大时，则采用这种模式。例如，一个对象需要在一个高代价的数据库操作之后被创建。我们可以缓存该对象，在下一个请求时返回它的克隆，在需要的时候更新数据库，以此来减少数据库调用。
 * 意图：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。
 * 应用实例： 1、细胞分裂。 2、JAVA 中的 Object clone() 方法。3、js中的继承实现
 * 优点： 1、性能提高。 2、逃避构造函数的约束。
 * 缺点： 1、配备克隆方法需要对类的功能进行通盘考虑，这对于全新的类不是很难，但对于已有的类不一定很容易，特别当一个类引用不支持串行化的间接对象，或者引用含有循环结构的时候。 2、必须实现 Cloneable 接口。
 * 使用场景： 1、资源优化场景。 2、类初始化需要消化非常多的资源，这个资源包括数据、硬件资源等。 3、性能和安全要求的场景。 4、通过 new 产生一个对象需要非常繁琐的数据准备或访问权限，则可以使用原型模式。 5、一个对象多个修改者的场景。 6、一个对象需要提供给其他对象访问，而且各个调用者可能都需要修改其值时，可以考虑使用原型模式拷贝多个对象供调用者使用。 7、在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过 clone 的方法创建一个对象，然后由工厂方法提供给调用者。原型模式已经与 Java 融为浑然一体，大家可以随手拿来使用。
 * 注意事项：与通过对一个类进行实例化来构造新对象不同的是，原型模式是通过拷贝一个现有对象生成新对象的。浅拷贝实现 Cloneable，重写，深拷贝是通过实现 Serializable 读取二进制流。
 */
// js设计中对象的继承实现就是以原型模式，所以这里通过实现一个继承函数来展示原型模式
function inherits(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype, {
        constructor: { value: subClass, writable: true, configurable: true }
    });
}
function run$5() {
    console.log('--- 原型模式 ---');
    function People(name) {
        this.name = name;
    }
    function Man(name) {
        this.name = name;
        this.sex = '男';
    }
    inherits(Man, People);
    var man = new Man('man');
    console.log('man = ', man);
    console.log('--- 原型模式 ---');
    console.log('');
}

/**
 * ProxyPattern 代理模式
 * 意图：为其他对象提供一种代理以控制对这个对象的访问。
 * 主要解决：在直接访问对象时带来的问题，比如说：要访问的对象在远程的机器上。在面向对象系统中，有些对象由于某些原因（比如对象创建开销很大，或者某些操作需要安全控制，或者需要进程外的访问），直接访问会给使用者或者系统结构带来很多麻烦，我们可以在访问此对象时加上一个对此对象的访问层。
 * 何时使用：想在访问一个类时做一些控制。
 * 如何解决：增加中间层。
 * 关键代码：实现与被代理类组合。
 * 应用实例： 1、Windows 里面的快捷方式。 2、猪八戒去找高翠兰结果是孙悟空变的，可以这样理解：把高翠兰的外貌抽象出来，高翠兰本人和孙悟空都实现了这个接口，猪八戒访问高翠兰的时候看不出来这个是孙悟空，所以说孙悟空是高翠兰代理类。 3、买火车票不一定在火车站买，也可以去代售点。 4、一张支票或银行存单是账户中资金的代理。支票在市场交易中用来代替现金，并提供对签发人账号上资金的控制。 5、spring aop。
 * 优点： 1、职责清晰。 2、高扩展性。 3、智能化。
 * 缺点： 1、由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢。 2、实现代理模式需要额外的工作，有些代理模式的实现非常复杂。
 * 使用场景：按职责来划分，通常有以下使用场景： 1、远程代理。 2、虚拟代理。 3、Copy-on-Write 代理。 4、保护（Protect or Access）代理。 5、Cache代理。 6、防火墙（Firewall）代理。 7、同步化（Synchronization）代理。 8、智能引用（Smart Reference）代理。
 * 注意事项： 1、和适配器模式的区别：适配器模式主要改变所考虑对象的接口，而代理模式不能改变所代理类的接口。 2、和装饰器模式的区别：装饰器模式为了增强功能，而代理模式是为了加以控制。
 */
var RealImage = /** @class */ (function () {
    function RealImage(fileName) {
        this.fileName = fileName;
        this.loadFromDisk(fileName);
    }
    RealImage.prototype.display = function () {
        console.log('Displaying ' + this.fileName);
    };
    RealImage.prototype.loadFromDisk = function (fileName) {
        console.log('Loading ' + fileName);
    };
    return RealImage;
}());
// ProxyImage 是一个代理类，减少 RealImage 对象加载的内存占用。
var ProxyImage = /** @class */ (function () {
    function ProxyImage(fileName) {
        this.fileName = fileName;
    }
    ProxyImage.prototype.display = function () {
        if (!this.realImage) {
            this.realImage = new RealImage(this.fileName);
        }
        this.realImage.display();
    };
    return ProxyImage;
}());
function run$4() {
    console.log('--- 代理模式 ---');
    var image = new ProxyImage('1.jpg');
    // 图像将从磁盘加载
    image.display();
    console.log('');
    // 图像不需要从磁盘加载
    image.display();
    console.log('--- 代理模式 ---');
    console.log('');
}

/**
 * SingletonPattern 单例模式
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 * 关键代码：构造函数是私有的。
 * 优点：1、在内存里只有一个实例，减少了内存的开销，尤其是频繁的创建和销毁实例（比如管理学院首页页面缓存）。2、避免对资源的多重占用（比如写文件操作）。
 * 缺点：没有接口，不能继承，与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化。
 * 使用场景：1、要求生产唯一序列号。2、创建的一个对象需要消耗的资源过多，比如 I/O 与数据库的连接等。
 */
var Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getInstance = function () {
        return this.instance;
    };
    Singleton.prototype.say = function () {
        console.log('Hello Singleton');
    };
    Singleton.instance = new Singleton();
    return Singleton;
}());
function run$3() {
    // 类“Singleton”的构造函数是私有的，仅可在类声明中访问。
    // let single = new Singleton()
    console.log('--- 单例模式 ---');
    var single = Singleton.getInstance();
    single.say();
    console.log('--- 单例模式 ---');
    console.log('');
}

/**
 * StatePattern 状态模式
 * 意图：允许对象在内部状态发生改变时改变它的行为，对象看起来好像修改了它的类。
 * 主要解决：对象的行为依赖于它的状态（属性），并且可以根据它的状态改变而改变它的相关行为。
 * 何时使用：代码中包含大量与对象状态有关的条件语句。
 * 如何解决：将各种具体的状态类抽象出来。
 * 关键代码：通常命令模式的接口中只有一个方法。而状态模式的接口中有一个或者多个方法。而且，状态模式的实现类的方法，一般返回值，或者是改变实例变量的值。也就是说，状态模式一般和对象的状态有关。实现类的方法有不同的功能，覆盖接口中的方法。状态模式和命令模式一样，也可以用于消除 if...else 等条件选择语句。
 * 应用实例： 1、打篮球的时候运动员可以有正常状态、不正常状态和超常状态。 2、曾侯乙编钟中，'钟是抽象接口','钟A'等是具体状态，'曾侯乙编钟'是具体环境（Context）。
 * 优点： 1、封装了转换规则。 2、枚举可能的状态，在枚举状态之前需要确定状态种类。 3、将所有与某个状态有关的行为放到一个类中，并且可以方便地增加新的状态，只需要改变对象状态即可改变对象的行为。 4、允许状态转换逻辑与状态对象合成一体，而不是某一个巨大的条件语句块。 5、可以让多个环境对象共享一个状态对象，从而减少系统中对象的个数。
 * 缺点： 1、状态模式的使用必然会增加系统类和对象的个数。 2、状态模式的结构与实现都较为复杂，如果使用不当将导致程序结构和代码的混乱。 3、状态模式对"开闭原则"的支持并不太好，对于可以切换状态的状态模式，增加新的状态类需要修改那些负责状态转换的源代码，否则无法切换到新增状态，而且修改某个状态类的行为也需修改对应类的源代码。
 * 使用场景： 1、行为随状态改变而改变的场景。 2、条件、分支语句的代替者。
 * 注意事项：在行为受状态约束的时候使用状态模式，而且状态不超过 5 个。
 */
var StartState = /** @class */ (function () {
    function StartState() {
    }
    StartState.prototype.doAction = function (context) {
        console.log('Player is in start state');
        context.setState(this);
    };
    StartState.prototype.toString = function () {
        return 'Start State';
    };
    return StartState;
}());
var StopState = /** @class */ (function () {
    function StopState() {
    }
    StopState.prototype.doAction = function (context) {
        console.log('Player is in stop state');
        context.setState(this);
    };
    StopState.prototype.toString = function () {
        return 'Stop State';
    };
    return StopState;
}());
// Context 是一个带有某个状态的类
var Context$1 = /** @class */ (function () {
    function Context() {
    }
    Context.prototype.setState = function (state) {
        this.state = state;
    };
    Context.prototype.getState = function () {
        return this.state;
    };
    return Context;
}());
function run$2() {
    console.log('--- 状态模式 ---');
    var context = new Context$1();
    var startState = new StartState();
    startState.doAction(context);
    console.log(context.getState().toString());
    var stopState = new StopState();
    stopState.doAction(context);
    console.log(context.getState().toString());
    console.log('--- 状态模式 ---');
    console.log('');
}

/**
 * StrategyPattern 策略模式
 * 意图：定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。
 * 主要解决：在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。
 * 何时使用：一个系统有许多许多类，而区分它们的只是他们直接的行为。
 * 如何解决：将这些算法封装成一个一个的类，任意地替换。
 * 关键代码：实现同一个接口。
 * 应用实例： 1、诸葛亮的锦囊妙计，每一个锦囊就是一个策略。 2、旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。
 * 优点： 1、算法可以自由切换。 2、避免使用多重条件判断。 3、扩展性良好。
 * 缺点： 1、策略类会增多。 2、所有策略类都需要对外暴露。
 * 使用场景： 1、如果在一个系统里面有许多类，它们之间的区别仅在于它们的行为，那么使用策略模式可以动态地让一个对象在许多行为中选择一种行为。 2、一个系统需要动态地在几种算法中选择一种。 3、如果一个对象有很多的行为，如果不用恰当的模式，这些行为就只好使用多重的条件选择语句来实现。
 * 注意事项：如果一个系统的策略多于四个，就需要考虑使用混合模式，解决策略类膨胀的问题。
 */
var OperationAdd = /** @class */ (function () {
    function OperationAdd() {
    }
    OperationAdd.prototype.doOperation = function (num1, num2) {
        return num1 + num2;
    };
    return OperationAdd;
}());
var OperationSubtract = /** @class */ (function () {
    function OperationSubtract() {
    }
    OperationSubtract.prototype.doOperation = function (num1, num2) {
        return num1 - num2;
    };
    return OperationSubtract;
}());
var OperationMultiply = /** @class */ (function () {
    function OperationMultiply() {
    }
    OperationMultiply.prototype.doOperation = function (num1, num2) {
        return num1 * num2;
    };
    return OperationMultiply;
}());
var Context = /** @class */ (function () {
    function Context(strategy) {
        this.strategy = strategy;
    }
    Context.prototype.executeStrategy = function (num1, num2) {
        return this.strategy.doOperation(num1, num2);
    };
    return Context;
}());
function run$1() {
    console.log('--- 策略模式 ---');
    var context = new Context(new OperationAdd());
    console.log('10 + 5 = ' + context.executeStrategy(10, 5));
    context = new Context(new OperationSubtract());
    console.log('10 - 5 = ' + context.executeStrategy(10, 5));
    context = new Context(new OperationMultiply());
    console.log('10 * 5 = ' + context.executeStrategy(10, 5));
    console.log('--- 策略模式 ---');
    console.log('');
}

/**
 * TemplatePattern 模板模式
 * 意图：定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。
 * 主要解决：一些方法通用，却在每一个子类都重新写了这一方法。
 * 何时使用：有一些通用的方法。
 * 如何解决：将这些通用算法抽象出来。
 * 关键代码：在抽象类实现，其他步骤在子类实现。
 * 应用实例： 1、在造房子的时候，地基、走线、水管都一样，只有在建筑的后期才有加壁橱加栅栏等差异。 2、西游记里面菩萨定好的 81 难，这就是一个顶层的逻辑骨架。 3、spring 中对 Hibernate 的支持，将一些已经定好的方法封装起来，比如开启事务、获取 Session、关闭 Session 等，程序员不重复写那些已经规范好的代码，直接丢一个实体就可以保存。
 * 优点： 1、封装不变部分，扩展可变部分。 2、提取公共代码，便于维护。 3、行为由父类控制，子类实现。
 * 缺点：每一个不同的实现都需要一个子类来实现，导致类的个数增加，使得系统更加庞大。
 * 使用场景： 1、有多个子类共有的方法，且逻辑相同。 2、重要的、复杂的方法，可以考虑作为模板方法。
 * 注意事项：为防止恶意操作，一般模板方法都加上 final 关键词。
 */
// 创建一个抽象类
var Game = /** @class */ (function () {
    function Game() {
    }
    //模板
    Game.prototype.play = function () {
        //初始化游戏
        this.initialize();
        //开始游戏
        this.startPlay();
        //结束游戏
        this.endPlay();
    };
    return Game;
}());
var Cricket = /** @class */ (function (_super) {
    __extends(Cricket, _super);
    function Cricket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cricket.prototype.initialize = function () {
        console.log('Cricket Game Initialized! Start playing.');
    };
    Cricket.prototype.startPlay = function () {
        console.log('Cricket Game Started. Enjoy the game!');
    };
    Cricket.prototype.endPlay = function () {
        console.log('Cricket Game Finished!');
    };
    return Cricket;
}(Game));
var Football = /** @class */ (function (_super) {
    __extends(Football, _super);
    function Football() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Football.prototype.initialize = function () {
        console.log('Football Game Initialized! Start playing.');
    };
    Football.prototype.startPlay = function () {
        console.log('Football Game Started. Enjoy the game!');
    };
    Football.prototype.endPlay = function () {
        console.log('Football Game Finished!');
    };
    return Football;
}(Game));
function run() {
    console.log('--- 模板模式 ---');
    var game = new Cricket();
    game.play();
    console.log('');
    game = new Football();
    game.play();
    console.log('--- 模板模式 ---');
    console.log('');
}

run$m();
run$l();
run$k();
run$j();
run$i();
run$h();
run$g();
run$f();
run$e();
run$d();
run$c();
run$b();
run$a();
run$9();
run$8();
run$7();
run$6();
run$5();
run$4();
run$3();
run$2();
run$1();
run();
