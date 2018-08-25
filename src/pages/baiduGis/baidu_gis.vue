<template>
	<div class="gis">
	  <header class="head">
		  <div class="back-btn" v-on:click="goBack"></div>
		  <div class="head-title">数据召测结果</div>
		  <div class="edit">编辑</div>
	  </header>
	  <div class="main">
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
		  <baidu-map class="bm-view"  :center="{lng: 116.404, lat: 39.915}" :zoom="19" @ready="handler" @moveend="mapMoveend">
			<bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
		  </baidu-map>
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
			let pt = {
				lat: this.$store.state.gis_store.newlat,
				lng: this.$store.state.gis_store.newlng
			}
			  this.$store.commit('setpoint',pt);
			window.history.back();
		}
	},
	  computed:{	//属性的一个实时计算
		  ...mapState({		//取state里面的值
			  newlat : state => state.gis_store.newlat,
			  newlng : state => state.gis_store.newlng
		  })
	  },
	  mounted() {
		var map = new plus.maps.Map("allmap") 
		plus.geolocation.getCurrentPosition(function(p) {
          
      	}, function(e) {}, {
         	provider: 'baidu',
        	coordsType: 'bd09ll'
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
		margin-top: 1.77rem;
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
  