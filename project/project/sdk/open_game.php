<!DOCTYPE html>
<html lang="en" xmlns:wb="http://open.weibo.com/wb">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="format-detection" content="telephone=no, address=no">
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta property="desc" content="<?php echo $game_desc;?>"/>
    <meta http-equiv="Cache-Control" content="no-cache,must-revalidate">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta class="buttons" content="<?php echo $buttons?>">
    <meta class="red_buttons" content="<?php echo $red_buttons?>">
    <meta class="loading_style" content="<?php echo $loading_style?>">
    <meta class="login_style" content="<?php echo $login_style?>">
    <link rel="apple-touch-icon" href="<?php echo $game_icon;?>" />
    <title><?php echo $game_name;?></title>

    <link rel="stylesheet" href="<?php echo base_url()?>server/platform/css/v2_0_1/sm.min.css">
    <link rel="stylesheet" href="<?php echo base_url()?>server/platform/css/v2_0_1/style.css">
    <link rel="stylesheet" href="<?php echo base_url()?>server/platform/fonts/v2_0_1/iconfont.css">

    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?9de8af480946f95e5f4a6e687496a053";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>

</head>
<body>

<!-- body -->

<div class="page-group">
    <div class="page page-current" id="page-lanscape" style="display: none">
        <!-- 你的html代码 -->

        <!-- 这里是横竖屏内容 -->
        <div class="content">
            <div class="screen-up">
                <img src="<?php echo base_url()?>server/platform/images/v1_0_5/screen_prompt_icon.png" alt="">
            </div>
            <div class="screen-down">
                <img src="<?php echo base_url()?>server/platform/images/v1_0_5/screen_prompt.png" alt="">
                <strong>请使用竖屏进行游戏</strong>
            </div>
        </div>

    </div>


    <div class="page " id="page-open-game">
        <!--black_auv-->
        <!-- 这里是页面内容区 -->
        <div class="content">

            <!--浮球-->
            <div id="sider_menu" class="sider_menu sider_right visible-xs-block" style="right: 0;top:50%;z-index: 999999;">

                <ul class="ui_li ball_ul">
                    <!--<li class="m1">-->
                        <!--<img class="scrollLoading  m11" id="1" data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m1.png"-->
                             <!--src="<?php if(isset($float_more_icon) && !empty($float_more_icon)) { echo $float_more_icon;}else{ echo base_url().'/server/platform/images/v1_0_5/m1.png';}?>" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m1-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;更多&ndash;&gt;-->
                    <!--<li class="m2">-->
                        <!--<img class="scrollLoading  m12" id="2" data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m2.png"-->
                             <!--src="<?php if(isset($float_attention_icon) && !empty($float_attention_icon)) { echo $float_attention_icon;}else{ echo base_url().'/server/platform/images/v1_0_5/m2.png';}?>" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m2-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;关注公众号&ndash;&gt;-->
                    <!--<li class="m3">-->
                        <!--<img class="scrollLoading  m13" id="3" data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m3.png"-->
                             <!--src="<?php if(isset($float_desktop_icon) && !empty($float_desktop_icon)) { echo $float_desktop_icon;}else{ echo base_url().'/server/platform/images/v1_0_5/m3.png';}?>" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m3-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;存桌面&ndash;&gt;-->
                    <!--<li class="m4">-->
                        <!--<img class="scrollLoading  m14" id="4" data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m4.png"-->
                             <!--src="<?php if(isset($float_welfare_icon) && !empty($float_welfare_icon)) { echo $float_welfare_icon;}else{ echo base_url().'/server/platform/images/v1_0_5/m4.png';}?>" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m4-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;领福利&ndash;&gt;-->
                    <!--<li class="m5">-->
                        <!--<img class="scrollLoading  m15" id="5" data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m5.png"-->
                             <!--src="<?php if(isset($float_strategy_icon) && !empty($float_strategy_icon)) { echo $float_strategy_icon;}else{ echo base_url().'/server/platform/images/v1_0_5/m5.png';}?>" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m5-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;攻略&ndash;&gt;-->
                    <!--<li class="m6">-->
                        <!--<img class="scrollLoading  m16" id="6" data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m6.png"-->
                             <!--src="<?php if(isset($float_share_icon) && !empty($float_share_icon)) { echo $float_share_icon;}else{ echo base_url().'/server/platform/images/v1_0_5/m6.png';}?>" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m6-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;分享&ndash;&gt;-->
                    <!--<li class="m7">-->
                        <!--<img class="scrollLoading  m17" id=7  data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m7.png"  src="<?php echo base_url()?>server/platform/images/v1_0_5/m7.png" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m7-red"></span>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;绑定&ndash;&gt;-->
                    <!--<li class="m8" style="display: none">-->
                        <!--<img class="scrollLoading  m18" id=8  data-url="<?php echo base_url()?>server/platform/images/v1_0_5/m8.png"  src="<?php echo base_url()?>server/platform/images/v1_0_5/m8.png" alt="" title="">-->
                        <!--<span class="tab-red-point" id="m8-red"></span>-->
                    <!--</li>-->
                    <!--切换-->
                </ul>

                <!--浮球本体-->
                <i class="menu_btn" id="menu_btn" style="background: url('<?php echo base_url()?>server/platform/images/v1_0_5/n2.png') no-repeat;background-size: cover"><span class="menu-red-point" id="menu-red" style="display: none;"></span></i>
            </div>


            <!--游戏本体-->
            <iframe src="" class="gameframe" id="gameframe" frameborder="0"></iframe>

            <div class="loading-smallsina">
                <div class="smallsina-icon">
                    <img src="<?php echo base_url()?>server/platform/images/v1_0_5/small_sina_icon.jpg"  class="red_logo" alt="">
                    <img src="<?php echo base_url()?>server/platform/images/v1_0_5/super-logo.png" class="black_logo" alt="">
                    <img src="<?php echo base_url()?>server/platform/images/v1_0_5/icon_30001.png" class="white_logo" alt="">
                    <span class="smallsina-prompt">正在为您请求授权,请稍后</span>

                </div>
                <strong>【玩家交流群】: 182321886</strong>

                <!--<p><a href="javascript:;" class="open-popup" data-popup=".popup-package">点我点我</a></p>-->

            </div>


            <div class="overlay-float-ball">

            </div>

        </div>


        <!--TODO 还没加第二加载样式-->

    </div>



    <!--渠道登录,没有浮动求-->
    <div class="page" id="page-channel-game">
        <!-- 这里是页面内容区 -->
        <div class="content">

            <!--游戏本体-->
            <iframe src="" class="gameframe-channel" id="gameframe-channel" frameborder="0"></iframe>


        </div>


        <!--TODO 还没加第二加载样式-->

    </div>

    <!-- 选择登录方式 -->
    <div class="popup popup-choose">
        <div class="login-mode-content-new" style="display: block;">
            <div class="login-mode-contbox-new">
                <!--<p>选择登录方式</p>-->
                <div class="content-padded grid-demo">
                    <p>选择登录方式</p>

                    <div class="row">
                        <div class="col-33 login_mobile login_li_user_new">
                            <i id="login_icon_mobile" class="icon iconfont icon-shouji bind-way-orange-i"></i>

                            <div style="color:#ffae00">手机</div>
                        </div>
                        <div class="col-33 login_qq login_li_qq_new" onclick="qqAuthorization()">
                            <i id="login_icon_qq" class="icon iconfont icon-qq bind-way-blue-i"></i>

                            <div style="color:#60acec">QQ</div>
                        </div>
                        <div class="col-33 login_sina login_li_wb_new" onclick="sinaAuthorization()">
                            <i id="login_icon_sina" class="icon iconfont icon-weibo bind-way-red-i"></i>

                            <div style="color:#e7675c">微博</div>
                        </div>
                    </div>

                </div>
                <div class="prompt">
                    <i class="iconfont icon icon-icexclamationcircleo"></i>
                    “游客”可能无法保存角色
                    <span onclick="createTourist();">游客试玩</span>
                </div>
            </div>

            <a href="#" id="loginTimer" class="button button-big  button-fill shiwan">立即试玩</a>

        </div>
    </div>


    <!--输入框主体,登录-->
    <div class="popup popup-login">
        <div class="content-padded content-popup">

            <div class="content-block-title modal-input-title">
                <span class="pull-left">手机号用户登录</span>
                <span class="pull-right redcolor open-sign">注册新用户</span>
            </div>

            <div class="searchbar modal-input-sign">
                <div class="search-input">
                    <input type="text" id="phone_num" placeholder='请输入您的手机号码'/>
                </div>
            </div>

            <div class="searchbar modal-input-sign">
                <div class="search-input">
                    <input type="password" id="user_pwd" placeholder='请输入帐号密码'/>

                </div>
            </div>


            <div class="forget-password">

                <div class="modal-forget-password pull-left">
                    忘记密码?
                </div>
                <div class="hint pull-right">
                    <i class="iconfont icon icon-icexclamationcircleo"></i>
                    手机号或密码输入错误
                </div>
            </div>


            <p><a href="javascript:;" class="button button-big modal-button-login button_login button-fill">登录</a></p>

            <p><a href="javascript:;" class="button button-big modal-button-exit button-phone-logout button-fill">退出</a></p>


        </div>


    </div>


    <!--手机号注册-->
    <div class="popup popup-sign">
        <div class="content-padded content-popup">
            <div class="content-block-title modal-input-title">
                <span class="pull-left">手机号注册</span>
                <a href="javascript:;" data-popup=".popup-sign" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>

            </div>

            <div class="searchbar modal-input-sign">
                <div class="search-input">
                    <input type="text" id="input_phonenum_sign" placeholder='请输入您的手机号码'/>
                </div>
            </div>

            <div class="row">
                <div class="col-60">
                    <div class="searchbar modal-input-sign">
                        <div class="search-input">
                            <input type="text" id="input_verify_sign" placeholder='请输入验证码'/>

                        </div>
                    </div>
                </div>
                <div class="col-40 codeing-get">
                    <input type="button" class="button button-fill get-code" value="获取验证码"/>
                </div>
            </div>

            <p><a href="#" class="button button-big modal-button-login button-fill signin-now">立即注册</a></p>


        </div>


    </div>


    <!--找回密码-->
    <div class="popup popup-find">
        <div class="content-padded content-popup">
            <div class="content-block-title modal-input-title">
                <span class="pull-left">找回密码</span>
                <a href="javascript:;" data-popup=".popup-find" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>

            </div>
            <div class="searchbar modal-input-sign">
                <div class="search-input">
                    <input type="text" id="input_phonenum_find" placeholder='请输入您的手机号码'/>
                </div>
            </div>

            <div class="row">
                <div class="col-60">
                    <div class="searchbar modal-input-sign">
                        <div class="search-input">
                            <input type="text" id="input_verify_find" placeholder='请输入验证码'/>

                        </div>
                    </div>
                </div>
                <div class="col-40 codeing-get">
                    <input type="button" class="button button-fill get-code-find" value="获取验证码"/>
                </div>
            </div>

            <p><a href="#" class="button button-big modal-button-login button-next-step-find button-fill">下一步</a></p>


        </div>

    </div>


    <!--设置新密码-->
    <div class="popup popup-set">
        <div class="content-padded content-popup">

            <div class="content-block-title modal-input-title">
                <span class="pull-left">设置新密码</span>
                <a href="javascript:;" data-popup=".popup-set" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>

            </div>


            <div class="searchbar modal-input-sign">
                <div class="search-input">
                    <input type="text" id="input_set_pwd" placeholder='请输入新密码'/>
                </div>
            </div>


            <p><a href="#" class="button button-big modal-button-login set_new_password  button-fill">确定</a></p>


        </div>


    </div>


    <!--支付警告-->
    <div class="popup popup-warning">
        <div class="content-padded content-popup">

            <div class="content-block-title modal-input-title">
                <span class="pull-left">支付警示信息</span>
                <a href="javascript:;" data-popup=".popup-warning" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>

            </div>


            <div class="content-padded">
                <div class="row no-gutter warning-text">
                    <div class="col-15">
                        <i class="iconfont icon icon-icexclamationcircleo small-icon-warning"></i>
                    </div>
                    <div class="col-80 ">
                        <p>
                            您当前为<span>游客身份</span>还没有绑定用户，如果不绑定用户可能会导致您的玩家信息丢失
                        </p>
                    </div>
                </div>
            </div>


            <p><a href="#" class="button button-big modal-button-login button-bind-now button-fill">立即绑定</a></p>


        </div>


    </div>


    <!--选择绑定用户方式-->
    <div class="popup popup-bind-way">
        <div class="content-padded content-popup">

            <div class="content-block-title modal-input-title">
                <span class="pull-left">选择绑定用户方式</span>
                <a href="javascript:;" data-popup=".popup-bind-way" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>
            </div>


            <div class="content-padded">
                <div class="row no-gutter row-bind-way">
                    <div class="col-50 mobile-bind">
                        <div class="row">
                            <div class="col-100">
                                <i class="icon iconfont icon-shouji bind-way-orange-i"></i>
                            </div>
                            <div class="col-100 bind-way-orange">
                                手机
                            </div>
                        </div>
                    </div>
                    <div class="col-50 weibo-bind">
                        <div class="row">
                            <div class="col-100">
                                <i class="icon iconfont icon-weibo bind-way-red-i"></i>
                            </div>
                            <div class="col-100 bind-way-red">
                                微博
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </div>


    <!--手机号绑定-->
    <div class="popup popup-binding">
        <div class="content-padded content-popup">
            <div class="content-block-title modal-input-title">
                <span class="pull-left">手机号绑定</span>
                <a href="javascript:;" data-popup=".popup-binding" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>

            </div>
            <div class="searchbar modal-input-sign">
                <div class="search-input">
                    <input type="text" id="input_phonenum_bind" placeholder='请输入您的手机号码'/>
                </div>
            </div>

            <div class="row">
                <div class="col-60">
                    <div class="searchbar modal-input-sign">
                        <div class="search-input">
                            <input type="text" id="input_verify_bind" placeholder='请输入验证码'/>

                        </div>
                    </div>
                </div>
                <div class="col-40 codeing-get">
                    <input type="button" class="button button-fill get-code-bind" value="获取验证码" />
                </div>
            </div>

            <p><a href="#" class="button button-big modal-button-login button-binding button-fill">立即绑定</a></p>


        </div>

    </div>


    <!--手机号绑定错误-->
    <div class="popup popup-fail">
        <div class="content-padded content-popup">

            <div class="content-block-title modal-input-title">
                <span class="pull-left">手机绑定错误</span>
                <a href="javascript:;" data-popup=".popup-fail" class="close-popup pull-right">
                    <i class="icon iconfont close-icon-popup icon-close01"></i>
                </a>

            </div>


            <div class="content-padded">
                <div class="row no-gutter warning-text">
                    <div class="col-15">
                        <i class="icon iconfont small-icon-warning icon-close1"></i>
                    </div>
                    <div class="col-80 ">
                        <p>
                            系统检测到该手机号已经绑定过小浪游戏平台
                        </p>
                    </div>
                </div>
            </div>


            <p><a href="#" class="button button-big modal-button-login change-another-mobile button-fill">换个手机号绑定</a></p>

            <p><a href="#" class="button button-big modal-button-exit button-bind-way button-fill ">选择其他方式绑定</a></p>


        </div>


    </div>



    <!--关注二维码-->
    <div class="popup popup-focus">
        <div class="content-padded content-popup">
            <div class="add-barcode" style="display: block;">
                <div class="barcode-box">
                    <a href="javascript:;" data-popup=".popup-focus" class="close-popup">
                        <p class="return-barcode-btn"><em class="arrow-inner"></em>返回</p>

                    </a>

                    <div class="add-barcode-logo">
                        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/barcode.gif" alt="">
                    </div>
                    <!--其他浏览器添加到主屏幕页面-->
                    <div class="add-barcode-text btns">
                        <p>打开微信扫描上方二维码</p>

                        <p>关注“小浪游戏”</p>

                        <p>or</p>

                        <p>加入小浪游戏玩家交流群</p>

                        <p>群号:182321886</p>

                        <p>领超值游戏福利</p>
                    </div>
                </div>
            </div>


        </div>


    </div>


    <!--添加到主屏幕-->
    <div class="popup popup-add-home">
        <div class="content-padded content-popup">
            <div class="add-home" style="display: block;">
                <div class="window-box">
                    <a href="javascript:;" data-popup=".popup-add-home" class="close-popup">
                        <p class="return-barcode-btn"><em class="arrow-inner"></em>返回</p>

                    </a>

                    <div class="add-home-logo">
                        <img src="<?php echo $game_icon;?>" alt="">
                        <strong><?php echo $game_name;?></strong>
                    </div>
                    <!--其他浏览器添加到主屏幕页面-->
                    <div id="add-home-other" class="add-home-text btns" style="font-size: 16.6667px;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击<img src="<?php echo base_url()?>server/platform/images/v1_0_5/home.png" class="home-btn" alt=""></p>

                        <p>然后选择“添加到主屏幕”</p>
                        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/arrow_bottom.png" class="arrow-bottom bounce" alt="">
                    </div>
                    <!--微信添加到主屏幕页面-->
                    <div id="add-home-wechat" class="add-home-text-wx btns" style="display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击右上角<img src="<?php echo base_url()?>server/platform/images/v1_0_5/wx_more.png" class="wx_more-btn" alt=""></p>

                        <p>选择"在Safari中打开"</p>

                        <p>点击<img src="<?php echo base_url()?>server/platform/images/v1_0_5/home.png" class="wx_home-btn" alt=""></p>

                        <p>然后选择“添加到主屏幕”</p>
                    </div>
                    <!--360极速 / 360浏览器 / 搜狗搜索 / 猎豹 / 绿茶 / QQ浏览器 / 2345浏览器版存桌面-->
                    <div id="add-home-type1" class="add-home-text btns1" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击下方<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_hamburger.png" class="type1-btn" alt=""></p>

                        <p>选择"添加书签"或"添加收藏"</p>

                        <p>然后选择“添加到手机桌面”</p>
                    </div>
                    <!--遨游版存书签-->
                    <div id="add-home-type2" class="add-home-text btns2" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击地址栏右侧<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_star.png" class="type2-btn" alt=""></p>

                        <p>然后选择"添加到桌面"</p>
                    </div>
                    <!--谷歌浏览器存桌面-->
                    <div id="add-home-type3" class="add-home-text btns3" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击右上角<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_point.png" class="type3-btn" alt=""></p>

                        <p>然后选择“添加到主屏幕”</p>
                    </div>
                    <!--火狐浏览器存桌面-->
                    <div id="add-home-type4" class="add-home-text btns4" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击右上角<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_point.png" class="type4-btn" alt=""></p>

                        <p>选择"页面"</p>

                        <p>然后选择“添加到主屏幕”</p>
                    </div>
                    <!--欧朋浏览器存桌面-->
                    <div id="add-home-type5" class="add-home-text btns5" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_opera.png" class="type5-btn" alt=""></p>

                        <p>选择"收藏"</p>

                        <p>然后选择“手机桌面”</p>
                    </div>
                    <!--搜狗浏览器存桌面-->
                    <div id="add-home-type6" class="add-home-text btns6" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到书签</p>

                        <p>点击下方<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_hamburger.png" class="type6-btn" alt=""></p>

                        <p>选择"添加收藏"</p>

                        <p>然后选择“添加到收藏”</p>
                    </div>
                    <!--UC浏览器存桌面-->
                    <div id="add-home-type7" class="add-home-text btns7" style="font-size: 16.6667px; display: none;">
                        <p>添加游戏到主屏幕</p>

                        <p>点击下方<img src="<?php echo base_url()?>server/platform/images/v1_0_5/btn_hamburger.png" class="type7-btn" alt=""></p>

                        <p>选择"收藏网址"</p>

                        <p>然后选择“手机桌面”</p>
                    </div>
                </div>
            </div>


        </div>


    </div>


    <!-- 微信分享 -->
    <div class="popup popup-wechat-share">
        <!--微信分享-->
        <div class="share-box-wx" style="display: block"><img
                src="<?php echo base_url()?>server/platform/images/v1_0_5/wx_share.png"
                onclick="hideWeiXinShareDiv();" alt="">
        </div>
    </div>



    <!-- 分享 -->
    <div class="popup popup-share">
        <div class="share-content-down">
            <!--<p>选择登录方式</p>-->
            <div class="content-padded grid-demo">
                <div class="share-cancel-btn">
                    <a  href="javascript:;" data-popup=".popup-share" class="close-popup close-share">取消</a>

                </div>

                <div class="row">

                    <div class="col-50 login_sina share_sina">
                        <i class="icon iconfont icon-weibo bind-way-red-i"></i>
                        <div style="color:#e7675c">微博</div>
                        <a id="weibosharelink"></a>
                    </div>
                </div>

            </div>



        </div>
    </div>



    <!--公告弹窗-->
    <div class="popup popup-announcement">



        <div class="content-with-title">
            <div class="popup-title">
                提示
                <a  href="javascript:;" data-popup=".popup-announcement" class="close-popup close-icon">
                    <span class="close-iconfont icon iconfont icon-close01"></span>
                </a>
            </div>
            <div class="content-block-title modal-input-title popup-content">
                <p class="text-left" id="announcement-content">

                </p>

                <p><a href="javascript:;" data-popup=".popup-announcement" class="close-popup button button-fill button-danger cdk-code">知道了</a></p>
            </div>


        </div>


    </div>



    <!--公告弹窗 in game-->
    <div class="popup popup-announcement-bg">


        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/annoucement-bg.png" class="game-annoce-img" alt="">

        <a href="javascript:;" data-popup=".popup-announcement-bg" class="close-popup close-game-announce"></a>
    </div>



    <!--排行榜-->
    <div class="popup popup-rank" style="overflow: hidden;">
        <div class="content-block">


            <!--这里插入modal.html-->
            <header class="bar modal-nav bar-nav">
                <a class="icon iconfont icon-close01 pull-right " id="close-popup" ></a>
                <h1 class="title">游戏成绩</h1>
            </header>
            <nav class="bar bar-tab">
                <a class="tab-item external downbtn downbtn_redo_btn" href="#">
                    <span class="icon iconfont icon-chexiaoshangyicidongzuo"></span>
                    <span class="tab-label">再来一次</span>
                </a>
                <a class="tab-item external downbtn downbtn_share_btn" href="#">
                    <span class="icon iconfont icon-share"></span>
                    <span class="tab-label">分享</span>
                </a>
                <a class="tab-item external downbtn downbtn_rank_btn" href="<?php echo base_url()?>server/platform/application/views/wechat/rank.html">
                    <span class="icon iconfont icon-shouyepaixing"></span>
                    <span class="tab-label">查看排行榜</span>
                </a>
                <a class="tab-item external downbtn downbtn_prize_btn" href="<?php echo base_url()?>server/platform/index.php/WxGame/mine">
                    <span class="icon iconfont icon-jiangpin"></span>
                    <span class="tab-label">查看奖品</span>
                </a>

            </nav>
            <div class="content auto">
                <div class="list-block modal-list-header media-list">
                    <ul>
                        <li>
                            <a href="#" class="item-content">
                                <div class="item-media item-img-group">
                                    <img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" class="item-round my-score-rank">
                                    <span class="badge item-badgt">332323232</span>
                                </div>
                                <div class="item-inner">
                                    <div class="item-title title-name">发达放到萨芬</div>
                                    <div class="item-subtitle subtitle-score">最高得分: 699999</div>
                                    <div class="item-subtitle subtitle-phone-number">距第一名还差: <span>99999</span></div>

                                </div>
                            </a>
                        </li>
                    </ul>
                </div>

                <!--下面的排行榜-->
                <div class="list-block modal-list-body media-list">

                </div>

            </div>

            <!--这里插入modal.html-->



        </div>
    </div>


    <!--为你推荐更多游戏-->
    <div class="popup popup-recommend-more">
        <div class="content-with-title">
            <div class="popup-title bg-white">
                小浪为你推荐更多好游戏
                <a  href="javascript:;" data-popup=".popup-recommend-more" class="close-popup close-icon commend-more-game-exit">
                    <span class="close-iconfont icon iconfont icon-close01"></span>
                </a>
            </div>
            <div class="content-padded modal-input-title popup-content grid-demo">
                <div class="row">
                    <div class="col-25">
                        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/n2.png" onclick="clickRecommendPopGameIcon(this);" class="recommend-game-icon" alt="">
                        <div class="recommend-game-description">游戏介绍游戏介绍</div>
                    </div>
                    <div class="col-25">
                        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/n2.png" onclick="clickRecommendPopGameIcon(this);" class="recommend-game-icon" alt="">
                        <div class="recommend-game-description">游戏介绍游戏介绍</div>
                    </div>

                    <div class="col-25">
                        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/n2.png" onclick="clickRecommendPopGameIcon(this);" class="recommend-game-icon" alt="">
                        <div class="recommend-game-description">游戏介绍游戏介绍</div>
                    </div>
                    <div class="col-25">
                        <img src="<?php echo base_url()?>server/platform/images/v1_0_5/n2.png" onclick="clickRecommendPopGameIcon(this);" class="recommend-game-icon" alt="">
                        <div class="recommend-game-description">游戏介绍游戏介绍</div>
                    </div>

                </div>


                <div class="bottom-group-recomment">
                    <a href="#" class="button button-fill button-danger recommend-game-btn">仍要退出</a>
                    <label class="label-checkbox">
                        <input class="input-not-recommend" type="checkbox" name="checkbox">
                        <div class="item-media fake-checkbox"><i class="icon icon-form-checkbox"></i></div>
                        <div class="item-inner checkbox-content">
                            今日不再推荐
                        </div>
                    </label>
                </div>



            </div>


        </div>


    </div>


    <!--游戏礼包-->
    <div class="popup popup-package" style="overflow: hidden;">
        <div class="content-block">


            <!--这里插入modal.html-->
            <header class="bar modal-nav bar-nav">
                <a class="icon pull-left header-avatar">
                    <img src="<?php echo $game_icon;?>" alt="">
                </a>
                <a  href="javascript:;" data-popup=".popup-package" class="close-popup close-icon">
                    <span class="close-iconfont icon iconfont icon-close01"></span>
                </a>

                <h1 class="title"><?php echo $game_name;?>游戏礼包</h1>
            </header>
            <div class="content auto">
                <div class="package-content-top">
                    使用方法：游戏内点击左上角设置按钮展开输入兑换
                    码。
                </div>





                <!--下面的排行榜-->
                <div class="list-block modal-list-body media-list">
                    <ul class="gift_list_ul">

                        <label class="label-checkbox item-content package-label">

                            <div class="item-inner package-content">
                                <div class="item-subtitle package-name">传奇世界6.0版本更新大礼包(礼包名)</div>
                                <div class="item-subtitle package-description">钻石x999,金币x99999,屠龙刀x1,祝福油x20,
                                    大瓶经验药水x10</div>
                                <div class="item-subtitle package-see-more"><a href="#" class="package-alert">查看更多</a></div>
                                <div class="item-subtitle package-description">
                                    <div class="graph"><span style="width:35%;"></span></div>
                                </div>
                                <div class="item-subtitle package-left">剩余：70%</div>
                            </div>
                            <div class="item-media">
                                <p class="package-btn">
                                    <button class="button button-danger package-get">领取</button>
                                </p>
                            </div>
                        </label>
                    </ul>
                </div>

            </div>

            <!--这里插入modal.html-->



        </div>
    </div>


