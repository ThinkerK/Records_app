import axios from 'axios'
import axiosConfig from '../axios/axiosConfig.js'

const state = {	//定义常量，资源库
	newlat : '',
	newlng : ''
}

const actions = {
	getDeviceMsg({commit}){ // 根据输入查询结果列表
    	let searchVal = '021024';
		axiosConfig.maskBaseMsgApi(searchVal)
		.then(res => {
			debugger
		})
    },
}

const mutations = {	
	setPt(state,response){	//保存拖动的经纬度
		state.newlat = response.lat;
		state.newlng = response.lng;
	}
}

export default {
	state,
    actions,
    mutations
}