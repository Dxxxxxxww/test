const { log } = console

// 动态原型模式
// 使用动态原型模式时，不能用对象字面量重写原型
function Car(name) {
  this.name = name
  if (typeof this.getName !== 'function') {
    Car.prototype.getName = function () {
      console.log(this.name)
    }
  }
}
// 如果使用 字面量 形式重写对象。在 new 的时候执行函数代码，只是把 Car.prototype 指向了一个新的对象，而实例对象的__proto__ 依然指向原来的原型对象，所以 getName 不会加到 旧原型对象 上。
// 我们回顾下 new 的实现步骤：
// 首先新建一个对象
// 然后将对象的原型指向 Person.prototype
// 然后 Person.apply(obj)
// 返回这个对象
// 注意这个时候，回顾下 apply 的实现步骤，会执行 obj.Person 方法，这个时候就会执行 if 语句里的内容，注意构造函数的 prototype 属性指向了实例的原型，使用字面量方式直接覆盖 Person.prototype，并不会更改实例的原型的值，person1 依然是指向了以前的原型，而不是 Person.prototype。而之前的原型是没有 getName 方法的，所以就报错了！
function Car(name) {
  this.name = name
  if (typeof this.getName != 'function') {
    Car.prototype = {
      constructor: Car,
      getName: function () {
        console.log(this.name)
      },
    }
  }
}

// 组合模式
// 优点：该共享的共享，该私有的私有，使用最广泛的方式
// 缺点：有的人就是希望全部都写在一起，即更好的封装性
function Animal(name) {
  this.name = name
}

Animal.prototype = {
  constructor: Animal,
  getName() {
    console.log(this.name)
  },
}
const a = new Animal('a')

// 构造函数优化
// 缺点：这叫啥封装
function Person(name) {
  this.name = name
  this.getName = getName
}
function getName() {
  console.log(this.name)
}
const p = new Person('p')
log(p)

// 工厂模式
// 缺点：对象无法识别，所有实例都指向一个原型
function createObject() {
  const o = new Object()
  o.name = 'omg'
  // 这里不能使用箭头函数。箭头函数 this 跟随父级作用域，当 createObject 调用时 确定 this 指向 window
  o.getName = function () {
    log(this, this.name)
  }
  return o
}
const o = createObject()
log(o)
