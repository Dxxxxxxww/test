// 引入mockjs
import Mock from 'mockjs'
// 使用mockjs模拟数据
Mock.mock('/route1', 'get',() => {
	// 当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
	let list = [
		{
			date: '2016-05-02',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1518 弄'
		},
		{
			date: '2016-05-04',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1517 弄'
		},
		{
			date: '2016-05-01',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1519 弄'
		},
		{
			date: '2016-05-03',
			name: '王小虎',
			address: '上海市普陀区金沙江路 1516 弄'
		}
	]

	return {
		tableData: list
	}
})
