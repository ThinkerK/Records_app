<template>
  <div class="gis">
    <header class="head">
    	<div class="back-btn" v-on:click="goBack"></div>
    	<div class="head-title">数据召测结果</div>
    	<div class="edit">编辑</div>
    </header>
    <div class="main" id="main">
    	<div class="txt-box">
    		<div class="txt">
    			<span>经度:</span>
    			<i class="lng">{{ newlng | latlng }}</i>
    		</div>
    		<div class="txt">
    			<span>纬度:</span>
    			<i class="lat">{{ newlat | latlng }}</i>
    		</div>
    	</div>
    	<div class="center-point"></div>
    	<div id="allmap" class="map-box"></div>
    </div>
    <div class="bottom-btn-box">
    	<div class="btn btn-default cancel" v-on:click="goBack" >取消</div>
    	<div class="btn btn-blue" v-on:click="replaceClick" >替换</div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import youdian from '@/assets/gis_youdian_icon.png'
import wode from '@/assets/position.png'
import { Toast } from 'mint-ui'

export default {
	name:'',
	data () {
	    return {
	    	
	    }
	},
	filters:{	//过滤器
		latlng: function(value){
			value = Number(value);
			return value.toFixed(8); //经纬度小数点后保存位数
		}
	},
  methods:{
  	goBack:function(){	//返回上一页
  		window.history.back()
  	},
	  replaceClick:function(){	//替换按钮
		if(this.$store.state.main_store.poleNum != ''){
			let pt = {
				lat: this.$store.state.gis_store.newlat,
				lng: this.$store.state.gis_store.newlng
  			}
			this.$store.commit('setpoint',pt);
			Toast("替换成功");
	  		window.history.back();
		}else{
			Toast("请先输入灯杆号");
		}
  		
  	}
  },
	computed:{	//属性的一个实时计算
		...mapState({		//取state里面的值
			newlat : state => state.gis_store.newlat,
			newlng : state => state.gis_store.newlng
		})
	},
	mounted() {	//安装；编译好的html挂载到页面，执行一次
	let mainbox = document.getElementById('main');
	let mapbox = document.getElementById('allmap');
	mapbox.style.height = mainbox.offsetHeight + 'px';
	let that = this;
    // 百度地图API功能
    // 创建Map实例
    let map = new BMap.Map("allmap",{enableMapClick:true});
    
    // 初始化地图,设置中心点坐标和地图级别
    let polePoint = {
    	lng : this.$store.state.main_store.lng,
    	lat :  this.$store.state.main_store.lat,
    }
    
    // 创建标注,添加Marker
		function addMarker(point){
			let pic = new BMap.Icon(youdian, new BMap.Size(38, 42),  {imageOffset : new BMap.Size(0,0)});
			let marker = new BMap.Marker(point,{icon : pic});	//添加标注
		  map.addOverlay(marker);
		}
		
		
    if( polePoint.lng !="" ){
//  	let pole = new BMap.Marker(polePoint);	//创建点坐标
//  	map.centerAndZoom(new BMap.Point(polePoint.lng,polePoint.lat), 19);
      addMarker(polePoint)//标出所在地
	  }
    // 开启鼠标滚轮缩放      
	map.enableScrollWheelZoom(true);

	//H5plus 定位
	var convertor = new BMap.Convertor();
	plus.geolocation.getCurrentPosition(function(position){
			var ggpoint = new BMap.Point(position.coords.longitude,position.coords.latitude)
			var pointArr = [];
			pointArr.push(ggpoint);
			convertor.translate(pointArr, 3, 5, function(point){
				let picon = new BMap.Icon(wode, new BMap.Size(22, 22),  {imageOffset : new BMap.Size(0,0)});
				var marker = new BMap.Marker(point.points[0],{icon: picon});
				map.addOverlay(marker);
				map.centerAndZoom(point.points[0], 19);
				map.panTo(point.points[0]);//地图中心移动
				var gc = new BMap.Geocoder();
				gc.getLocation(point.points[0], function(rs){
					var addComp = rs.addressComponents; 
					//地址信息
				});
			})
			
			// alert('Geolocation suc'+position.coords.latitude + '\nLongitude:' + position.coords.longitude + '\nAltitude:' + position.coords.altitude)
		},function(err){
			Toast("请先打开您的定位系统");
			that.$router.go(-1)
		}
	)
  
  
	map.addEventListener("moveend", function(){		//监听拖动定位
		let cp = map.getBounds(); 	//返回map可视区域
		let pt = cp.getCenter();	//中心点坐标
		that.$store.commit('setPt',pt);	//提交数据到state
	});
	  
	}
	
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.gis{
		width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
	}
	.map-box{
		width: 100%;
		height: 100%;
	}
	.main{
		width: 100%;
		flex: 1;
		background: #ccc;
		position: relative;
	}
	.center-point{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: 100005;
		width: 50px;
		height: 50px;
		background: url(../../assets/center_point.png) no-repeat;
    background-size: 100% 100%;
	}
	.txt-box{
		width: 100%;
		height: 1.00rem;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1009;
		background: rgba(245,168,88,0.6);
		padding: 0 1.00rem;
		display: flex;
	}
	.txt-box .txt{
		width: 50%;
		line-height: 1.00rem;
		color: #fff;
		text-align: left;
		font-size: 12px;
	}
	.bottom-btn-box{
		height: 1.95rem; 
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn{
		width: 4.65rem;
		height: 1.00rem;
		border: 1px solid #217bea;
		font-size: 0.36rem;
		line-height: 1.00rem;
		text-align: center;
	}
	.btn-default{
		background: #fff;
		color: #217bea;
	}
	.btn-blue{
		background: #217bea; 
		color: #fff;
	}
	.cancel{
		margin-right: 0.30rem;
	}
	.head{
		height: 1.77rem; 
		background: #0c1234;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.36rem 0.40rem 0.3rem 0.40rem;
	}
	.head .back-btn{
		width: 0.40rem;
		height: 0.62rem;
		background: url(../../assets/back_bg.png) no-repeat;
    background-size: 100% 100%;
	}
	.head .head-title{
		height: 0.50rem;
		color: #fff;
		font-size: 0.50rem;
	}
	.head .edit{
		width: 0.90rem;
		height: 0.50rem;
		color: #fff;
		font-size: 0.42rem;
	}
	
</style>
