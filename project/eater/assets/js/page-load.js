//滑动选项
$(".screening-select").click(function () {
    var _parent = $(this);
    var _postX = _parent.position().left;
    _parent.siblings(".screening-select").removeClass("current");
    _parent.addClass("current");
    _parent.siblings(".project-screening-yellow").animate({width: _postX}, 300);
    _parent.siblings(".select-1-yellow").animate({left: _postX - 4}, 300);
    //_parent.prevAll(".screening-select").css("background", "none");
    _parent.nextAll().removeAttr("style");
});

//更改颜色
$(".choose").click(function(){
    if($(this).prev().children().is(':checked')){
        $(this).prev().children().attr("checked",false);
        $(this).removeClass("color-change");
    }else{
        $(this).prev().children().attr("checked",true);
        $(this).addClass("color-change");
    }

});
$("input[type=checkbox]").change(function(){
    if(this.checked){
        $(this).parent().next().addClass("color-change");
    }else{
        $(this).parent().next().removeClass("color-change")
    }

});
$("input[type=radio]").change(function(){
    if(this.checked){
        $(this).parent().addClass("color-change");
        $(this).parent().nextAll().removeClass("color-change");
        $(this).parent().prevAll().removeClass("color-change");
    }

});



function openloading(){
    $("#loading").show();
}
