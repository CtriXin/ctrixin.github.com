var tagsObj,
    examNum = 0,
    examCount = 0,
    nav,
    isMobile = navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i ),
    examResult = [
      {
        title : "起点·深圳湾运动公园",
        intro : "你能走0km",
        content : {
          "str1" : "开什么玩笑，一点准备都木有？",
          "str2" : "为了你的健康与安全，回家洗洗睡吧，2016百公里再见！",
          "str3":""
        }
      },
      {
        title : "二签·中心公园",
        intro : "你能走22.8km",
        content : {
          "str1" : "走到二签就要打道回府了",
          "str2" : "别人才刚活动开筋骨哦",
          "str3":"不想落下就快到「百公里训练营」碗里来！"
        }
      },
      {
        title : "三签·梧桐山",
        intro : "你能走47.2km",
        content : {
          "str1" : "半程了！夜黑风高迎来下撤高峰",
          "str2" : "良心提醒：掏出你的打的神器",
          "str3":"捡个GG/MM拼车，明年约伴从这开始"
        }
      },
      {
        title : "四签·大梅沙",
        intro : "你能走69.2km",
        content : {
          "str1" : "从白走到黑不算啥",
          "str2" : "从黑夜走到白天你就可以和前几签的人吹牛逼啦",
          "str3":"友情提醒：眯一眯不丢人"
        }
      },
      {
        title : "五签·溪涌洞背",
        intro : "你能走80.4km",
        content : {
          "str1" : "你妈妈一定不知道你这么能走",
          "str2" : "想必向来注重锻炼，身体倍儿棒！",
          "str3":"团队协作助你走得更远哦"
        }
      },
      {
        title : "六签·比克厂",
        intro : "你能走91.6km",
        content : {
          "str1" : "看来你也是个飞毛腿，离终点不远啦",
          "str2" : "停下来数数水泡，不要勉强",
          "str3":"学会放弃也是一种勇气"
        }
      },
      {
        title : "终点·大鹏文化广场",
        intro : "你能走102.3km",
        content : {
          "str1" : "撒花！撒花！",
          "str2" : "你的实力可以走完全程！",
          "str3":"当然，一切以安全为重，千万量力而行哦"
        }
      }
    ];

