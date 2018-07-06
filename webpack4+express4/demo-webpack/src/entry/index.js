/*
 * @Author: xin.song 
 * @Date: 2018-07-04 17:39:03 
 * @Last Modified by: xin.song
 * @Last Modified time: 2018-07-04 17:56:39
 */


import Vue from 'vue';

import "../css/index.scss";

let indexPage = {
    el: "#vm",
    data: {
        //start 默认
        env: "", //环境变量
        allData: "", //controller传输过来的所有数据
        header: "", //通信header
        UID: "",
        platform: "", //客户端
        version: "", //版本
        documentH: $(window).height(),
        documentW: $(window).width(),
        deviceType: null,
        isMobile: false,
        shareUrl: "",
        isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
        isAndroid: /Android/.test(navigator.userAgent) && !window.MSStream,
        inApp: true,
        region: "Default", //分区
        ratio: '', //屏幕比率
        //end 默认
        showContent: false,
    },
    created: function () {
        let self = this;
        //获取设备信息
        self.initDeviceType();
        //地区
        let region = self.GetQueryString("region");
        if (region != null) {
            self.region = region;
        }
        //rem处理方案
        let dpr = window.devicePixelRatio || 1; //分辨率比例值
        dpr = dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1;
        self.ratio = dpr;
        let width = document.documentElement.clientWidth / dpr; //得到宽度
        $("html").css("font-size", width / 10 * dpr); //设置字体大小为屏幕宽度/10  1rem = 屏幕宽度/10

        //显示主界面 隐藏骨骼
        $("#main-container").show();
        self.showContent = true;

        //执行方法
        // self.getMemeInfo();
    },
    mounted: function () {
        let self = this;
    },
    methods: {
        initDeviceType() {
            let self = this;
            if (self.isIOS) {
                self.deviceType = "iOS";
                self.isMobile = true;
            } else if (self.isAndroid) {
                self.deviceType = "Android";
                self.isMobile = true;
            } else {
                self.deviceType = "default";
                self.isMobile = false;
                console.log("web端登录");
            }
        },
        indexPrefix(index, classname) {
            if (index < 3) {
                return classname + parseInt(index + 1);
            } else {
                return;
            }
        },
        genderPrefix(gender) {
            if (gender == 0) return "gender-nosex";
            if (gender == 1) return "gender-male";
            if (gender == 2) return "gender-female";
        },
        levelPrefix(lvl, classname) {
            let num;
            if (lvl >= 0 && lvl <= 10) num = 1;
            if (lvl >= 11 && lvl <= 20) num = 2;
            if (lvl >= 21 && lvl <= 30) num = 3;
            if (lvl >= 31 && lvl <= 45) num = 4;
            if (lvl >= 46 && lvl <= 60) num = 5;
            if (lvl >= 61 && lvl <= 75) num = 6;
            if (lvl >= 76 && lvl <= 90) num = 7;
            if (lvl >= 91 && lvl <= 110) num = 8;
            if (lvl >= 111 && lvl <= 130) num = 9;
            if (lvl >= 131) num = 10;
            return classname + num;
        },
        formatNum(num) {
            return num.toString().replace(/\B(?=(?:\d{3})+\b)/g, ",");
        },
        showmodal(modal) {
            let self = this;
            const scrollTop =
                document.body.scrollTop || document.documentElement.scrollTop;
            document.body.style.cssText +=
                "position:fixed;width:100%;top:-" + scrollTop + "px;";
            $(".content").addClass("blur");
            self[modal] = true;
        },
        closemodal(modal) {
            let self = this;
            const body = document.body;
            body.style.position = "";
            const top = body.style.top;
            document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
                top
            );
            body.style.top = "";
            $(".content").removeClass("blur");
            self[modal] = false;
        },
        GetQueryString(str) {
            let LocString = String(window.document.location.href);
            let rs = new RegExp("(^|)" + str + "=([^&]*)(&|$)", "gi").exec(
                    LocString
                ),
                tmp;
            if ((tmp = rs)) return tmp[2];
            return null;
        },
        follow(uid, event) {
            let self = this;
            let el = event.target;
            let gaAnalysis = {};
            gaAnalysis.to_uid = uid.toString();
            if (!self.UID) {
                //没有登录
            }
            if ($(el).hasClass("disabled") || self.UID == uid) {
                return;
            }
            if ($(el).hasClass("followed") || $(el).hasClass("follow")) {
                console.log("用户已经关注");
                $(el)
                    .removeClass("follow followed")
                    .addClass("unfollowed disabled");
                //准备去取消关注
                if (self.isIOS) {
                    console.log("ios准备取消关注");
                    setupWebViewJavascriptBridge(bridge => {
                        bridge.callHandler(
                            "unfollowUser",
                            uid.toString(),
                            response => {
                                // window.unfollowSuccess(response);
                                $(el).removeClass("disabled");
                            }
                        );
                    });
                } else {
                    console.log("安卓准备取消关注");
                    MeMeApp.callHandler(
                        "unfollowUser",
                        uid.toString(),
                        "window.unfollowSuccess"
                    );
                    $(el).removeClass("disabled");
                }
                //测试用，上线隐藏
                // $(el).removeClass('disabled')
            } else {
                $(el)
                    .removeClass("unfollow unfollowed")
                    .addClass("followed disabled");
                //准备去关注
                if (self.isIOS) {
                    console.log("ios准备关注");
                    setupWebViewJavascriptBridge(bridge => {
                        bridge.callHandler(
                            "followUser",
                            JSON.stringify(gaAnalysis),
                            response => {
                                // window.followSuccess(response);
                                $(el).removeClass("disabled");
                            }
                        );
                    });
                } else {
                    console.log("安卓准备关注");
                    MeMeApp.callHandler(
                        "followUser",
                        JSON.stringify(gaAnalysis),
                        "window.followSuccess"
                    );
                    $(el).removeClass("disabled");
                }
                //测试用，上线隐藏
                // $(el).removeClass('disabled')
            }
        },
        lzload(url, data) {
            if (data) {
                if (!data.error) {
                    return {
                        src: url,
                        loading: data.loading,
                        error: data.loading
                    };
                }
                return {
                    src: url,
                    loading: data.loading,
                    error: data.error
                };
            } else {
                return {
                    src: url,
                    loading: "",
                    error: ""
                };
            }
        },
        gotoProfile(id, livestus) {
            let self = this;
            if (livestus) {
                self.openLive(id);
            } else {
                self.openProfile(id);
            }
        },
        openProfile(id) {
            let self = this;
            console.log("准备打开用户详情页");
            if (self.isIOS) {
                console.log("is ios");
                setupWebViewJavascriptBridge(bridge => {
                    bridge.callHandler(
                        "viewProfile",
                        id.toString(),
                        response => {}
                    );
                });
            } else if (self.isAndroid) {
                console.log("is android");
                MeMeApp.callHandler("viewProfile", id.toString());
            }
            console.log(id);
        },
        openLive(id) {
            let self = this;
            console.log("准备打开用户直播间");
            if (self.isIOS) {
                console.log("is ios");
                setupWebViewJavascriptBridge(bridge => {
                    bridge.callHandler(
                        "viewProfile",
                        id.toString(),
                        response => {}
                    );
                });
            } else if (self.isAndroid) {
                console.log("is android");
                MeMeApp.callHandler("viewProfile", id.toString());
            }
            console.log(id);
        },
        changeBanner() {
            let self = this;
            let img = document.querySelector('.top-bg-img');
            img.src = img.getAttribute("data-src");
            img.removeAttribute("data-src");
        },
        cutZero(num) {
            let self = this;
            if (num < 10) {
                return num.split('0')[1]
            }
        },
        //TODO: START FROM HERE
        creatAction() {
            let self = this;
            let queryUID = self.GetQueryString("anchorId");
            if (queryUID != null) {
                self.userInfo(queryUID);
            }
        },

        //FIXME: END HERE
    }
};




$(() => {
    // Start
    let VM = new Vue(indexPage);
    console.log(VM);
});