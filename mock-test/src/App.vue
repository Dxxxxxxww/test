<template>
	<div id="app">
		<img alt="Vue logo" src="./assets/logo.png" />
		<HelloWorld msg="Welcome to Your Vue.js App" />
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="date" label="日期" width="180"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
			<el-table-column prop="address" label="地址"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
	name: 'App',
	components: {
		HelloWorld
	},
	data() {
		return {
			tableData: []
		}
	},
	mounted: function() {
		axios
			.get('/route1')
			.then(res => {
				// get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
				this.tableData = res.data.tableData
				console.log(res.data) // 在console中看到数据
			})
			.catch(() => {
				alert('wrong')
			})
	},
	methods: {}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
