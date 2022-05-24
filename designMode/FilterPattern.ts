/**
 * FilterPattern 过滤器模式
 * 过滤器模式（Filter Pattern）或标准模式（Criteria Pattern）是一种设计模式，这种模式允许开发人员使用不同的标准来过滤一组对象，通过逻辑运算以解耦的方式把它们连接起来。
 * 这种类型的设计模式属于结构型模式，它结合多个标准来获得单一标准。
 * js Array中的filter就属于该模式
 */

class Person {
  name: string;
  gender: string;

  constructor(name: string, gender: string) {
    this.name = name;
    this.gender = gender;
  }
}

interface Criteria {
  meetCriteria(persons: Array<Person>): Array<Person>;
}

class CriteriaMale implements Criteria {
  meetCriteria(persons: Array<Person>): Array<Person> {
    const ps = [];
    for (let p of persons) {
      if (p.gender === 'Male') {
        ps.push(p);
      }
    }
    return ps;
  }
}

class CriteriaFemale implements Criteria {
  meetCriteria(persons: Array<Person>): Array<Person> {
    const ps = [];
    for (let p of persons) {
      if (p.gender === 'Female') {
        ps.push(p);
      }
    }
    return ps;
  }
}

export function run() {
  console.log('--- 过滤器模式 ---');

  const persons = [
    new Person('Robert', 'Male'),
    new Person('John', 'Male'),
    new Person('Laura', 'Female'),
    new Person('Diana', 'Female')
  ];

  const male = new CriteriaMale();
  const female = new CriteriaFemale();
  console.log('males ', male.meetCriteria(persons));
  console.log('females ', female.meetCriteria(persons));

  console.log('--- 过滤器模式 ---');
  console.log('');
}
