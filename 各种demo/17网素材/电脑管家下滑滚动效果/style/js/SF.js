function $ID(id){return document.getElementById(id);}
var addEvent = document.body.addEventListener?function(target,eventType,handler){
						var target = (target.constructor === String) ? $ID(target) : target;
						target.addEventListener(eventType,handler,false);
					}:function(target,eventType,handler){
						var target = (target.constructor === String) ? $ID(target) : target;
						target.attachEvent("on"+eventType,handler);
					};
function extend(obj1,obj2){
	for(var o in obj2){
		obj1[o] = obj2[o];
	}
	return obj1;
}					
//浏览器兼容
var Browser = {};
try{
	(function(){
		var ua = navigator.userAgent.toLowerCase(),
			appName = navigator.appName.toLowerCase(), 
			isStrict = document.compatMode == "CSS1Compat",
			isOpera = ua.indexOf("opera") > -1,
			isChrome = ua.indexOf("chrome") > -1,
			isSafari = (/webkit|khtml/).test(ua),
			isIE = (ua.indexOf("msie") > -1)||(appName.indexOf("microsoft internet explorer")>-1),
			isSys64 = (ua.indexOf("win64")>=0 || ua.indexOf("wow64")>=0),
			isGecko = !isSafari && ua.indexOf("gecko") > -1,
			isBorderBox = isIE && !isStrict,
			isSecure = window.location.href.toLowerCase().indexOf("https") === 0;			
		extend(Browser,{
			isOpera:isOpera,
			isIE:isIE,
			isSys64:isSys64,
			isFirefox:isGecko,
			isSafari:isSafari,
			isChrome:isChrome
		});
	})();
}catch(e){}
	
var SF = {
	softId:'',
	mgrVersion:'',
	judgeVersion:'6.8.2353.1',
	validPlugin:null,//控件对象
	domReady:function(){},
	initObjectHtml:function(){//浏览器判断控件版本，初始化注入object
		var dv = document.createElement("div"),ihtml='';
		dv.style.overflow="hidden";
		dv.style.height=0;
		if(Browser.isIE){
		}
		else if(Browser.isFirefox || Browser.isChrome)
		{
			var mimes = navigator.mimeTypes;
			var mimename = SF.getMimeType();
			for(var i=0,l=mimes.length;i<l;i++){
				if(mimes[i].type==mimename){
					ihtml = '<embed type="' + mimename + '" id="npQMExtensionsXPCOM" width=0 height=0 hidden=true></embed>';
				}
			}
		}
		dv.innerHTML = ihtml;
		document.body.appendChild(dv);
		SF.domReady();
	},
	
	initPlugin:function(){//控件声明
		if (!SF.validPlugin) {
			try{
				if (Browser.isIE) {
					SF.validPlugin =  new ActiveXObject("npQMExtensionsIE.Basic");
				} else if (Browser.isFirefox || Browser.isChrome) {
					if (SF.checkMimePlugin()) {
						SF.validPlugin = $ID('npQMExtensionsXPCOM');
					} else {
						
					}
				}
			}catch(e){}
		}
	},
	initEvent:function(){//该页面的点击事件预留接口
	
	},
	init:function(){//页面所有初始化接口集
		SF.initObjectHtml();	
		SF.initPlugin();
		SF.initEvent();		
	},
	queryString: function (val) {//获取页面参数
		var reg = new RegExp("(^|\\?|&)"+ val +"=([^&]*)(\\s|&|$)", "i");
		if (reg.test(location.href)) return unescape(RegExp.$2); 
		return ""; 
    },
	versionCompare:function(installedVersion){//控件版本比较
		var lv = SF.judgeVersion.split("."),iv=installedVersion.split(".");
		var ret = false;
		for(var i=0;i<lv.length;i++){
			if(lv[i]!=iv[i]){
				if(lv[i]*1>iv[i]*1){
					ret = true;
				}else{
                    ret = false;
				}
				break;
			}
		}
		if(ret){
			return "old";
		}else{
			return "latest"
		}
	},
	getMimeType:function() {
			return "application/qqpcmgr-extensions-mozilla";
	},
	checkMimePlugin:function() {//firefox的版本比较，下面的10000009即为版本号，低于该号的，页面会提示安装控件
		//debugger;
		var type = window.navigator.mimeTypes && window.navigator.mimeTypes[SF.getMimeType()];
		var flag = type?true:false;
		if (flag) {
			var plugin = $ID('npQMExtensionsXPCOM');
			try {
				if (plugin.GetPluginVersion == undefined || plugin.GetPluginVersion() < 10000000) {//这里版本是1.0.0.0
					flag = false;
				}
			} catch(e) {}
		}
		return flag;
	},
	isInstall:function() {
		//0管家未安装,1管家已安装,2插件未安装或被禁用
		var bInstall;
		if (SF.validPlugin) {
			try {
				bInstall = Browser.isIE?SF.validPlugin.QMIsInstalled():SF.validPlugin.QMIsInstall();	
				bInstall = bInstall?1:0;
			} catch(e) {}
		}else if(Browser.isIE && Browser.isSys64){
			bInstall = 3;
		}else{
			bInstall = 2;					
		}
		return bInstall;
	},
	getQMmgrVersion:function() {//返回管家版本号
		var strVersion = "";
		if (SF.validPlugin) {
			try {
				strVersion = SF.validPlugin.QMGetVersion();			
			} catch(e) {}
		}
		return strVersion
	},
	getQmgrSupplyID:function() {//返回supplyid
		var iSpplyID = "";
		if (SF.validPlugin) {
			try {
				iSpplyID = SF.validPlugin.QMGetSupplyID();
			} catch(e) {
			}	
		}
		return iSpplyID;
	},
	QMStatUp:function(index, parms) {//应用程序拉去接口，第一个参数为id号，第二个为执行命令行
		var strVersion;
		if (SF.validPlugin) {
			try {
				SF.validPlugin.QMStartUp(index, parms);
			} catch(e) {}
		}
	},	
	html:function(target,msgArr){
		$ID(target).innerHTML = msgArr.join("<br>");
	}
}
//初始化
addEvent(window,"load",SF.init);