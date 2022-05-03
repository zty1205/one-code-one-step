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

interface DrawAPI {
  drawCircle(radius: number, x: number, y: number): void;
}

class RedCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(`Drawing Circle color: red, radius: ${radius}, x: ${x}, y: ${y}`);
  }
}

class GreenCircle implements DrawAPI {
  drawCircle(radius: number, x: number, y: number): void {
    console.log(`Drawing Circle color: green, radius: ${radius}, x: ${x}, y: ${y}`);
  }
}

abstract class Shape {
  protected drawAPI: DrawAPI;
  protected constructor(drawAPI: DrawAPI) {
    this.drawAPI = drawAPI;
  }
  public abstract draw(): void;
}

class Circle extends Shape {
  private x: number;
  private y: number;
  private radius: number;

  constructor(x: number, y: number, radius: number, drawAPI: DrawAPI) {
    super(drawAPI);
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw(): void {
    this.drawAPI.drawCircle(this.radius, this.x, this.y);
  }
}

export function run() {
  console.log('--- 桥接模式 ---');

  const redCircle = new Circle(100, 100, 10, new RedCircle());
  const greenCircle = new Circle(100, 100, 10, new GreenCircle());
  redCircle.draw();
  greenCircle.draw();

  console.log('--- 桥接模式 ---');
  console.log('');
}
