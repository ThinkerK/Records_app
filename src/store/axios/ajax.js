import axios from 'axios'
import qs from 'qs'
//配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
//配置接口地址
//axios.defaults.baseURL = '/api/'
//本地

//axios.defaults.baseURL = 'http://122.113.5.4:8080'
//测试库
// axios.defaults.baseURL = 'http://122.113.5.204:9021'
axios.defaults.baseURL = 'http://124.193.121.7:9021'
//正式库
// axios.defaults.baseURL = 'http://pid.ipolecity.com.cn' // 一定要加上http://	
//返回一个Promise(发送post请求)

//Promise的作用简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数

export default function fetch(url,params){
	return new Promise((resolve,reject) => {
		axios.post(url,qs.stringify(params))
			.then(response => {
				resolve(response.data)
				//--会把函数返回结果传递出去
			})
			.catch((error) => {	//抓取异常
				console.log(error)
				reject(error)
			})
	})
}









