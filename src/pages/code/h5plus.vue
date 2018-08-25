<template>
  <div class="scan">
    <div id="bcid">
      <div class="close" @click = 'closeScan'>×</div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  let scan = null;

  export default {
    data() {
      return {
        codeUrl: '',
      }
    },
    methods: {
      ...mapActions(['queryPoleData']),
      //创建扫描控件
      startRecognize() {
        let that = this;
        if (!window.plus) return;
        scan = new plus.barcode.Barcode('bcid', [plus.barcode.QR],{
          frameColor:'#2277da',
          scanbarColor:'#2277da'
        });
        scan.onmarked = onmarked;

        function onmarked(type, result, file) {
          //取参数
          if(result.indexOf('?') != -1){//这里要判断是否还有参数
            var resObj = result.split('?')
            console.log(resObj)
            if(resObj[1].indexOf('&') != -1){
              var params = resObj[1].split('&');
            }else{
              var params = resObj[1]
            }
            var get = {};
            for(var i in params){
              var param = params[i].split('=')
              get[param[0]] = param[1]
            }
            console.log(get)
            if(get.dgbh != ''){
              let dgh={
                dgh:get.dgbh
              }
              that.$store.state.main_store.poleNum = dgh.dgh
              that.queryPoleData(dgh);
              that.closeScan();
            }else{
              alert('不支持该产品')
              that.closeScan();
            }
          }else{
            alert('不支持该产品')
            that.closeScan();
          }
        }
      },
      //开始扫描
      startScan() {
        if (!window.plus) return;
        scan.start();
      },
      //关闭条码识别控件
      closeScan() {
        if (!window.plus) return;
        scan.cancel();
        scan.close();
        this.$router.push('/')
      }
    },
    mounted() {
      this.startRecognize();
      this.startScan();
    }
  }
</script>
<style scoped>
  .scan {
    height: 100%;
  }
  #bcid {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      text-align: center;
      color: #fff;
      background:black;
   }
   .close{
			position: absolute;
			right: .5rem;
			top: 1rem;
			z-index:10000;
			color: white;
			font-size: 1.2rem;
      z-index: 10
		}
</style>