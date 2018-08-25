var mx = {
	/**
	 * 判断是否为空
	 * @param obj
	 *            要判断的数据
	 * @returns  boolean
	 */
	isNull : function(obj) {
		if (obj === undefined || obj === "undefined" || obj === null || obj === "null" || obj === "" || obj === "{null}") {
			return true;
		}
		return false;
	},
	
	/**
	 * 判断是否为方法对象
	 * @param obj
	 *            要判断的数据
	 */
	isFunction : function(obj) {
		try {
			if (typeof eval(obj) == "function")
				return true;
		} catch (e) {
		}
		return false;
	},
	
	/**
	 * 获取html Url传递数据
	 * @returns 参数 JSON数据
	 */
	getUrlData : function(){
		var locationSearch = window.location.search;
		var jsonData = {};
		if (locationSearch.length > 1) {
			var dataArr = locationSearch.substring(1).split("&");
			for (var i = 0; i < dataArr.length; i++) {
				var data = dataArr[i].split("=");
				jsonData[data[0]] = data[1];
			}
		}
		return jsonData;
	},
	/**
	 * string对象转化为json对象
	 * @param json
	 *            要转换成JSON的字符串
	 */
	stringToJson : function(stringValue) {
	if (!isNull(stringValue)) {
		try {
			eval("var theJsonValue = " + stringValue);
			return theJsonValue;
		} catch (e) {
		}
	}
	return "";
}
};

