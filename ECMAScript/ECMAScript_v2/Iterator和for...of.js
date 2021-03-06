/*
  *定义：
    遍历器(Iterator)： 它是一种接口，为不同的数据结构(主要是array object map set)提供统一的数据访问机制。
    任何一种数据结构只要部署了 Iterator 接口，就可以遍历。

  作用：
    1、为各种数据结构，提供一个统一的、简便的访问接口。
    2、使数据按照某种顺序排列。
    3、创建了新的遍历命令 for...of，Iterator 主要供 for...of 消费。
  
  Iterator 的遍历过程：
    1、创建一个指向数据结构起始位置的指针对象(遍历器本质是一个指针对象)
    2、第一次调用指针对象的next()方法，将指针指向数据结构的第一个对象。
    3、第二次调用指针对象的next()方法，将指针指向数据结构的第二个对象。
    4、不断调用next()方法，直到指向结束位置。
 */

const { log } = console
// 遍历过程代码模拟
/*
// 新建一个遍历器生成函数
const makeIterator = (arr) => {
  let i = 0
  // 返回一个遍历器对象
  return {
    next() {
      return i < arr.length
        ? { value: arr[i++], done: false }
        : { value: undefined, done: true }
        // { value: arr[i++] }
        // { done: true }
    },
  }
}

const it = makeIterator(['a', 'b'])
log(it.next()) //{ value: 'a', done: false }
log(it.next()) //{ value: 'b', done: false }
log(it.next()) //{ value: undefined, done: true }
*/

/*
  如果使用 ts 遍历器接口(Iterable)，遍历器(Iterator)，next 方法可以描述为
*/

/*
interface IterationResult {
  value: any
  done: boolean
}

interface Iterator {
  next(value?: any): IterationResult
}

interface Iterable {
  // 也就是说当使用 for...of 遍历数据结构时
  // 会自动去调用遍历器生成函数，返回遍历器对象(Iterator)
  // 供 for...of 消费
  [Symbol.iterator](): iterator
}
*/

/*
 // *默认 Iterator 接口：
  一种数据接口，只要部署了 Iterator 接口，我们就称其是可遍历的。
  ES6规定，默认的 Iterator 接口部署在数据结构的 Symbal.iterator 属性 => 只要某种数据结构含有 Symbal.iterator 属性，那它就是可遍历的。

  Symbal.iterator 属性: 函数，返回 遍历器对象(Iterator)
*/

/*
const arr = ['a', 'b', 'c', 'd']
const it = arr[Symbol.iterator]()

log(it.next()) // { value: 'a', done: false }
log(it.next()) // { value: 'b', done: false }
log(it.next()) // { value: 'c', done: false }
log(it.next()) // { value: 'd', done: false }
log(it.next()) // { value: undefined, done: true }
*/

/*
  由上代码可知，遍历器对象的关键是 next 函数
*/

/*
  原生具备 Symbol.iterator 属性的数据结构：
  1、Array
  2、Set
  3、Map
  4、String
  5、NodeList 对象
  6、arguments 对象
  7、TypedArray // 一个类型化数组（TypedArray）对象描述了一个底层的二进制数据缓冲区（binary data buffer）的一个类数组视图（view）。事实上，没有名为 TypedArray 的全局属性，也没有一个名为 TypedArray 的构造函数。相反，有许多不同的全局属性，它们的值是特定元素类型的类型化数组构造函数

  Object 不具备 Symbol.iterator 属性(当然，可以自定义)。严格地说，对象部署遍历器接口没有必要，因为已经有了 Map 数据结构了。
*/

/*
// 给对象增加 Symbol.iterator 接口
class RangeIterator {
  constructor(start, stop) {
    this.value = start
    this.stop = stop
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    const val = this.value
    if (val < this.stop) {
      this.value++
      return { done: false, value: val }
    }
    return { done: true, value: undefined }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop)
}

for (const v of range(0, 3)) {
  log(v) // 0 1 2
}
*/

/*
  // 给类似数组对象添加遍历器接口的简单方法就是直接使用数组的遍历器接口
  arrayLike.prototype[Symbol.iterator] = [][Symbol.iterator]
*/

/*
  如果 Symbol.iterator 接口部署的不是遍历器生成函数，则解释引擎会报错。
*/

/*
  *调用 Iterator 接口的场合
  除了 for...of 外，还有以下场景默认调用 Iterator接口(Symbol.iterator)：
  1、...扩展运算符
  2、数组，Set 解构赋值
  3、yield*
  4、其他场合：
          for...of, Array.from(), new Map()/Set()/WeakMap()/WeakSet(), Promise.all(). Promise.race()
*/

/*
// 数组，Set 解构赋值
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];
*/

/*
// 证明 Array.from 会调用遍历器接口
const arr1 = ['a', 'b', 'c', 'd']
arr1[Symbol.iterator] = function() {
  let i = 0
  // 返回一个遍历器对象
  return {
    next() {
      console.log('abc')
      return i < arr1.length
        ? { value: arr1[i++], done: false }
        : { value: undefined, done: true }
    },
  }
}
const azz = Array.from(arr1) // abc * 5
*/

/*
  *字符串的 Iterator 接口
  字符串是一个类似数组的数据结构，也具有 Symbol.iterator 接口
 */

/*
const str = 'abcdef'
log(typeof str[Symbol.iterator]) // function
const its = str[Symbol.iterator]()
log(its.next()) // { value: 'a', done: false }
log(its.next()) // { value: 'b', done: false }
log(its.next()) // { value: 'c', done: false }
log(its.next()) // { value: 'd', done: false }
log(its.next()) // { value: 'e', done: false }
log(its.next()) // { value: 'f', done: false }
log(its.next()) // { value: undefined, done: true }
*/

/*
 *遍历器的最简单实现就是使用 generator 函数
 */

/*
([])[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}

const obj = {
  * [Symbol.iterator]() {
    yield 'hello'
    yield 'world'
  }
}
*/

/*
  *遍历器的 return throw 方法：
    遍历器的 next 方法是必须的， 
    return(遍历中断跳出循环，通常是因为出错或者break) 
    throw(一般用于配合 generator 函数使用，普通遍历器用不上) 可选
 */

/*
  *for...of:
    可以使用 for...of 的数据结构：
    Array Set Map arguments NodeList
    总结：具备 Iterator 接口的数据结构，Generator 对象，字符串
 */

/*
  // 对象在不设置 Symbol.iterator 接口情况下使用 for...of 
  const o = { a: 1, b: 2 }
  // 使用 Object.keys()
  for (const k of Object.keys(o)) {
    log(k + '->' + o[k]) // a->1 b->2
  }
  // 使用 Generator 函数包裹
  function* g(o) {
    for (const k of Object.keys(o)) {
      yield [k, o[k]]
    }
  }
  
  for (const v of g(o)) {
    log(v) // [ 'a', 1 ]  [ 'b', 2 ]
  }
  */
