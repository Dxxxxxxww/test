// 二维拍平成一维数组
function simpleNormalizeChildren(children) {
  for (let i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      // 这里的children最多只有二维
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
// 因为是 apply 方法，所以参数的第一维数组其实就被拆开了，(如果还不理解请查看 apply 模拟实现)
// 这段代码实际上就等同于
// [].concat(1,2,3,[4,5])
console.log(simpleNormalizeChildren([1, 2, 3, [4, 5]]))
