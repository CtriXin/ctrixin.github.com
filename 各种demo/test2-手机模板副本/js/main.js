/* =Main INIT Function
-------------------------------------------------------------- */
function initializeForm() {

	"use strict";

	//IE9 RECOGNITION
	if (jQuery.browser.msie && jQuery.browser.version == 9) {

		jQuery('html').addClass('ie9');
	}

	//NAVIGATION DETECT
	(function() {
	    function navDetect(){

			var windowWidth = $(window).width();
				
			if ( windowWidth > 1199 ) {
				$('nav, header').removeClass('mobile');
				$('nav, header').addClass('desktop');
			} else {
				$('nav, header').removeClass('desktop');
				$('nav, header').addClass('mobile');
			}
			
	    }

	    $(window).on("resize", navDetect);
	    $(document).on("ready", navDetect);
	})();

	//NAVIGATION CUSTOM FUNCTION
	(function() {
		function navigationInit(){

			//MOBILE BUTTON
			$('.nav-button').click(function() {
				if($('nav').is(":visible")) {
					$('nav').slideUp();
					$('.nav-button').removeClass('open');
				} 
				else {
					$('nav').slideDown();
					$('.nav-button').addClass('open');
				}
			});

			//DROPDOWNS
			$('li.drop a.drop-btn').click(function() {
				$('.drop-list').slideUp();
				$('li.drop a.open').removeClass('open');

				if($(this).next('ul.drop-list').is(':visible')) {
					$(this).next('ul.drop-list').slideUp();
					$(this).removeClass('open');
				}

				else {
					$(this).next('ul.drop-list').slideDown();
					$(this).addClass('open');
				}

				return false;
				
			});

			//MAGIC LINE
			$(function() {

			    var $el, leftPos, newWidth,
			        $mainNav = $(".nav-content");
			   
			    var $magicLine = $("#magic-line");
			    
			    $magicLine
			        .width($("nav.desktop .current-page").width() - 35 + "px")
			        .css("left", $(".current-page").position().left)
			        .data("origLeft", $magicLine.position().left)
			        .data("origWidth", $(".current-page").width());
			        
			    $(".nav-content li.upper").hover(function() {
			        $el = $(this);
			        leftPos = $el.position().left;
			        newWidth = $el.width();
			        $magicLine.stop().animate({
			            left: leftPos,
			            width: newWidth
			        });
			    }, function() {
			        $magicLine.stop().animate({
			            left: $magicLine.data("origLeft"),
			            width: $magicLine.data("origWidth")
			        });    
			    });

			    $(window).scroll(function() {
			       $magicLine.width($("nav.desktop .current-page").width() - 35 + "px").css("left", $(".current-page").position().left); 
			    });

			});

			//SEARCH TRIGGER
			$('.search-trigger').click(function() {
				if($('.search-form').hasClass('disabled')) {
					$(".search-form").fadeIn();
					$('nav.desktop .nav-content').fadeOut();
					$('.search-trigger').addClass('open');
					$('.search-form').removeClass('disabled');
				} 
				else {
					$(".search-form").fadeOut();
					$('nav.desktop .nav-content').fadeIn();
					$('.search-trigger').removeClass('open');
					$('.search-trigger:before').fadeOut();
					$('.search-form').addClass('disabled');
				}
			});

		}

		$(document).on("ready", navigationInit);
	})();

	(function() {
		function navigationSticky(){
			var scrollTop = $(window).scrollTop();

			if (scrollTop > 550 ) {   
				$('nav, header').addClass('sticky');
				$('.sticky-head').slideDown();
				$('header.desktop.sticky, nav.desktop.sticky').stop().animate({
					top: 15
				});
			} else {
				$('header.desktop.sticky, nav.desktop.sticky').stop().animate({
					top: 0,},
					1, function() {
						$('nav, header').removeClass('sticky');
						$('.sticky-head').fadeOut('slow'); 
				}); 
			}
		
		}

		$(window).on("scroll", navigationSticky);
		$(window).on("resize", navigationSticky);
	})();

	//HERO DIMENSTION AND CENTER
	(function() {
	    function heroInit(){

			var heroContent = $('.hero-content'),
				contentHeight = heroContent.height(),
				parentHeight = $('.hero').height(),
				topMargin = (parentHeight - contentHeight) / 2,
				heroContentSmall = $('.hero.small .hero-content'),
				contentSmallHeight = heroContentSmall.height(),
				topMagrinSmall = (parentHeight - contentSmallHeight) / 2;

			heroContent.css({
				"margin-top" : topMargin+"px"
			});

			if ( $(window).width() > 767 ) {

				heroContentSmall.css({
					"margin-top" : topMagrinSmall+ 75 + "px"
				});

			} else {

				heroContentSmall.css({
					"margin-top" : topMagrinSmall + 35 +  "px"
				});
			}
	    }

	    $(window).on("resize", heroInit);
	    $(document).on("ready", heroInit);
	})();

	//ANIMATIONS
	$('.animated').appear();

	$(document.body).on('appear', '.fade', function() {
		$(this).each(function(){ $(this).addClass('ae-animation-fade') });
	});
	$(document.body).on('appear', '.slide', function() {
		$(this).each(function(){ $(this).addClass('ae-animation-slide') });
	});
	$(document.body).on('appear', '.hatch', function() {
		$(this).each(function(){ $(this).addClass('ae-animation-hatch') });
	});
	$(document.body).on('appear', '.entrance', function() {
		$(this).each(function(){ $(this).addClass('ae-animation-entrance') });
	});

	//PARALLAX EFFECTS
	$('.parallax').each(function() {
		$(this).parallax("50%", 0.1);
	});

	//TESTIMONIALS
	$('.testimonials').bxSlider({
		touchEnabled: true,
		slideWidth: 1400,
		controls: false,
		pager: true,
		pagerSelector: ".testimonial-pager",
		adaptiveHeight: true
	});

	//RECENT WORK SLIDER
	$(document).ready(function($) {
		var si = $('#recent-gallery').royalSlider({
			addActiveClass: true,
			arrowsNav: false,
			controlNavigation: 'none',
			autoScaleSlider: true, 
			autoScaleSliderWidth: 1200,     
			autoScaleSliderHeight: 475,
			loop: true,
			fadeinLoadedSlide: false,
			keyboardNavEnabled: true,
			globalCaptionInside: false,

			visibleNearby: {
			enabled: true,
			centerArea: 0.4,
			center: true,
			breakpoint: 1199,
			breakpointCenterArea: 0.6,
			navigateByCenterClick: true
		}
		
		}).data('royalSlider');
	});

	//HOVERS
	$('.thumbnail a').hover(function() {
		$(this).children('.projectinfo').fadeIn('fast', function(){
			$(this).children('.meta').animate({
				bottom: 55 + "px"
			});
		});
	}, function() {
		$(this).children('.projectinfo').fadeOut('fast', function(){
			$(this).children('.meta').animate({
				bottom: - 55 + "px"
			}, 1);
		});
	});

	//TIMER
	jQuery('.timer').appear();
	jQuery(document.body).on('appear', '.timer', function() {
		jQuery(this).countTo();
	});

	jQuery(document.body).on('disappear', '.timer', function() {
		jQuery(this).removeClass('timer');
	});

	//VIDEO
	 $(function() {
        var videobackground = new $.backgroundVideo($('#bgVideo'), {
            "align" : "centerXY",
            "path" : "video/",
            "width": 960,
            "height": 540,
            "filename" : "video",
            "types" : ["mp4", "ogg"]
        });
    });

	//PORTFOLIO FILTER
	jQuery(function(){
		jQuery('.portfolio-block').mixitup({
			effects: ['fade','scale', 'rotateX'],
			easing: 'smooth',
			layoutMode: 'list'
		});
	});

	//PROJECT SLIDER
	$('.project-slider').bxSlider({
		touchEnabled: true,
		nextSelector: ".project-next",
		prevSelector: ".project-prev",
		pager: true,
		pagerSelector: ".project-controls",
		adaptiveHeight: true,
		onSliderLoad: function () {
	        BackgroundCheck.init({
	          targets: '.bx-prev, .bx-next, .bx-pager-link',
	          images: '.project-slider img'
	        });
     	},
     	onSlideAfter: function () {
            BackgroundCheck.refresh();
      	}
	});

	//GALLERY
	$('.lightbox').iLightBox({
		skin: 'dark'
	});

	//CONTACT-FORM
	jQuery('#contact-open').click(function (e) {
		e.preventDefault();
		if ( jQuery('#contact-form').is(':hidden') ) {
			jQuery('#contact-form').slideDown();
			 jQuery('html, body').delay(200).animate({ 
			      scrollTop: jQuery('#contact-form').offset().top 
			  }, 1000);
		} else {
			jQuery('#contact-form').slideUp();
		}
	});

	jQuery('#contactform').submit(function(){

		var action = jQuery(this).attr('action');

		jQuery("#alert").slideUp(750,function() {
			jQuery('#alert').hide();

 		jQuery('#submit')
			.after('<img src="images/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');

		jQuery.post(action, {
			name: jQuery('#name').val(),
			email: jQuery('#email').val(),
			message: jQuery('#message').val()
		},
			function(data){
				document.getElementById('alert').innerHTML = data;
				jQuery('#alert').slideDown('slow');
				jQuery('#contactform img.loader').fadeOut('slow',function(){jQuery(this).remove()});
				jQuery('#submit').removeAttr('disabled');
				if(data.match('success') != null) {
					jQuery('#name').val('');
					jQuery('#email').val('');
					jQuery('#message').val('');
				}
			}
		);

		});

		return false;

	});

	//RESPONSIVE VIDEO
	jQuery(".container").fitVids();
    

};
/* END ------------------------------------------------------- */

/* =Document Ready Trigger
-------------------------------------------------------------- */
$(document).ready(function(){

	initializeForm();

});
/* END ------------------------------------------------------- */