import axios from 'axios'
import Ajax from '../axios/axiosConfig.js'

const state = {	//定义常量，资源库
	jlydFlag : false,		//交流用电标识
	zlydFlag : false,		//直流用电标识
	poeydFlag : true,		//poe用电
	
	lanwkFlag : true,		//lan网标识
	ckwkFlag : false,		//串口标识
	sbModel : false,		//替换设备弹框
	sblx: "",				//设备类型
	sblxStr : "",
	sbmc: "",				//设备名称
	ccbh : "",				//出厂编号
	wlwgNum : "",				//资产编号
	sswlwg : '',			//所属物联网关
	sblxArr:[
		{"sblx":1,"sbmc":"ap"},
		{"sblx":2,"sbmc":"摄像头"},
		{"sblx":3,"sbmc":"PM2.5"},
		{"sblx":4,"sbmc":"4G微站"},
		{"sblx":5,"sbmc":"lora基站"},
		{"sblx":6,"sbmc":"多媒体屏"},
		{"sblx":7,"sbmc":"广播"},
		{"sblx":10,"sbmc":"充电桩"}
	],	//设备类型数组
	choice : "",				//选择设备类型
	wkData : "",				//网口信息
	dkData : "",				//电口信息
	txlx:"2",
	txfs : "2",					//通讯方式
	jdwlxh : "",				//lan口
	ckh : "",					//485串口
	ydlx : "2",					//用电类型
	kzhlh : "0"					//电口
	
	
}

const actions = {
	getwkData({commit},data){	//获取网口信息
		Ajax.getwkData(data).then(function(res){
    		commit('setwkData', res);
    	});
	},
	getydData({commit},data){	//用电信息
		Ajax.getwkData(data).then(function(res){
    		commit('setydData', res);
    	});
	}

}

const mutations = {	//改变state里面的数据
	
	selectSswlwg(state,index){
		let zcbh = index.substring(0,7);
			let data = {
	  			zcbh : zcbh,
	  			type : 1,
	  		}
			this.dispatch("getwkData",data);
			let data1 = {
				zcbh:zcbh,
				type : 1
			}
			this.dispatch("getydData",data1);
		state.sswlwg = index
	},
	
	addsetydState(state,res){		//用电切换
		state.zlydFlag = res.zlydFlag;
		state.jlydFlag = res.jlydFlag;
		state.poeydFlag = res.poeydFlag
	},
	addsetywState(state,res){		//用网切换
		state.lanwkFlag = res.lanwkFlag;
		state.ckwkFlag = res.ckwkFlag;
	},
	addsetsbModel(state,res){	//弹窗
		state.sbModel = res;
	},
	setChoice(state,res){	//设置state的数据
		state.sblx = res.sblx;
		state.sbmc = res.sbmc;
		state.sblxStr = res.sbmc;
	},
	setSblx(state,res){		//设置设备编号-------弃用
		state.sblx = res.sblx;
		state.sbmc = res.sbmc;
	},
	setwkData(state,res){	//设置网口信息
		state.wkData = res;
	},
	setydData(state,res){	//设置电口信息
		state.dkData = res;
	},
	settxfs(state,res){		//设置通讯方式
		state.txfs = res;
	},
	setydlx(state,res){		//设置用电类型
		state.ydlx = res;
	},
	setlan(state,res){	//lan口
		state.jdwlxh = res;
		state.ckh = ""
	},
	setck(state,res){		//串口
		state.ckh = res;
		state.jdwlxh = "";
	},
	setdk(state,res){		//电口
		state.kzhlh = res;
	},
	setwlwgNum(state,res){	//设置物联网关号
		state.wlwgNum = res;
  		let data = {
  			zcbh : (state.wlwgNum).substring(0,7),
  			type : "1"
  		}
		this.dispatch("getwkData",data);
		
  		let data1 = {
  			zcbh : (state.wlwgNum).substring(0,7),
  			type : 3,
  		}
  		this.dispatch("getydData",data1);
	},
	setCcbh(state,res){
		state.ccbh = res; 
	}
	
}

export default {
	state,
    actions,
    mutations
}








