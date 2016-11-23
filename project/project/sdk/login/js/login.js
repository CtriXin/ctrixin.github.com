/**
 * Created by xin on 2016/10/21.
 */

$(function () {

    //初始化大小
    var documentW = $(window).width();
    var documentH = $(window).height();



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
            console.log('检测到是手机模式登录');
        } else {
            console.log('检测到是pc模式登录');
            $("#page-open-game,.popup").addClass('pc_auv').css({'width':documentH/1.775,'left':(documentW-documentH/1.775)/2})
        }
    }

    browserRedirect();



    //open_game页面渲染
    $(document).on("pageInit", "#page-open-game", function (e, pageId, $page) {
        $.popup('.popup-choose');
    });

    /*
     登录方式
     */
    //手机授权
    $(document).on('click', '.login_li_user_new', function () {
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

    //关闭微信
    $(document).on('click', '.popup-wechat-share', function () {
        $.closeModal();
    });

    //点击微博分享
    $(document).on('click', '.share_sina', function () {
        clickSinaShare();
    });

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



    $.init();


});