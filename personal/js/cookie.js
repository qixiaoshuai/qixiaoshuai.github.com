// 设置cookie
function setCookie(name,value,iDay){
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie = name+'='+value+';path=/;expires='+oDate;
	}else{
		document.cookie = name+'='+value+';path=/';
	}
}

// 获取cookie
function getCookie(name){
	// document.cookie -> 
	// 'username=xm; age=18; sex=man'
	var arr = document.cookie.split('; ');
	// ['username=xm','age=18','sex=man']
	for(var i=0; i<arr.length; i++){
		var arr2 = arr[i].split('=');
		if(arr2[0] == name){
			return arr2[1];
		}
	}
}

// 删除cookie
function removeCookie(name){
	setCookie(name,'',-1);
}