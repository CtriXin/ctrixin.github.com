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
        var verReserveTop = bgH*.75;
        var lanReserveTop = lanscape*.75;


        $('.video-control').css({'top':bgH*.50});


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
            $(".scroll,.popup,.section_3").css({'width': documentH / 1.775, 'left': (documentW - documentH / 1.775) / 2});
            $('.reserve-now').css({'font-size': '1.5em'});
        }
    }
    browserRedirect();





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
    

    $.init();

});


