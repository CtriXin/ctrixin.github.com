define("app/sid",function(r,n,e){var t=r("utils"),u="http://j.br.baidu.com/v1/v/1/t/full/p/browser/tn/{0}/ch_dl_url.jsonp",o="11000002",i=t.getQueryString(),a=function(){var r=function(r,n){return r&&n?r:o};return{get:function(){var n=$.Deferred(),e=i.sid,t=e?e:o;return $.ajax(u.replace("{0}",t),{dataType:"jsonp",jsonp:"cb"}).done(function(t){var u=-1!==t.rst;n.resolve(r(e,u))}),n.promise()},defaultId:function(){return o}}}();e.exports=a});
;define("app/packageinfo",function(e,a,n){var t="http://j.br.baidu.com/v1/t/full/p/browser/tn/{0}/ch_url_info.jsonp",o=function(){var e=function(e){$(".package-info").find(".package-info-ver").text(e.version).end().find(".package-info-release").text(e.date)},a=function(a){$.ajax(t.replace("{0}",a),{cache:!0,dataType:"jsonp",jsonp:"cb",jsonpCallback:"getpackageinfo",success:function(a){var n;0===a.errCode&&(n=a.data,e({size:n.fsize,version:n.fver,date:n.fdate,url:n.full_url}))}})};return{update:a}}();n.exports=o});
;define("app/download",function(t,n,r){var o="http://j.br.baidu.com/v1/t/full/p/browser/tn/{0}/ch_dl_url",a=function(){var t=$(".button-download"),n=function(n){t.attr("href",o.replace("{0}",n))};return{update:n}}();r.exports=a});
;define("app/home",function(t){var e=t("underscore"),n=t("keycode"),a=t("app/slipblock"),i=t("app/sid"),s=t("app/packageinfo"),o=t("app/download"),c=t("app/fixie"),u=$(window),r=Modernizr.cssanimations;t("jquery-plugins/jquery.jqDock");var d=function(t){return $.Deferred(function(e){setTimeout(e.resolve,t)})},f=function(t){d(r?3500:350).done(function(){t()})},l=function(){var t=$("#stages"),n=function(){var e=Math.min(1,Math.max(450,u.height())/1080);t.css("font-size",32*e)};return{start:function(){n(),u.on("resize",e.throttle(n,100))}}}(),p=function(){var t=$(".stage-4-icon-wrapper"),e=[],n=function(t){return'<span class="stage-4-icon-tip tip tip-top"><a class="tip-text" href="'+t.url+'" target="_blank" ><span class="tip-icon"></span>'+t.text+'</a><span class="tip-arrow"></span></span>'};return{create:function(){$.each(e,function(e,a){var i=t.find('.stage-4-icon-item[data-index="'+a.index+'"]').append(n(a));i.find(".stage-4-icon-tip").on("mouseenter.stage4-tip",function(){g.icons().jqdock("idle")}).on("mouseleave.stage4-tip",function(){g.icons().jqdock("nudge")}),a.url||i.find(".tip-text").on("click",function(){return!1}),a.className&&i.find(".tip").addClass(a.className)})},remove:function(){$(".stage-4-icon-tip").off(".stage4-tip"),$(".stage-4-icon-tip").remove()},setSource:function(t){e=t}}}(),g=function(){var t,n,a=$(".stage-4-icon-wrapper"),i=$(".stage-4-title li"),s=$(".stage-4-description li"),o=a.html(),c=8,f=function(t){i.finish().fadeOut().eq(t).fadeIn(),s.finish().fadeOut().eq(t).fadeIn()},l=function(){var t;return u.height()>870?(n=120,t="large"):(n=80,t="mini"),t},g=function(){var e=l();t&&t!==e&&(a.css("visibility","hidden"),p.remove(),a.find(".stage-4-icon").jqdock("destroy"),a.html(o).find(".stage-4-icon").jqdock({size:n,sizeMax:2*n,distance:3*n,flow:".stage-4-icon"}),d(500).done(function(){a.css("visibility","visible")}),d(r?2600:500).done(function(){p.create()}),t=e)};return{start:function(){$("html").hasClass("ie6")&&$(".stage-4-icon-item img").attr("src",function(){return $(this).data("src")}),t=l(),a.find(".stage-4-icon").jqdock({size:n,sizeMax:2*n,distance:3*n,flow:".stage-4-icon",onReady:function(){a.css("visibility","visible")}}),f(c),u.on("resize",e.throttle(g,100))},bindEvents:function(){a.find(".stage-4-icon").on("mouseenter.stage4",".jqDockItem ",function(){f($(this).index())}).on("mouseleave.stage4",function(){f(c)})},offEvents:function(){a.find(".stage-4-icon").off(".stage4")},icons:function(){return a.find(".stage-4-icon")}}}(),v=function(){var t=$(".stage");return r||t.not("#stage-1").css("top","100%"),{next:function(e,n){r||(t.finish(),e.animate({top:"-100%"}),n.animate({top:0}))},prev:function(e,n){r||(t.finish(),e.animate({top:"100%"}),n.animate({top:0}))}}}(),m=function(){var t,e,n=$(".stage"),a=n.length,i=0,s=!1,o=1e3,c=!1,u=function(){$("#slidebar").find("li").removeClass("slidebar-active").eq(i).addClass("slidebar-active")},f=function(){s=!0,clearTimeout(t),t=setTimeout(function(){s=!1},o)},l=function(){$(".button-next")[i===a-1?"fadeOut":"fadeIn"]().find(".button-next-text")[0===i?"fadeIn":"fadeOut"]()},m=function(t){t.is("#stage-4")&&(g.icons().jqdock("idle"),d(r?3e3:300).done(function(){g.icons().jqdock("nudge"),g.bindEvents(),p.create()}))},h=function(t){t.is("#stage-4")&&(p.remove(),g.icons().jqdock("idle"),g.offEvents())},b=function(){clearTimeout(e)};return{start:function(){f()},next:function(){var t,e;i+1>a-1||s||(b(),0===i?(t=n.eq(i).addClass("stage-state-in"),d(100).done(function(){t.addClass("stage-state-out")})):t=n.eq(i).addClass("stage-state-out"),e=n.eq(++i).addClass("stage-state-in"),v.next(t,e),m(n.eq(i)),l(),u(),f())},prev:function(){var t,e;0>i-1||s||(b(),h(n.eq(i)),t=n.eq(i).removeClass("stage-state-in stage-state-out-in"),e=n.eq(--i).addClass("stage-state-out-in").removeClass("stage-state-out"),v.prev(t,e),f(),l(),u())},activate:function(t){var e=n.eq(i),a=n.eq(t);t===i||s||(b(),t>i?(a.prevAll().addClass("stage-state-in stage-state-out"),a.addClass("stage-state-in"),v.next(e,a),m(a)):(h(n.eq(i)),a.nextAll().removeClass("stage-state-in stage-state-out stage-state-out-in"),a.addClass("stage-state-out-in").removeClass("stage-state-out"),v.prev(e,a)),i=t,f(),l(),u())},autoOnce:function(){var t;if(!c){c=!0;var s=function(){i+1>a-1||(e=setTimeout(function(){0===i?($current=n.eq(i).addClass("stage-state-in"),d(100).done(function(){$current.addClass("stage-state-out")})):$current=n.eq(i).addClass("stage-state-out"),t=n.eq(++i).addClass("stage-state-in"),v.next($current,t),m(n.eq(i)),l(),u(),s()},4e3))};s()}}}}();m.start(),a.start(),l.start(),g.start(),c.start();var h=function(t){m[t.deltaY>0?"prev":"next"]()};i.get().done(function(t){var e=Math.floor(2*Math.random());return s.update(t),"11000002"!==t&&"10101012"!==t||1!==e?void o.update(t):void $(".button-download").attr("href","11000002"===t?"http://dlsw.br.baidu.com/package/201503/bdbrowserSetup-7.3.100.1163-521_11000002.exe":"http://dlsw.br.baidu.com/package/201503/bdbrowserSetup-7.3.100.1177-520_10101012.exe")}),$("#nav").on("mouseenter","li",function(){a.move($(this))}).on("mouseleave",function(){a.back()}),f(function(){$(document).on("mousewheel",h),$(document).on("keydown",function(t){switch(t.keyCode){case n.DOWN:case n.RIGHT:m.next();break;case n.UP:case n.LEFT:m.prev();break;case n.ENTER:m.autoOnce()}}),$(".button-next").on("click",".button-next-icon",function(){m.next()}).on("click",".button-next-guide",function(){m.activate(4)}),$("#slidebar").on("click","li",function(t){t.preventDefault(),m.activate($(this).index())}),$(".button-download").on("click",function(){window._hmt&&_hmt.push(["_trackEvent","主页下载按钮","下载","下载"])})})});