/* 自定义弹窗 */
function popupDiv(obj){
  var winScrollTop = $(document).scrollTop();
  var $html = "<div id=\"screenLock\" style=\"position:fixed;z-index:1000;left:0;top:0;width:100%;height:100%;background:#000;opacity:.4;filter:alpha(opacity=40);\"></div><div id=\"popupDiv\" style=\"position:absolute;z-index:1003;left:50%;top:50%;background:#fff;\"><div class=\"closeBtnBg\" id=\"closeDiv\" style=\"position:absolute;top:5px;right:5px;cursor:pointer;width:12px;height:12px;\"></div><div id=\"divMain\" style=\"padding:22px 12px 12px;\"></div></div>";
  $("body").append($html);
  $("#divMain").append(obj);
  var popupDiv = $("#popupDiv");
  var winW = $(window).width(),
      winH = $(window).height(),
      divW = popupDiv.width(),
      divH = popupDiv.height(),
      l = (winW-divW)/2,
      t = (winH-divH)/2+winScrollTop;
    if(divW>winW){
      l = 0;
      popupDiv.css("width","100%");
    }
    if(divH>winH){
      t = 0;
      popupDiv.css("height","100%");
    }
    popupDiv.css({top:t});
    popupDiv.animate({left:l},300);
    //popupDiv.animate({left:l,top:t},300);
  $("#closeDiv").on("click",function(){
    $("#screenLock").remove();
    popupDiv.remove();
  });
}
/* 关闭弹窗 */
function closeDiv(){
  $("#screenLock").remove();
  $("#popupDiv").remove();
}
/* 初始化标签云 */
function cloudInit(){
  $("#tagscloud").empty().append(tagsObj.children());
  tagsObj = $("#tagscloud").clone();
  var obj = $("#tagscloud"),
    maxWidth = obj.width(),
    maxHeight = obj.height(),
    colors = ["tagc1","tagc2","tagc3","tagc4","tagc5","tagc6","tagc7","tagc8","tagc9"],
    sizes = ["tagf1","tagf2","tagf3","tagf4","tagf5","tagf6","tagf7","tagf8","tagf9"],
    blanking = [20,30],
    tags = obj.children(),
    l = 0,
    t = 0,
    lArr = [0,0,0,0,0],
    n = 0,
    timer,
    maxArray = function(){
      var maxNum = lArr[0];
      for(var i=1;i<lArr.length;i++){
        if(maxNum<lArr[i]){
          maxNum = lArr[i];
        }
      }
      return maxNum;
    },
    positionH = function(){
      // 水平定位
      var m = 0;
      var tp = 0;
      for(var i=0; i<tags.length; i++){
        var $this = $(tags[i]),
          randomNum = Math.random()*(30-10)+10,
          c = parseInt(Math.random()*7),
          f = parseInt(Math.random()*7),
          r = Math.random()*(3-1)+1;
        $this.attr("class","").addClass(colors[c]).addClass(sizes[f]);
        tp = t+randomNum;
        if(tp+$this.innerHeight() > maxHeight){
          tp = maxHeight-$this.innerHeight();
        }
        $this.css({left:lArr[m]+randomNum,top:tp});
        lArr[m] += $this.innerWidth()+blanking[0];
        t += $this.innerHeight()+blanking[1];
        m++;
        if(m > 4){
          m = 0;
          t = 0;
        }
      }
    },
    scrollBoxH = function(){
      // 水平滚动
      var $html = "<div class=\"scrollBox\"><div class=\"tagContainer\"></div></div>";
      obj.append($html);
      var sc = $(".scrollBox");
      var conW = maxArray();
      sc.children().css({"position":"relative","width":conW,"height":maxHeight,"float":"left"}).append(tags);
      sc.append(sc.children().clone());
      sc.css({
        "position":"absolute",
        "width":conW*2,
        "height":maxHeight,
        "left":0,
        "top":0
      });
      if(conW > maxWidth){
       if(isMobile){
          sc.addClass("pt-page-moveIconLeft");
        }else{
          clearInterval(timer);
          var st = 0;
          timer = setInterval(function(){
            st = sc.position().left-1;
            if(-st > conW){
              st = 0;
              sc.children().first().appendTo(sc);
            }
            sc.css("left",st);
          },4);
        }
      }
    };

  positionH();
  scrollBoxH();
}

/* 发表弹幕 */
function wirteTag(){
  var $html = "<div id=\"tagTextWrap\"><textarea id=\"tagText\" rows=\"4\" maxlength=\"20\" placeholder=\"你想对「磨房深圳百公里」说什么？\" style=\"width:260px;margin:0;\"></textarea><div class=\"textCount\" style=\"text-align:right;margin-top:-30px;color:#999;padding-right:10px;\">0/20</div><div class=\"tagBtns mt10\"><span role=\"ok\">确定</span><span role=\"cancel\">取消</span></div></div>";
  $("body").append($html);
  var tagText = $("#tagText");
  popupDiv($("#tagTextWrap"));
  tagText.on("keyup",function(){
    $(".textCount").html(tagText.val().length+"/20");
  });
  $(".tagBtns").on("click","span",function(){
    var $this = $(this);
    if($this.attr("role") == "ok"){
      if(tagText.val().length > 20){
        alert("弹幕字数不超过20个字");
        return false;
      }
      if(tagText.val().length < 2){
        alert("弹幕字数不小于2个字");
        return false;
      }
      var url = '/api/activity_live/add';
      var request = {};
      var ActivityID = 136;
      request.ActivityID = ActivityID;
      request.content = tagText.val();
      $.post(url,request,function(data){
        if(data.error){
          alert(data.msgs);          
        }else{
          tagsObj.prepend("<span>"+tagText.val()+"</span>");
          cloudInit();
        }     
      });
    }
    closeDiv();
  })
}


