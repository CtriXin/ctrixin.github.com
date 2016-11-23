/**
 * Created by zhangshuwen on 16/7/11.
 */

SinaSDKTool = {};//微博web SDK
SinaSDKTool.tool = {};//微博web 工具类
SinaSDKTool.data = {};//微博web 数据类
SinaSDKTool.data.channel = "0";//渠道
SinaSDKTool.data.playerChannel = "";//用户来源渠道
SinaSDKTool.data.gameappkey = "";//游戏key
SinaSDKTool.data.suid = "";//用户
SinaSDKTool.data.token = "";//token
SinaSDKTool.data.weChatCode = "";//微信授权code
SinaSDKTool.data.platform = "";//用户机器环境\
SinaSDKTool.data.weChatOpenid = "";//微信支付需要的openid
SinaSDKTool.data.sinaOauthToken = "";//微博支付需要的token
SinaSDKTool.data.userInfo = {};//玩家信息
SinaSDKTool.data.loginSuccess = false;//登录成功
SinaSDKTool.data.isLoadOver = false;//加载结束
SinaSDKTool.data.loginMobileNumber = "";//手机登录电话号
SinaSDKTool.data.loginMobilePwd = "";//手机登录密码
SinaSDKTool.data.mobileVcode = "";//手机验证码
SinaSDKTool.data.divLoginTimer = null;//显示倒计时
SinaSDKTool.data.playGameType = "";//游戏横屏竖屏
SinaSDKTool.data.payData = null;
SinaSDKTool.sendAddress="http://auv2.game.weibo.cn/auv/api/server/platform/index.php/";//数据提交地址
//SinaSDKTool.sendAddress="http://auv.game.weibo.cn/auv/api/server/platform/index.php/";//数据提交地址


/* 检查Url */
SinaSDKTool.tool.checkUrl = function () {
    var url = window.location.href;

    var start_index = url.indexOf("?");

    if (start_index != -1) {
        var data_str = url.substring(start_index + 1, url.length);
        var data = data_str.split("&");
        var data_name = "";
        for (var i = 0; i < data.length; i++) {
            start_index = data[i].indexOf("=");
            data_name = data[i].substring(0, start_index);
            if (data_name == "channel") {
                SinaSDKTool.data.channel = data[i].substring(start_index + 1, data[i].length);
                console.log("channel");
                continue;
            }
            if (data_name == "gameappkey") {
                SinaSDKTool.data.gameappkey = data[i].substring(start_index + 1, data[i].length);
                console.log("gameappkey");
                continue;
            }
            if (data_name == "login_suid") {
                SinaSDKTool.data.suid = data[i].substring(start_index + 1, data[i].length);
                console.log("suid");
                continue;
            }
            if (data_name == "login_token") {
                SinaSDKTool.data.token = data[i].substring(start_index + 1, data[i].length);
                console.log("token");
                continue;
            }
            if (data_name == "code") {
                SinaSDKTool.data.weChatCode = data[i].substring(start_index + 1, data[i].length);
                continue;
            }
            if(data_name == "state")
            {
                var stateStr = data[i].substring(start_index + 1, data[i].length);
                var stateArray = stateStr.split("-");
                if(stateArray != null)
                {
                    if(SinaSDKTool.data.gameappkey == "")
                    {
                        SinaSDKTool.data.gameappkey = stateArray[0];
                    }

                    if(SinaSDKTool.data.channel == "0")
                    {
                        SinaSDKTool.data.channel = stateArray[1];
                    }
                }
                continue;
            }
        }
    }

    //检查channel
    SinaSDKTool.data.channel = SinaSDKTool.data.channel.replace("#rd","");
    SinaSDKTool.data.channel = SinaSDKTool.data.channel.replace("#","");

    //判断机器环境
    var ua = navigator.userAgent;
    ua = ua.toLocaleLowerCase();
    if(ua.indexOf("mac os") > -1){
        SinaSDKTool.data.platform = "h";
    }else if(ua.indexOf("android") > -1){
        SinaSDKTool.data.platform = "a";
    }else if(ua.indexOf("ios") > -1){
        SinaSDKTool.data.platform = "i";
    }else{
        SinaSDKTool.data.platform = "h";
    }
    //检查cookie
    SinaSDKTool.tool.checkPlayerCookie();
};

