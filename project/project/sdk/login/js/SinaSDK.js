///**
// * Created by zhangshuwen on 16/7/11.
// */
//
//
//initialSDK = function () {
//    //console.log("initialSDK   " + Date.now());
//    //初始化 检查地址
//    SinaSDKTool.tool.checkUrl();
//
//    var initRequest = new BSRequest();
//    initRequest.addData("gameappkey", SinaSDKTool.data.gameappkey);
//    initRequest.addData("ua", window.navigator.userAgent);
//    initRequest.addData("appkey", "2268486964");
//    initRequest.addData("platform", SinaSDKTool.data.platform);
//    initRequest.addData("channel", SinaSDKTool.data.channel);
//    initRequest.addData("client", SinaSDKTool.tool.getEnvironment());
//    initRequest.sendHttp("Statistics/sdkGameStart", function () {
//        var jsObj = JSON.parse(this.responseText);
//        console.log("initialSDK   " + Date.now());
//        if(jsObj.status == 0){
//            initShow(jsObj);
//        }else{
//            showPayFailed("初始化失败:" + jsObj.status);
//        }
//    }, null, false);
//
//    ////初始化显示
//    //initShow();
//
//};
//
///* 初始化显示 */
//initShow = function (data) {
//    var login_style = $(".login_style")[0].getAttribute("content").split("_");
//
//    //修改登录显示
//    initLoginShow(login_style);
//
//    //初始化浮球
//    Ball.initBall(data);
//
//    //初始化用户
//    var evn = SinaSDKTool.tool.getEnvironment();
//    if (SinaSDKTool.data.suid != "" && SinaSDKTool.data.token != "") {
//        getPlayerInfo(SinaSDKTool.data.suid, SinaSDKTool.data.token);
//        //微信用户初始化
//        if (evn == "weixin") {
//            initWeixinJSSDK();
//        }
//        changeinfo();
//    } else {
//        if (evn == "weixin") {
//            //微信用户初始化
//            setTimeout(weChatAuthorization, 1500);
//        } else {
//            $.popup('.popup-choose');
//            changeinfo();
//            settimer();
//        }
//    }
//
//};
//initLoginShow = function (login_data) {
//    //显示Class
//    //login_data = ["sina", "mobile","wechat"];
//    var showClass = "col-33";
//    var deleClass = "col-50";
//    if (login_data.length == 2) {
//        showClass = "col-50";
//        deleClass = "col-33";
//    }
//    //全部隐藏
//    //得到不显示内容
//    var deleList = ["sina", "mobile", "qq","wechat"];
//    var deleObj = new Array();
//    for (var i = 0; i < deleList.length; i++) {
//        var isdele = true;
//        for(var j = 0 ; j < login_data.length;j++){
//            if(deleList[i] == login_data[j]){
//                isdele = false;
//            }
//        }
//        if(isdele == true){
//            deleObj.push(deleList[i]);
//        }
//    }
//    //操作显示
//    var obj;
//    for(var i = 0; i < deleObj.length;i++){
//        obj = ".login_" + deleObj[i];
//        $(obj).hide();
//    }
//    $(obj).siblings().removeClass(deleClass).addClass(showClass);
//};
//
//initWeixinJSSDK = function () {
//    //是否有 用户
//    if (SinaSDKTool.data.suid == "" || SinaSDKTool.data.token == "") {
//        return;
//    }
//
//    var getJSAPITicketRequest = new BSRequest();
//    getJSAPITicketRequest.addData("suid", SinaSDKTool.data.suid);
//    getJSAPITicketRequest.addData("token", SinaSDKTool.data.token);
//    getJSAPITicketRequest.sendHttpWithGet("WxGame/get_ticket", function () {
//        console.log("获取微信票据请求发送成功");
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
//            wx.ready(function () {
//                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
//                // alert("微信 JSSDK 初始化成功");
//                SinaSDKTool.data.weixinShare = {};
//                // var desc = " - 小浪游戏专供";
//                if (SinaSDKTool.data.channel >= 460001 && SinaSDKTool.data.channel <= 470000) {
//                    SinaSDKTool.data.weixinShare.gameTitle = document.title + " - Sina超体";
//                } else if (SinaSDKTool.data.channel >= 30001 && SinaSDKTool.data.channel <= 30000) {
//                    SinaSDKTool.data.weixinShare.gameTitle = document.title + " - 微游戏专供";
//                } else if (SinaSDKTool.data.channel >= 10001) {
//                    SinaSDKTool.data.weixinShare.gameTitle = document.title + "";
//                } else {
//                    SinaSDKTool.data.weixinShare.gameTitle = document.title + " - 小浪游戏专供";
//                }
//                SinaSDKTool.data.weixinShare.gameDesc = "";
//                var metas = document.getElementsByTagName("meta");
//                for (var i = 0; i < metas.length; i++) {
//                    if (metas[i].getAttribute("property") == "desc") {
//                        SinaSDKTool.data.weixinShare.gameDesc = metas[i].getAttribute("content");
//                    }
//                }
//
//                SinaSDKTool.data.weixinShare.shareURL = SinaSDKTool.sendAddress + "WxGame/open_game?gameappkey=" + SinaSDKTool.data.gameappkey + "&channel=" + SinaSDKTool.data.channel;
//                SinaSDKTool.data.weixinShare.iconURL = $(".add-home-logo").find("img").attr("src");
//
//                wx.onMenuShareAppMessage({
//                    title: SinaSDKTool.data.weixinShare.gameTitle, // 分享标题
//                    desc: SinaSDKTool.data.weixinShare.gameDesc, // 分享描述
//                    link: SinaSDKTool.data.weixinShare.shareURL, // 分享链接
//                    imgUrl: SinaSDKTool.data.weixinShare.iconURL, // 分享图标
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
//                    title: SinaSDKTool.data.weixinShare.gameTitle, // 分享标题
//                    link: SinaSDKTool.data.weixinShare.shareURL, // 分享链接
//                    imgUrl: SinaSDKTool.data.weixinShare.iconURL, // 分享图标
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
//
//
////定时功能
//SinaSDK = {};
//SinaSDK.loginData = {};
//SinaSDK.loginData.loginAllTime = 15000;//自动登录时间
//SinaSDK.loginData.loginStartTime = 0;//登入计时开始时间
//SinaSDK.loginData.isStartLogin = false;//判断是否登录
//settimer = function () {
//    if (SinaSDK.loginData.loginStartTime == 0) {
//        SinaSDK.loginData.loginStartTime = Date.now();
//    }
//
//    //检查登录状态
//    if (SinaSDK.loginData.isStartLogin == true) {
//        $('.shiwan').html('正在登录...');
//        return;
//    }
//
//    //计算时间
//    var remainTime = SinaSDK.loginData.loginAllTime - (Date.now() - SinaSDK.loginData.loginStartTime);
//    if (remainTime <= 0) {
//        $('.shiwan').html('正在登录...');
//        createTourist();
//        return;
//    }
//
//    $('.shiwan').html("立即试玩(" + Math.floor(remainTime / 1000) + ")");
//    setTimeout(settimer, 100);
//};
//
///* 点击微博分享 */
//clickSinaShare = function () {
//    $.showIndicator();
//    var urlStr = SinaSDKTool.sendAddress + "WxGame/open_game?gameappkey=" + SinaSDKTool.data.gameappkey + "&channel=" + SinaSDKTool.data.channel;
//    var pic_icon = $(".add-home-logo").find("img").attr("src");
//    window.location.href = "http://v.t.sina.com.cn/share/share.php?appkey=2268486964&url=" + encodeURIComponent(urlStr) + "&title=" +
//        document.title + " - 小浪游戏专供" + "&source=&sourceUrl=&content=utf-8&pic=";
//};
//
//
///* 提示更多游戏 */
//showRecommendMore = function () {
//    $.closeModal();
//
//    //获取更多游戏
//    var moreRequest = new BSRequest();
//    moreRequest.addData("channel", SinaSDKTool.data.channel);
//    moreRequest.addData("suid", SinaSDKTool.data.suid);
//    moreRequest.addData("token", SinaSDKTool.data.token);
//    moreRequest.sendHttp("WxGame/get_close_game_recommend_list", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //判断显示对象
//            if (jsObj.game_list.length > 0) {
//                //显示提示
//                var showDiv = document.getElementsByClassName("col-25");
//                for (var i = 0; i < showDiv.length; i++) {
//                    showDiv[i].children[0].src = jsObj.game_list[i].icon_url;
//                    showDiv[i].children[1].innerHTML = jsObj.game_list[i].app_name;
//                    showDiv[i].children[0].id = jsObj.game_list[i].gameappkey;
//                }
//                $.popup('.popup-recommend-more');
//            } else {
//                //退出
//                clickRecommendGame();
//            }
//        }
//    });
//};
//
///* 点击退出游戏 */
//clickRecommendGame = function () {
//    if (wx instanceof Object) {
//        wx.closeWindow();
//    } else {
//        window.close();
//    }
//};
///* 推荐游戏窗口 - 游戏icon */
//clickRecommendPopGameIcon = function (self) {
//
//    window.location.href = SinaSDKTool.sendAddress + "WxGame/open_game?gameappkey=" + self.id + "&login_suid=" + SinaSDKTool.data.suid + "&login_token=" + SinaSDKTool.data.token + "&channel=" + SinaSDKTool.data.channel;
//};
//
///* 修改今日不在推荐 */
//sendTodayNotRecommend = function () {
//    var recommendRequest = new BSRequest();
//    recommendRequest.addData("suid", SinaSDKTool.data.suid);
//    recommendRequest.sendHttp("WxGame/no_recommend", null, null, false);
//};
//
///* 点击手机登录 */
//clickMobileLogin = function () {
//    //修改登录状态
//    SinaSDK.loginData.isStartLogin = true;
//};
//
///* 微信授权 */
//weChatAuthorization = function () {
//    //修改登录状态
//    SinaSDK.loginData.isStartLogin = true;
//    //判断渠道
//    window.location.href = SinaSDKTool.sendAddress + "WxGame/wx_autho?gameappkey=" + SinaSDKTool.data.gameappkey + "&channel=" + SinaSDKTool.data.channel;
//};
//
//weChatAuthorizationPC = function () {
//    //修改登录状态
//    SinaSDK.loginData.isStartLogin = true;
//
//    var appid = "wxfa667a106a560261";
//    var redirect_uri = encodeURIComponent("http://auv2.game.weibo.cn/auv/api/server/platform/index.php/WxGame/wx_index");
//    var state = "" + SinaSDKTool.data.gameappkey + "-" + SinaSDKTool.data.channel + "-webweixin" + "#wechat_redirect";
//
//    window.location.href = "https://open.weixin.qq.com/connect/qrconnect?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_login&state=" + state;
//};
//
//
//
///* 微博授权 */
//sinaAuthorization = function () {
//    //修改登录状态
//    SinaSDK.loginData.isStartLogin = true;
//    $.showIndicator();
//    // state 结构: 类型(0 首页/1 游戏);渠道 ID; 游戏 appkey;绑定标识(0 不绑定 1 绑定/); SUID 游客id; 游客token
//    var stateStr = "1;" + SinaSDKTool.data.channel + ";" + SinaSDKTool.data.gameappkey + ";0";
//    window.location.href = "https://api.weibo.com/oauth2/authorize?client_id=2268486964&redirect_uri=" + encodeURIComponent(SinaSDKTool.sendAddress + "GameDetail/open_game") + "&state=" + stateStr;
//};
//
///* 微博授权绑定 */
//sinaAuthorizationBing = function () {
//    //屏蔽触摸
//    $.showIndicator();
//    // state 结构: 类型(0 首页/1 游戏);渠道 ID; 游戏 appkey;绑定标识(0 不绑定 1 绑定/); SUID 游客id; 游客token
//    var stateStr = "1;" + SinaSDKTool.data.channel + ";" + SinaSDKTool.data.gameappkey + ";1;" + SinaSDKTool.data.suid + ";" + SinaSDKTool.data.token;
//    window.location.href = "https://api.weibo.com/oauth2/authorize?client_id=2268486964&redirect_uri=" + encodeURIComponent(SinaSDKTool.sendAddress + "GameDetail/open_game") + "&state=" + stateStr;
//}
//
///* QQ授权 */
//qqAuthorization = function () {
//    //修改登录状态
//    SinaSDK.loginData.isStartLogin = true;
//    //授权
//    $.showIndicator();
//    var getData = "";
//    getData += "response_type=code";
//    getData += "&client_id=101307496";
//    getData += "&redirect_uri=" + encodeURIComponent(SinaSDKTool.sendAddress + "WxGame/bingding_QQ");
//    getData += "&scope=get_user_info";
//    getData += "&state=" + SinaSDKTool.data.gameappkey + "-" + SinaSDKTool.data.channel + "-0";
//
//    window.location.href = "https://graph.qq.com/oauth2.0/authorize?" + getData;
//};
//
///* 创建游客 */
//createTourist = function () {
//    //修改登录状态
//    SinaSDK.loginData.isStartLogin = true;
//
//    var createRequest = new BSRequest();
//    createRequest.addData("channel", SinaSDKTool.data.channel);
//    createRequest.addData("ua", window.navigator.userAgent);
//    createRequest.sendHttp("WxGame/visitor_login", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //游客创建成功 显示游客样式
//            getPlayerInfo(jsObj.suid, jsObj.token);
//        }
//    });
//};
//
///* 得到用户信息 */
//getPlayerInfo = function (suid, token) {
//
//    var loginRequest = new BSRequest();
//    loginRequest.addData("suid", suid);
//    loginRequest.addData("token", token);
//    loginRequest.addData("channel", SinaSDKTool.data.channel);
//    loginRequest.sendHttp("WxGame/login_game", function () {
//        console.log("登录请求发送成功");
//        // 登录成功
//        var userInfo = JSON.parse(this.responseText);
//        if (userInfo.status == 0) {
//            //登录成功
//            SinaSDKTool.data.suid = "" + suid;
//            SinaSDKTool.data.token = "" + token;
//            SinaSDKTool.data.userInfo = userInfo;
//
//            //检查cookie
//            SinaSDKTool.tool.checkPlayerCookie();
//            //刷新用户显示
//            checkPlayerShow();
//            //进入游戏
//            startOpenGame(SinaSDKTool.data.gameappkey);
//        } else {
//            SinaSDKTool.data.userInfo = null;
//            //showPayFailed("登录失败:" + userInfo.status + ":" + userInfo.desc);
//            $.popup('.popup-choose');
//        }
//    }, function () {
//        SinaSDKTool.data.userInfo = null;
//        showPayFailed("网络连接失败");
//    });
//
//};
//
//
///* 打开游戏 */
//startOpenGame = function (gameappkey) {
//    $.closeModal();
//    $('.gameframe').show();
//    $('.gameframe-channel').show();
//    var Opensrc = "game?gameappkey=" + gameappkey + "&channel=" + SinaSDKTool.data.channel + "&login_suid=" + SinaSDKTool.data.suid + "&login_token=" + SinaSDKTool.data.token;
//    if ($('#page-channel-game').hasClass("page-current")) {
//        document.getElementsByClassName("gameframe-channel")[0].src = Opensrc;
//    }else{
//        document.getElementsByClassName("gameframe")[0].src = Opensrc;
//    }
//    //if ($('#page-open-game').hasClass("page-current") || $('#page-open-game').hasClass("black_auv")) {
//    //
//    //}
//    //获取公告
//    setTimeout(getBulletin, 1000);
//};
//
///* 获取公告 */
//getBulletin = function () {
//
//    var bulletinReq = new BSRequest();
//    bulletinReq.addData("gameappkey", SinaSDKTool.data.gameappkey);
//    bulletinReq.addData("channel", SinaSDKTool.data.channel);
//    bulletinReq.sendHttp("WxGame/get_game_notice", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //判断公告类型
//            if (jsObj.type == 0) {
//                //通用公告
//                $('#announcement-content').html(jsObj.notice);
//                $.popup('.popup-announcement');
//            } else if (jsObj.type == 1) {
//                //游戏公告
//                $("#game-annoce-img").find("img").attr("src", jsObj.bgimage);
//                $.popup('.popup-announcement-bg');
//            }
//        } else {
//            console.log("无公告");
//        }
//    }, null, false);
//};
//
///* 检查用户环境 */
//checkPlayerShow = function () {
//    //判断游客
//    if (SinaSDKTool.data.userInfo.userName == "visitor") {
//        //显示浮球状态
//        Ball.addBallCell("OPEN_POPUPBOX,popup-bind-way," + encodeURIComponent("http://auv2.game.weibo.cn/auv/api/server/platform/images/v1_0_5/m7.png") + ",1")
//    }
//};
//
///* 支付 */
//pay = function (data) {
//    SinaSDKTool.data.payData = data;
//    //判断游客
//    if (SinaSDKTool.data.userInfo.userName == "visitor") {
//        // 提示游客
//        $.popup('.popup-warning');
//    } else {
//        placeAnOrder(SinaSDKTool.data.payData);
//    }
//};
//
///* 点击直接支付 */
//clickPay = function () {
//    placeAnOrder(SinaSDKTool.data.payData);
//};
//
///*
// 下单
// * sendData{//提交数据
// * suid://用户ID
// * token://用户token
// * appkey://游戏的appKey
// * access_token://玩家token
// * product_id://物品ID
// * product_detail://物品描述
// * product_body://物品标题
// * trade_type://支付类型
// * total_fee://支付金额
// * fee_type://金钱类型
// * openid://微信登录获取的ID
// * show_url://支付回调地址
// * parameters://透传参数
// * }
// * */
//placeAnOrder = function (data) {
//    $.showIndicator();
//    //判断需要使用的支付平台
//    var env = SinaSDKTool.tool.environmentIsApp();
//    //微博透传参数
//    var isWeixin = "0";
//    if (env == "weixin") {
//        var isWeixin = "1";
//    }
//    var pt = SinaSDKTool.data.gameappkey + "-" + SinaSDKTool.data.channel + "-0-" + data.suid + "-" + data.token + "-" + isWeixin + "";
//
//    //微博 第三方支付
//    sinaPay(SinaSDKTool.data.gameappkey, data.total_fee, data.product_body, data.product_detail, data.parameters);//pt);
//};
//
///* 启动微博支付 */
//sinaPay = function (appkey, amount, subject, desc, pt) {
//    var payToken = SinaSDKTool.data.token;
//
//    var strAppKey = "appkey=" + appkey;
//    var strAccessToken = "&access_token=" + payToken;
//    var struid = "&uid=" + SinaSDKTool.data.suid;
//    var strAmount = "&amount=" + amount;
//    var strSubject = "&subject=" + subject;
//    var strDesc = "&desc=" + desc;
//    var strShowURL = "&show_url=" + SinaSDKTool.sendAddress + "WxGame/wb_redirect?extra=" + pt;
//    var strpt = "&pt=" + pt;
//    var newURL = "http://m.game.weibo.cn/payment/order/order_cashier?" + strAppKey +
//        strAccessToken + struid + strAmount + strSubject + strDesc + strShowURL;
//
//    if (pt != "" && pt != null && pt != undefined) {
//        newURL += strpt;
//    }
//
//    window.top.location.href = newURL;
//    SinaSDKTool.data.payData = null;
//};
//
//
///* 手机登录 */
//loginWithMobile = function (ac, ps) {
//    if (ac.length != 11) {
//        $('.hint').show();
//        return;
//    }
//
//    var loginMobile = new BSRequest();
//    loginMobile.addData("mobile", ac)
//    loginMobile.addData("pwd", ps)
//    loginMobile.sendHttp("WxGame/mobile_login", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //手机登录成功 得到用户信息
//            $('.hint').hide();
//            $.closeModal(".popup-login");
//            getPlayerInfo(jsObj.suid, jsObj.token);
//        } else {
//            // 登录失败
//            $('.hint').show();
//        }
//    });
//};
//
//
///* 手机注册 */
//createMobilePlayer = function (num, vcode) {
//    //手机注册
//    var register = new BSRequest();
//    register.addData("mobile", num);
//    register.addData("vcode", vcode);
//    register.sendHttp("WxGame/mobile_register", function () {
//        var jsObj = JSON.parse(this.responseText);
//        $.closeModal('.popup-sign');
//        $.hideIndicator();
//        if (jsObj.status == 0) {
//            $.modal({
//                text: '注册成功'
//            });
//            //手机注册成功 得到用户信息
//            setTimeout(function () {
//                $.closeModal();
//                getPlayerInfo(jsObj.suid, jsObj.token);
//            }, 1500);
//        } else {
//            //注册失败
//            showPayFailed("注册失败:" + jsObj.error);
//        }
//    });
//};
//
///* 发送验证码 */
//sendMobileCaptcha = function (num) {
//    //发送验证码
//    var getvcode = new BSRequest();
//    getvcode.addData("mobile", num);
//    getvcode.sendHttp("WxGame/reg_getvcode", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //得到用户信息
//        } else {
//            //密码修改失败
//            showPayFailed("发送验证码失败:" + jsObj.error);
//        }
//    }, null, false);
//};
//
//
///* 修改密码 */
//changeMobilePwd = function (num, vcode, pwd) {
//    //修改密码
//    var changePwd = new BSRequest();
//    changePwd.addData("mobile", num);
//    changePwd.addData("vcode", vcode);
//    changePwd.addData("pwd", pwd);
//    changePwd.sendHttp("WxGame/reset_pwd", function () {
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//        } else {
//            //密码修改失败
//            showPayFailed("获取失败:" + jsObj.error);
//        }
//    });
//};
//
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
//
///* 显示公告 */
//showPayFailed = function (prom,showName) {
//    var name = "公    告";
//    if(typeof showName == 'string'){
//        name = showName;
//    }
//    $.modal({
//        title: name,
//        text: prom,
//        buttons: [
//            {
//                text: '关闭',
//                onClick: function () {
//
//                }
//            }
//        ],
//        extraClass: 'modal-announcement-warning'
//    })
//};
//
//
///* 显示排行榜 */
//showRankPop = function () {
//    //修改密码
//    var rankList = new BSRequest();
//    rankList.addData("suid", SinaSDKTool.data.suid);
//    rankList.addData("gameappkey", SinaSDKTool.data.gameappkey);
//    rankList.addData("state", "3");//榜单类型 1 日榜 2 周榜 3 月榜
//    rankList.sendHttp("WxGame/alone_game_list", function () {
//        $('.modal-list-body').find('.item-content').remove();
//        var jsObj = JSON.parse(this.responseText);
//        if (jsObj.status == 0) {
//            //刷新数据
//            $('.modal-list-header').find('img').attr('src', jsObj.my_icon);
//            $('.modal-list-header').find('.title-name').html(jsObj.my_name);
//            $('.modal-list-header').find('.subtitle-score').html("最高得分:" + jsObj.integral);
//            $('.modal-list-header').find('.subtitle-phone-number').html("距离第一名:" + (jsObj.ranl_list[0].integral - jsObj.integral));
//            $('.modal-list-header').find('.item-badgt').html(jsObj.my_rank);
//
//            //处理数据
//            var oldSrc = $(".smallsina-icon").find("img").attr("src");
//            for (var i = 0; i < jsObj.ranl_list.length; i++) {
//                if (i < 3) {
//                    jsObj.ranl_list[i].rank = oldSrc.replace("small_sina_icon.jpg", "rank_icon_" + i + ".png");
//                }
//            }
//            var data = jsObj.ranl_list;
//            for (var i in data) {
//                if (i < 3) {
//                    $('.modal-list-body').append(
//                        '<ul> ' +
//                        '<li> ' +
//                        '<a href="#" class="item-content"> ' +
//                        '<div class="item-media item-img-group"> ' +
//                        '<img src="' + data[i].icon + '" class="item-round ranking-score-img" > ' +
//                        '<span class="img-badgt"><img src="' + data[i].rank + '" alt=""></span> ' +
//                        '</div> ' +
//                        '<div class="item-inner"> ' +
//                        '<div class="item-title title-name">' + data[i].name + '</div> ' +
//                        '<div class="item-subtitle subtitle-score">' + '最高得分:' + data[i].integral + '</div> ' +
//                        '<div class="item-subtitle subtitle-phone-number"> ' + data[i].suid + '</div> ' +
//                        '</div> ' +
//                        '</a> ' +
//                        '</li> </ul>'
//                    )
//                } else {
//                    $('.modal-list-body').append(
//                        '<ul> ' +
//                        '<li> ' +
//                        '<a href="#" class="item-content"> ' +
//                        '<div class="item-media item-img-group"> ' +
//                        '<img src="' + data[i].icon + '" class="item-round ranking-score-img" > ' +
//                        '<span class="badge item-badgt">' + data[i].rank + '</span> ' +
//                        '</div> ' +
//                        '<div class="item-inner"> ' +
//                        '<div class="item-title title-name">' + data[i].name + '</div> ' +
//                        '<div class="item-subtitle subtitle-score">' + '最高得分:' + data[i].integral + '</div> ' +
//                        '<div class="item-subtitle subtitle-phone-number">' + data[i].suid + '</div> ' +
//                        '</div> ' +
//                        '</a> ' +
//                        '</li> </ul>'
//                    )
//                }
//
//            }
//
//            //显示排行榜
//            $.popup('.popup-rank');
//
//
//            console.log("显示排行榜");
//        } else {
//            //不显示排行榜
//            console.log("不显示排行榜");
//        }
//    });
//};
//
//
