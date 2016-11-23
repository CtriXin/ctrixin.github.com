/**
 * Created by zhangshuwen on 16/10/21.
 */

//登录数据
var loginData = {
    sendAddress:"",
    gameappkey:"",
    channel:"",
    callBackUrl:""
};

//登录
login = function (sendAddress,gameappkey,channel) {
    //初始化登录数据
    initLoginData(sendAddress,gameappkey,channel);

    //判断cookie
    var suid = SinaTool.getCookieByName("suid");
    var token = SinaTool.getCookieByName("token");
    if(suid != "" && token != ""){
        getPlayerInfo(suid,token,channel);
        return;
    }

    //判断登录类型
    if(SinaTool.checkEnvironment().isWeixin() == true){
        weChatAuthorization(sendAddress,channel);
        return;
    }

    $.popup('.popup-choose');
};

//登录成功
loginSuccess = function (suid,token) {
    //console.log("loginSuccess:" + JSON.stringify(userInfo));
    //缓存用户
    setUserToCookie(suid,token);

    if(loginData.callBackUrl != ""){
        window.location.href = decodeURIComponent(loginData.callBackUrl);
    }else{
        window.location.href = "http://localhost:63342/sinagame/gameList/index.html";
    }
};

//登录失败
loginFail = function (error) {
    console.log("loginFail:" + error);
};


//初始化登录数据
initLoginData = function (sendAddress,gameappkey,channel) {
    loginData.sendAddress = sendAddress;
    loginData.gameappkey = gameappkey;
    loginData.channel = channel;
    loginData.callBackUrl = SinaTool.getQueryString("callBackUrl");
};


/* 微信授权 */
weChatAuthorization = function (gameappkey,channel) {
    //判断渠道
    window.location.href = loginData.sendAddress + "WxGame/wx_autho?gameappkey=" + gameappkey + "&channel=" + channel;
};

/* 微博授权 */
sinaAuthorization = function () {
    $.showIndicator();
    // state 结构: 类型(0 首页/1 游戏);渠道 ID; 游戏 appkey;绑定标识(0 不绑定 1 绑定/); SUID 游客id; 游客token
    var stateStr = "0;" + loginData.channel + ";0" + ";0";
    if(loginData.gameappkey != "0"){
        stateStr = "1;" + loginData.channel + ";" + loginData.gameappkey + ";0";
    }
    window.location.href = "https://api.weibo.com/oauth2/authorize?client_id=2268486964&redirect_uri=" + encodeURIComponent(loginData.sendAddress + "GameDetail/open_game") + "&state=" + stateStr;
};

/* QQ授权 */
qqAuthorization = function () {
    //授权
    $.showIndicator();
    var getData = "";
    getData += "response_type=code";
    getData += "&client_id=101307496";
    getData += "&redirect_uri=" + encodeURIComponent(loginData.sendAddress + "WxGame/bingding_QQ");
    getData += "&scope=get_user_info";
    getData += "&state=" + loginData.gameappkey + "-" + loginData.channel + "-0";

    window.location.href = "https://graph.qq.com/oauth2.0/authorize?" + getData;
};

/* 创建游客 */
createTourist = function () {
    var createRequest = new BSRequest();
    createRequest.addData("channel", loginData.channel);
    createRequest.addData("ua", window.navigator.userAgent);
    createRequest.sendHttp("WxGame/visitor_login", function () {
        var jsObj = JSON.parse(this.responseText);
        if (jsObj.status == 0) {
            //游客创建成功 显示游客样式
            getPlayerInfo(jsObj.suid, jsObj.token);
        }
    });
};

/* 得到用户信息 */
getPlayerInfo = function (suid, token,channel) {
    //var loginRequest = new BSRequest();
    //loginRequest.addData("suid", suid);
    //loginRequest.addData("token", token);
    //loginRequest.addData("channel", channel);
    //loginRequest.sendHttp("WxGame/login_game", function () {
    //    console.log("登录请求发送成功");
    //    // 登录成功
    //    var userInfo = JSON.parse(this.responseText);
    //    if (userInfo.status == 0) {
    //        //登录成功
    //        loginSuccess(userInfo);
    //    } else {
    //        loginFail("登录失败:" + userInfo.desc);
    //    }
    //}, function () {
    //    loginFail("网络连接失败!");
    //});
    loginSuccess(suid, token);

};

