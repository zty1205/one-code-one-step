
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
/**
 * FactoryPattern 工厂模式
 * 定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。
 * 优点： 1、一个调用者想创建一个对象，只要知道其名称就可以了。 2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。 3、屏蔽产品的具体实现，调用者只关心产品的接口。
 * 缺点：每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。
 * 使用场景： 1、日志记录器：记录可能记录到本地硬盘、系统事件、远程服务器等，用户可以选择记录日志到什么地方。 2、数据库访问，当用户不知道最后系统采用哪一类数据库，以及数据库可能有变化时。 3、设计一个连接服务器的框架，需要三个协议，"POP3"、"IMAP"、"HTTP"，可以把这三个作为产品类，共同实现一个接口。
 * 注意事项：作为一种创建类模式，在任何需要生成复杂对象的地方，都可以使用工厂方法模式。有一点需要注意的地方就是复杂对象适合使用工厂模式，而简单对象，特别是只需要通过 new 就可以完成创建的对象，无需使用工厂模式。如果使用工厂模式，就需要引入一个工厂类，会增加系统的复杂度。
 */
var Circle$1 = /** @class */ (function () {
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
                shape = new Circle$1();
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
function run$4() {
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
                shape = new Circle();
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
function run$3() {
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
function run$2() {
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
function run$1() {
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
function run() {
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

run$4();
run$3();
run$2();
run$1();
run();
