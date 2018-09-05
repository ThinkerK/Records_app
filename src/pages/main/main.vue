<template>
	<div class="main" v-bind:class="{ 'code-hide':codeHideFlag }">
		<header class="head" v-on:click="ceshiClick">
			<div class="back-btn"></div>
			<div class="head-title">安装信息</div>
			<div class="edit"></div>
		</header>

		<div class="main-box">
			<!--   add-gis-->
			<ul class="from-box ">

				<li class="list-gis-wrap">
					<div class="list-gis">
						<div class="gis-flag">
							<div class="icon"></div>
							<span class="title">{{lng | gisFlag}}</span>
						</div>
						<div class="gis-btn" v-on:click="toGis"></div>
					</div>
				</li>

				<li class="list">
					<div class="list-title">
						<div class="check active"></div>
						<span class="title">灯杆</span>
					</div>
					<div class="middle-box">
						<input class="list-input" type="text" v-model="poleNum" v-on:blur="poleInputBlur(poleNum)" />
						<ul class="search-wrap" v-show = "searchFlag">
							<li v-for="(item,index) in dghArr" @click="dghLiclick(index)">{{item.dgh}}</li>
						</ul>
					</div>

				</li>

				<li class="list wglist">

					<div class="wgbox" v-for="(item,index) in gatewayData">
						<div class="list-title">
							<div class="check-box">
								<input type="radio" :value="item" :id="'wk_check_'+index" name="lan" />
								<label class="check-title" :for="'wk_check_'+index">{{item.sblxStr}}</label>
							</div>
						</div>
						<div class="device-right">
							<div class="list-zcbh">{{item.sbbh}}</div>
						</div>
					</div>

					<div class="wgbox" v-for="(item,index) in gatewayNum">
						<div class="list-title">
							<div class="check-box">
								<input type="radio"  :id="'wk_check_input_'+index" name="lan" />
								<label class="check-title" :for="'wk_check_input_'+index">物联网关</label>
							</div>
						</div>
						<div class="device-right">
							<input class="list-input" :value="item==''?wgIptVal:item" @input="wgGetfocus(index)" type="text" :id="'wg'+index" v-on:blur="gatewayInputBlur(index)" />
						</div>
						<div class="close-btn" v-on:click="removeWg(index)" v-if=" index != 0  || gatewayData.length != 0"></div>
					</div>

					<div class="wgbox" v-for="(item,index) in glqData">
							<div class="list-title">
								<div class="check-box">
									<input type="radio" :value="item" :id="'wk_check_'+index" name="lan" />
									<label class="check-title" :for="'wk_check_'+index">{{item.sblxStr}}</label>
								</div>
							</div>
							<div class="device-right">
								<div class="list-zcbh">{{item.sbbh}}</div>
							</div>
					</div>

					<div class="wgbox" v-for="(item,index) in glqNum">
							<div class="list-title">
								<div class="check-box">
									<input type="radio"  :id="'wk_check_input_'+index" name="lan" />
									<label class="check-title" :for="'wk_check_input_'+index">用电管理器</label>
								</div>
							</div>
							<div class="device-right">
								<input class="list-input" :value="item==''?glqIptVal:item" @input="glqGetfocus(index)" type="text" :id="'glq'+index" v-on:blur="glqInputBlur(index)" />
							</div>
							<div class="close-btn" v-on:click="removeGlq(index)" v-if=" index != 0 || gatewayData.length != 0"></div>
						</div>
					<div class="addDevic" v-on:click="wgSheet"></div>
				</li>

				<li class="list" style="flex-direction: column;">
					<div class="device-box-for" v-for="(item,index) in deviceData">
						<div class="list-title">
							<div class="check"></div>
							<span class="title">设备 {{item =="" ?"":index+1}}</span>
						</div>
						<div class="device-right" v-show = "deviceData[0] != ''">
							<div class="device-box"  v-on:click="changedev(index)">
								<div class="device-title">{{item.ccbh}}</div>
								<div class="device-main">
									<div class="dev-main-left" v-bind:class="[ item.sblx ? 'pic' + item.sblx  : '']"></div>
									<div class="dev-main-right">
										<div class="main-net">
											<span class="main-title net-title">{{ item.txlx | wkName}}&nbsp;&nbsp;</span>
											<i class="net">{{item.wkh?item.wkh:(item.ckh?item.ckh:item.jdwlxh)}}</i>
											<!--    item.ckh?item.ckh:item.jdwlxh-->
										</div>
										<div class="main-ac">
											<span class="main-title net-title">{{ item.ydlx | ydName}} &nbsp;</span>
											<i class="net">{{item.kzhlh}}</i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="addDevic" v-on:click="addDevic"></div>
				</li>

				<li class="list" style="padding-right: 0">
					<div class="list-title">
						<div class="check"></div>
						<span class="title">现场照片</span>
					</div>
					<div class="img-box">
						<div class="img-item" v-for="(item,index) in imgsArr">
							<!-- <img v-gallery:imgsArr :src="item.src"> -->
							<img v-gallery :src="item.src" alt="">
						</div>
						<div class="img-item img-add" @click="actionSheet">+</div>
					</div>
				</li>
			</ul>
			<div class="btn btn-galy" v-on:click="submitBtn" v-bind:class="{ 'subtrue':submintFlag }">提交</div>
			<div class="box" style="height: 6.5rem"></div>
			<!--扫码按钮-->
			<div class="scan-code-wrap" v-show="hidshow">
				<div class="open-icon" v-show="codeHideFlag" @click="openScan"></div>
				<div class="code-box" @click="toWebCode()">
					<div class="code-icon"></div>
					<div class="code-font">扫码</div>
				</div>
			</div>

			<!-- modal-show-->
			<div class="modal-box">
				<div class="modal-main">
					<div class="modal-body">扫码内容与已有档案冲突确认是否覆盖？</div>
					<div class="modal-btn">
						<div class="btn-see" @click="seeClash">查看冲突档案</div>
						<div class="btn-sure">确定</div>
					</div>
				</div>
			</div>

		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible">
		</mt-actionsheet>
		<mt-actionsheet :actions="wgactions" v-model="wgVisible">
		</mt-actionsheet>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex'
	import { Indicator } from 'mint-ui'
	import { Toast } from 'mint-ui'
	import { isNull } from '../../../static/js/common.js'
	import { Actionsheet } from 'mint-ui';
	import axios from 'axios'
	import qs from 'qs'

	export default {
		data() {
			return {
				docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
				showHeight: document.documentElement.clientHeight,   //实时屏幕高度
				hidshow: true,  //显示或者隐藏footer
				actions: [{
					name: '拍照',
					method: this.getCamera
				}, {
					name: '从相册中选择',
					method: this.getLibrary
				}],
				wgactions: [{
					name: '添加物联网关',
					method: this.addgateway
				}, {
					name: '添加用电管理器',
					method: this.addydglq
				}],
				wgVisible:false,
				sheetVisible: false,// action sheet 默认不显示，为false。操作sheetVisible可以控制显示与隐藏
				dghArr: [],    //灯杆搜索框
				searchFlag: false,   // 搜索框开关
				wgIptVal: '',
				glqIptVal: '',
			}
		},
		filters: {	//判断网口类型
			wkName: function (value) {
				let wk = "";
				if (value == "2") {
					wk = "LAN用网";
				} else {
					wk = "458串口";
				}
				return wk;
			},
			ydName: function (val) {	//电的类型
				let yd = "";
				if (val == "3") {
					yd = "交流用电";
				} else if(val == "2") {
					yd = "POE用电";
				}else if(val =="4") {
					yd = "直流用电";
				}
				return yd;
			},
			gisFlag: function (val) {	//过滤
				let lng = "";
				if (val == "") {
					lng = "未定位";
				} else {
					lng = "定为Ok";
				}
				return lng;
			}
		},
		computed: {	//属性的一个实时计算
			...mapState({		//取state里面的值
				submintFlag: state => state.main_store.submintFlag,	//是否可以提交
				lng: state => state.main_store.lng,
				gatewayData: state => state.main_store.gatewayData,
				glqData: state => state.main_store.glqData,
				glqNum : state => state.main_store.glqNum,
				gatewayNum: state => state.main_store.gatewayNum,		//网关数量
				deviceData: state => state.main_store.deviceData,		//新增设备
				codeHideFlag: state => state.main_store.codeHideFlag,	//隐藏搜索框
				imgsArr: state => state.main_store.imgsArr,
				imgList: state => state.main_store.imgList,
				fileIds: state => state.main_store.fileIds,
				poleId: state => state.main_store.poleId,
			}),
			poleNum: {	//灯杆号
				get() {
					return this.$store.state.main_store.poleNum;
				},
				set(val) {
					var that = this
					this.$store.commit('setPoleNum', val);
					if (val.length >= 10) {
						let poleNum = {
							dgh: val
						}
						this.$store.dispatch("queryPoleData", poleNum);
					}
					// if (val.length > 0) {
					// 	this.searchFlag = true
					// 	let dghKey = {
					// 		dgh: val
					// 	}
					// 	axios.post("/dawhAppController/mxmx/queryDghFuzzy", qs.stringify(dghKey))
					// 		.then(function (res) {
					// 			that.dghArr = res.data.data.slice(0, 21)
					// 		})
					// 		.catch((error) => {
					// 			console.log('失败' + error)
					// 		})
					// } else {
					// 	that.dghArr = []
					// }
				}
			}
		},
		methods: {
			...mapMutations(['ScanState', 'addImgs', 'imgListAdd', 'addfileId', 'delImgList']),
			...mapActions(['queryTp']),
			glqGetfocus(index){
				let id = 'glq'+index
				let ipt = document.getElementById(id)
				this.glqIptVal = ipt.value
			},
			wgGetfocus(index){
				let id = 'wg'+index
				let ipt = document.getElementById(id)
				this.wgIptVal = ipt.value
			},
			actionSheet: function () {
				if (this.poleNum != "") {
					this.sheetVisible = true;
				} else {
					Toast('请先输入灯杆号')
				}
			},
			// baiduGis(){  测试百度sdk
			// 	this.$router.push('/baidugis')
			// },
			wgSheet:function () {
				if (this.poleNum != "") {
					this.wgVisible = true;
				} else {
					Toast('请先输入灯杆号')
				}
			},
			dghLiclick(index) {
				var data = this.dghArr[index].dgh
				this.$store.commit('setPoleNum', data);
				let poleNum = {
					dgh: this.poleNum
				}
				this.searchFlag = false
				this.$store.dispatch("queryPoleData", poleNum);
			},
			uploadPics(imgList) {
				var that = this
				var wt = plus.nativeUI.showWaiting('正在上传...')
				for (let i = 0; i < imgList.length; i++) {
					var name = imgList[0].name
					var uploader = plus.uploader.createUpload("http://47.94.243.47:8999/Uploadmxmx/defaultPathUpload?sysNo=21", { method: "POST" }, function (up, state) {
						if (state == 200) {
							var data = JSON.parse(up.responseText).data[0]
							axios.post("/publicsAppController/mxmx/saveFileTable?dataStr=[" + JSON.stringify(data) + "]&userName=liuwei&userId=001ADVH00001")
								.then(function (res) {
									console.log('=====' + that.poleId)
									console.log("====" + res.data[0].fileId)
									axios.post("/dawhAppController/mxmx/saveTp?dgId=" + that.poleId + "&picture=" + res.data[0].fileId)
										.then(function (res) {
											if (i == imgList.length - 1) {
												wt.close()
												Toast('提交成功')
												that.delImgList()
											}
										})
										.catch((error) => {
											wt.close()
											plus.nativeUI.alert('保存失败，请稍后尝试(saveTp)')
											console.log("saveTp" + state)
										})

								})
								.catch((error) => {
									wt.close()
									plus.nativeUI.alert('保存失败，请稍后尝试(table)')
									console.log("保存" + error)
								})



						}
						else {
							wt.close()
							plus.nativeUI.alert('保存失败，请稍后尝试(---)')
							console.log("上传失败 - ", state);
						}

					});

					uploader.addData("key", name);
					uploader.addFile(imgList[i].path, { "key": "imgList[i].name" });
					uploader.start();
				}
			},
			showPics(url, name) {
				var that = this
				plus.io.resolveLocalFileSystemURL(url, function (entry) {
					entry.file(function (file) {
						var fileReader = new plus.io.FileReader();
						fileReader.readAsDataURL(file);
						fileReader.onloadend = function (e) {
							var picUrl = e.target.result.toString();
							var imgItem = {
								src: picUrl
							}
							that.addImgs(imgItem);
						}
					});
				});
			},
			compressImage(url, filename) {

				var that = this;
				var name = "_doc/upload/" + filename;
				plus.zip.compressImage({
					src: url,//src: (String 类型 )压缩转换原始图片的路径  
					dst: name,//压缩转换目标图片的路径  
					quality: 40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100  
					overwrite: true//overwrite: (Boolean 类型 )覆盖生成新文件  
				},
					function (zip) {
						//页面显示图片
						var path = zip.target
						that.imgListAdd({
							path: zip.target,
							name: name
						})
						that.showPics(zip.target, name);
					}, function (error) {
						plus.nativeUI.toast("压缩图片失败，请稍候再试");
					})
			},
			getCamera: function () {
				var that = this;
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function (p) {
					plus.io.resolveLocalFileSystemURL(p, function (entry) {
						that.compressImage(entry.toLocalURL(), entry.name);
					}, function (e) {
						plus.nativeUI.toast("读取拍照文件错误：" + e.message);
					});
				}, function (e) {
				}, {
						filter: 'image'
					});
			},
			getLibrary: function () {
				var that = this;
				plus.gallery.pick(function (e) {
					var name = e.substr(e.lastIndexOf('/') + 1);
					that.compressImage(e, name);
				}, function (e) {
				}, {
						filter: "image"
					});
			},
			toWebCode() {
				this.$router.push('/h5plus')
			},
			toGis: function () {	//跳转gis页面
				this.$router.push('/gis');
			},
			poleInputBlur: function (val) {		//灯杆失去焦点事件
				var that = this
				if(val.length != 0){
					setTimeout(function(){
					let poleNum = {
						dgh: that.poleNum
					}
					that.searchFlag = false
					that.$store.dispatch("queryPoleData", poleNum);
					},10)
				}	
			},
			ScanCode: function () {	//扫码
				let arr = this.$store.state.main_store.gatewayNum;
				debugger
			},
			submitBtn: function () {	//提交按钮
				if (this.poleNum != '') {
					if (this.imgList.length != 0) {
						this.uploadPics(this.imgList)
					}
					this.$store.commit("submitPoleData");

				} else {
					Toast('请先输入灯杆号')
				}

			},
			addgateway: function () {	//增加网关
				this.$store.commit("setGatewayNum");
			},
			addydglq: function () { //增加用电管理器
				this.$store.commit("addGlq")
			},
			gatewayInputBlur: function (index) {	//网关失去焦点事件
				this.$store.commit("setGatewayNumArr", index);
			},
			glqInputBlur:function (index) {    //用电管理器失去焦点
				this.$store.commit("setGlqNum",index)
			},
			removeWg: function (index) {		//删除物联网关数组
				this.$store.commit("removeGatewayNumArr", index);
			},
			removeGlq: function (index) {		//新增用电管理器数组
				this.$store.commit("removeGlqNumArr", index);
			},
			addDevic: function () {	//新增设备
				this.$store.commit("computedWg");
				let $main = this.$store.state.main_store;
				let newArr = $main.gatewayArr;	//新增数组
				if (newArr.length > 0) {
					this.$router.push('/addDev');
				} else {
					Toast("请添加物联网关");
				}
			},
			changedev: function (index) {	//更改设备页面
				this.$store.commit("toDevice", index);
				this.$router.push('/device');
			},
			ceshiClick: function () {	//测试事件
				//  	this.$store.commit("getDeviceData");
				//			this.$router.push('/code');
			},
			seeClash() {
				this.$router.push('/clash')
			},
			openScan() {
				this.ScanState()
			}

		},
		mounted() {
			// window.onresize监听页面高度的变化
			window.onresize = () => {
				return (() => {
					this.showHeight = document.body.clientHeight;
				})()
			}
		},
		watch: {
			showHeight: function () {
				if (this.docmHeight > this.showHeight) {
					this.hidshow = false
				} else {
					this.hidshow = true
				}
			},
			// poleNum() {
			// 	if (this.poleNum.length >= 9) {
			// 		console.log(poleNum)
			// 	}
			// }
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.open {
		z-index: 1000
	}

	.btn-galy {
		background: #c0c0c0;
	}

	.wgbox .list-title {
		padding-left: 0.74rem;
	}

	.wgbox .list-title .check-box label {
		font-size: 0.55rem;
		color: #fff;
		position: relative;
	}

	.wgbox .list-title .check-box label:after {
		content: "";
		width: 0.40rem;
		height: 0.40rem;
		position: absolute;
		left: -0.70rem;
		top: 0.17rem;
		background: url(../../assets/check.png) no-repeat;
		background-size: 100% 100%;

	}

	.wgbox .list-title .check-box input {
		display: none;
	}

	.check-box input[type="radio"]:checked+label:after {
		background: url(../../assets/checked.png) no-repeat;
		background-size: 100% 100%;
	}

	.from-box .wglist .last-wgbox .list-title {
		padding-left: 0;
	}




	.device-box {
		width: 5.8rem;
		min-height: 1.14rem;
		margin-bottom: 0.15rem;
	}

	.device-title {
		height: 1.58rem;
		line-height: 1.58rem;
		text-align: left;
		color: #bbbcc2;
		font-size: 0.55rem
	}

	.device-main {
		display: flex;
	}

	.device-main .dev-main-left {
		width: 1.2rem;
		height: 1.2rem;
		margin-top: 0.13rem;;
	}

	.device-main .dev-main-right {
		margin-left: 0.45rem;
		color: #bbbcc2;
		font-size: 0.55rem;
	}

	.device-main .main-title {
		margin-right: 0.1rem;
	}

	.modal-box {
		display: none;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10001;
	}

	.modal-show {
		display: block;
	}

	.modal-box .modal-main {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 7.0rem;
		height: 4.5rem;
		background: #fff;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
	}

	.modal-main .modal-body {
		flex: 1;
		padding: 1.2rem 1.2rem 0 1.2rem;
	}

	.modal-main .modal-btn {
		height: 1.3rem;
		width: 100%;
		border-top: 1px solid #C0C0C0;
		border-bottom: 1px solid #C0C0C0;
		border-radius: 0 0 5px 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-btn .btn-see {
		border-right: 1px solid #C0C0C0;
	}

	.modal-btn .btn-see,
	.modal-btn .btn-sure {
		height: 100%;
		width: 50%;
		line-height: 1.3rem;
	}



	.main {
		width: 100%;
		height: 100%;
		background: url(../../assets/index_bg.png) no-repeat;
		background-size: 100% 100%;
		background-position-y: 1.5rem;
		display: flex;
		flex-direction: column;
	}

	.main-box {
		flex: 1;
		padding-bottom: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.head {
		width: 100%;
		height: 1.77rem;
		background: #0c1234;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.36rem 0.40rem 0.3rem 0.40rem;
	}

	.head .back-btn {
		width: 0.40rem;
		height: 0.62rem;
		/*background: url(../../assets/back_bg.png) no-repeat;
    background-size: 100% 100%;*/
	}

	.head .head-title {
		width: 2.70rem;
		height: 0.65rem;
		color: #fff;
		font-size: 0.6rem;
	}

	.head .edit {
		width: 0.90rem;
		height: 0.50rem;
		color: #fff;
		font-size: 0.42rem;
	}

	.list-gis {
		height: 1.60rem;
		padding: 0 0.05rem 0 0.54rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.list-gis .gis-flag {
		width: 3.0rem;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.list-gis .gis-flag .icon {
		width: 0.50rem;
		height: 0.5rem;
		margin-right: 0.35rem;
		background: url(../../assets/gis_check.png) no-repeat;
		background-size: 100% 100%;
	}

	.list-gis .gis-flag .title {
		font-size: 0.55rem;
		color: #fff;
	}

	.list-gis .gis-btn {
		width: 2.5rem;
    	height: 0.9rem;
		border: 1px solid #fff;
		border-radius: 0.05rem;
		background: url(../../assets/gis_btn.png) no-repeat;
		background-size: 100% 100%;
	}

	.from-box {
		padding: 0 0.30rem 0 0.30rem;
		margin-bottom: .80rem;
	}

	.add-gis {
		padding: 0.35rem 0.70rem 0 0.70rem;
		margin-bottom: 2.00rem;
	}

	.from-box .list {
		min-height: 1.58rem;
		margin-bottom: 0.20rem;
		background: rgba(149, 149, 149, 0.1);
		padding: 0 0.72rem 0 0.54rem;
		display: flex;
		justify-content: flex-start;
		/*align-items: center;*/
		position: relative;
	}

	.from-box .list .addDevic {
		width: 0.55rem;
		height: 0.55rem;
		position: absolute;
		right: 0.48rem;
		top: 0.45rem;
		background: url(../../assets/add_bg.png) no-repeat;
		background-size: 100% 100%;
	}

	.list .list-title {
		width: 3.60rem;
		height: 1.58rem;
		display: flex;
		align-items: center;
	}

	.list .list-title .check {
		width: 0.40rem;
		height: 0.40rem;
		margin-right: 0.35rem;
		background: url(../../assets/check.png) no-repeat;
		background-size: 100% 100%;
	}

	.list .list-title .active {
		background: url(../../assets/checked.png) no-repeat;
		background-size: 100% 100%;
	}

	.list .list-title .title {
		font-size: 0.55rem;
		color: #fff;
	}

	.list-input {
		color: #bbbcc2;
		font-size: 0.55rem;
		border: none;
		width: 4.6rem;
		height: 1rem;
		line-height: 1rem;
		background: rgba(255, 255, 255, 0.1);
		outline: none;
		margin-top: 0.3rem;
		border: 1px solid #323957;
	}

	.list-input:focus {
		outline: none;
	}

	.btn {
		width: 6rem;
		height: 1.3rem;
		border: 1px solid #fff;
		line-height: 1.3rem;
		text-align: center;
		margin: 0 auto;
		font-size: 0.55rem;
		color: #fff;
		border-radius: 3px;
	}

	.scan-code-wrap {
		position: fixed;
		left: -8%;
		bottom: 0;
		z-index: 999;
		width: 116%;
		height: 5rem;
		background: #fff;
		border-radius: 50% 50% 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.code-hide .scan-code-wrap {
		bottom: -4.212rem;
	}

	.code-hide .from-box {
		margin-bottom: 0.80rem;
	}

	.scan-code-wrap .code-box {
		width: 3.45rem;
		height: 3.45rem;
		background: #2277da;
		border-radius: 50%;
		padding-top: 0.85rem;
	}

	.scan-code-wrap .code-box .code-icon {
		width: 0.90rem;
		height: 0.90rem;
		background: url(../../assets/scan_code.png) no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		margin-bottom: 0.2rem;
	}

	.code-font {
		color: #fff;
		font-size: 0.55rem;
	}

	.subtrue {
		background: transparent;
	}

	.wglist {
		flex-direction: column;
	}

	.wgbox {
		width: 100%;
		display: flex;
		position: relative;
	}

	.wgbox .close-btn {
		width: 0.55rem;
    height: 0.55rem;
    position: absolute;
    right: 0.05rem;
    top: 0.48rem;
		background: url(../../assets/close_btn.png) center center no-repeat;
		background-size: 90% 90%;
	}

	.list-zcbh {
		font-size: 0.55rem;
		height: 1.58rem;
		line-height: 1.58rem;
		color: #bbbcc2;
		text-align: left;
	}

	.img-box {
		width: 7rem;
		margin-top: 0.5rem
	}

	.img-item {
		overflow: hidden;
		float: left;
		width: 1.8rem;
		height: 1.8rem;
		margin: 0 .24rem .24rem 0;
	}

	.img-add {
		font-weight: 100;
		background: rgba(255, 255, 255, 0.1);
		font-size: 1.4rem;
		line-height: 1.8rem;
		color: rgba(255, 255, 255, 0.12)
	}

	.add-file {
		display: none;
	}

	.open-icon {
		position: absolute;
		width: 1rem;
		height: 1rem;
		margin: 0 auto;
		top: -0.5rem;
		background: url(../../assets/640.gif) center no-repeat;
		background-size: 100%;
		transform: rotate(270deg);
		border-radius: 50%
	}

	.middle-box {
		position: relative
	}

	.search-wrap {
		position: absolute;
		width: 4.3rem;
		height: auto;
		max-height: 4.0rem;
		overflow-y: auto;
		background: rgba(0, 0, 0, 0.8);
		z-index: 100;
		/* display: none */
	}

	.search-wrap li {
		height: 0.8rem;
		width: 100%;
		color: white;
		font-size: .35rem;
		line-height: 0.8rem;
		text-align: left;
	}
	.device-box-for{
		width: 100%;
		display: flex;
	}
</style>