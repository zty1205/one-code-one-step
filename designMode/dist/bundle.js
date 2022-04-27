
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
function run$1() {
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
function run() {
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

run$1();
run();
