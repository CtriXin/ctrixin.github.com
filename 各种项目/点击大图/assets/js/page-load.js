//文字字数限制
function testAuto(thisId,needLeng){
    var idplace = document.getElementById(thisId);
    var nowLeng = idplace.innerHTML.length;
    if(nowLeng > needLeng){
        var nowWord = idplace.innerHTML.substr(0,needLeng)+'...';
        idplace.innerHTML = nowWord;
    }
}

testAuto('lztitle',30)

//获取文档宽度
var contentWidth = $('.memberwidth').width();
var noAvartarWidth = contentWidth - ($('.lz-avatar').width()) - 7;
console.log(noAvartarWidth);



//评论的宽度
$('.noavartarwidth').width(noAvartarWidth)