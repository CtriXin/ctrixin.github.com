# loading
页面中的loading 不需要引用任何的js 
只需要css即可

	var _LoadingHtml =
                '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:100%;top:0;background:#eb472d;z-index:10000;">' +
                '<div class="item-loader-container" style="margin-top: 50%;"><div class="la-square-jelly-box la-2x"><div></div><div></div></div></div>' +
                '<p style="position: fixed;top: 50%;width: 100%;text-align: center;font-size: 1em;">请稍等，服务器正在飞速运转</p>' +
                '</div>';
                           
这个是定义loading的div

页面中css 需要提前加载