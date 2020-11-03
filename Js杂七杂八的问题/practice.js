
function sleep(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, a*1000)
  })
}

sleep(5).then(() => console.log('hello'))
