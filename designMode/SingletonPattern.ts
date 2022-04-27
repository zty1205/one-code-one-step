/**
 * SingletonPattern 单例模式
 * 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
 * 关键代码：构造函数是私有的。
 * 优点：1、在内存里只有一个实例，减少了内存的开销，尤其是频繁的创建和销毁实例（比如管理学院首页页面缓存）。2、避免对资源的多重占用（比如写文件操作）。
 * 缺点：没有接口，不能继承，与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化。
 * 使用场景：1、要求生产唯一序列号。2、创建的一个对象需要消耗的资源过多，比如 I/O 与数据库的连接等。
 */

class Singleton {
  private static instance = new Singleton();

  private constructor() {}

  static getInstance() {
    return this.instance;
  }

  say() {
    console.log('Hello Singleton');
  }
}

export function run() {
  // 类“Singleton”的构造函数是私有的，仅可在类声明中访问。
  // let single = new Singleton()
  console.log('\n--- 单例模式 ---');
  const single = Singleton.getInstance();
  single.say();
  console.log('--- 单例模式 ---\n');
}
