/**
 * Created by xin on 16/7/5.
 */
$(function () {

    //初始化大小
    var documentW = $(window).width();
    var documentH = $(window).height();
    $('#gameframe,#gameframe-channel,#gameframe_super').css({'width': documentW, 'height': documentH});

    //根据数据修改渠道显示
    //$('.sider_menu').show();
    var loading_style = $(".loading_style")[0].getAttribute("content");
    console.log(loading_style);


    loading_style = 3;


    if (loading_style == 1) {
        $("#page-lanscape").removeClass("page-current");
        $("#page-open-game").addClass("page-current red_auv");
    } else if (loading_style == 2) {
        $("#page-lanscape").removeClass("page-current");   //移除横竖屏检测
        $("#page-channel-game").addClass("page-current");
        //$("#page-lanscape").removeClass("page-current");
        //$("#page-open-game").addClass("page-current red_auv");
        //$('.sider_menu').hide();
    } else if (loading_style == 3) {
        $("#page-lanscape").removeClass("page-current");
        $("#page-open-game").addClass("page-current red_auv red_auv_new");
    } else if (loading_style == 4) {
        $("#page-lanscape").removeClass("page-current");
        $("#page-open-game").addClass("page-current black_auv");
    } else if(loading_style == 5){
        $("#page-lanscape").removeClass("page-current");
        $("#page-open-game").addClass("page-current white_auv");
    } else if(loading_style == 6){
        $("#page-lanscape").removeClass("page-current");
        $("#page-open-game").addClass("page-current blue_auv");
    }


    //浏览器电脑还是手机
    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {

        } else {
            // $("#page-open-game").addClass("pc_auv").css({'background':'black'}).find('.content,#gameframe').css({'width':documentH/1.775,'left':(documentW-documentH/1.775)/2})
            $("#page-open-game,#gameframe,.popup").css({'width':documentH/1.775,'left':(documentW-documentH/1.775)/2})
        }
    }

    browserRedirect();




    //监听浏览器的返回按钮
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
    if(loading_style != 4 && loading_style != 5){
        pushHistory();
        window.addEventListener("popstate", function(e) {
            showRecommendMore();
        }, false);
    }

    initShareShow = function () {
        if (SinaSDKTool.tool.getEnvironment() == "weixin") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").show();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "QHBrowser" ||
            SinaSDKTool.tool.getEnvironment() == "SogouMobileBrowser" ||
            SinaSDKTool.tool.getEnvironment() == "Liebao" ||
            SinaSDKTool.tool.getEnvironment() == "Lenovo" ||
            SinaSDKTool.tool.getEnvironment() == "MQQBrowser" ||
            SinaSDKTool.tool.getEnvironment() == "2345") {
            $("#add-home-other").hide();
            $("#add-home-type1").show();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "MxBrowser") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").show();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "Chrome") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").show();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "Gecko") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").show();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "Oupeng") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").show();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "SogouMobileBrowser") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").show();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
        else if (SinaSDKTool.tool.getEnvironment() == "UCBrowser") {
            $("#add-home-other").hide();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").show();
            $("#add-home-wechat").hide();
        }
        else {
            $("#add-home-other").show();
            $("#add-home-type1").hide();
            $("#add-home-type2").hide();
            $("#add-home-type3").hide();
            $("#add-home-type4").hide();
            $("#add-home-type5").hide();
            $("#add-home-type6").hide();
            $("#add-home-type7").hide();
            $("#add-home-wechat").hide();
        }
    };

    //初始化分享显示
    initShareShow();

    //判断手机横屏竖屏的方法
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        if (window.orientation === 180 || window.orientation === 0) {
            $('#page-lanscape').removeClass('page-current').css({'display': 'none'});
            $('#page-open-game').addClass('page-current').css({'display': 'block'});
        }
        if (window.orientation === 90 || window.orientation === -90) {
            $('#page-open-game').removeClass('page-current').css({'display': 'none'});
            $('#page-lanscape').addClass('page-current').css({'display': 'block'});
        }

        console.log($(document).width(), $(document).height(), $(window).height());
        var documentW = $(window).width();
        var documentH = $(window).height();
        $('#gameframe,#gameframe-channel').css({'width': documentW, 'height': documentH});
    }, false);


    //获取定时60s方法
    var count60 = 60;
    var timeout;

    function setcount(obj, timer) {
        console.log(count60);
        count60 = timer;
        if (count60 == 0) {
            $(obj).removeAttr('disabled');
            $(obj).css({'background': '#f06163 !important'});
            $(obj).val("重新获取");
            count60 = 60;
            return;
        } else {
            $(obj).attr('disabled', true);
            $(obj).css({'background': '#9d9d9d !important'});
            $(obj).val("已发送(" + count60 + ")");
            count60--;
        }
        timeout = setTimeout(function () {
            setcount(obj, count60)
        }, 1000)
    }

    //清除定时
    function clearcount(obj) {
        clearTimeout(timeout);
        $(obj).css({'background': '#f06163 !important'});
        $(obj).val("获取验证码");
        $(obj).removeAttr('disabled');
        count60 = 60;
    }

    //open_game页面渲染
    $(document).on("pageInit", "#page-open-game", function (e, pageId, $page) {
        if ($page.hasClass('black_auv')) {
            $('.red_logo').hide();
            $('.black_logo').show();
            //var oldSrc = $("#6").attr('src').replace("m6.png", "m2_super.png");
            //$("#6").attr('src', oldSrc);
            //$('#menu_btn').css({
            //    'background': 'url("http://auv2.game.weibo.cn/auv/api/server/platform/images/v1_0_5/n2-super.png")',
            //    'background-size': 'cover'
            //});
            $('.add-barcode-logo').find("img").attr("src", "http://auv2.game.weibo.cn/auv/api/server/platform/images/v1_0_5/super-qchar.gif");
            $('.loading-smallsina > strong').html('超体官方公众号: 【xlcjty】');
            $('.add-barcode-text').html('<p>打开微信扫描上方二维码</p><p>关注“Sina超体”</p><p>or</p> <p>加入超体官方公众号</p><p>公众号:xlcjty</p>');
        } else if ($page.hasClass('red_auv_new')) {
            var oldSrc = $(".smallsina-icon .red_logo").attr("src").replace("small_sina_icon.jpg", "small_sina_icon_new.png");
            $(".smallsina-icon .red_logo").attr("src", oldSrc);
        } else if($page.hasClass('white_auv')){
            $('.red_logo').hide();
            $('.white_logo').show();
            $('.smallsina-prompt').css({'color':'black'});

            $('.add-barcode-logo').find("img").attr("src", "http://auv2.game.weibo.cn/auv/api/server/platform/images/v1_0_5/barcode_30001.gif");
            $('.loading-smallsina > strong').html('微游戏官方公众号: 【Sinawyx】<br />官方玩家交流群：【521135070】').css({'color':'black'});
            $('.add-barcode-text').html('<p>打开微信扫描上方二维码</p><p>关注“微游戏”</p><p>or</p> <p>加入微游戏官方公众号</p><p>公众号:Sinawyx</p>');
        } else if($page.hasClass('blue_auv')){
            $('.red_logo').hide();
            $('.blue_logo').show();
        }

    });


    //礼包弹窗
    $(document).on('click', '.package-alert', function () {
        $.alert('' + this.attributes[2].textContent);
    });


    /*
     登录方式
     */
    //手机授权
    $(document).on('click', '.login_li_user_new', function () {
        clickMobileLogin();
        $.closeModal('.popup-choose');
        $.popup('.popup-login');
        $('.hint').hide();
        //授权
    });
    //弹出手机输入框,并执行手机登录验证
    $(document).on('click', '.button_login', function () {
        var ac = $(this).parents().find('#phone_num').val();
        var ps = $(this).parents().find('#user_pwd').val();
        console.log(ac, ps);
        loginWithMobile(ac, ps);
    });

    //手机号用户登录点击退出
    $(document).on('click', '.button-phone-logout', function () {
        $.closeModal('.popup-login');
        $.popup('.popup-choose');
        $('.shiwan').html('立即试玩');

    });

    //忘记密码-获取验证码
    $(document).on('click', '.get-code-find', function () {
        var tel = $('#input_phonenum_find').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (reg.test(tel)) {
            setcount($(this), 60);
            sendMobileCaptcha(tel); //验证码
        } else {
            alert("号码有误~");
        }
        // $.closeModal('.popup-login');
        // $.popup('.popup-choose');
    });
    //找回密码 step1的下一步
    $(document).on('click', '.button-next-step-find', function () {
        var verifycode = $('#input_verify_find').val().trim();
        console.log(verifycode.length, verifycode);
        if (verifycode.length != 6) {
            reg = /^\d{6}$/;
            if (!reg.test(verifycode)) {
                alert("请输入正确的验证码");
            }
        } else {
            $.closeModal('.popup-find');
            $.popup('.popup-set');
            clearcount($('.get-code-find'));
        }
    });
    //设置新密码
    $(document).on('click', '.set_new_password', function () {
        $(this).html('正在登录...');
        var num = $('#input_phonenum_find').val();
        var vcode = $('#input_verify_find').val();
        var pwd = $('#input_set_pwd').val();
        console.log(num, vcode, pwd);
        changeMobilePwd(num, vcode, pwd);
    });


    //注册新用户
    $(document).on('click', '.open-sign', function () {
        $.closeModal('.popup-login');
        $.popup('.popup-sign');
    });
    //注册新用户-获取验证码
    $(document).on('click', '.get-code', function () {
        var tel = $('#input_phonenum_sign').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (reg.test(tel)) {
            setcount($(this), 60);
            sendMobileCaptcha(tel); //验证码
        } else {
            alert("号码有误~");
        }
    });
    //点击立即注册按钮
    $(document).on('click', '.signin-now', function () {
        var num = $('#input_phonenum_sign').val();
        var vcode = $('#input_verify_sign').val();
        console.log(num, vcode);
        createMobilePlayer(num, vcode);

    });


    //点击立即试玩-游客登录
    $(document).on('click', '.shiwan', function () {
        $(this).html('正在登录...');
        createTourist();
    });


    //忘记密码
    $(document).on('click', '.modal-forget-password', function () {
        clearcount($('.get-code-find')); //清空下一页的定时器
        $.closeModal('.popup-login');
        $.popup('.popup-find');

    });

    //立即绑定
    $(document).on('click', '.button-bind-now', function () {
        $.closeModal('.popup-warning');
        $.popup('.popup-binding');

    });


    //选择绑定方式
    $(document).on('click', '.button-bind-way', function () {
        $.closeModal();
        $.popup('.popup-bind-way');

    });


    //换个手机号绑定
    $(document).on('click', '.change-another-mobile', function () {
        $.closeModal('.popup-fail');
        $.popup('.popup-binding');

    });

    //退出游戏
    $(document).on('click', '.recommend-game-btn', function () {
        //今日不在推荐
        var input = $('.input-not-recommend');
        if (input[0].checked == true) {
            sendTodayNotRecommend();
        }
        //退出游戏
        clickRecommendGame();
    });


    //全局退出时效果
    $(document).on('click', '.turnon-choose', function () {
        $.closeModal();
        console.log('closed');
        $.popup('.popup-choose');
        $('.shiwan').html('立即试玩');

    });


    ////点击更多游戏
    //$(document).on('click', '.m1', function () {
    //    $("#m1-red").css({'display': 'none'});
    //    Ball.clickMoreGame();
    //});
    ////点击关注
    //$(document).on('click', '.m2', function () {
    //    $("#m2-red").css({'display': 'none'});
    //    $.popup('.popup-focus');
    //});
    //
    ////点击保存
    //$(document).on('click', '.m3', function () {
    //    $("#m3-red").css({'display': 'none'});
    //    $.popup('.popup-add-home');
    //});
    ////点击礼包
    //$(document).on('click', '.m4', function () {
    //    $("#m4-red").css({'display': 'none'});
    //    Ball.clickGift();
    //});
    //
    ////点击切换
    //$(document).on('click', '.m8', function () {
    //    $("#m4-red").css({'display': 'none'});
    //    Ball.clickExchange();
    //});
    //
    ////点击分享
    //$(document).on('click', '.m6,.downbtn_share_btn', function () {
    //
    //    if(SinaSDKTool.data.channel == "460000"){
    //        window.location.href = "http://game.weibo.com/kefu/index.php?m=ask&c=post&a=add&fid=437";
    //    }else{
    //        if (SinaSDKTool.tool.checkEnvironment().isWeixin()) {
    //            $.popup('.popup-wechat-share');
    //        } else {
    //            $.popup('.popup-share');
    //        }
    //    }
    //    $("#m6-red").css({'display': 'none'});
    //});

    //关闭微信
    $(document).on('click', '.popup-wechat-share', function () {
        $.closeModal();
    });

    //点击微博分享
    $(document).on('click', '.share_sina', function () {
        clickSinaShare();
    });

    ////点击绑定
    //$(document).on('click', '.m7', function () {
    //    $("#m7-red").css({'display': 'none'});
    //    $.popup('.popup-bind-way');
    //});

    //微博绑定
    $(document).on('click', '.weibo-bind', function () {
        sinaAuthorizationBing();
    });

    //手机绑定
    $(document).on('click', '.mobile-bind', function () {
        $.closeModal();
        $.popup('.popup-binding');
        $('.popup-binding').children().find('#input_phonenum_bind,#input_verify_bind').val("");
    });
    //手机绑定-获取验证码
    $(document).on('click', '.get-code-bind', function () {
        var tel = $('#input_phonenum_bind').val();
        var reg = /^1[3|4|5|7|8]\d{9}$/;
        if (reg.test(tel)) {
            setcount($(this), 60);
            sendMobileCaptcha(tel); //验证码
        } else {
            alert("号码有误~");
        }
        // $.closeModal('.popup-login');
        // $.popup('.popup-choose');
    });
    //手机绑定 立即绑定
    $(document).on('click', '.button-binding', function () {
        var tel = $('#input_phonenum_bind').val();
        var verifycode = $('#input_verify_bind').val().trim();
        console.log(verifycode.length, verifycode);
        if (verifycode.length != 6) {
            reg = /^\d{6}$/;
            if (!reg.test(verifycode)) {
                alert("请输入正确的验证码");
            }
        } else {
            $.closeModal('.popup-binding');
            clearcount($('.get-code-bind'));
            sendMobileBing(tel, verifycode);
        }
    });


    /* 支付预警  直接支付 */
    $(document).on('click', '.button-nomoney', function () {
        clickPay();
    });


    // 购买代金卷
    $(document).on("pageInit", "#page-buy-voucher", function (e, id, page) {
        console.log(page);
        $('.money-box').click(function () {
            $(this).addClass('select-box').siblings().removeClass('select-box');
        });

    });


    //使用代金卷
    $(document).on('click', '.user-voucher', function () {
        $.closeModal();
        $.router.load("#page-pay-success");
    });


    //购买代金卷
    $(document).on('click', '.buy-voucher', function () {
        $.closeModal();
        $.router.load("#page-buy-voucher");
    });


    //返回游戏
    $(document).on('click', '.back-game', function () {
        // $.router.back();
        $.router.load("#page-open-game");
        // $('#page-lanscape').removeClass('page-current')
        // $('#page-open-game').addClass('page-current')
    });


    //排行榜
    //重来按钮
    $(document).on('click', '.downbtn_redo_btn', function () {
        $.closeModal();
    });

    //关闭按钮
    $(document).on('click', '#close-popup', function () {
        $.closeModal();
    });

    //点击积分分享
    $(document).on('click', '.downbtn_share_btn', function () {
        $.closeModal('.popup-rank');
        if (SinaSDKTool.tool.checkEnvironment().isWeixin()) {
            $.popup('.popup-wechat-share');
        } else {
            $.popup('.popup-share');
        }
    });


    //关闭按钮
    $(document).on('click', '.commend-more-game-exit', function () {
        $.closeModal();
        pushHistory();
    });


    //
    // $(document).on('click','#testclick', function (e, id, page) {
    //     console.log(e,id,page);
    //     console.log(window.parent)
    //     // window.parent.closeIframe();
    // });
    //
    // $(document).on('click','.open-about', function () {
    //     $.popup('.popup-about');
    // });
    //
    // $(document).on('click','.open-services', function () {
    //     $.popup('.popup-services');
    // });

    $.init();


});