/* 照片大图预览切换 */
function photoBigPreview(){
  if($("#popupBox")[0]) $("#popupBox").remove();
  var photos = $("#photos li"),
      winWidth = $(window).width(),
      winHeight = $(window).height(),
      popupBox,
      main,
      pts,
      init = function(){
        for(var i=0; i<photos.length; i++){
          var $this = $(photos[i]);
          main.append("<div class=\"item loader\" style=\"float:left;height:100%;text-align:center;width:"+winWidth+"px\"><img data-src=\""+$this.data("src")+"\" src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\" style=\"max-width:100%;max-height:100%;\"></div>");
          var item = main.children(":eq("+i+")");
          item.data("intro",$this.find(".middle").text());
          item.data("writer",$this.find(".tip").text());
        }
        pts = main.children();
        main.css({"width":winWidth*pts.length});
      },
      text = function(obj){
        popupBox.find(".popupFooter").html("<span>"+obj.data("writer")+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>"+obj.data("intro")+"</span>");
      },
      setSelected = function(index){
        //$(pts[index]).show().siblings().hide();
        main.css("left",-winWidth*(index));
        text($(pts[index]));
        popupBox.data("currentIndex",index);
        var img = $(pts[index]).children();
        isImgLoad(img,function(){
          $(pts[index]).removeClass("loader");
          img.attr("src",img.data("src"));
          var imgTop = (winHeight-img.height())/2;
          if(img.height()>winHeight){ imgTop=0;}
          img.css("margin-top",imgTop);
        });
      },
      prevOne = function(){
        var currentIndex = popupBox.data("currentIndex");
        if(currentIndex){
          var currImg = $(pts[currentIndex]),
              prevImg = $(pts[currentIndex-1]);
          //currImg.hide();
          //prevImg.show();
          main.stop().animate({"left":-winWidth*(currentIndex-1)},600,function(){
            var img = prevImg.children();
            text(prevImg);
            isImgLoad(img,function(){
              prevImg.removeClass("loader");
              img.attr("src",img.data("src"));
              var imgTop = (winHeight-img.height())/2;
              if(img.height()>winHeight){ imgTop=0;}
              img.css("margin-top",imgTop);
            });
          });
          popupBox.data("currentIndex",currentIndex-1);
        }else{
          alert("当前已经是第一张了！");
        }
      },
      nextOne = function(){
        var currentIndex = popupBox.data("currentIndex");
        if(currentIndex<pts.length-1){
          var currImg = $(pts[currentIndex]),
              nextImg = $(pts[currentIndex+1]);
          //currImg.hide();
          //nextImg.show();
          main.stop().animate({"left":-winWidth*(currentIndex+1)},600,function(){
            var img = nextImg.children();
            text(nextImg);
            isImgLoad(img,function(){
              nextImg.removeClass("loader");
              img.attr("src",img.data("src"));
              var imgTop = (winHeight-img.height())/2;
              if(img.height()>winHeight){ imgTop=0;}
              img.css("margin-top",imgTop);
            });
          });
          popupBox.data("currentIndex",currentIndex+1);
        }else{
          alert("当前已经是最后一张了！");
        }
      },
      popupPic = function(imgStr,index){
        var str = "<div id=\"popupBox\" style=\"position:fixed;z-index:2000;overflow:hidden;width:100%;height:100%;left:0;top:0;background:#000;background:rgba(0,0,0,.9);\"><div id=\"popupMain\" style=\"height:100%;position:absolute;left:0;top:0\"></div><div class=\"phPrev cursorLeft\" style=\"position:absolute;width:50%;z-index:2050;height:100%;left:0;top:0;background:#fff;filter:alpha(opacity=0);opacity:0;\"></div><div class=\"phNext cursorRight\" style=\"position:absolute;width:50%;z-index:2050;height:100%;right:0;top:0;background:#fff;filter:alpha(opacity=0);opacity:0;\"></div><div class=\"popClose\" style=\"position:absolute;width:120px;z-index:2060;height:120px;background:#000;border-radius:50%;right:-60px;top:-60px\"><div title=\"关闭\" style=\"font-size:56px;color:#999;padding-top:35px;padding-right:58px;text-align:right;cursor:pointer;\">×</div></div><div class=\"popupFooter\" style=\"background:#111;background:rgba(0,0,0,.5);color:#ccc;text-align:center;padding:10px 0;position:absolute;left:0;bottom:0;width:100%;\"></div></div>";
        $("body").append(str);
        popupBox = $("#popupBox");
        main = $("#popupMain");
        popupBox.find(".popClose").on("click",function(){
          popupBox.hide();
        });
      };
  $(window).resize(function(){
    winWidth = $(window).width();
    winHeight = $(window).height();
    if($("#popupMain").length){
      $("#popupMain").children().width(winWidth);
      main.css({"left":-winWidth*popupBox.data("currentIndex")});
    }
  });
  photos.on("click",function(){
    var $this = $(this);
    if(popupBox){
      popupBox.show();
    }else{
      popupPic();
      init();
      if(isMobile){
        popupBox.on({
          swipeleft:nextOne,
          swiperight:prevOne
        })
        popupBox.find(".phPrev,.phNext").hide();
      }else{
        popupBox.find(".phPrev").on("click",prevOne);
        popupBox.find(".phNext").on("click",nextOne);
      }
    }
    setSelected(photos.index($this));    
  });
}
/* 相册自定义插件 */

(function ($) {
  $.fn.photoList = function(options){
    if($(this).hasClass("loaded")){return false;}
    var $this = $(this),
        timer,
        defaults = {
          autoPlay: true
        },
        opts = $.extend(defaults, options),
        setRowWidth = function(){
          var items = $this.children().children(),
              rw = 0;
          for(var i=0; i<items.length; i++){
            rw += $(items[i]).find("img").width();
          }
          var rw = rw/2;
          if(rw < $this.width()){
            rw = $this.width();
          }
          $this.children().width(Math.ceil(rw));
        },
        init = function(){
          var items = $this.children().children(),
              uw = $this.children().width(),
              rw = 0;
          for(var i=0; i<items.length; i++){
            rw += $(items[i]).find("img").width();
            if(rw >= uw){
              $this.children().width(Math.ceil(rw));
              break;
            }
          }
          $this.append("<div class=\"ph-prev\"></div><div class=\"ph-next\"></div>");
        },
        prevOne = function(){
          var obj = $this.children("ul"),
              ww = $this.width(),
              l = obj.position().left,
              temp = 240;
          if(ww < 600){
            temp = 60;
          }
          if(l<0){
            l += (ww-temp);
            if(l > 0){
              l=0;
            }
            obj.stop().animate({left:l},600);
          }
        },
        nextOne = function(){
          var obj = $this.children("ul"),
              ww = $this.width(),
              l = obj.position().left,
              temp = 240;
          if(ww < 600){
            temp = 60;
          }
          if(Math.abs(l) < obj.width()-ww){
            l -= (ww-temp);
            if(Math.abs(l) > obj.width()-ww){
              l = -(obj.width()-ww);
            }
            obj.stop().animate({left:l},600);
          }
        },
        autoscroll = function(){
          if(opts.autoPlay){
            timer = setInterval(function(){
              var obj = $this.children("ul"),
                  ww = $this.width(),
                  l = obj.position().left,
                  temp = 240;
              if(Math.abs(l) > obj.width()-ww-10 && Math.abs(l) < obj.width()-ww+10){
                l = 0;
                obj.stop().animate({left:l},600);
              }else{
                if(ww < 600){
                  temp = 60;
                }
                if(Math.abs(l) < obj.width()-ww){
                  l -= (ww-temp);
                  if(Math.abs(l) > obj.width()-ww){
                    l = -(obj.width()-ww);
                  }
                  obj.stop().animate({left:l},600);
                }
              }
            },3600);
          }
        };
    var itmes = $this.children().children();
    for(var i=0; i<itmes.length; i++){
      var _this = $(itmes[i]),
          src = _this.data("thumb");
      if(!src){
        src = _this.data("src");
      }
      _this.find("img").attr("src",src);
    }

    $this.imagesLoaded().done(function(instance) {
      setRowWidth();
      init();
      if($this.width()<$this.children().width()){
        if(!isMobile){
          $this.hover(function(){
            $this.find(".ph-prev").stop().animate({left:20},300);
            $this.find(".ph-next").stop().animate({right:20},300);
          },function(){
            $this.find(".ph-prev").stop().animate({left:-40},300);
            $this.find(".ph-next").stop().animate({right:-40},300);
          });
        }else{
          $this.on({
            swipeleft:nextOne,
            swiperight:prevOne
          })
        }
        $this.find(".ph-prev").on("click",prevOne);
        $this.find(".ph-next").on("click",nextOne);
        autoscroll();
      }
    }).progress( function( instance, image ) {
      image.img.parentNode.className="";
    });
    $this.addClass("loaded");
    if($this.attr("id") == "picScroll6"){
      $this.find("li").on("click",function(){clearInterval(timer);});
      $("body").on("click",".popClose",function(){
        if($("#photos").children(".active").index() == 5){
          autoscroll();
        }
      });
    }
  };
})(jQuery);


/**/
function lowVersionIE(){
  if(navigator.appName == "Microsoft Internet Explorer"){
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_version = version[1].replace(/MSIE[ ]/g, "");
    if(trim_version<9){
      return true;
    }
  }
  return false;
}

function divWindowSize(){
  var win = $(window);
  $(".windowSize").css({"width":win.width()});
}

// 判断图片加载的函数
function isImgLoad(imgObj,callback){
  var t_img,
      isLoad = true,
      arr = [],
      img = new Image();
  for(var i=0; i<imgObj.length; i++){
    img.src = $(imgObj[i]).data("src");
    arr.push(img);
  }

  $(arr).imagesLoaded(function(){
    callback();
  });
}

/* 图片缩放 */
function pictureScale(obj){
  var img = obj.find("img"),
      s = img.width()/img.height(),
      move = false,
      x,
      y;

  touch.on(img,"doubletap",function(event){
    var e = event.originalEvent || event || window.event;
    e.preventDefault();
    if(!img.hasClass("maxSize")){
      img.addClass("maxSize");
      var img_w1 = img.width(),
          img_h1 = img.height(),
          img_w2 = img_w1*2.4,
          img_h2 = img_w2/s,
          t = (img_h2-img_h1)/2,
          l = (img_w2-img_w1)/2;
      img.stop().animate({
        top:img.position().top - t,
        left:img.position().left - l,
        width:img_w2
      },400);
    }else{
      img.removeClass("maxSize");
      var winw = $(window).width(),
          winh = $(window).height(),
          imgw = winw*0.85,
          imgh = winw/s;
      img.stop().animate({
        "left":(winw-imgw)/2,
        "top":(winh-imgh)/2,
        "width":imgw
      },400);
    }
  });

  var drag = function(){
    function getTouches(event) {
        if (event.touches !== undefined) {
            return {
                x : event.touches[0].pageX,
                y : event.touches[0].pageY
            };
        }

        if (event.touches === undefined) {
            if (event.pageX !== undefined) {
                return {
                    x : event.pageX,
                    y : event.pageY
                };
            }
            if (event.pageX === undefined) {
                return {
                    x : event.clientX,
                    y : event.clientY
                };
            }
        }
    }

    img.on("touchstart",function(event){
      if(img.hasClass("maxSize")){
        var e = event.originalEvent || event || window.event;
        move=true;
        x=getTouches(e).x-img.position().left;
        y=getTouches(e).y-img.position().top;
      }
    });
    $(document).on("touchmove",function(event){
      var e = event.originalEvent || event || window.event;
      if(move){
        e.preventDefault();
        var _x=getTouches(e).x-x;
        var _y=getTouches(e).y-y;
        img.css({top:_y,left:_x});
      }
    });
    $(document).on("touchend",function(){
      move=false;
    });
  }
  drag();
}

$(function(){

  divWindowSize();
  $(window).resize(function(){
    divWindowSize();
  });

  tagsObj = $("#tagscloud").clone();
  nav = $("#nav");

  if(isMobile){
    $(".isMobile,.container").addClass("padding");
    $(".tableCell,.section").addClass("block");
    $(".section").css("position","relative");
    $(".guide").find("li").removeClass("none");
    var ps1 = $("#picScroll1"),
        tagC = $("#tagscloud"),
        winHe = $(window).height(),
        taged = true;
    $(window).scroll(function(){
      if(ps1.offset().top < $(this).scrollTop()+winHe){
        ps1.photoList({autoPlay:false});
      }
      if(taged && tagC.offset().top < $(this).scrollTop()+winHe){
        taged = false;
        cloudInit();
      }
});

  }else{
    nav.parent().removeClass("hide");
    $("#fullpage").fullpage({
      verticalCentered: false,
      resize: false,
      easing: "linear",
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
      navigation: false,
      slidesNavigation: false,
      afterLoad: function(anchorLink ,index){
        nav.children(":eq("+(index-1)+")").addClass("active").siblings().removeClass("active");
        switch(index){
          case 4:
            $("#picScroll1").photoList({autoPlay:false});
          break;
          case 5:
            cloudInit();
          break;
        }

      }
    });
  }

  if(lowVersionIE()){
    var photoWrap = $(".photoWrap");
    photoWrap.height(400);
    photoWrap.find("li").height(200);
    photoWrap.find("img").height();
  }

  $(".openmap").on("click",function(){
    var $this = $(this);
    if(!$this.hasClass("active")){
      $this.addClass("active").next().removeClass("active");
      $(".data-box").animate({left:0},600);
    }
  });

  $(".opencount").on("click",function(){
    var $this = $(this);
    if(!$this.hasClass("active")){
      $this.addClass("active").prev().removeClass("active");
      $(".data-box").animate({left:"-100%"},600);
      $(".mapTip").css("display","none");
    }
  });

  /* 时间轴 */
  $("#timeAxis .circle").on("click",function(e){
    e.stopPropagation();
    var $this = $(this).parent(),
        index = $this.index(),
        timeAxis = $("#timeAxis");
    timeAxis.children().removeClass("line");
    if($this.hasClass("active")){
      $this.removeClass("active");
    }else{
      timeAxis.children(":lt("+index+")").addClass("line");
      $this.addClass("active").siblings().removeClass("active");
    }
  });
  $("#timeAxis .t-btn").on("click",function(e){
    e.stopPropagation();
    var $this = $(this);
    var $html = "<div class=\"ppic\" id=\"ppic\" style=\"position:fixed;z-index:2000;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.6)\"><div class=\"lineClose\" style=\"position:absolute;width:120px;z-index:2060;height:120px;background:#000;border-radius:50%;right:-60px;top:-60px\"><div title=\"关闭\" style=\"font-size:56px;color:#999;padding-top:35px;padding-right:58px;text-align:right;cursor:pointer;\">×</div></div><div class=\"loader\" style=\"position:relative;height:100%;width:100%;\"><img src=\""+$this.data("src")+"\" style=\"visibility:hidden\"></div></div>"
    $("body").append($html);
    var ppic = $("#ppic");
    ppic.imagesLoaded(function(){
      var img = ppic.find("img"),
          winw = $(window).width(),
          winh = $(window).height();
      img.width(winw*0.85);
      var imgw = img.width(),
          imgh = img.height();
      ppic.find(".loader").removeClass("loader");
      img.css({
        "position":"absolute",
        "left":(winw-imgw)/2,
        "top":(winh-imgh)/2,
        "visibility":"visible"
      })
      .addClass("pt-page-scaleUpCenter");
      if(isMobile){
        pictureScale(ppic);
      }
    });
    $(".lineClose").on("click",function(){
      ppic.remove();
    })
  });

  $(".pic-nav li").on("click",function(){
    var $this = $(this);
    if(!$this.hasClass("active")){
      $this.addClass("active").siblings().removeClass("active");
      $(".pic-wrap").children(":eq("+$this.index()+")").addClass("active").siblings().removeClass("active");
      if($this.index()==5){
        $("#picScroll"+(1+$this.index())).photoList();
      }else{
        $("#picScroll"+(1+$this.index())).photoList({autoPlay:false});
      }
    }
  });


  photoBigPreview();

  /* 图片上传模拟 */
  /* 图片上传 */
  $(".uploadPicnologin").on("click",function(){
      window.location.href="/user/login?url=%2Fzhuanti%2Fsz100km"; 
  });
  $(".uploadPic").on("click",function(){
    var $html = "<div id=\"uploadGroup\"><div class=\"imageBox\"><form id=\"form1\" method=\"post\" enctype=\"multipart/form-data\"><label for=\"upload\"><input type='hidden' name='ActivityID' value='136'><input id=\"upload\" name=\"res_files[]\" type=\"file\">点击添加图片</label></div><div class=\"text mt20\">一人一图，图说百公里<br>支持jpg/png格式</form></div></div>";
    $("body").append($html);
    var uploadGroup = $("#uploadGroup");
    popupDiv(uploadGroup);
    var divMain = $("#divMain");
    var imageBox = $(".imageBox");
    $("#upload").on("change",function(){
      $("#form1").ajaxSubmit({
        url:"/api/activity_live/live_upload",
        dataType: "json",
        beforeSubmit: function(){
          imageBox.html("").addClass("loading");
        },
        success: function(jsonData){
          switch(jsonData.error){
            case "0":
             divMain.html("<div style=\"width:220px;text-align:center;padding:30px 0;line-height:1.8;\">上传成功！</div>");
              setTimeout(closeDiv,1000);
              var str = "<li class=\"loader\" data-src=\""+jsonData.url+"\"><div class=\"mask\"></div><div class=\"text\"><div class=\"ttable\"><div class=\"middle\">"+jsonData.picdic+"</div></div></div><div class=\"tip\">"+jsonData.author+"</div><img height=\"240\" src=\""+jsonData.url+"\"></li>";
              var scroll6 = $("#picScroll6");
              scroll6.children("ul").prepend(str);
              var pic = scroll6.children("ul").children("li:eq(0)");
              isImgLoad(pic,function(){
                pic.removeClass("loader");
                var sw = scroll6.children("ul").width();
                scroll6.children("ul").stop().css({"left":0,"width":sw+pic.width()});
              });
              photoBigPreview();
              break;
            case "1":
              divMain.html("<div style=\"width:220px;text-align:center;padding:30px 0;line-height:1.8;\">"+jsonData.msgs+"</div>");
              setTimeout(closeDiv,1000);
            break;
            default:
              divMain.html("<div style=\"width:220px;text-align:center;padding:30px 0;line-height:1.8;\">小机器人到外星球啦，不处理地球上的事！</div>");
            break;
          }
        },
        error: function(response){
          divMain.html("<div style=\"width:220px;text-align:center;padding:30px 0;line-height:1.8;\">小机器人罢工了，要不再多试几次？</div>");
        }
      });
    });
  });

  $(".addTag").on("click",function(){
    wirteTag();
  });
  $(".addTag-nologin").on("click",function(){
   window.location.href="/user/login?url=%2Fzhuanti%2Fsz100km"; 
  });

  $(".startBtn").on("click",function(){
    examNum = 0;
    examCount = 0;
    $(".exam-sart").addClass("hide");
    $(".exam-doing").removeClass("hide");
  });

  $(".exam-list .item").on("click",function(){
    var $this = $(this);
    var $par = $this.parent().parent();
    if(!$par.hasClass("finish")){
      $this.addClass("selected");
      if($this.data("val") == $par.data("correct")){
        $this.append("<em class=\"true\"></em>");
        examCount++;
      }else{
        $this.append("<em class=\"false\"></em>");
      }
      if($(".nextBtn").hasClass("disabled")){
        $(".nextBtn").removeClass("disabled");
      }
      $par.addClass("finish");
    }
  });

  $(".nextBtn").on("click",function(){
    var $this = $(this);
    if(!$this.hasClass("disabled")){
      examNum++;
      if(examNum>9){
        $(".exam-doing").addClass("hide");
        $(".exam-stop").removeClass("hide");
        var n = 0;
        if(examCount>9){
          n = 6
        }else if(examCount>7){
          n = 5
        }else if(examCount>5){
          n = 4
        }else if(examCount>3){
          n = 3
        }else if(examCount>2){
          n = 2
        }else if(examCount>0){
          n = 1
        }else{
          n = 0
        }
        var examStop = $(".exam-stop");
        examStop.find('.biaoti').html(examResult[n].title);
        examStop.find('.jvli').html(examResult[n].intro);
        examStop.find('.text').html(examResult[n].content.str1+"<br>"+examResult[n].content.str2+"<br>"+examResult[n].content.str3);
        $("#shareTo").attr("data-mf",examResult[n].title+examResult[n].intro);
      }else{
        $(".exam-list").children("li:eq("+examNum+")").removeClass("hide");
        $("#examNav").children("li:eq("+examNum+")").addClass("on");
        var p = $(".exam-list").children("li:eq("+examNum+")").prev();
        p.addClass("hide");
        if(examNum==9){
          $(".nextBtn").text("提交");
        }
      }
    }
    $this.addClass("disabled");
  });

  $(".reStart").on("click",function(){
    var examList = $(".exam-list");
    examNum = 0;
    examCount = 0;
    $(".nextBtn").text("下一题");
    $(".exam-doing").removeClass("hide");
    $(".exam-stop").addClass("hide");
    $("#examNav").children(":eq(0)").siblings().removeClass("on");
    examList.children().removeClass("finish");
    examList.find(".item").removeClass("selected");
    examList.find("em").remove();
    examList.children(":first").removeClass("hide");
    examList.children(":last").addClass("hide");
  });

});