/* 检查cookie */
SinaSDKTool.tool.checkPlayerCookie = function () {
    //检查用户
    if(SinaSDKTool.data.suid == "" || SinaSDKTool.data.token == ""){
        //是否存在用户
        SinaSDKTool.data.suid = SinaSDKTool.tool.getCookieByName("suid");
        SinaSDKTool.data.token = SinaSDKTool.tool.getCookieByName("token");
    }else{
        var exp = new Date();
        exp.setTime(exp.getTime() + 360*24*60*60*1000);
        document.cookie="suid="+SinaSDKTool.data.suid+";expires="+exp + ";path=/";
        document.cookie="token="+SinaSDKTool.data.token+";expires="+exp + ";path=/";
        document.cookie="gameappkey="+SinaSDKTool.data.gameappkey+";expires="+exp + ";path=/";
    }
};

/* 根据名字取得cookie */
SinaSDKTool.tool.getCookieByName = function (cookieName) {
    var strCookie = document.cookie;
    var dataList = strCookie.split(";");
    for(var i = 0 ; i < dataList.length;i++){
        var index = dataList[i].indexOf(cookieName)
        if(index > -1){
            index = dataList[i].indexOf("=");
            return dataList[i].substring(index + 1, dataList[i].length);
        }
    }
    return "";
};


/* 是否是在App上运行 */
SinaSDKTool.tool.environmentIsApp = function () {
    var env = Object.create(SinaSDKTool.tool.checkEnvironment());
    if(env.isSinaWeibo()){
        return "sina";
    }
    if(env.isWeixin()){
        return "weixin";
    }
    return "";
};
/* 是否是在wap站上运行 */
SinaSDKTool.tool.environmentIsWap = function () {
    var env = Object.create(SinaSDKTool.tool.checkEnvironment());
    if(SinaSDKTool.tool.environmentIsApp() == "" && SinaSDKTool.tool.checkEnvironment().isMobile() == true){
        return "Mobile";
    }
    return "";
};

/* 是否是在WEB站上运行 */
SinaSDKTool.tool.environmentIsWeb = function () {
    var env = Object.create(SinaSDKTool.tool.checkEnvironment());
    if(SinaSDKTool.tool.environmentIsApp() == "" && SinaSDKTool.tool.checkEnvironment().isMobile() == false){
        return "web";
    }
    return "";
};


/* 得到运行环境 */
SinaSDKTool.tool.getEnvironment = function () {
    var env = Object.create(SinaSDKTool.tool.checkEnvironment());
    if(env.isSinaWeibo()){
        return "sina";
    }
    if(env.isWeixin()){
        return "weixin";
    }
    if(env.isMQQBrowser()){
        return "MQQBrowser";
    }
    if(env.isLeibaoBrowser()){
        return "Liebao";
    }
    if(env.isLenovoBrowser()){
        return "Lenovo";
    }
    if(env.is2345()) {
        return "2345";
    }
    if(env.isUcBrowser()){
        return "UCBrowser";
    }
    if(env.isQQBrowser()){
        return "QQBrowser";
    }
    if(env.isTrident()){
        return "Trident";
    }
    if(env.isIECompatible()){
        return "compatible";
    }
    if(env.isPresto()){
        return "Presto";
    }
    if(env.isGecko()){
        return "Gecko";
    }
    if(env.isQQZone()){
        return "QZONEJSSDK";
    }
    if(env.isSafari()){
        return "Safari";
    }
    if(env.isSogouBrowser()){
        return "SogouMobileBrowser";
    }
    if(env.isChromeAndroid()){
        return "Chrome";
    }
    if(env.is360Browser()){
        return "QHBrowser";
    }
    if(env.isIPhone()){
        return "iPhone";
    }
    if(env.isIPad()){
        return "iPad";
    }
    if(env.isWebApp()){
        return "web";
    }
    if(env.isChromeIOS()){
        return "CriOS";
    }
    if(env.isMaxtonIOS()){
        return "MXiOS";
    }
    if(env.isMaxtonAndroid()){
        return "MxBrowser";
    }
    if(env.isMaxtonPc()){
        return "Maxthon";
    }
    if(env.isOperaIOS()){
        return "OPiOS";
    }
    if(env.isIos()){
        return "Ios";
    }

    return "other";
};


