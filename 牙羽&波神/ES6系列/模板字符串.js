// s 的长度总是比 v 的长度大 1
function message(s, ...v) {
  const res = s.reduce((cur, next, i) => {
    return cur + v[i - 1] + next
  })
  return res
}

function message2(s, ...v) {
  let res = ''
  for (let i = 0; i < v.length; i++) {
    res = res + s[i] + v[i]
  }
  res += s[s.length - 1]
  return res
}

// let x = 'Hi',
//   y = 'Kevin'
// const res = message`${x}, I am ${y}`
// console.log(res)

const oneLine = (s, ...v) => {
  let res = s.reduce((cur, next, i) => {
    return cur + v[i - 1] + next
  })
  return res.replace(/\s+/g, ' ').trim()
}

const str = oneLine`
	Hi,
	Daisy!
	I am
	Kevin.
`

console.log(str)
