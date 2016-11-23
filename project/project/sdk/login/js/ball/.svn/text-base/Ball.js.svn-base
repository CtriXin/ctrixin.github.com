/**
 * Created by zhangshuwen on 16/9/19.
 */

var _Ball = function () {
    touchDiv = $('.sider_menu')[0];
    isOpen = false;
    isHaveMove = false;
};

//初始化对象
_Ball.prototype.initBall = function (data) {
    //判断是否显示浮球
    $('.sider_menu').show();
    if (SinaSDKTool.tool.environmentIsWeb() == "web" || data.is_show == "0") {
        $('.sider_menu').hide();
        return;
    }
    //初始化浮球功能
    $('.ball_ul').find('.ball_cell').remove();
    for(var i = 0;i < data.float_data.length;i++){
        var cell_data = data.float_data[i];
        this.addBallCell(cell_data.data);
    }

    //初始化红点
    if(data.float_data.length > 0){
        $("#menu-red").css({'display': 'block'});
    }else{
        $("#menu-red").css({'display': 'none'});
    }

    //初始化浮球图片
    $('#menu_btn').css({
        'background': 'url("' + data.ball_icon + '")',
        'background-size': 'cover'
    });


    //初始化动画
    this.initHoveBallTouch();

};

_Ball.prototype.addBallCell = function (data) {
    $('.ball_ul').append(this.getAddDiv(data));
};

//得到添加数据
_Ball.prototype.getAddDiv = function (cell_data) {
    var cell = cell_data.split(",");
    var showData = "";
    var redPoint = "none";
    if(cell[3] == "1"){
        redPoint = "block";
    }
    showData += '<li class="ball_cell" onclick="clickBallCell.call(this)" id="' + cell_data + '">' +
        '<img class="scrollLoading"  src="' + decodeURIComponent(cell[2]) + '"  title="">'+
        '<span class="tab-red-point" style="display: ' + redPoint + '"></span>' +
        '</li>';

    return showData;
};


/* 悬浮窗动画 */
_Ball.prototype.initHoveBallTouch = function () {
    touchDiv.addEventListener('touchstart', this.touchEvent, false);
    touchDiv.addEventListener('touchmove', this.touchEvent, false);
    touchDiv.addEventListener('touchend', this.touchEvent, false);
};

_Ball.prototype.touchEvent = function (ev) {
    var divWidth = 40;
    var divHeight = 40;
    var screenWidth = window.screen.width - 10;
    var screenHeight = document.body.scrollHeight - document.body.scrollTop - 10;

    switch (ev.type) {
        case "touchstart":
            break;
        case "touchmove":
            //阻止滑动
            ev.preventDefault();

            isHaveMove = true;

            if (isOpen == true) {
                return;
            }

            var touch = ev.targetTouches[0];
            //屏蔽出框
            if (0 < touch.pageX && screenWidth - divWidth > touch.pageX) {
                var leftPoint = touch.pageX;
                if (leftPoint >= (screenWidth / 2)) {
                    //右
                    touchDiv.style.right = (screenWidth - touch.pageX) + 'px';
                    touchDiv.style.left = '';

                } else {
                    //左
                    touchDiv.style.left = touch.pageX + 'px';
                    touchDiv.style.right = '';
                }
            }
            if (0 < touch.pageY && screenHeight - divHeight > touch.pageY) {
                touchDiv.style.top = touch.pageY + 'px';
            }
            //console.log("touchmove");
            break;
        case "touchend":
            if (isHaveMove == false) {
                //点击悬浮窗
                if (isOpen == false) {
                    //打开悬浮窗

                    //浮球点击事件
                    $(document).on('click', '#sider_menu', function () {
                        $(this).addClass('on');
                        $('.overlay-float-ball').css({'visibility': 'visible'});
                        $('.ui_li').show();
                    });


                    //隐藏红点
                    $("#menu-red").css({'display': 'none'});
                    isOpen = true;
                    console.log('open');


                    if ($('#sider_menu').has('.on')) {
                        $(document).on('click', '.overlay-float-ball', function () {
                            $(this).css({'visibility': 'hidden'});
                            $('#sider_menu').removeClass('on');
                            $('.ui_li').hide();
                            isOpen = false;
                            console.log('close from overlay');
                        });

                    }

                } else {
                    //关闭悬浮窗
                    $(document).on('click', '#sider_menu', function () {
                        $(this).removeClass('on');
                        $('.overlay-float-ball').css({'visibility': 'hidden'});
                        $('.ui_li').hide();
                    });
                    isOpen = false;
                    console.log('close');

                }
            } else {
                //移动悬浮窗
                if (touchDiv.style.left == "") {
                    console.log("向右移动");
                    $('.sider_menu').css({'right': '0'}).removeClass("sider_left").addClass("sider_right");
                } else if (touchDiv.style.right == "") {
                    //向左移动
                    console.log("向左移动");
                    $('.sider_menu').css({'left': '0'}).removeClass("sider_right").addClass("sider_left");
                }
            }
            isHaveMove = false;
            break;
    }
};

//显示地址
_Ball.prototype.OPEN_ADDRESS = function (ads) {
    window.location.href = decodeURIComponent(ads);
};

//显示窗口
_Ball.prototype.OPEN_POPUPBOX = function (pop) {
    $.popup('.' + pop);
};

//特殊方法
_Ball.prototype.OPEN_FUNCTION = function (name) {
    this[name]();
};

var Ball = new _Ball();



//悬浮球功能统一点击  OPEN_ADDRESS,,,;OPEN_POPUPBOX,,,;OPEN_FUNCTION,,,;
clickBallCell = function () {
    var cellData = this.id.split(",");
    Ball[cellData[0]].apply(Ball,[cellData[1]]);

    //去掉红点
    this.children[1].style.display = "none";
};



