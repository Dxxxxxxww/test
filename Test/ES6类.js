const log = console.log
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}

var point = new Point(2, 3)

point.toString() // (2, 3)

// log(point.hasOwnProperty('x')) // true
// log(point.hasOwnProperty('y')) // true
// log(point.hasOwnProperty('toString')) // false
// log(point.__proto__.hasOwnProperty('toString')) // true

class Circle {
  x = '1'
  y = '2'

  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
}

var circle = new Circle(2, 3)

circle.toString() // (2, 3)
log(circle.hasOwnProperty('x')) // true
log(circle.hasOwnProperty('y')) // true
log(circle.hasOwnProperty('toString')) // false
log(circle.__proto__.hasOwnProperty('toString')) // true