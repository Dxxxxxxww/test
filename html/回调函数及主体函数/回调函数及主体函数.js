function func(cb) {
  cb()
  console.log('主函数体')
}

func(function() {
  console.log('回调函数')
})

