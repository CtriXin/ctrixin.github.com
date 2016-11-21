/**
 * Created by xin on 16/7/5.
 */
$(function () {
    var documentW = $(window).width();
    var documentH = $(window).height();

    var baseURL = 'http://auv2.game.weibo.cn/auv/api/';
    var href = window.location.href;
    var hrefURL = href.split('server/')[0];

    $(document).on("pageInit", function(e, pageId, $page) {
        if(pageId == "page-wechat") {
            console.log($page);
            $.router.loadPage('index.html');
            console.log('oh')
        }
    });

    var documentHeight = $(document).height();
    var documentWidth = $(document).width();

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
            $(".page,.popup").css({'width':documentH/1.775,'left':(documentW-documentH/1.775)/2})
        }
    }

    browserRedirect();


    //首页
    $(document).on("pageInit", "#page-index", function(e, id, page) {
        console.log(e,page);
        $.popup('.popup-tutorial');
        /*图片滚动效果*/
        var speedpic = 100;//速度数值越大速度越慢
        document.getElementById("speaker2").innerHTML = document.getElementById("speaker1").innerHTML;
        function Marqueepic() {
            if (document.getElementById("speaker2").offsetWidth
                - document.getElementById("speaker").scrollLeft <= 0) {
                document.getElementById("speaker").scrollLeft -= document
                    .getElementById("speaker1").offsetWidth;
            } else {
                document.getElementById("speaker").scrollLeft++;
            }
        }
        var MyMarpic = setInterval(Marqueepic, speedpic);

        document.getElementById("speaker").onmouseover = function() {
            clearInterval(MyMarpic);
        };
        document.getElementById("speaker").onmouseout = function() {
            MyMarpic = setInterval(Marqueepic, speedpic);
        };

        //新闻滚动
        $('#breakingnews1').BreakingNews({
            timer: 3000,
            effect: 'slide'
        });

        $('#breakingnews2').BreakingNews({
            timer: 4000,
            effect: 'slide'
        });


        $('.checkout-close').click(function () {
            $.closeModal()
        });


        var a;
        //弹窗 下一步
        $('.next-img').click(function(){
            // console.log($('.step1').css('display'))
            var a = $(this).attr('data-num');
            if(a == undefined){
                a = 0;
            }
            console.log(a);

            if(a == 0){
                $('.step1').css({'display':'none'});
                $('.step2').css({'display':'block'});
                $(this).attr('data-num','1');
            }else if(a == 1){
                $('.step2').css({'display':'none'});
                $('.step3').css({'display':'block'});
                $(this).attr('data-num','2');
            }else if(a == 2){
                $('.step3').css({'display':'none'});
                $('.step4').css({'display':'block'});
                $(this).attr('data-num','3');
            }else if(a == 3){
                $('.step4').css({'display':'none'});
                $('.step5').css({'display':'block'});
                $(this).attr('data-num','4');
            }else if(a == 4){
                $.closeModal();
                $(this).attr('data-num','0');
                $('.tutorial-img').css({'display':'block'});
            }


        })


    });



    //8折优惠页面引导
    $(document).on("pageInit", "#page-reload-benifit", function(e, id, page) {
        console.log(page);
        $.popup('.popup-tutorial');
        //教程
        $('.checkout-close').click(function () {
            $.closeModal()
        });


        var a;
        //弹窗 下一步
        $('.next-img').click(function(){
            // console.log($('.step1').css('display'))
            var a = $(this).attr('data-num');
            if(a == undefined){
                a = 0;
            }
            console.log(a);

            if(a == 0){
                $('.step1').css({'display':'none'});
                $(this).attr('data-num','1');
            }else if(a == 1){
                $('.step2').css({'display':'none'});
                $(this).attr('data-num','2');
            }else if(a == 2){
                $.closeModal();
                $(this).attr('data-num','0');
                $('.tutorial-img').css({'display':'block'});
            }


        });


        //图片放大
        function picBig() {
            var v = document.getElementById('showbig-img');
            v.style.display = "block";
        }

        function picClose() {
            var v = document.getElementById('showbig-img');
            v.style.display = "none";
        }


        console.log(documentHeight,documentWidth);
        $('.openbig-img').click(function () {
            console.log($(this).width());
            var img_width = $(this).width();
            var img_height = $(this).height();
            var img_height_change = documentWidth/img_width * img_height;
            var img_margin = (documentHeight - img_height_change) / 2;
            console.log(img_height_change,img_margin);
            if(img_margin<0){
                $('.show-large-img').attr('src',$(this).attr('data-img')).css({'margin-top':'10%','height':'90%','width':'auto'});

            }else{
                $('.show-large-img').attr('src',$(this).attr('data-img')).css({'width':'100%','height':'auto','margin-top':img_margin+'px'});

            }
            picBig();
        });
        $('.closebig-img').click(function () {
            picClose();
        });



    });




    //赚钱游戏详情
    $(document).on("pageInit", "#page-earn-money-detail", function(e, id, page) {
        console.log(page);
        $.popup('.popup-tutorial');
        //教程
        $('.checkout-close').click(function () {
            $.closeModal()
        });


        var a;
        //弹窗 下一步
        $('.next-img').click(function(){
            // console.log($('.step1').css('display'))
            var a = $(this).attr('data-num');
            if(a == undefined){
                a = 0;
            }
            console.log(a);

            if(a == 0){
                $('.step1').css({'display':'none'});
                $(this).attr('data-num','1');
            }else if(a == 1){
                $.closeModal();
                $(this).attr('data-num','0');
                $('.tutorial-img').css({'display':'block'});
            }

        });



    });





    //alipay wechat 选择框
    $(document).on("pageInit", "#page-alipay,#page-wechat,#page-unionpay", function(e, id, page) {
        console.log(page);
        $('.money-box').click(function () {
            console.log('en');
            $(this).addClass('select-box').siblings().removeClass('select-box');
        });

    });






























    //推广详情 大图
    $(document).on("pageInit", "#page-spread-content", function(e, id, page) {
        console.log(page);
        /*=== 默认为 standalone ===*/
        var myPhotoBrowserStandalone = $.photoBrowser({
            photos : [
                '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg'
            ],
            toolbar:false

        });
        //点击时打开图片浏览器
        $(page).on('click','.pb-standalone',function () {
            myPhotoBrowserStandalone.open();
        });

    });

    //推广预览 大图
    $(document).on("pageInit", "#page-spread-content-preview", function(e, id, page) {
        console.log(page);
        /*=== 默认为 standalone ===*/
        var myPhotoBrowserStandalone = $.photoBrowser({
            photos : [
                '//img.alicdn.com/tps/i3/TB1kt4wHVXXXXb_XVXX0HY8HXXX-1024-1024.jpeg'
            ],
            toolbar:false

        });
        //点击时打开图片浏览器
        $(page).on('click','.pb-standalone',function () {
            myPhotoBrowserStandalone.open();
        });

    });



    //创建子渠道
    $(document).on("pageInit", "#page-creatchannel", function(e, id, page) {
        console.log(page);

        var $content = $(page).find('.creatchannel');

        $content.on('click',function () {
            //post 提交
            $('#name_pro,#wechat_pro,#usernum_pro,#username_pro,#tel_pro').html('');

            $(this).attr('disabled','disabled');
            var name = $("#name").val().replace(/^\s+|\s+$/g, '');
            var wechat = $("#wechat").val().replace(/^\s+|\s+$/g, '');
            var usernum = $("#usernum").val().replace(/^\s+|\s+$/g, '');
            var username = $("#username").val().replace(/^\s+|\s+$/g, '');
            var tel = $("#tel").val().replace(/^\s+|\s+$/g, '');
            if(name == '')
            {
                $('#name_pro').html("* 渠道名不合法!");
                return false;
            }
            if(wechat == '')
            {
                $('#wechat_pro').html("* 微信号不合法!");
                return false;
            }
            if(usernum == '')
            {
                $('#usernum_pro').html("* 朋友圈人数不合法!");
                return false;
            }
            if(username == '')
            {
                $('#username_pro').html("* 姓名不合法!");
                return false;
            }
            if(tel == '')
            {
                $('#tel_pro').html("* 手机号不合法!");
                return false;
            }
            var channelid = $('.channelid').val();
            var token = $('.token').val();

            var AjaxURL= hrefURL+"server/backstage/index.php/mobile/manage/savechannel?token="+token;
            $.ajax({
                type: "GET",
                data: "name="+name+"&wechat="+wechat+"&usernum="+usernum+"&tel="+tel+"&channelid="+channelid+"&username="+username,
                dataType: "text",
                url: AjaxURL,
                success: function (data) {
                    var strresult = JSON.parse(data);
                    if(strresult.status == 1) {
                        alert(strresult.msg);
                        window.location.href = hrefURL+"server/backstage/index.php/mobile/manage/channelinfo?token="+token+"&channelid="+channelid;

                        // window.location.href = "<?php echo base_url('server/backstage/index.php/mobile/manage/channelinfo?token=').$token.'&channelid='.$channelid;?>";
                    }else{
                        alert(strresult.msg);
                    }
                },
                error: function(data) {
                    alert("error:"+data.responseText);
                }
            });
        });


    });



    //编辑渠道
    $(document).on("pageInit", "#page-editchannel", function(e, id, page) {
        console.log(page);
        var $content = $(page).find('.editchannel');

        $content.on('click',function () {
            //post 提交
            var channelname = $("#channelname").val().replace(/^\s+|\s+$/g, '');
            var username = $("#username").val().replace(/^\s+|\s+$/g, '');
            var wechat = $("#wechat").val().replace(/^\s+|\s+$/g, '');
            var usernum = $("#user_num").val().replace(/^\s+|\s+$/g, '');
            var tel = $("#user_tel").val().replace(/^\s+|\s+$/g, '');
            if(channelname == '')
            {
                $('#name_pro').html("* 渠道名不合法!");
                return false;
            }
            if(wechat == '')
            {
                $('#wechat_pro').html("* 微信号不合法!");
                return false;
            }
            if(usernum == '')
            {
                $('#usernum_pro').html("* 朋友圈人数不合法!");
                return false;
            }
            if(username == '')
            {
                $('#username_pro').html("* 姓名不合法!");
                return false;
            }
            if(tel == '')
            {
                $('#tel_pro').html("* 手机号不合法!");
                return false;
            }

            var channelid = $('.channelid').val();
            var token = $('.token').val();
            var AjaxURL= hrefURL+"server/backstage/index.php/mobile/manage/updatechannel";
            $.ajax({
                type: "POST",
                data: "channelname="+channelname+"&username="+username+"&wechat="+wechat+"&usernum="+usernum+"&tel="+tel+"&channelid="+channelid+""+"&username="+username+"&token="+token,
                dataType: "text",
                url: AjaxURL,
                success: function (data) {
                    var strresult = JSON.parse(data);
                    if(strresult.status == 1) {
                        alert(strresult.msg);
                        window.location.href = hrefURL+"server/backstage/index.php/mobile/manage/channelinfo?token="+token+"&channelid="+channelid;

                        // window.location.href = "<?php echo base_url('server/backstage/index.php/mobile/manage/channelinfo?token=').$token.'&channelid='.$channel;?>";
                    }else{
                        alert(strresult.msg);
                    }
                },
                error: function(data) {
                    alert("error:"+data.responseText);
                }
            });
        });


    });
    
    //支付宝提现
    $(document).on("pageInit", "#page-alipay", function(e, id, page) {
        var $content = $(page).find('.alipay');
        $content.on('click',function () {
            //post 提交
            var alipay = $("#alipay").val().replace(/^\s+|\s+$/g, '');
            var username = $("#username").val().replace(/^\s+|\s+$/g, '');
            var money = $(".select-box").text();
            var token = $('.token').val();
            console.log(token);
            if(alipay == '')
            {
                alert("请输入账号");
                return false;
            }
            if(username == '')
            {
            	alert("请输入姓名");
                return false;
            }
            var AjaxURL= hrefURL+"server/backstage/index.php/mobile/manage/doalipay";
            $.ajax({
                type: "GET",
                data: "alipay="+alipay+"&username="+username+"&money="+money+"&token="+token,
                dataType: "text",
                url: AjaxURL,
                success: function (data) {
                    var strresult = JSON.parse(data);
                    alert(strresult.msg);
                },
                error: function(data) {
                    alert("error:"+data.responseText);
                }
            });
        });


    });
    
    //微信提现
    $(document).on("pageInit", "#page-wechat", function(e, id, page) {
        var $content = $(page).find('.wechat');
        $content.on('click',function () {
            //post 提交
            var username = $("#username").val().replace(/^\s+|\s+$/g, '');
            var money = $(".select-box").text();
            var token = $('.token').val();
            if(username == '')
            {
            	alert("请输入姓名");
                return false;
            }
            var AjaxURL= hrefURL+"server/backstage/index.php/mobile/manage/dowechat";
            $.ajax({
                type: "GET",
                data: "username="+username+"&money="+money+"&token="+token,
                dataType: "text",
                url: AjaxURL,
                success: function (data) {
                    var strresult = JSON.parse(data);
                    alert(strresult.msg);
                },
                error: function(data) {
                    alert("error:"+data.responseText);
                }
            });
        });
    });
    
    //银行卡提现
    $(document).on("pageInit", "#page-unionpay", function(e, id, page) {
    	var $content = $(page).find('.unionpay');
    	$content.on('click',function () {
    		//post 提交
    		var bank_card = $("#bank_card").val().replace(/^\s+|\s+$/g, '');
    		var bank_name = $("#bank_name").val().replace(/^\s+|\s+$/g, '');
    		var username = $("#username").val().replace(/^\s+|\s+$/g, '');
    		var money = $("#money").val().replace(/^\s+|\s+$/g, '');
    		var token = $('.token').val();
    		if(username == '')
    		{
    			alert("请输入姓名");
    			return false;
    		}
    		var AjaxURL= hrefURL+"server/backstage/index.php/mobile/manage/dounionpay";
    		$.ajax({
    			type: "GET",
    			data: "bank_card="+bank_card+"&bank_name="+bank_name+"&username="+username+"&money="+money+"&token="+token,
    			dataType: "text",
    			url: AjaxURL,
    			success: function (data) {
    				var strresult = JSON.parse(data);
    				alert(strresult.msg);
    			},
    			error: function(data) {
    				alert("error:"+data.responseText);
    			}
    		});
    	});
    });


    //推广预览 大图
    $(document).on("pageInit", "#page-forgetpwd", function(e, id, page) {
        console.log(page);
        var countdown=60;
        function settime(obj) {
            if (countdown == 0) {
                obj.removeAttribute("disabled");
                obj.value="重新获取";
                $(obj).removeClass('fill-gray');
                $('.find-upload').css({'display':'block'});
                countdown = 60;
                return;
            } else {
                obj.setAttribute("disabled", true);
                $(obj).addClass('fill-gray');
                obj.value="已发送(" + countdown + ")";
                $('.find-upload').css({'display':'none'});
                countdown--;
            }
            setTimeout(function() {
                settime(obj)
            },1000)
        }

        function submit(){
            //post 提交
            var name = $("#username").val().replace(/^\s+|\s+$/g, '');
            var yzm = $("#yzm").val().replace(/^\s+|\s+$/g, '');
            if(name == '')
            {
                alert("* 用户名不合法!");
                return false;
            }
            if(yzm == '')
            {
                alert("* 验证码格式不对!");
                return false;
            }
            var AjaxURL= "<?php echo base_url()?>server/backstage/index.php/login/login_admin";
            $.ajax({
                type: "POST",
                data: "username="+name+"&pwd="+pwd+"&state=mb",
                dataType: "text",
                url: AjaxURL,
                success: function (data) {
                    var strresult = JSON.parse(data);
                    if(strresult.status == 1) {
                        alert(strresult.msg);
                        window.location.href = hrefURL+"server/backstage/index.php/mobile/manage/login?token="+strresult.token;

                        // window.location.href = "<?php echo base_url('server/backstage/index.php/mobile/manage/login?token=');?>"+strresult.token;
                    }else{
                        $(".warning").css('display','block');
                        //document.getElementById("warning").style.display="";//显
                        //alert(strresult.msg);
                    }
                },
                error: function(data) {
                    alert("error:"+data.responseText);
                }
            });

        }
    });




    //注册页
    $(document).on("pageInit", "#page-sign", function(e, id, page) {
        console.log(page);

        var $content = $(page).find('.signbtn');


        $content.on('click',function () {
            //post 提交

            $('#name_pro,#pwd_pro,#agpwd_pro').html('');

            var name = $("#userName").val().replace(/^\s+|\s+$/g, '');
            var pwd = $("#pwd").val().replace(/^\s+|\s+$/g, '');
            var agpwd = $("#agpwd").val().replace(/^\s+|\s+$/g, '');
            console.log(pwd)
            if(name == '') {
                $('#name_pro').html("* 用户名不合法!");
                return false;
            }
            if(pwd == '' || pwd.length<6 || pwd.length>16) {
                $('#pwd_pro').html("* 密码不合法!");
                return false;
            }

            if(pwd != agpwd) {
                $('#pwd_pro').html("");
                $('#agpwd_pro').html("* 密码不一致!");
                return false;
            }
            var AjaxURL= hrefURL+"server/backstage/index.php/login/register";
            $.ajax({
                type: "POST",
                data: "username="+name+"&pwd="+pwd+"&state=mb",
                dataType: "text",
                url: AjaxURL,
                success: function (data) {
                    var strresult = JSON.parse(data);
                    if(strresult.status == 1) {
                        alert(strresult.msg);
                        window.location.href = hrefURL+"server/backstage/index.php/mobile/manage/addchannel?token="+strresult.token;
                    }else{
                        alert(strresult.msg);
                    }
                },
                error: function(data) {
                    alert("error:"+data.responseText);
                }
            });
        });


    });




    $.init();
});