setUserToCookie = function (suid,token) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 360*24*60*60*1000);
    document.cookie="suid="+suid+";expires="+exp + ";path=/";
    document.cookie="token="+token+";expires="+exp + ";path=/";

};

/* 手机登录 */
loginWithMobile = function (ac, ps) {
    if (ac.length != 11) {
        $('.hint').show();
        return;
    }

    var loginMobile = new BSRequest();
    loginMobile.addData("mobile", ac)
    loginMobile.addData("pwd", ps)
    loginMobile.sendHttp("WxGame/mobile_login", function () {
        var jsObj = JSON.parse(this.responseText);
        if (jsObj.status == 0) {
            //手机登录成功 得到用户信息
            $('.hint').hide();
            $.closeModal(".popup-login");
            getPlayerInfo(jsObj.suid, jsObj.token);
        } else {
            // 登录失败
            $('.hint').show();
        }
    });
};


/* 手机注册 */
createMobilePlayer = function (num, vcode) {
    //手机注册
    var register = new BSRequest();
    register.addData("mobile", num);
    register.addData("vcode", vcode);
    register.sendHttp("WxGame/mobile_register", function () {
        var jsObj = JSON.parse(this.responseText);
        $.closeModal('.popup-sign');
        if (jsObj.status == 0) {
            //手机注册成功 得到用户信息
            $.closeModal();
            getPlayerInfo(jsObj.suid, jsObj.token);
        } else {
            //注册失败
            showPayFailed("注册失败:" + jsObj.error);
        }
    });
};

/* 发送验证码 */
sendMobileCaptcha = function (num) {
    console.log("发送验证码");
    var getvcode = new BSRequest();
    getvcode.addData("mobile", num);
    getvcode.sendHttp("WxGame/reg_getvcode", function () {
        var jsObj = JSON.parse(this.responseText);
        if (jsObj.status == 0) {

        } else {
            //密码修改失败
            showPayFailed("获取失败:" + jsObj.error);
        }
    }, null, false);
};


/* 修改密码 */
changeMobilePwd = function (num, vcode, pwd) {
    //修改密码
    var changePwd = new BSRequest();
    changePwd.addData("mobile", num);
    changePwd.addData("vcode", vcode);
    changePwd.addData("pwd", pwd);
    changePwd.sendHttp("WxGame/reset_pwd", function () {
        var jsObj = JSON.parse(this.responseText);
        if (jsObj.status == 0) {
            $.closeModal();
            getPlayerInfo(jsObj.suid, jsObj.token);
        } else {
            //密码修改失败
            showPayFailed("获取失败:" + jsObj.error);
        }
    });
};

/* pc微信登录 */
loginWithWecgatPC = function () {
    $.popup('.popup-wechat-qchar');
    wechatCode();
}

/* 检查二维码扫描情况 */
checkVcode = function (id) {
    var checkReq = new BSRequest();
    checkReq.addData("scene_id",id);
    checkReq.sendHttpWithGet("WxGame/qr_code_login", function () {
        var jsObj = JSON.parse(this.responseText);
        if(jsObj.status == 0){
            $.closeModal();
            getPlayerInfo(jsObj.suid, jsObj.token);
        }else{
            setTimeout(checkVcode(id),1000);
        }
    },null,false);
};

/* 请求二维码 */
wechatCode = function(){
    var getVcode = new BSRequest();
    getVcode.sendHttpWithGet("WxGame/web_wx_qr_code", function () {
        var jsObj = JSON.parse(this.responseText);
        document.getElementById('for_weixin_login').src = jsObj.qr_code_url;

        console.log("scene_id = " + jsObj.scene_id);
        checkVcode(jsObj.scene_id);
    });
};

/* 显示公告 */
showPayFailed = function (prom,showName) {
    var name = "公    告";
    if(typeof showName == 'string'){
        name = showName;
    }
    $.modal({
        title: name,
        text: prom,
        buttons: [
            {
                text: '关闭',
                onClick: function () {

                }
            }
        ],
        extraClass: 'modal-announcement-warning'
    })
};