</div>



<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/zepto.min.js'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/sm.min.js' charset='utf-8'></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<!--<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/SinaSDK.min.js' charset='utf-8'></script>-->
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/SinaSDK.js' charset='utf-8'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/SinaSDKTool.js' charset='utf-8'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/modify.js' charset='utf-8'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/BSRequest.js' charset='utf-8'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/Encryption.js' charset='utf-8'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/Ball.js' charset='utf-8'></script>
<script type='text/javascript' src='<?php echo base_url()?>server/platform/js/v2_0_8/clipboard.min.js' charset='utf-8'></script>

<script>
    $(function () {
        initialSDK();

        //禁止橡皮筋效果
        if(SinaSDKTool.tool.checkEnvironment().isIos()){
            function stopScrolling( touchEvent ) {
                touchEvent.preventDefault();
            }
            document.addEventListener( 'touchstart' , stopScrolling , false );
            document.addEventListener( 'touchmove' , stopScrolling , false );
        }
    });

    /* 跨域传送数据 */
    window.addEventListener('message', function (e) {
        try {
            var jsObj = JSON.parse(e.data);
            if (jsObj.type == "pay") {
                pay(jsObj);
            } else if (jsObj.type == "rank") {
                //显示列表
                showRankPop();
            }
        } catch (e) {

        }
    }, false);

    //页面如果不是微信授权,文案更改
    function changeinfo(){
        var ani_index = 0;
        var ani_target = [".", "..", "..."];
        setInterval(function () {
            ani_index++;
            ani_index = ani_index % 3;
            $('.smallsina-prompt').html("正在努力加载中" + ani_target[ani_index]);
        }, 200);
    }
</script>


</body>
</html>