// 套用下面的公式，就可以利用 Math.random()
// 从某个整数范围内随机选择一个值。
// 值 = Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)
// 公式中用到了 Math.floor()方法，这是因为 Math.random()总返回一个小数值。而用这个小数
// 值乘以一个整数，然后再加上一个整数，最终结果仍然还是一个小数。
const num = Math.floor(Math.random() * 10 + 1)

/**
 * @description 求和
 * @param {Number | String} a
 * @param {Number | String} b
 * @returns {Number}
 */
export function add(a, b) {
  let c = 0,
    d = 0,
    e = 1
  try {
    c = (a.toString().split('.')[1] || '').length
    d = (b.toString().split('.')[1] || '').length
  } catch (error) {
    console.log(error)
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e
}

/**
 * @description 求差
 * @param {Number | String} a
 * @param {Number | String} b
 * @returns {Number}
 */
export function sub(a, b) {
  let c = 0,
    d = 0,
    e = 1
  try {
    c = (a.toString().split('.')[1] || '').length
    d = (b.toString().split('.')[1] || '').length
  } catch (error) {
    console.log(error)
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e
}

/**
 * @description 求积
 * @param {Number | String} a
 * @param {Number | String} b
 * @returns {Number}
 */
export function mul(a, b) {
  let c = 0,
    d = a.toString(),
    e = b.toString()
  try {
    // c += d.split('.')[1].length
    // c += e.split('.')[1].length
    c =
      c +
      (d.toString().split('.')[1] || '').length +
      (e.toString().split('.')[1] || '').length
  } catch (error) {
    console.log(error)
  }
  return (
    (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
  )
}

/**
 * @description 求商
 * @param {Number | String} a
 * @param {Number | String} b
 * @returns {Number}
 */
export function div(a, b) {
  let c = 1,
    d = 1,
    e = 0,
    f = 0
  try {
    // let list = a.toString().split('.')
    // e = list.length > 1 ? list[1].length : 1
    // f = b.toString().split('.')[1].length
    e = (a.toString().split('.')[1] || '').length
    f = (b.toString().split('.')[1] || '').length
  } catch (error) {
    console.log(error)
  }
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return mul(c / d, Math.pow(10, f - e))
}
