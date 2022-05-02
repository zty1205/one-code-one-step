
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/**
 * FactoryPattern 工厂模式
 * 定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。
 * 优点： 1、一个调用者想创建一个对象，只要知道其名称就可以了。 2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。 3、屏蔽产品的具体实现，调用者只关心产品的接口。
 * 缺点：每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。
 * 使用场景： 1、日志记录器：记录可能记录到本地硬盘、系统事件、远程服务器等，用户可以选择记录日志到什么地方。 2、数据库访问，当用户不知道最后系统采用哪一类数据库，以及数据库可能有变化时。 3、设计一个连接服务器的框架，需要三个协议，"POP3"、"IMAP"、"HTTP"，可以把这三个作为产品类，共同实现一个接口。
 * 注意事项：作为一种创建类模式，在任何需要生成复杂对象的地方，都可以使用工厂方法模式。有一点需要注意的地方就是复杂对象适合使用工厂模式，而简单对象，特别是只需要通过 new 就可以完成创建的对象，无需使用工厂模式。如果使用工厂模式，就需要引入一个工厂类，会增加系统的复杂度。
 */
var Circle$2 = /** @class */ (function () {
    function Circle() {
    }
    Circle.prototype.say = function () {
        console.log('::: Circle :::');
    };
    return Circle;
}());
var Rectangle$1 = /** @class */ (function () {
    function Rectangle() {
    }
    Rectangle.prototype.say = function () {
        console.log('::: Rectangle :::');
    };
    return Rectangle;
}());
var Square = /** @class */ (function () {
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
                shape = new Circle$2();
                break;
            case 'RECTANGLE':
                shape = new Rectangle$1();
                break;
            case 'Square':
                shape = new Square();
                break;
            default:
                shape = null;
                break;
        }
        return shape;
    };
    return ShapeFactory;
}());
function run$8() {
    console.log('--- 工厂模式 ---');
    var sf = new ShapeFactory$1();
    var shape = sf.getShape('CIRCLE');
    shape.say();
    console.log('--- 工厂模式 ---\n');
}

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
var Circle$1 = /** @class */ (function () {
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
var AbstractFactory = /** @class */ (function () {
    function AbstractFactory() {
    }
    return AbstractFactory;
}());
// 形状工厂
var ShapeFactory = /** @class */ (function (_super) {
    __extends(ShapeFactory, _super);
    function ShapeFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeFactory.prototype.getShape = function (shapeType) {
        var shape;
        switch (shapeType) {
            case 'CIRCLE':
                shape = new Circle$1();
                break;
            case 'RECTANGLE':
                shape = new Rectangle();
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
            return new ShapeFactory();
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
function run$7() {
    console.log('\n--- 抽象工厂模式 ---');
    var FP = new FactoryProducer();
    var sf = FP.getFactory('SHAPE');
    var cir = sf.getShape('CIRCLE');
    cir.say();
    var cf = FP.getFactory('COLOR');
    var red = cf.getColor('RED');
    red.fill();
    console.log('--- 抽象工厂模式 ---\n');
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
function run$6() {
    // 类“Singleton”的构造函数是私有的，仅可在类声明中访问。
    // let single = new Singleton()
    console.log('\n--- 单例模式 ---');
    var single = Singleton.getInstance();
    single.say();
    console.log('--- 单例模式 ---\n');
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
function run$5() {
    console.log('\n--- 建造者模式 ---');
    var mealBuilder = new MealBuilder();
    var bc = mealBuilder.burgerCombo();
    console.log('burgerCombo套餐: ', bc.getCost());
    bc.showItems();
    var cc = mealBuilder.chickenCombo();
    console.log('chickenCombo套餐: ', cc.getCost());
    cc.showItems();
    console.log('--- 建造者模式 ---\n');
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
function run$4() {
    console.log('\n--- 原型模式 ---');
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
    console.log('--- 原型模式 ---\n');
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
function run$3() {
    console.log('\n--- 适配器模式 ---');
    var audioPlayer = new AudioPlayer();
    audioPlayer.play('mp3', 'My Heart Will Go On.mp3');
    audioPlayer.play('mp4', 'Shape of My Heart.mp4');
    audioPlayer.play('vlc', 'I believe.vlc');
    audioPlayer.play('avi', 'See You Again.avi');
    console.log('--- 适配器模式 ---\n');
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
var Circle = /** @class */ (function (_super) {
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
function run$2() {
    console.log('\n--- 桥接模式 ---');
    var redCircle = new Circle(100, 100, 10, new RedCircle());
    var greenCircle = new Circle(100, 100, 10, new GreenCircle());
    redCircle.draw();
    greenCircle.draw();
    console.log('--- 桥接模式 ---\n');
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
function run$1() {
    console.log('\n--- 过滤器模式 ---');
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
    console.log('--- 过滤器模式 ---\n');
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
function run() {
    console.log('\n--- 组合模式 ---');
    var CEO = new Employee('zty', 'CEO');
    var sale = new Employee('s-header', 'sale');
    var s1 = new Employee('s1', 'sale');
    var s2 = new Employee('s2', 'sale');
    CEO.add(sale);
    sale.add(s1);
    sale.add(s2);
    console.log('CEO = ', CEO);
    console.log('--- 组合模式 ---\n');
}

run$8();
run$7();
run$6();
run$5();
run$4();
run$3();
run$2();
run$1();
run();
