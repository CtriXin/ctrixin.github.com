/**
 * Created by xin on 2016/11/29.
 */

$(function () {

    //初始化大小
    var documentW = $(window).width();
    var documentH = $(window).height();






    //因为位置参数为js获取，所有load一下
    $(window).load(function(){
        //获取图片的高度
        var bgH = $('.bg-top').height();
        //获取图片比例基数
        var pi = documentW /bgH;
        //横屏状态下图片的高度，用屏幕高度除以基数
        var lanscape = window.screen.height / pi;
        var verReserveTop = bgH*.62;
        var lanReserveTop = lanscape*.62;
        //获取轮播图图片宽度
        var a  = $('.swiper-slide img').height();

        $('.section_3').height(a + 80)
        console.log(a);

        $('.reserve').css({'top':verReserveTop});
        // $('.video-control').css({'top':bgH*.35});


        //判断手机横屏竖屏的方法
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
            if (window.orientation === 180 || window.orientation === 0) {
                $('#page-lanscape').removeClass('page-current').css({'display': 'none'});
                $('#page-draw').addClass('page-current').css({'display': 'block'});


                $('.logo,.go2index').css({'top':'2.5%'});
                $('.reserve').css({'top':verReserveTop});
                // $('.reserve-now').css({'font-size':'1.3em','line-height':'1.1em'});
                // $('.reserve-num').css({'font-size':'.6em'});
                $('.agreement-check').css({'font-size':'.65em'});
                $('.swiper-slide img').css({'width':'100%'})

            }
            if (window.orientation === 90 || window.orientation === -90) {
                // $('#page-draw').removeClass('page-current').css({'display': 'none'});
                // $('#page-lanscape').addClass('page-current').css({'display': 'block'});

                $('.logo,.go2index').css({'top':'10%'});
                $('.reserve').css({'top':lanReserveTop});
                // $('.reserve-now').css({'font-size':'1.7em','line-height':'1.2em'});
                // $('.reserve-num').css({'font-size':'.7em'});
                $('.agreement-check').css({'font-size':'.7em'});
                $('.swiper-slide img').css({'width':'50%'})

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

            //swiper 图片轮播
            var swiper = new Swiper('.swiper-container', {
                slidesPerView : 2,
                pagination : '.swiper-pagination',
                // autoHeight:true,
                nextButton: '.next-btn',
                prevButton: '.prev-btn',
                spaceBetween : 20,
                loop:true,
                loopedSlides :8
            });
        } else {
            $(".page,.popup").css({'width': documentH / 1.775, 'left': (documentW - documentH / 1.775) / 2});
            // $(".reserve").css({'top': '64%'});
            $('.reserve-now').css({'font-size': '1.5em'});

            //swiper 图片轮播
            var swiper = new Swiper('.swiper-container', {
                slidesPerView : 3,
                pagination : '.swiper-pagination',
                // autoHeight:true,
                nextButton: '.next-btn',
                prevButton: '.prev-btn',
                spaceBetween : 20,
                loop:true,
                loopedSlides :8
            });
        }
    }
    browserRedirect();



    // 多选
    $(".piaochecked").on("click", function () {
        $(this).toggleClass("on_check");
    });


    var share_webo = 1;

    //输入框
    $(document).on('click','.reserv-btn-group', function () {
        if($('.piaochecked').hasClass('on_check')){
            share_webo =1
        }else{
            share_webo =0
        }
        $.popup('.popup-insert-num');
    });


    //关闭输入框
    $(document).on('click','.close-btn', function () {
        $.closeModal()
    });






    //预约
    $(document).on('click','.button-reserve', function () {
        console.log($(this));
        var phone_num = $('.phone_num_insert').val();
        console.log(phone_num);
        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
        var device_select = $('.choose-device').attr('device-select');
        if (reg.test(phone_num)) {
            console.log('前端判断此手机号为真实号码');
            $.showPreloader('请稍后...');
            setTimeout(function () {
                $.hidePreloader();
                $.closeModal();
                $.popup('.popup-success');
            }, 2000);
        }else{
            $('.popup-insert-num .warning').text('手机号有误，请重新输入').show();
        }

    });




    //视频播放
    $(document).on('click','.video-avatar', function () {
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


//输入框手机号位数判断，到11位则显示红色btn
$("#phone_num").bind("input propertychange", function () {

    if($(this).val().length>10){
        $('.button-reserve').addClass('available')
    }else{
        $('.button-reserve').removeClass('available')
    }
    console.log($(this).val().length);//打印输入框字符长度

});
