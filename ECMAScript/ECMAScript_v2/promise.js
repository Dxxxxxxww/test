/**
 * 1. promise 的状态
 *  pending
 *  fulfilled
 *  rejected
 *
 *  对象的状态不受外界影响。一旦状态改变，就不会再变。
 *
 * 2. 优缺点
 *  优点：
 *    1）将异步操作以同步的流程表达，解决回调地狱
 *    2）提供统一接口，控制异步操作更加容易。
 *  缺点：
 *    1）无法取消 Promise,一旦新建就会立即执行
 *    2) 如果不设置回调函数, Promise 内部抛出的错误不会反应到外部。（吃掉错误）
 *    3）当处于 pending 状态的时候，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
 *
 *
 * 3. 如果调用 resolve 和 reject 函数时带有参数，那么它们的参数会被传递给回调函数。
 *    reject函数的参数通常是Error对象的实例，表示抛出的错误；
 *    resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样：
 */

const p1 = new Promise((resolve, reject) => {})

const p2 = new Promise((resolve, reject) => {
  resolve(p1)
})

/**
 * 注意此时 p1 的状态就会传递给 p2。也就是说， p1 的状态决定了 p2 的状态。 如果 p1 的状态
 * 是 pending，那么 p2 的回调函数就会等待 p1 的状态改变。
 * 如果 p1 的状态已经是 resolved 或者 rejected，那么 p2 的回调函数将会立刻执行
 */
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2.then((result) => console.log(result)).catch((error) => console.log(error))
// p2 返回的是 p1，而 p1 是一个 promise 对象，这就导致 p2 自己的状态无效了，由 p1 决定
// p2 的状态，所以后面的 then 语句变成针对 p1，到时间后 p1 变成 rejected，导致触发 catch

// 需要注意的是，调用 resolve 和 reject 不会终结 Promise 参数函数的运行。
new Promise((resolve, reject) => {
  resolve(1)
  console.log(2)
}).then((r) => {
  console.log(r)
})
// 2
// 1

// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，
// 后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。
// 所以，最好在它们前面加上return语句，这样就不会有意外。
new Promise((resolve, reject) => {
  return resolve(1)
  // 后面的语句不会执行
  console.log(2)
})

// -------------------------------------------------------------
/**
 * Promise.prototype.then()
 * then方法返回的是一个新的 Promise 实例（注意，不是原来那个 Promise 实例）。
 * 因此可以采用链式写法，即 then 方法后面再调用另一个 then 方法
 */

/**
 * Promise.prototype.catch()
 * Promise.prototype.catch()方法是.then(null, rejection)或
 * .then(undefined, rejection)的别名，用于指定发生错误时的回调函数
 *
 * Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。
 * 也就是说，错误总是会被下一个catch语句捕获。
 *
 * 跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数，
 * Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。通俗的说法就是“Promise 会吃掉错误”
 *
 *
 * catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。
 */

/**
 * Promise.prototype.finally()
 * finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
 * finally方法总是会返回原来的值
 */
Promise.resolve(2).finally((f) => {
  console.log(f)
  return 666
})
// Promise {<fulfilled>: 2}

// 静态方法 ------------------------
/**
 * Promise.all()
 * Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
 */
const p = Promise.all([p1, p2, p3])
/**
 * 上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，
 * 如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
 * 另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
 *
 * p 的状态由两种情况决定：
 * 1.p1, p2, p3 都是 resolve，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数
 * 2.只要其中一个 reject 则将第一个 reject 的值返回
 *
 * 注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，
 * 那么它一旦被rejected，并不会触发 Promise.all() 的 catch 方法。
 * 因为 catch 之后会返回一个新的 promise 对象，会变成resolved
 */

/**
 * Promise.race()
 * race 与 all 的唯一区别就是
 * 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
 * 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
 */
const p = Promise.race([p1, p2, p3])

/**
 * Promise.allSettled() 在一些不关心操作结果，只关心操作有没有结束的场景非常有用。 Promise.all() 方法无法做到这一点
 * Promise.allSettled()方法接受一组 Promise 实例作为参数，
 * 包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，
 * 不管是 fulfilled 还是 rejected，包装实例才会结束。该方法由 ES2020 引入。
 * 该方法返回的新的 Promise 实例，一旦结束，状态总是 fulfilled。
 * 它的监听函数接收到的参数是数组results。该数组的每个成员都是一个对象,
 * 每个对象都有 status 属性，该属性的值只可能是字符串 fulfilled 或字符串 rejected。
 * fulfilled 时，对象有 value 属性，rejected 时有 reason 属性
 */

/**
 * Promise.any() 还处于提案阶段
 * 只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；
 * 如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态
 * Promise.any()跟 Promise.race()方法很像，只有一点不同，就是不会因为某个 Promise 变成 rejected 状态而结束。
 */

/**
 * Promise.resolve()
 * 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。
 * 1.参数是一个 Promise 实例
 *    原封不动返回
 * 2.参数是一个thenable对象
 * let thenable = {
      then: function(resolve, reject) {
        resolve(42);
      }
    };
      将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
 * 3.参数是一个原始值，或者是一个不具有 then 方法的对象
 *    返回新的 Promise 对象，状态为resolved。
 * 4.不带任何参数
 *    直接返回一个 resolved 状态的 promise 对象
 */

/**
 * Promise.reject()
 * Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
 */

// 红绿灯问题：红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用 Promse 实现）
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

function blink(time, cb) {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      cb()
      resolve()
    }, time)
  })
}

function loop() {
  // blink(3000, red)
  Promise.resolve()
    .then(() => {
      return blink(3000, red)
    })
    .then(() => {
      return blink(1000, green)
    })
    .then(() => {
      return blink(2000, yellow)
    })
    .then(() => {
      loop()
    })
}
