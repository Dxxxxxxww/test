class PersonClass {
  constructor(name) {
    this.name = name
  }
  //等价于 PersonClass.prototype.sayName
  sayName() {
    console.log(this.name)
  }
}

let pt = new PersonClass('dxx')
pt.sayName() // dxx

console.log(pt instanceof PersonClass) //	true
console.log(pt instanceof Object) //	true

console.log(typeof PersonClass) // 'function'
console.log(typeof PersonClass.prototype.sayName) // 'function'