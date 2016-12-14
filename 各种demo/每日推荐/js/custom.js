// TOP
$(function() {
        $(window).scroll(function() {
            if($(this).scrollTop() > 200) {
                $('#toTop').fadeIn();	
            } else {
                $('#toTop').fadeOut();
            }
        });
     
        $('#toTop').click(function() {
            $('body,html').animate({scrollTop:0},800);
        });	
    });
$(window).load(function() {
	
	//------IMAGE HOVER-------------
	$(function() {
            $('a img').each(function() {
                $(this).hover(
                    function() {
                        $(this).stop().animate({ opacity: .6 }, 700);
                    },
                   function() {
                       $(this).stop().animate({ opacity: 1 }, 700);
                   })
                });
        });
	
	//------TIPSY TOOLTIP-------------
	$('a.tip').tipsy({fade: true, gravity: 's'});
	
	//------MENU-------------
	ddsmoothmenu.init({
	mainmenuid: "smoothmenu1", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	//customtheme: ["#1c5a80", "#18374a"],
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
	})
	
	//------SELECTED MENU IPAD, IPHONE-------------
	 $(function() {
	   
      $("<select />").appendTo("nav");
      
      $("<option />", {
         "selected": "selected",
         "value"   : "",
         "text"    : "Go to..."
      }).appendTo("nav select");
      
      $("nav a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav select");
	   
      });

      $("nav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });
	 
	 });
	
	//------PRETTY PHOTO------------- 
	$("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});
	
	
	//------CAMERA SLIDER-------------
	jQuery(function(){	
		jQuery('#camera_wrap_1').camera({
			thumbnails: false,
			height: '49%',
			loader: 'bar'
		});
	});
	
	//------JCAROUSEL-------------
		function mycarousel_initCallback(carousel){
		// Disable autoscrolling if the user clicks the prev or next button.
		carousel.buttonNext.bind('click', function() {
			carousel.startAuto(0);
		});
		carousel.buttonPrev.bind('click', function() {
			carousel.startAuto(0);
		});
		// Pause autoscrolling if the user moves with the cursor over the clip.
		carousel.clip.hover(function() {
			carousel.stopAuto();
		}, function() {
			carousel.startAuto();
		});
	};
	jQuery(document).ready(function() {
		jQuery('#mycarousel').jcarousel({
			auto: 4,
			wrap: 'last',
			initCallback: mycarousel_initCallback
		});
	});
	
	//------MOSAIC-------------
	jQuery(function($){
		$('.circle, .vid, .views, .views2').mosaic({
			opacity		:	0.8			//Opacity for overlay (0-1)
		});	    
	});
	
});