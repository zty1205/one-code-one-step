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

interface Shape {
  draw(): void;
}
class Circle implements Shape {
  draw(): void {
    console.log('Shape: Circle');
  }
}

// 实现了 Shape 接口的抽象装饰类。
abstract class ShapeDecorator implements Shape {
  protected decoratedShape: Shape;

  constructor(decoratedShape: Shape) {
    this.decoratedShape = decoratedShape;
  }
  draw(): void {
    this.decoratedShape.draw();
  }
}
// 扩展了 ShapeDecorator 类的实体装饰类。
class RedShapeDecorator extends ShapeDecorator {
  constructor(decoratedShape: Shape) {
    super(decoratedShape);
  }

  draw(): void {
    this.decoratedShape.draw();
    this.setRedBorder(this.decoratedShape);
  }

  setRedBorder(decoratedShape: Shape): void {
    console.log('Border Color: Red');
  }
}

export function run() {
  console.log('--- 装饰器模式 ---');

  const circle = new Circle();
  const redCircle = new RedShapeDecorator(new Circle());

  circle.draw();
  console.log('after Decorator');
  redCircle.draw();

  console.log('--- 装饰器模式 ---');
  console.log('');
}
