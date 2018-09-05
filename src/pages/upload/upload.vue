<template>
    <div class="hello">
        <form id="form" enctype="multipart/form-data" class="form" name="Form2">
            <input type="file" name="file0" id="formIpt" @change=change>
        </form>
        <button @click="upload">123</button>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                name: "yk"
            }
        },
        methods: {
            change() {
                this.upload();
            },
            upload() {
                var result = ""
                var formIpt = document.getElementById('formIpt');
                var formData = new FormData();

                var file = formIpt.files[0]
                formData.append('name', file)
                debugger
                axios.post("http://47.94.243.47:8999/Uploadmxmx/defaultPathUpload?sysNo=21", formData)
                    .then(function (res) {
                        if (res.data.errCode == 0) {
                            console.log(res.data.data[0])
                            // // http://124.193.121.7:9021/publicsController/saveFileTable
                            // axios.post("/publicsAppController/mxmx/saveFileTable?dataStr=["+JSON.stringify(res.data.data[0])+"]&userName=liuwei&userId=001ADVH00001")
                            // .then(function(res){
                            //     console.log(res.data[0].fileId)
                            //     axios.post("/dawhAppController/mxmx/saveTp?dgId=18081521a0000033&picture="+res.data[0].fileId)
                            //     .then(function (res) {
                            //         console.log(res)
                            //     })
                            //     .catch((error) => {
                            //         console.log("保存" + error)
                            //     })
                            // })
                            // .catch((error) => {
                            //     console.log(error)
                            // })
                        }
                    })
                    .catch((error) => {
                        console.log("失败" + error)
                    })


                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function (evt) { //读取完文件之后会回来这里



                    // axios.post("http://122.113.5.205:8999/Uploadmxmx/defaultPathUpload?sysNo=21", formData).then(
                    //     function (res) {
                    //         condole.log("123" + res.data)
                    //         if (res.errCode === 0) {
                    //             var data = JSON.parse(res.data)
                    //             console.log('成功' + data)
                    //         } else {
                    //             console.log("000失败" + res.data.errMsg)
                    //         }
                    //     }
                    // )
                }

            }
        }
    }


    // "responseText":"{\"errMsg\":\"OK\",\
    // "data\":[{\
    //     "fileSize\":\"665344\",\
    //     "fileId\":\"w5VMg3LrcCx7lY25\",\
    //     "fileType\":\"jpg\",\
    //     "filePath\":\"/download/21/2018/08/w5VMg3LrcCx7lY25.jpg\",\
    //     "name\":\"name\",\
    //     "fileName\":\"magazine-unlock-01-2.3.1088-_EA7BA46423DC5E80E19F8FD537376492.jpg\"}]



//     var server = **********; //上传文件的端口
//     var files = []; //文件的数组
//     document.getElementById(& quot; ContractID - btn & quot;).addEventListener('tap', function () {
//         plus.gallery.pick(function (e) {
//             document.getElementById(& quot; ContractID - btn & quot;).innerText = '选择照片(' + e.files.length + ')张';
//         //从相册添加文件
//         appendFile(e); //添加文件
//     }, function (e) {
//         // outSet(&quot;取消选择图片&quot;);
//     }, {
//             filter: & quot; image& quot;,
//             multiple: true,
//             system: false
//         });
// });
//     //上传文件
//     function uploadContract() {
//         var task = plus.uploader.createUpload(server, {
//             method: & quot; POST& quot;
//         }, function (t, status) {
//             if (status == 200) {
//                 plus.nativeUI.closeWaiting();
//                 mui.toast('上传成功');
//                 ContractZIP = JSON.parse(t.responseText).fileName;
//                 rowContract = JSON.parse(t.responseText).rawFiles;
//             } else {
//                 alert('上传失败,请重试');
//             }
//         });
//         task.addData(& quot; fileType & quot;, & quot; 合同 & quot;);
//         task.addData(& quot; customerId & quot;, CustomerId);
//         for (var i = 0; i & lt; files.length; i++) {
//             var f = files[i];
//             task.addFile(f.path, {
//                 key: f.name
//             });
//         }
//         task.start();
//     }
//     //添加文件 
//     function appendFile(p) {
//         plus.nativeUI.showWaiting(& quot; 正在上传...& quot;);
//         var index = 1;
//         files = []; //清空数组，防止重复上传
//         for (var i = 0; i & lt; p.files.length; i++) {
//             var n = p.files[i].substr(p.files[i].lastIndexOf('/') + 1);
//             files.push({
//                 name: & quot; uploadkey& quot; + index,
//                 path: p.files[i]
// });
//         index++;
//     }
//     uploadContract();//添加完文件，开始上传
// }
</script>

<style scoped>
</style>