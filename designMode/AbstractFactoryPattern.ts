/**
 * AbstractFactoryPattern 抽象工厂模式
 * 抽象工厂模式（Abstract Factory Pattern）是围绕一个超级工厂创建其他工厂。该超级工厂又称为其他工厂的工厂。
 * 提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。
 * 应用实例：在您的家中，某一个衣柜（具体工厂）只能存放某一种这样的衣服（成套，一系列具体产品），每次拿这种成套的衣服时也自然要从这个衣柜中取出了。用 OOP 的思想去理解，所有的衣柜（具体工厂）都是衣柜类的（抽象工厂）某一个，而每一件成套的衣服又包括具体的上衣（某一具体产品），裤子（某一具体产品），这些具体的上衣其实也都是上衣（抽象产品），具体的裤子也都是裤子（另一个抽象产品）。
 * 优点：当一个产品族中的多个对象被设计成一起工作时，它能保证客户端始终只使用同一个产品族中的对象。
 * 缺点：产品族扩展非常困难，要增加一个系列的某一产品，既要在抽象的 Creator 里加代码，又要在具体的里面加代码。
 * 使用场景： 1、QQ 换皮肤，一整套一起换。 2、生成不同操作系统的程序。
 * 注意事项：产品族难扩展，产品等级易扩展
 */
interface Color {
  fill: () => void;
}
class Red implements Color {
  fill() {
    console.log('::: fill red :::');
  }
}
class Green implements Color {
  fill() {
    console.log('::: fill Green :::');
  }
}
interface Shape {
  say: () => void;
}
class Circle implements Shape {
  say() {
    console.log('::: Circle :::');
  }
}
class Rectangle implements Shape {
  say() {
    console.log('::: Rectangle :::');
  }
}

type FactoryColor = null | Red | Green;
type FactoryShape = null | Circle | Rectangle;

abstract class AbstractFactory {
  public abstract getColor(color: string): FactoryColor;
  public abstract getShape(shape: string): FactoryShape;
}
// 形状工厂
class ShapeFactory extends AbstractFactory {
  getShape(shapeType: string): FactoryShape {
    let shape: FactoryShape;
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
  }
  getColor(): FactoryColor {
    return null;
  }
}
// 颜色工厂
class colorFactory extends AbstractFactory {
  getShape(): FactoryShape {
    return null;
  }
  getColor(colorType: string): FactoryColor {
    let color: FactoryColor;
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
  }
}

// 抽象工厂
class FactoryProducer {
  getFactory(choice: string) {
    if (choice === 'SHAPE') {
      return new ShapeFactory();
    } else if (choice === 'COLOR') {
      return new colorFactory();
    } else {
      return null;
    }
  }
}

export function run() {
  console.log('--- 抽象工厂模式 ---');

  const FP = new FactoryProducer();
  const sf = FP.getFactory('SHAPE');
  const cir = sf.getShape('CIRCLE');
  cir.say();

  const cf = FP.getFactory('COLOR');
  const red = cf.getColor('RED');
  red.fill();

  console.log('--- 抽象工厂模式 ---');
  console.log('');
}