//打开更多游戏
Ball.clickMoreGame = function () {
    window.open(SinaSDKTool.sendAddress + "WxGame/sina_index?sina_suid=" + SinaSDKTool.data.suid + "&sina_token=" + SinaSDKTool.data.token + "&channel=" + SinaSDKTool.data.channel);
};

//分享
Ball.clickShare = function () {
    if (SinaSDKTool.tool.checkEnvironment().isWeixin()) {
        $.popup('.popup-wechat-share');
    } else {
        $.popup('.popup-share');
    }
}
//切换
Ball.clickExchange = function () {
    //初始化登录
    document.getElementsByClassName("gameframe-channel")[0].src = "";
    document.getElementsByClassName("gameframe")[0].src = "";
    $.popup('.popup-choose');
};

//礼包
Ball.clickGift = function () {
    var giftReq = new BSRequest();
    giftReq.addData("channel", SinaSDKTool.data.channel);
    giftReq.addData("gameappkey", SinaSDKTool.data.gameappkey);
    giftReq.addData("suid", SinaSDKTool.data.suid);
    giftReq.sendHttp("WxGame/web_game_gift", function () {
        var jsObj = JSON.parse(this.responseText);
        if (jsObj.status == 0) {
            //添加礼包条目
            $('.gift_list_ul').find('.item-content').remove();
            var award;
            var cell = "";
            for (var i = 0; i < jsObj.gift_list.length; i++) {
                //组装条目
                award = JSON.parse(jsObj.gift_list[i].award);
                cell = '<label class="label-checkbox item-content package-label">' +
                    '<div class="item-inner package-content">' +
                    '<div class="item-subtitle package-name">' + award[0].name + '</div>' +
                    '<div class="item-subtitle package-description">' + jsObj.gift_list[i].gift_name + '</div>' +
                    '<div class="item-subtitle package-see-more"><a href="#" class="package-alert" value="' + jsObj.gift_list[i].gift_name + '">' + '查看更多' + '</a></div>' +
                    '<div class="item-subtitle package-description">' +
                    '<div class="graph"><span style="width:' + Math.floor(100 - jsObj.gift_list[i].use_count / (jsObj.gift_list[i].all_count + jsObj.gift_list[i].use_count) * 100) + '%;"></span></div>' +
                    '</div>' +
                    '<div class="item-subtitle package-left">' + '剩余：' + Math.floor(100 - jsObj.gift_list[i].use_count / (jsObj.gift_list[i].all_count + jsObj.gift_list[i].use_count) * 100) + '%' + '</div>' +
                    '</div>' +
                    '<div class="item-media">' +
                    '<p class="package-btn">';
                if (jsObj.gift_list[i].is_receive == 1) {
                    cell += '<button class="button button-danger package-get">' + '已领取' + '</button>';
                } else {
                    cell += '<button class="button button-danger" onclick="clickGameGift.call(this,' + jsObj.gift_list[i].id + ',' + award[0].id + ',' + jsObj.gift_list[i].appkey + ');">' + '领取' + '</button>'
                }
                cell += '</p></div></label>';
                $('.gift_list_ul').append(cell);
            }
            //修改使用方法
            if (jsObj.gift_list.length > 0) {
                $('.package-content-top').html("" + jsObj.gift_list[0].use_desc);
            }

            $.popup('.popup-package');
        }
    });
};

/* 游戏礼包领取 */
clickGameGift = function (id, award_id, gameappkey) {
    var that = this;
    if(gameappkey == "3196999635" && SinaSDKTool.data.channel == "460000"){
        var giftReq = new BSRequest();
        giftReq.addData("uid", SinaSDKTool.data.suid);
        giftReq.addData("appkey", "rexueqiuqiu");
        giftReq.sendHttpWithGet("http://game.sports.sina.com.cn/api/getGameCardDataV1.php", function () {
            console.log("游戏礼包领取 :" + this.responseText);
            var jsObj = JSON.parse(this.responseText);
            if (jsObj.errNum == "33000") {
                //修改显示
                that.className = "button button-danger package-get";
                that.innerHTML = "已领取";
                that.onclick = null;

                showPayFailed("兑换码:" + jsObj.retData.cdk,"已经复制到剪贴板");
                clipboardCDK(jsObj.retData.cdk);
            }
        });
    }else{
        //发送指令
        var giftReq = new BSRequest();
        giftReq.addData("suid", SinaSDKTool.data.suid);
        giftReq.addData("tid", id);
        giftReq.addData("aid", award_id);
        giftReq.addData("gameappkey", gameappkey);
        giftReq.addData("isfloat", "1");
        giftReq.sendHttpWithGet("WxGame/get_game_gift", function () {
            console.log("游戏礼包领取 :" + this.responseText);
            var jsObj = JSON.parse(this.responseText);
            if (jsObj.status == 0) {
                //修改显示
                that.className = "button button-danger package-get";
                that.innerHTML = "已领取";
                that.onclick = null;

                showPayFailed("兑换码:" + jsObj.cdkey,"已经复制到剪贴板");
                clipboardCDK(jsObj.cdkey);
            }
        });
    }

};

/* 复制到剪切板 */
clipboardCDK = function (cdk) {

    //复制到粘贴板
    var clipboard = new Clipboard('.modal-button', {
        text: function() {
            return cdk;
        }
    });
    clipboard.on('success', function(e) {
        //console.log(e);
    });

    clipboard.on('error', function(e) {
        //console.log(e);
    });
};



