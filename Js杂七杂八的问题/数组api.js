const { log } = console
const list = [1, 2, 3, 4, 5, 6]

list.forEach(v => {
  if (v == 3) {
    return // 这里可以 return 掉，不会输出 3 ，但是循环依旧继续
  }
  log('def', v)
})