//浏览器检查
SinaSDKTool.tool.checkEnvironment = function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    return {
        isTrident: function(){ return u.indexOf('Trident') > 1; }, //IE内核
        isIECompatible: function(){ return u.toLowerCase().indexOf('compatible') > -1 && u.toLowerCase().indexOf('msie') > -1},
        isPresto: function(){ return u.indexOf('Presto') > -1; }, //opera内核
        isWebKit: function(){ return u.indexOf('AppleWebKit') > -1; }, //苹果、谷歌内核
        isGecko: function(){ return u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1; }, //火狐内核
        // isMobile: function(){ return !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/) }, //是否为移动终端
        isMobile: function(){ return !!u.match(/AppleWebKit.*Mobile.*/); }, //是否为移动终端
        isIos: function(){ return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); }, //ios终端
        isAndroid: function(){ return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; }, //android终端或者uc浏览器
        isIPhone: function(){ return u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1; }, //是否为iPhone浏览器
        isIPad: function(){ return u.indexOf('iPad') > -1; }, //是否iPad
        isWebApp: function(){ return u.indexOf('Safari') === -1 && !this.isUcBrowser() && !this.isSogouBrowser();}, //是否web应用程序，没有头部与底部
        isUcBrowser: function(){ return u.indexOf('UCBrowser') > -1; }, //是否UC浏览器
        isMQQBrowser: function(){ return u.indexOf('MQQBrowser') > -1; },
        isQQBrowser: function(){ return u.indexOf('QQBrowser') > -1; },
        isSogouBrowser: function(){ return u.indexOf('SogouMobileBrowser') > -1; },
        is360Browser: function(){ return u.indexOf('QHBrowser') > -1; },
        isLeibaoBrowser: function(){ return u.indexOf('LieBao') > -1; },
        isLenovoBrowser: function(){ return u.indexOf('LeBrowser') > -1; },
        isChromeAndroid: function(){ return u.indexOf('Chrome') > -1 && u.indexOf('Android') > -1; },
        isChromeIOS: function(){ return u.indexOf('CriOS') > -1; },
        isMaxtonIOS: function(){ return u.indexOf('MXiOS') > -1; },
        isMaxtonAndroid: function(){ return u.indexOf('MxBrowser') > -1;},
        isMaxtonPc: function(){ return u.indexOf('Maxthon') > -1;},
        isOperaIOS: function(){ return u.indexOf('OPiOS') > -1; },
        isSinaWeibo: function(){ return u.indexOf('Weibo') > -1; },
        isHgameApp: function() { return u.toLowerCase().indexOf('hgame') > -1; }, //判断是否是微端
        isWeixin: function(){ var a = u.toLowerCase(); return a.indexOf('micromessenger') > -1; }, //是否是微信内置浏览器
        isQQZone: function(){ return u.indexOf('QZONEJSSDK') > -1; }, //是否QQ空间
        is2345: function(){ return u.indexOf('Mb2345Browser') > -1; }, //是否2345浏览器
        checkAgent: function(string, l){
            var a = l?u:u.toLowerCase(); //l true 区分大小写
            return a.indexOf(string) > -1;
        }, //agent是否包含特定的字符串(不区分大小写)
        language: function(){ return (navigator.browserLanguage || navigator.language).toLowerCase(); }, //语言
        isSafari: function() {
            var matchResult = u.match(/^Mozilla\/5.0 \(.*?\) AppleWebKit\/.*? \(.*?\) Version\/.*? Mobile\/.*? Safari\/\d+\.\d+\.\d+?$/);
            if (matchResult === null) {
                return false;
            }
            return true;
        }
    };
};

/* 得到签名（微信） */
SinaSDKTool.tool.GetPaySign = function (appId, timeStamp, nonceStr, prepay_id) {
    var str_A = appId + "&" + nonceStr + "&" + timeStamp + "&" + prepay_id + "&signType=MD5";


    var list_A = str_A.split("&");

    list_A.sort(function (s1, s2) {
        var maxLenght = Math.max(s1.length, s2.length);
        for (var i = 0; i < maxLenght; i++) {
            if (i >= s1.length) {
                return 1;
            }
            else if (i >= s2.length) {
                return -1;
            } else {
                var s1Char = s1.charAt(i);
                var s2Char = s2.charAt(i);
                if (s1Char < s2Char) {
                    return -1;
                } else if (s1Char > s2Char) {
                    return 1;
                }
            }
        }

        return 0;
    });

    str_A = "";

    for (var i = 0; i < list_A.length; i++) {
        if (i == list_A.length - 1) {
            str_A += list_A[i];
        } else {
            str_A += list_A[i] + "&";
        }
    }

    var stringSignTemp = str_A + "&key=sinagamewxzf1q2w3e4r5t6y7u8i9o0p";
    var sign = SinaSDKTool.tool.md5(stringSignTemp);

    return sign.toUpperCase();
};