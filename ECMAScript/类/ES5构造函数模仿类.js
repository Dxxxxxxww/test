function PersonType(name) {
  this.name = name
}

PersonType.prototype.sayName = function () {
  console.log(this.name)
}

let pt = new PersonType('dxx')
pt.sayName() // dxx

console.log(pt instanceof PersonType) //true
console.log(pt instanceof Object) //true
