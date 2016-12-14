$(document).ready(function() {
	$.fn.fullpage({
		// slidesColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90', '#ef820'],
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10', 'page11'],
		loopBottom: true,
		afterLoad: function(anchorLink, index){
			if(index == 2){
				$('.section2').find('.text2').delay(500).animate({
					top: '90px'
				}, 1500, 'easeOutBounce');
                $('.section2').find('.img2').delay(2500).fadeIn(1500);
			}
			if(index == 3){
				var t = 700;
				$('.section3').find('p').each(function(i){
					$(this).delay(t).animate({
						right: '70px'
					}, 1500, 'easeOutExpo');
					t = t+700;	
				});
				$('.section3').find('.img3').delay(500).animate({
					left: '-60px'
				}, 1500, 'easeOutExpo');
			}
			if(index == 4){
				$('.section4').find('.text4').delay(1500).slideDown(1000);
                $('.section4').find('.img4').delay(500).fadeIn(1000);
			}
			if(index == 5){
				$('.section5').find('.text5').delay(500).show(1000);
				$('.section5').find('.img5').delay(2000).show(500);
			}
			if(index == 6){
				$('.section6').find('.text6').delay(500).slideDown(2000);
				$('.section6').find('.img6')	.delay(1000).animate({
					top: '430px'
				}, 3500, 'easeOutCirc');
			}
			if(index == 7){
				$('.section7').find('.text7').delay(500).animate({
					right: '-80px'
				}, 1500, 'easeOutCirc');
				$('.section7').find('.img7').delay(500).animate({
					left: '3px'
				}, 1500, 'easeOutCirc');
			}
			if(index == 8){
				$('.section8').find('.text8').delay(800).fadeIn(2000);
				$('.section8').find('.img8').addClass('sec8_img');
			}
			if(index == 9){
				$('.section9').find('.text9').delay(500).animate({
					right:'180px'
				}, 3500, 'easeOutBounce');
				$('.section9').find('.img9').delay(500).animate({
					left:'280px'
				}, 3500, 'easeOutBounce');
			}
			if(index == 10){
				$('.section10').find('.text10').delay(500).slideDown(3000);
			}
			if(index == 11){
				$('.section11').find('.img11').delay(3000).show(3000);
				$('.section11').find('p').delay(500).slideDown(3000);
			}
		},
		onLeave: function(index, direction){
			if(index == '2'){
				$('.section2').find('.text2').delay(500).animate({
					top: '-150%'
				},0, 'easeOutBounce');
				$('.section2').find('.img2').fadeOut();
			}
			if(index == '3'){
				var t = 0;
				$('.section3').find('p').delay(1000).animate({
						right: '-150%'
					}, 1500, 'easeInExpo');
				$('.section3').find('.img3').animate({
					left: '-150%'
				}, 1500, 'easeOutExpo');
			}
			if(index == 4){
				$('.section4').find('.text4').slideUp(1000);
                $('.section4').find('.img4').fadeOut(1000);
			}
			if(index == 5){
				$('.section5').find('.text5').hide(1000);
				$('.section5').find('.img5').hide(500);
			}
			if(index == 6){
				$('.section6').find('.text6').slideUp(2000);
				$('.section6').find('.img6').delay(500).animate({
					top: '-600%'
				}, 3500, 'easeOutExpo');
			}
			if(index == 7){
				$('.section7').find('.text7').animate({
					right: '-150%'
				}, 1500, 'easeOutCirc');
				$('.section7').find('.img7').animate({
					left: '-150%'
				}, 1500, 'easeOutCirc');
			}
			if(index == 8){
				$('.section8').find('.text8').fadeOut(500);
				$('.section8').find('.img8').removeClass('sec8_img');
			}
			if(index == 9){
				$('.section9').find('.text9').animate({
					right:'-450px'
				}, 3500, 'easeOutCirc');
				$('.section9').find('.img9').animate({
					left:'-450px'
				}, 3500, 'easeOutCirc');
			}
			if(index == 10){
				$('.section10').find('.text10').slideUp(2000);
			}
			if(index == 11){
				$('.section11').find('.img11').hide(3000);
				$('.section11').find('p').slideUp(3000);
			}
		}
	});
});