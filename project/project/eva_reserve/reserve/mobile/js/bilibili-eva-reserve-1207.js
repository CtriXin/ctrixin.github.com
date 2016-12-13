/**
 * Created by xin on 2016/11/29.
 */

$(function () {

    //初始化大小
    var documentW = $(window).width();
    var documentH = $(window).height();



    //swiper 图片轮播
    var a  = (documentW-16)/1.8;  //获取图片的宽度，公式是：（x+边框的20）* 显示的0.8 + x = 页面宽度 ； 显示的0.8是因为下面定义一页显示1.8张图片
    var b = (a +20)*.8 /2;  //获取平移距离，因为20是边框，而一页显示1.8张图片，20的边框算在图片宽度内，所以加上
    console.log(b);
    var swiper = new Swiper('.swiper-container', {
        slidesPerView : 1.8,
        autoHeight:true,
        nextButton: '.next-btn',
        prevButton: '.prev-btn',
        spaceBetween : 20,
        slidesOffsetBefore : b,
        loop:true,
        loopedSlides :8
    });



    //因为位置参数为js获取，所有load一下
    $(window).load(function(){
        //获取图片的高度
        var bgH = $('.bg-top').height();
        //获取图片比例基数
        var pi = documentW /bgH;
        //横屏状态下图片的高度，用屏幕高度除以基数
        var lanscape = window.screen.height / pi;
        var verReserveTop = bgH*.8;
        var lanReserveTop = lanscape*.75;


        $('.reserve').css({'top':verReserveTop});
        $('.video-control').css({'top':bgH*.35});


        //判断手机横屏竖屏的方法
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
            if (window.orientation === 180 || window.orientation === 0) {
                $('#page-lanscape').removeClass('page-current').css({'display': 'none'});
                $('#page-draw').addClass('page-current').css({'display': 'block'});
                $('.logo,.go2index').css({'top':'2.5%'});
                $('.reserve').css({'top':verReserveTop});
                $('.agreement-check').css({'margin-top':'2em','font-size':'.65em'});
            }
            if (window.orientation === 90 || window.orientation === -90) {
                $('.logo,.go2index').css({'top':'10%'});
                $('.reserve').css({'top':lanReserveTop});
                $('.agreement-check').css({'margin-top':'3em','font-size':'.7em'});

            }
        }, false);
    });



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
            $(".scroll").css({'width': '100%', 'left': '0'});
        } else {
            $(".scroll,.popup").css({'width': documentH / 1.775, 'left': (documentW - documentH / 1.775) / 2});
            $('.reserve-now').css({'font-size': '1.5em'});
        }
    }
    browserRedirect();





    //输入框
    $(document).on('click','.reserv-btn-group', function () {
        $.popup('.popup-insert-num');

    });


    //关闭输入框
    $(document).on('click','.close-btn', function () {
        $.closeModal()
    });




    //选择设备
    $(document).on('click','.apple-icon,.android-icon', function () {
        console.log($(this));
        //隐藏其他 有可能出现的红色icon
        $('.apple-icon-active,.android-icon-active').hide();
        $('.apple-icon,.android-icon').show();
        //显示出来红色的icon
        $(this).next().show();
        //隐藏灰色自己
        $(this).hide();
        var checker = $(this).next().attr('data-check');
        $('.choose-device').attr('device-select',checker)
        $('.button-reserve').addClass('available')
    });

    $(document).on('click','.apple-icon-active,.android-icon-active', function () {
        $(this).prev().show();
        $(this).hide()
    });




    //预约
    $(document).on('click','.button-reserve', function () {
        console.log($(this));
        var phone_num = $('.phone_num_insert').val();
        console.log(phone_num);
        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        var device_select = $('.choose-device').attr('device-select');
        if(device_select == 'android' || device_select == 'apple'){
            $.showPreloader('请稍后...');
            //下面的settimeout 需要自行替换为ajax获取数据后，隐藏preloader，关闭前一个弹窗，弹出成功提示
            setTimeout(function () {
                $.hidePreloader();
                $.closeModal('.popup-insert-num');
                $.popup('.popup-success');
            }, 2000);
        }else{
            $('.popup-insert-num .warning').text('请选择正确的设备').show()
        }

    });




    //视频播放
    $(document).on('click','.video-control', function () {
        console.log($(this));
        $.popup('.popup-video');
        var x = document.getElementById("videoPlayer");
        console.log(x);
        x.play();
    });
    $(document).on('click','.closeVideo', function () {
        var x = document.getElementById("videoPlayer");
        console.log(x);
        x.pause();
        $.closeModal()
    });


    //输入框手机号位数判断，到11位则显示红色btn
    $("#phone_num").bind("input propertychange", function () {

        if($(this).val().length>10){
            $('.button-reserve').addClass('available')
        }else{
            $('.button-reserve').removeClass('available')
        }
        console.log($(this).val().length);//打印输入框字符长度

    });




    $.init();

});



