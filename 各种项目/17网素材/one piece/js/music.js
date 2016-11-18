// JavaScript Document
var audios = window["audios"] || {};
audios = {
    aud:'',
	play : function () {
        var basePath = "music/";
		var mp3snd = "a.mp3";
		var mp3snd2 = "bg.wav";
		var bkcolor = "000000";
        
        if ( $("#bd_audio_1").length > 0 ) { 
            return false;
        }
        if(this.aud != ""){
            this.aud.play();
            return false;
        }

		if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
			$("body").append('<bgsound id="bd_audio_1" src="' + basePath + mp3snd2 + '" loop="-1">');
		}else {
            this.aud = new Audio(); 
            this.aud.src =  basePath + mp3snd;
            this.aud.loop = "loop";
            this.aud.load();
            setTimeout(function(){
                audios.aud.play(); 
            },300)
            

		}
	},
    bdBtn : function(_DOM){/* 暂停的操作 */
        $(_DOM).attr("status",'1');
        $("div").delegate(_DOM, "click", function(){
            var st = $(this).attr("status");
            if(st == '1'){
                if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
                    $("#bd_audio_1")[0].src="";
                }else{
                    audios.aud.pause(); /* 暂停 */
                    $(".music").find('img').attr("src",'images/music.png');/* 暂停的图片 ,music 是图片的class */
                }
                $(this).attr("status",'0');
            }else{
                $(this).attr("status",'1');
/* 播放的图片 */$(".music").find('img').attr("src",'images/music.gif');

                audios.play();/* 播放 */
                
            }
        });  
        
    },
    stop : function(){
        $(".jp-video-play-icon").live("click",function(){
            
            if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
                $("#bd_audio_1")[0].src="";
            }else{
                audios.aud.pause();
            }
         
        });

    }

};
$(document).ready(function () { /* 初始化 */
	audios.play();
	audios.bdBtn(".music");/* 点击的区域 */
});