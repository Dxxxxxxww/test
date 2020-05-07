// Node.js 在升级到 11.x 后，Event Loop 运行原理发生了变化，一旦执行一个阶段里的一个宏任务(setTimeout,setInterval 和 setImmediate) 就立刻执行微任务队列，这点就跟浏览器端一致。
// 关于 11.x 版本之前 Node.js 与 浏览器环境下事件循环的区别，可以参考 @浪里行舟 大佬的 《浏览器与 Node 的事件循环(Event Loop)有何区别?》，这里就不多废话了。

// 作者：YanceyOfficial
// 链接：https://juejin.im/post/5cbc0a9cf265da03b11f3505
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// EventLoop 执行顺序： 1、同步代码。2、微任务。3、宏任务
// 每执行完一个宏任务，会执行所有的微任务。
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
async1()
new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')

// function async1() {
//   console.log('async1 start') // 2

//   Promise.resolve(async2()).then(() => {
//     console.log('async1 end') // 6
//   })
// }

// function async2() {
//   console.log('async2') // 3
// }

// console.log('script start') // 1

// setTimeout(function () {
//   console.log('settimeout') // 8
// }, 0)

// async1()

// new Promise(function (resolve) {
//   console.log('promise1') // 4
//   resolve()
// }).then(function () {
//   console.log('promise2') // 7
// })
// console.log('script end') // 5
