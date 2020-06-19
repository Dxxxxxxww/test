const { log } = console

// 寄生组合继承
function Phone(name) {
  this.name = name
}

function Android() {
  Phone.call(this, 'android')
}

function create(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  child.prototype = create(parent.prototype)
  child.prototype.constructor = child
}

prototype(Android, Phone)

// 原型式继承
// 就是 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
// 缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
function createObj(proto) {
  function F() {}
  F.prototype = proto
  return new F()
}

var person = {
  name: 'kevin',
  friends: ['daisy', 'kelly'],
}

var person1 = createObj(person)
var person2 = createObj(person)

person1.name = 'person1'
console.log(person2.name) // kevin

person1.firends.push('taylor')
console.log(person2.friends) // ["daisy", "kelly", "taylor"]

// 组合继承(经典继承)
// 优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
// 缺点：是会调用两次父构造函数。
//      一次是设置子类型实例的原型的时候  Child.prototype = new Parent();
//      一次在创建子类型实例的时候  var child1 = new Child('kevin', '18')
// 要避免这种情况，可以使用 Object.create() 或者模拟实现的 create 详见 ./ES5面向对象.html
// 所以最终代码见上面 寄生组合继承
function Car(name) {
  this.name = name
}

Car.prototype.getName = function () {
  console.log('name', this.name)
}

function Benz() {
  Car.call(this, 'benz')
}

Benz.prototype = new Car()
Benz.prototype.constructor = Benz

const b = new Benz()
log(b)

// 借用构造函数继承
// 优点：1.避免了引用类型变量被子类所有实例共享 (因为这样直接将变量建立到子类实例上)。
//      2.可以在子类中向父类传参。
// 缺点：方法都在构造函数中定义，每次新建实例的时候所有方法都需要创建一遍。
function Animal(name) {
  this.name = name
  this.getName = () => {
    log(this.name)
  }
}

function Cat() {
  Animal.call(this, 'cat')
}
const cat = new Cat()
log(cat)

// 原型链继承
// 缺点：父级引用类型变量被子类所有实例共享
function Parent() {
  this.name = ['aa']
  this.age = 18
}

function Child() {}

Child.prototype = new Parent()

const c = new Child()
c.name.push('bb')
c.age = 19

const c2 = new Child()
log(c2.name, c2.age) // [ 'aa', 'bb' ]
