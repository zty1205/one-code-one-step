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

interface Shape {
  draw(): void;
}
class Rectangle implements Shape {
  draw() {
    console.log(' Rectangle ::: draw() ');
  }
}
class Square implements Shape {
  draw() {
    console.log(' Square ::: draw() ');
  }
}

// 创建一个外观类。
class ShapeMaker {
  private square: Shape;
  private rectangle: Shape;

  constructor() {
    this.rectangle = new Rectangle();
    this.square = new Square();
  }
  drawSquare() {
    this.square.draw();
  }
  drawRectangle(): void {
    this.rectangle.draw();
  }
}

export function run() {
  console.log('');
  console.log('--- 外观模式 ---');

  const shapeMaker = new ShapeMaker();
  shapeMaker.drawRectangle();
  shapeMaker.drawSquare();

  console.log('--- 外观模式 ---');
  console.log('');
}
