$(function(){
    var mySwiper = new Swiper('.swiper-container',{
        paginationClickable: true,
        slidesPerView: 1,
        mode: 'vertical',
        onTouchEnd:function(){
        	var info = $(mySwiper.activeSlide()).find('.info');
        	var info1 = info.find('.info1');
        	var info2 = info.find('.info2');
        	var info3 = info.find('.info3');
        	var info4 = info.find('.info4');
        	var info5 = info.find('.info5');
        	$(".info1,.info2,.info3,.info4,.info5").css('opacity','0');
        	setTimeout(function(){
        		info1.animate({opacity:1},800);
        	},200);
        	setTimeout(function(){
        		info2.animate({opacity:1},800);
        	},800);
        	setTimeout(function(){
        		info3.animate({opacity:1},800);
        	},1400);
        	setTimeout(function(){
        		info4.animate({opacity:1},800);
        	},2000);
        	setTimeout(function(){
        		info5.animate({opacity:1},800);
        	},2600);
        }
    })
    $('.press img').on('click',function(){
    	var new_html = '<div class="info">';
    	new_html += '<div class="invite"><img src="images/14-1.png" /></div>';
    	new_html += '</div>';
    	$(this).parents(".n13").css("background","url(images/14.png) center center no-repeat").html(new_html);
    	$('.invite img').on('click',function(){
        	var new_html = '<div class="share"></div>';
        	$(this).parents(".n13").removeClass('n13').addClass('foot').html(new_html);
        })
    })
    $('.music').on('click',function(){
        if($(this).hasClass('on')){
            $('audio').get(0).pause();
            $(this).removeClass('on music-off');
            $(this).attr('src','images/off.png');
        }else {
            $('audio').get(0).play();
            $(this).addClass('on music-off');
            $(this).attr('src','images/on.png');
        }  
    })
})