///* 发送绑定指令 */
//sendMobileBing = function (num, vcode) {
//    //修改密码
//    var mobileBing = new BSRequest();
//    mobileBing.addData("mobile", num);
//    mobileBing.addData("vcode", vcode);
//    mobileBing.addData("appkey", "2268486964");
//    mobileBing.addData("platform", SinaSDKTool.data.platform);
//    mobileBing.addData("suid", SinaSDKTool.data.suid);
//    mobileBing.sendHttp("WxGame/bingding_mobile", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //绑定成功
//            SinaSDKTool.data.userInfo.userName = "";
//            // 提示绑定成功
//            $.closeModal();
//
//            showPayFailed("绑定成功");
//            //$.modal({
//            //    text: '绑定成功'
//            //});
//
//            //重新执行支付
//            if (SinaSDKTool.data.payData != null) {
//                setTimeout(function () {
//                    placeAnOrder(SinaSDKTool.data.payData);
//                }, 1500);
//            }
//        } else {
//            //绑定失败
//            $.closeModal();
//            $.popup('.popup-fail');
//        }
//    });
//};

//initWeixinJSSDK = function (suid,token) {
//    var getJSAPITicketRequest = new BSRequest();
//    getJSAPITicketRequest.addData("suid", suid);
//    getJSAPITicketRequest.addData("token", token);
//    getJSAPITicketRequest.sendHttpWithGet("WxGame/get_ticket", function () {
//        var ticketObj = JSON.parse(this.responseText);
//        if (ticketObj.status == 0) {
//            console.log("获取微信票据成功: " + ticketObj.ticket);
//            // 时间戳
//            var dateStamp = new Date();
//            var timeStamp = dateStamp.getTime();
//            // 随机字符串
//            var nonceStr = Math.random().toString(36).substr(2);
//            // URL
//            var urlStr = window.location.href;
//            if (urlStr.indexOf('#') != -1) {
//                urlStr = urlStr.substring(0, urlStr.indexOf('#'));
//            }
//            // 签名
//            var signatureStr = Encryption.sha1("jsapi_ticket=" + ticketObj.ticket + "&noncestr=" + nonceStr + "&timestamp=" + timeStamp + "&url=" + urlStr);
//
//            wx.config({
//                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                appId: "wxac866736662d9a96", // 必填，公众号的唯一标识
//                timestamp: timeStamp, // 必填，生成签名的时间戳
//                nonceStr: nonceStr, // 必填，生成签名的随机串
//                signature: signatureStr,// 必填，签名，见附录1
//                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone", "chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//            });
//
//            var title =  $(".channel_title")[0].getAttribute("content");
//            var gameDesc =  $(".channel_gameDesc")[0].getAttribute("content");
//            var shareURL = loginData.sendAddress + "WxGame/open_game?gameappkey=" + loginData.gameappkey + "&channel=" + loginData.channel;
//            var iconURL = $(".add-home-logo").find("img").attr("src");
//
//            wx.ready(function () {
//                wx.onMenuShareAppMessage({
//                    title: title, // 分享标题
//                    desc: gameDesc, // 分享描述
//                    link: shareURL, // 分享链接
//                    imgUrl: iconURL, // 分享图标
//                    type: '', // 分享类型, music、video 或 link，不填默认为link
//                    dataUrl: '', // 如果 type 是 music 或 video，则要提供数据链接，默认为空
//                    success: function () {
//                        // 用户确认分享后执行的回调函数
//                        console.log("分享给朋友成功");
//                    },
//                    cancel: function () {
//                        console.log("取消分享给朋友");
//                    }
//                });
//
//                wx.onMenuShareTimeline({
//                    title: title, // 分享标题
//                    desc: gameDesc, // 分享描述
//                    link: shareURL, // 分享链接
//                    imgUrl: iconURL, // 分享图标
//                    success: function () {
//                        // 用户确认分享后执行的回调函数
//                        console.log("分享到朋友圈成功");
//                    },
//                    cancel: function () {
//                        console.log("分享到朋友圈取消");
//                    }
//                });
//
//            });
//
//            wx.error(function (res) {
//                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//                // alert("微信功能初始化失败: " + JSON.stringify(res));
//            });
//
//        }
//        else {
//            // alert("获取微信票据失败: " + ticketObj.status);
//        }
//    }, function () {
//        console.log("获取微信票据请求发送时出现网络错误");
//    }, false);
//};