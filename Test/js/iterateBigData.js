const strList = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]
let res = []
console.time()
for (let i = 0; i < 34; i++) {
  for (let j = 0; j < 2302; j++) {
    strList.forEach((v) => res.push(v.toUpperCase()))
    // for (let x = 0; x < strList.length; x++) {
    //   res.push(strList[x] + '-')
    // }
  }
}
console.log(strList, res)
console.timeEnd()
