	/**
	 *	文件上传
	 *	var formData = new FormData($('#companyForm')[0]);
	 *  @param formData 文件的formData
	 *  @returns fileId 文件ID
	 */
	AJAX.uploadFile = function(formData){
		var result = "";
		jQuery.support.cors = true;
		$.ajax({
			type: 'post',
			url: uploadFilePath + "/Uploadmxmx/defaultPathUpload?sysNo=" + Config.getString("sysNo"),
			async:false,
			data: formData,
			contentType: false,
			processData: false,
			error: function(data,transport){ 
				error("文件上传失败，查看文件服务器tomcat。");
			},
			success: function(data) {
				data = JSON.parse(data);
				if(data.errCode == "0"){
					result = mx.AJAX.String("/publicsController/saveFileTable?dataStr="+JSON.stringify(data.data));
				}else{
					error(data.errMsg);
				};
			}
		});
		return result;
	};