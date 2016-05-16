/*global $:false, google:false*/

var $portfolio = $('#portfolio'),
	$goTop = $('#go-top'),
	$preloader = $('#preloader'),
	InfoBox;

var $window = $(window),
	windowWidth = $window.width(),
	windowTop = $window.scrollTop(),
	mapObject, marker, yPos, coords, TimelineLite;

var App = {

	start: function() {

		// on window resize
		App.onResize();
		// on window load
		App.onLoad();
		// on page scroll
		App.onScroll();
		// on document ready
		App.onMousewheel();
		// initaite slider
		App.sliderInit();
		// bind all events
		App.bind();
		// call google map
		App.map();
		// form validation, captcha, etc.
		App.getInTouch();
		// navigation scroll to any section by .anchor class and #
		App.anchorScroll();
		// scroll to top button
		App.goTop(windowTop);
		// init the parallax effects
		App.homeParallax();
		// init owl carosuel
		App.owlCarousel();
		// sticky header menu
		App.sticky();
		// init the portfolio
		App.portfolio.start();

	},

	onScreen: function() {

		if($('.charts').is_on_screen()) {
			App.pies();
		}

		if($('.screens').is_on_screen()) {
			App.screens();
		}

		if($('.facts').is_on_screen()) {
			App.facts();
		}

	},

	coreValues: function() {

		$('.core-values li').each(function(index) {
			var $this = $(this);
			setTimeout(function() {
				$('.core', $this).delay(index * 100).addClass('rotate');
			}, index * 100);
		});

	},

	customers: function() {

		$('.customers li').each(function(index) {
			$(this).delay(index * 100).animate({'opacity': 1}, 1300);
		});

	},

	facts: function() {

		var $eleNumber;

		$('.facts li:not(.break)').each(function() {
			$eleNumber = $(this).find('strong');
			$eleNumber.animateNumbers($eleNumber.attr('data-number'));
		});

	},

	screens: function() {

		$('.screens .center').delay(500).animate({'opacity': 1}, 800);
		$('.screens .left').delay(1100).animate({'opacity': 1, 'left': -100}, 800, 'easeOutQuint');
		$('.screens .right').delay(1100).animate({'opacity': 1, 'right': -100}, 800, 'easeOutQuint');

	},

	preloaderFinish: function() {

		$preloader.remove();

		App.onScreen();

	},

	sticky: function() {

		if($(window).scrollTop() > 100) {
			$('#header').addClass('sticky');
		}else{
			$('#header').removeClass('sticky');
		}

	},

	owlCarousel: function() {

		if($('.owl').length) {
			$(".owl").owlCarousel({
				autoPlay : 3000,
				navigation:false,
				paginationSpeed : 1000,
				singleItem : true,
			});
		}

		if($('.owl-inner').length) {
			$(".owl-inner").owlCarousel({
				autoPlay : 3000,
				navigation:true,
				paginationSpeed : 1000,
				singleItem : true
			});
		}
	},

	pies: function() {

		$('.chart').each(function() {
			$(this).easyPieChart({
				easing: 'easeOutBounce',
				barColor: $(this).attr('data-color'),
				trackColor: 'rgba(0,0,0,0.1)',
				scaleColor: false,
				lineCap: 'square',
				lineWidth: 13,
				animate: 2000,
				size: 120,
				onStep: function(from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
		});
	},

	sliderInit: function() {

		$('#carousel').height($(window).height());

		if($('#carousel').length) {
			$.mbBgndGallery.buildGallery({
				containment:"#carousel",
				timer:2000,
				effTimer:4000,
				controls:"#controls",
				grayScale:false,
				shuffle:true,
				preserveWidth:false,
				effect:"zoom",

				images:[
					"img/slide-1.jpg",
					"img/slide-2.jpg",
					"img/slide-3.jpg",
					"img/slide-4.jpg",
					"img/slide-5.jpg",
					"img/slide-6.jpg",
					"img/slide-7.jpg",
					"img/slide-8.jpg",
					"img/slide-9.jpg",
					"img/slide-10.jpg",
					"img/slide-11.jpg",
					"img/slide-12.jpg",
					"img/slide-13.jpg",
					"img/slide-14.jpg",
					"img/slide-15.jpg",


				]
																				// 这里是section3 的背景图片
			});
		}
	},

	slideText: function(index) {

		$('.slide-text').stop(true,true).animate({'top': (index-1)*-21}, 300, 'easeOutExpo');

	},

	homeParallax: function() {

		$('#portfolio-box').scroll(function() {

			var yPos = -($('#portfolio-box').scrollTop() / -2.5);
			var coords = '50% '+ yPos + 'px';
			$('#project .main-background').css({ backgroundPosition: coords });

		});

		$(window).scroll(function() {

			if(windowWidth > 768) {
				if($('.references').is_on_screen()) {

					yPos = ($(window).scrollTop() - ($('.references').offset().top + $('.references').outerHeight())) * 0.5;
					coords = '50% '+ yPos + 'px';

					$('.references').css({ backgroundPosition: coords });
				}

				if($('.testimonial').is_on_screen()) {

					yPos = ($(window).scrollTop() - ($('.testimonial').offset().top + $('.testimonial').outerHeight())) * 0.5;
					coords = '50% '+ yPos + 'px';

					$('.testimonial').css({ backgroundPosition: coords });
				}
			}

		});
	},

	parallax: function() {

		if(windowWidth > 768) {
			$('.references').parallax("50%", -0.6);
			$('.testimonial').parallax("50%", -0.6);
		}

	},

	onResize: function() {

		$window.resize(function() {

			if($('#portfolio-box.visible').length > 0) {
				$('#portfolio-box.visible').height($(window).height()).width($(window).width());
			}

		});

	},

	onScroll: function() {

		$window.on('scroll', function() {

			App.sticky();

			App.onScreen();

			App.goTop($(window).scrollTop());

		});

	},

	onLoad: function() {

		$(window).load(function() {

			App.preloader();

		});

	},

	onMousewheel: function() {
		$('html, body').bind('DOMMouseScroll mousewheel', function() {
			$('html, body').stop(true,false);
		});
	},

	bind: function() {

		$(document).on('click', 'a[href="#"]', function(e) {
			e.preventDefault();
		});

		$('.left ul a', $('#carousel')).bind('click', function(e) {
			e.preventDefault();
			App.carouselSwitch($(this).parent().attr('class'));
		});

		// portfolio load more
		$('.more', $portfolio).bind('click', function() {
			App.portfolioMore();
		});

		// go top bind
		$goTop.bind('click', function() {
			$('html, body').animate({scrollTop: 0}, 1200, 'easeOutExpo');
		});

		$('#navigation a').bind('click', function() {
			$('html, body').stop(true,false);
		});

		/* mobile menu */
		$("#nav-mobile").on("click", function() {
			$('#navigation').toggleClass('visible');
		});
		$('#navigation a').bind('click', function() {
			$('#navigation').toggleClass('visible');
		});

		// change project
		$(document).on('click', '.change-project', function(e) {
			e.preventDefault();
			App.portfolio.changeProject($(this));
		});
	},

	portfolioMore: function() {

		setTimeout(function() {
			$portfolio.removeClass('animate').removeClass('ajaxed');
		}, 1500);

		if(!$portfolio.hasClass('animate')) {

			$portfolio.addClass('animate');

			$.ajax({
				url: 'html/_portfolio.html',
				context: document.body,
				success: function(data) {

					$("html, body").animate({
						scrollTop: $portfolio.offset().top + $portfolio.outerHeight(true) - 150
					}, 500, function() {

						if(!$portfolio.hasClass('ajaxed')) {

							$portfolio.addClass('ajaxed');

							$('.inner', $portfolio).animate({'height': $portfolio.height() + $('.item', $portfolio).height()}, 900, 'easeInOutQuint', function() {
								$('ul', $portfolio).append(data);
								$portfolio.height('auto');

								$('.item.ajax', $portfolio).each(function(index) {
									var $this = $(this);
									setTimeout(function() {
										$this.removeClass('ajax');
									}, 150 * (index+1));
								});

								setTimeout(function() {
									$portfolio.removeClass('animate').removeClass('ajaxed');
								}, 600);
							});
						}
					});

				}
			});
		}
	},

	preloader: function() {
		$preloader.delay(1000).fadeOut(300, function() {
			App.preloaderFinish();
		});
	},

	goTop: function(windowTop) {

		if(windowTop > 1000) {
			$goTop.css('opacity', 1);
		}else{
			$goTop.css('opacity', 0);
		}

		var footerPosition = ($(document).height() - $window.height()) - $('#footer').height();

		if(windowTop >= footerPosition) {
			$goTop.addClass('bottom');
		}else{
			$goTop.removeClass('bottom');
		}

	},

	map: function() {

		var btn_zoom_in = document.getElementById('zoomin');
		if (btn_zoom_in !== null) {
			google.maps.event.addDomListener(btn_zoom_in, 'click', function() {
				mapObject.setZoom(mapObject.getZoom() + 1 );
			});
		}

		var btn_zoom_out = document.getElementById('zoomout');
		if (btn_zoom_out !== null) {
			google.maps.event.addDomListener(btn_zoom_out, 'click', function() {
				mapObject.setZoom(mapObject.getZoom() - 1 );
			});
		}

		var mapContainer = document.getElementById('map');

		if (mapContainer !== null) {
			App.create_map(mapContainer);
			App.create_marker();
			App.create_info();
		}
	},



	create_marker: function() {

		var pinImage = new google.maps.MarkerImage('img/marker.png'),
		myPin = new google.maps.LatLng(37.37758, -122.05391);

		marker = new google.maps.Marker({
			position: myPin,
			map: mapObject,
			title: 'Hello World!',
			icon: pinImage
		});

	},

	create_info: function() {

		var boxText = document.createElement("div");
		boxText.style.cssText = "color:#fff;";
		/*jshint multistr: true*/
		boxText.innerHTML = "\
			<div class='marker-label'>\
				San Jose. Address: 350<br>\
				Fifth Avenue, 34th floor.<br>\
				San Jose, CA 10118-3299<br>\
				USA Tel: +1-212-290-4700.<br>\
				Fax: +1-212-736-1300.\
				</div>\
			";

		var infoOptions = {
			content: boxText,
			disableAutoPan: true,
			maxWidth: 0,
			pixelOffset: new google.maps.Size(-25, -235),
			zIndex: null,
			boxStyle: {
				background: "url('img/marker-label.png') no-repeat",
				width: "400px",
				height: "215px"
			},
			infoBoxClearance: new google.maps.Size(1, 1),
			isHidden: false,
			pane: "mapPane",
			enableEventPropagation: true
		};

		var ib = new InfoBox(infoOptions);
		ib.open(mapObject, marker);

	},

	getInTouch: function() {

		var $getInTouch = $('.get-in-touch form');

		$('button', $getInTouch).bind('click', function(e) {

			e.preventDefault();

			$.ajax({
				url: $getInTouch.attr('action'),
				type: $getInTouch.attr('method'),
				dataType: 'json',
				data: $getInTouch.serialize(),
				success: function(data) {

					if(data.success) {

						var $captchaImage = $('.captcha-img', $getInTouch);

						$('input, textarea', $getInTouch).removeClass('error').val('');
						$captchaImage.attr('src', $captchaImage.attr('src') + '?' + Math.ceil(Math.random() * 1000));

					}else{

						$('input, textarea', $getInTouch).removeClass('error');

						for (i = 0; i<data.length; i++) {

							$('input[name="' + data[i] + '"], textarea[name="' + data[i] + '"]', $getInTouch).addClass('error');

						}
					}
				}
			});
		});

	},

	anchorScroll: function() {

		$(".anchor").click(function(event) {

			var full_url = this.href,
			parts = full_url.split("#"),
			trgt = parts[1],
			targetElement = $("#"+trgt),
			target_offset = targetElement.offset(),
			target_top = target_offset.top - 60;

			if(targetElement.length) {

				event.preventDefault();

				$('html, body').animate({scrollTop:target_top}, 1000, 'easeOutExpo');

			}
		});
	},

	mobileMenu: function() {

		if($('#navigation').hasClass('visible')) {
			$('#navigation').removeClass('visible');
		}

	},
};

App.portfolio = {

	start: function() {

		this.bind();

	},

	bind: function() {

		$("#portfolio").on("click", '.item', function() {
			if($("html").hasClass("open") || App.portfolio.open($(this))) {
				return true;
			}else{
				return false;
			}
		});

		$(document).on("click", ".close-project", function() {
			App.portfolio.close();
		});

	},

	open: function(c) {

		$("html").css({
			overflow : "hidden"
		}).addClass("open");

		var g = new TimelineLite();
		var d = $(window);

		var a = [], e = $("#portfolio-box");
			a.top = c.offset().top - $(window).scrollTop();
			a.left = c.offset().left;
			a.lar = c.width();
			a.alt = c.height();
			a.puloLeft = $(d).width() / 2 - a.lar / 2 - a.left;
			a.puloTop = $(d).height() / 2 - a.alt / 2 - a.top;

		e.animate({
			top : a.top,
			left : a.left,
			width : a.lar,
			height : a.alt,
		}, 0, function() {
			e.addClass('visible');
		});

		c.addClass("aberto").animate({
			opacity : 0
		}, {
			duration : 300,
			complete : function() {
				c.parent().removeClass("animando");

				g.to(e, 0.5, {
					x : a.puloLeft,
					y : a.puloTop,
					ease : "Circ.easeInOut",
					delay : 0.1,
					onComplete : function() {
						$(".mostrador").addClass("zindex");
					}
				});
				g.to(e, 0.5, {
					width : $(d).width(),
					height : $(d).height(),
					x : -a.left,
					y : -a.top,
					ease : "Circ.easeInOut",
					onComplete : function() {

						$('#portfolio-box .inner').fadeIn();

						$('#portfolio-box').css('overflow-y', 'scroll');

						$('#portfolio-box').find('.spinner').css('opacity', 0);

						var projectUrl = (typeof c.attr('href') !== 'undefined') ? c.attr('href') : '#' ;

						$.ajax({
							url: projectUrl,
							context: document.body,
							success: function(data) {

								$('#portfolio-box .inner').empty().append(data);

								App.owlCarousel();

							}
						});
					}
				});
			}
		});
	},

	close: function() {

		setTimeout(function() {
			$('#portfolio-box').find('.spinner').animate({'opacity': 1}, 100);
		}, 450);

		$('#portfolio-box').css('overflow-y', 'hidden');

		$("html").css({
			overflow : "auto"
		});

		if($("html").hasClass("open")) {

			$("#portfolio-box .inner").fadeOut(function() {

				var a = [], c = $("#portfolio-box"), d = c, g = new TimelineLite(), f = $("#portfolio .aberto").closest('li');

				a.top = f.offset().top - $(window).scrollTop();
				a.left = f.offset().left;
				a.lar = f.width();
				a.alt = f.height();
				a.puloLeft = $(d).width() / 2 - a.lar / 2 - a.left;
				a.puloTop = $(d).height() / 2 - a.alt / 2 - a.top;

				c.css({
					"background-image" : ""
				}).removeClass("zindex");
				g.to(c, 0.6, {
					width : a.lar,
					height : a.alt,
					x : a.puloLeft,
					y : a.puloTop,
					ease : "Circ.easeInOut"
				});
				f.children(".aberto").removeClass("aberto").delay(600).animate({
					opacity : 1
				}, {
					duration : 300
				});
				g.to(c, 0.4, {
					x : 0,
					y : 0,
					ease : "Circ.easeInOut",
					delay : 0.1,
					onComplete : function() {

						f.removeClass("animando").removeClass("projetoAberto");
						$("html").removeClass("open");
						c.removeClass('visible');

						setTimeout(function() {
							c.css({
								width:0,
								height:0,
							});
						}, 300);
					}
				});
			});
		}
	},

	changeProject: function(e) {

		projectUrl = (typeof e.attr('href') !== 'undefined') ? e.attr('href') : '#';

		$.ajax({
			url: projectUrl,
			context: document.body,
			success: function(data) {

				$('#portfolio-box .inner').fadeOut(300, function() {
					$('#portfolio-box .inner').empty().append(data).fadeIn(300);
				});

				App.owlCarousel();

			}
		});

	}
};
