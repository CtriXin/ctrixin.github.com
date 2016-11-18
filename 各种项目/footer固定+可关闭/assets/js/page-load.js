
//位置
var footermobile = document.getElementById("footer-mobile").offsetHeight;
var footerbtn= document.getElementById("footer-btn").offsetHeight;
var footerlogo= document.getElementById("footer-logo").offsetHeight;
window.onload=function(){
    document.getElementById("footer-btn").style.marginTop = (footermobile-footerbtn)/2 + 'px';
    document.getElementById("footer-logo").style.marginTop = (footermobile-footerlogo)/2 + 'px';
};


//点击大图
function imgShow(_this) {
    var src = _this.attr("src");
//        var src = _this.attr("src").replace('thumbnail','normal');    //客户端
    $("#bigimg").attr("src", src);
    $("<img/>").attr("src", src).load(function () {
        var windowW = $(window).width();
        var windowH = $(window).height();
        var realWidth = this.width;
        var realHeight = this.height;
        var imgWidth, imgHeight;
        var scale = 0.8;

        if (realHeight > windowH * scale) {
            imgHeight = windowH * scale;
            imgWidth = imgHeight / realHeight * realWidth;
            if (imgWidth > windowW * scale) {
                imgWidth = windowW * scale;
            }
        } else if (realWidth > windowW * scale) {
            imgWidth = windowW * scale;
            imgHeight = imgWidth / realWidth * realHeight;
        } else {
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $("#bigimg").css("width", imgWidth);

        var w = (windowW - imgWidth) / 2;
        var h = (windowH - imgHeight) / 2;
        $("#innerdiv").css({"top": h, "left": w});
        $("#outerdiv").fadeIn("fast");
    });
    $("#outerdiv").click(function () {
        $(this).fadeOut("fast");
    });
}

//footer点击关闭
function toggle() {
    theObj = document.getElementById('footer-mobile').style;
    if ( theObj.display == "none" ) theObj.display = "block"; else theObj.display = "none";
}