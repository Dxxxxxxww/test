// const list = ['0', '1', '10', '100', '100.01', '0.12', '123,123.12,0.12', '123,456,789']
// const a = list.filter((v) => {
//   return /^([1-9]\d{0,12}(\.\d{1,2})?\,$|^0(\.\d{1,2})\,)*([1-9]\d{0,12}(\.\d{1,2})?$|^0(\.\d{1,2}))+$/.test(
//     v
//   )
// })
// list.forEach((v) => {
//   try {
//     if (v.length > 2) {
      
//       throw new Error('abc')
//     }
//     console.log(v)
//   } catch (error) {
//     console.log(error)
//   }
// })

// ^([0-9]*\.*[0-9]{1,12}\,)*([0-9]*\.*[0-9]{1,12})+$ 匹配金额，一串金额
// 一串金额可以通过 split 变成数组循环测试

// console.log(a)
function fn(fee) {
  let str
  if (fee.includes(',')) {
    str = fee.split(',').reduce((now, next) => {
      return now + ',' + Number(next).toFixed(2)
    }, '')
    return str.slice(1)
  }
  return '0.00'
}

console.log(fn('0.01,0.02,100.12'))

