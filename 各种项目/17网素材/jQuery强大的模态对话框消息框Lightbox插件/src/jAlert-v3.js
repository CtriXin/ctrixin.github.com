/* 
	*
	*
	jAlert v.3
	Made with love by Versatility Werks (http://flwebsites.biz)
	MIT Licensed
	*
	*
*/
;(function($) {

	$.fn.jAlert = function(options) {

		var alert = this,
			themes = ['default', 'green', 'red', 'black', 'blue','yellow'],
			sizes = ['xsm', 'sm', 'md', 'lg', 'xlg', 'full'],
			backgroundColors = ['white', 'black'],
			styles = [], //array of styles that gets joined together with a space between in a style tag on the jalert div
			classes = ['animated'], //array of classes that get joined together with a space between on the jalert div
			backgroundClasses = []; //array of classes that get joined together with a space between on the jalert background div

	    /* Block Multiple Instances by running jAlert for each one */
	    if (alert.length > 1){
	        alert.each(function() { 
	        	$(this).jAlert(alert.options);
	        });
	        return this;
	    }

		/* Combine user alert.options with default */
		alert.options = $.extend({}, $.fn.jAlert.defaults, options);
		
		alert.instance = false;

		if( alert.options.type == 'confirm' )
		{
			if( !alert.options.content )
			{
				alert.options.content = alert.options.confirmQuestion;
			}

			alert.options.btns = [
				{ 'text': alert.options.confirmBtnText, 'theme': 'green', 'class': 'confirmBtn', 'closeAlert': true, 'onClick': alert.options.onConfirm },
				{ 'text': alert.options.denyBtnText, 'theme': 'red', 'class': 'denyBtn', 'closeAlert': true, 'onClick': alert.options.onDeny }
			];

			alert.options.autofocus = alert.options.confirmAutofocus;
		}

		/* Add theme class */
		if( $.inArray(alert.options.theme, themes) == -1 )
		{
			console.log('jAlert Config Error: Invalid theme selection.');
			return false;
		}

		classes.push('ja_'+alert.options.theme);

		/* If they didn't set an id, just create a random one */
		if( !alert.options.id )
		{
			var unique = Date.now().toString() + Math.floor(Math.random() * 100000);
			alert.options.id = 'ja_' + unique;
		}

		/* If they set custom classes */
		if( alert.options.class )
		{
			classes.push(alert.options.class);
		}
		if( alert.options.classes )
		{
			classes.push(alert.options.classes);
		}

		/* If no title, add class */
		if( !alert.options.title )
		{
			classes.push( 'ja_noTitle' );
		}

		/* if it's set and it's not in the array of sizes OR it's an object and it's missing width/height */
		if( alert.options.size && ((typeof alert.options.size == 'string' && $.inArray(alert.options.size, sizes) == -1) || (typeof alert.options.size == 'object' && (typeof alert.options.size.width == 'undefined' || typeof alert.options.size.height == 'undefined'))) )
		{
			console.log('jAlert Config Error: Invalid size selection (try a preset or make sure you\'re including height and width in your size object).');
			return false;
		}
		/* If it's not set, set to md */
		else if( !alert.options.size )
		{
			classes.push('ja_sm');
		}
		/* If it's set and it's an object */
		else if( typeof alert.options.size == 'object' )
		{
			styles.push('width: '+alert.options.size.width+';');
			styles.push('height: '+alert.options.size.height+';');
		}
		/* If it's set and it's not an object */
		else
		{
			classes.push('ja_'+alert.options.size);
		}

		/* Add background color class */
		if( $.inArray(alert.options.backgroundColor, backgroundColors) == -1 )
		{
			console.log('jAlert Config Error: Invalid background color selection.');
			return false;
		}


		backgroundClasses.push('ja_wrap_'+alert.options.backgroundColor);

		/* If there are button(s), then you obviously don't want to hide the div when you alert anywhere or they'll be useless...SAME with autofocus */
		if( (typeof alert.options.btns == 'object' || typeof alert.options.btns == 'array') || alert.options.autofocus ){
			alert.options.closeOnClick = false;
		}

		alert.options.onOpen = [ alert.options.onOpen ];
		
		var onload = "onload='$.fn.jAlert.mediaLoaded($(this))'",
			loader = "<div class='ja_loader'>Loading...</div>";

		/* Creates content */
		if( alert.options.image )
		{
			alert.options.content = "<div class='ja_media_wrap'>"+
										loader+
										"<img src='"+alert.options.image+"' class='ja_img' "+onload+"'";
			if( alert.options.imageWidth )
			{
				alert.options.content += " style='width: "+alert.options.imageWidth+"'";
			}
			alert.options.content += ">"+
									"</div>";
		}
		else if( alert.options.video )
		{
			alert.options.content = "<div class='ja_media_wrap'>"+
										loader+
										"<div class='ja_video'>"+
										"</div>"+
									"</div>";

			/* Add to the onOpen callbacks array to append the iframe and attach the onload callback in a crossbrowser compatible way (IE is a bizitch). */
			alert.options.onOpen.unshift( function(alert){
				var iframe = document.createElement("iframe");
				iframe.src = alert.options.video;

				if (iframe.attachEvent){
				    iframe.attachEvent("onload", function(){
				        $.fn.jAlert.mediaLoaded($(this));
				    });
				} else {
				    iframe.onload = function(){
				        $.fn.jAlert.mediaLoaded($(this));
				    };
				}

				alert.find('.ja_video').append(iframe);
			});

		}
		else if( alert.options.iframe )
		{
			if( !alert.options.iframeHeight )
			{
				alert.options.iframeHeight = $(window).height() * 0.9+'px';
			}
			
			alert.options.content = "<div class='ja_media_wrap'>"+
										loader+
									"</div>";

			/* Add to the onOpen callbacks array to append the iframe and attach the onload callback in a crossbrowser compatible way (IE is a bizitch). */
			alert.options.onOpen.unshift( function(alert){
				var iframe = document.createElement("iframe");
				iframe.src = alert.options.iframe;
				iframe.height = alert.options.iframeHeight;
				iframe.className = 'ja_iframe';

				if (iframe.attachEvent){
				    iframe.attachEvent("onload", function(){
				        $.fn.jAlert.mediaLoaded($(this));
				    });
				} else {
				    iframe.onload = function(){
				        $.fn.jAlert.mediaLoaded($(this));
				    };
				}

				alert.find('.ja_media_wrap').append(iframe);
			});

		}
		else if( alert.options.ajax )
		{

			alert.options.content = "<div class='ja_media_wrap'>"+
										loader+
									"</div>";
				
			/* Store as another var */					
			onAjaxCallbacks = alert.options.onOpen;

			/* Overwrite the onOpen to be the ajax call */
			alert.options.onOpen = [function(alert){
				$.ajax(alert.options.ajax, {
					async: true,
					complete: function(jqXHR, textStatus)
					{
						alert.find('.ja_media_wrap').replaceWith(jqXHR.responseText);
						
						/* Run onOpen callbacks here */
						$.each(onAjaxCallbacks, function(index, onAjax){
							onAjax(alert);
						});
					},
					error: function(jqXHR, textStatus, errorThrown)
					{
						alert.options.onAjaxFail(alert, 'Error getting content: Code: '+jqXHR.status+ ' : Msg: '+jqXHR.statusText);
					}
				});
			}];

		}

		alert.centerAlert = function()
		{
			
			var viewportHeight = $(window).height(),
				alertHeight = alert.instance.height(),
				diff = viewportHeight - alertHeight;

				var top = diff / 2;
	
				if( top > 200 )
				{
					top = top - 100;
				}
				
				if( top <= 0 )
				{
					top = 0;
				}
		
				alert.instance.css('margin-top', top+'px');
			
			if( diff > 5 )
			{
				alert.instance.parents('.ja_wrap').css('position', 'fixed');
				$('body').css('overflow', 'hidden');
			}
			else
			{
				alert.instance.parents('.ja_wrap').css('position', 'absolute');
				$('body').css('overflow', 'auto');
		
				/* Scroll to alert */
				$('html, body').animate({
			        scrollTop: top - 50
			    }, 200);
			    
			}
		    
		}

		var animateAlert = function(which, thisAlert){
			if( which == 'hide' )
			{
				thisAlert.removeClass(alert.options.showAnimation).addClass(alert.options.hideAnimation);
			}
			else
			{
				thisAlert.centerAlert();
				thisAlert.addClass(alert.options.showAnimation).removeClass(alert.options.hideAnimation).show();
			}
		}

		var getBtnHTML = function(btn){

			if(typeof btn.href == 'undefined'){ btn.href = ''; }
			if(typeof btn.class == 'undefined'){ btn.class = ''; }
			if(typeof btn.theme == 'undefined'){ btn.class += ' ja_btn_default'; }else{ btn.class += ' ja_btn_'+btn.theme; }
			if(typeof btn.text == 'undefined'){ btn.text = ''; }
			if(typeof btn.id == 'undefined'){ var unique = Date.now().toString() + Math.floor(Math.random() * 100000); btn.id = 'ja_btn_' + unique; }
			if(typeof btn.target == 'undefined'){ btn.target = '_self'; }
			if(typeof btn.closeAlert == 'undefined'){ btn.closeAlert = true; }

			/* Attach on click handler */
			$('body').on('click', '#'+btn.id, function(e){

					var button = $(this);

					if( btn.closeAlert )
					{
						button.parents('.jAlert').closeAlert();
					}

					var callbackResponse = true;

					if( typeof btn.onClick == 'function' ) 
					{
						callbackResponse = btn.onClick(e, button);
					}

					if( !callbackResponse || btn.closeAlert )
					{
						e.preventDefault();
						return false;
					}

					return callbackResponse;

				});

			return "<a href='"+btn.href+"' id='"+btn.id+"' target='"+btn.target+"' class='ja_btn "+btn.class+"'>"+btn.text+"</a> ";
		}

	    /* Hides an alert and optionally removes it */
	    alert.closeAlert = function(remove, onClose){

	    	var alertInstance = $(this);

	    	if( remove != false )
	    	{
	    		remove = true;
	    	}
	    	
			if(alertInstance.length)
			{
				alertInstance.unbind('DOMSubtreeModified');

				animateAlert('hide', alertInstance);
			
				window.setTimeout(function()
				{

					var alertWrap = alertInstance.parents('.ja_wrap');

					if( remove )
					{
						alertWrap.remove();
					}
					else
					{
						alertWrap.hide();
					}

					if(typeof onClose == 'function')
					{ 
						onClose(alertInstance); 
					}
					else if(typeof alert.options.onClose == 'function')
					{ 
						alert.options.onClose(alertInstance); 
					}
					
					if( $('.jAlert').length > 0 )
					{
						$('.jAlert:last').centerAlert();
					}
					else
					{
						$('body').css('overflow', 'auto');
					}

				}, alert.options.animationTimeout);
			
			}

			return this;
		}

		/* Shows an alert that already exists */
		alert.showAlert = function(replaceOthers, removeOthers, onOpen, onClose){

			var alertInstance = $(this);
			
			if( replaceOthers != false )
			{ 
				replaceOthers = true; 
			}
			
			if( removeOthers !== false )
			{
				removeOthers = true;
			}
			
			if( replaceOthers )
			{
				$('.jAlert:visible').closeAlert(removeOthers);
			}
			
			/* Put this one above the last one by moving to end of dom */
			var wrap = alertInstance.parents('.ja_wrap');
			
			$('body').append(wrap);
			
			animateAlert('show', alertInstance);
			
			if( typeof onClose == 'function' )
			{
				alert.options.onClose = onClose;
			}

			window.setTimeout(function(){
				
				if(typeof onOpen == 'function')
				{ 
					onOpen(alertInstance); 
				}

			}, alert.options.animationTimeout);
			
		}

		/* Adds a new alert to the dom */
		var addAlert = function(content){

			var html = '';

			html += '<div class="ja_wrap '+backgroundClasses.join(' ')+'">'+
						'<div class="jAlert '+classes.join(' ')+ '" style="' +styles.join(' ')+ '" id="' +alert.options.id+ '">'+
							'<div>';

			if( alert.options.closeBtn )
			{
				html += 		"<div class='closejAlert ja_close";
				if( alert.options.closeBtnAlt )
				{
					html += ' ja_close_alt';
				}
				html += "'>X</div>"; //closejAlert has a close handler attached, ja_close is for styling
			}

			if( alert.options.title )
			{
				html += 		"<div class='ja_title'><div>"+alert.options.title+"</div></div>";
			}

			html += 			'<div class="ja_body">'+content;


	  		if( alert.options.btns )
	  		{
	  			html += 			'<div class="ja_btn_wrap ';

	  			if( alert.options.btnBackground )
	  			{
	  				html += 		'optBack';
	  			}

	  			html += 			'">';
	  		}

	  		if( typeof alert.options.btns[0] == 'object' )
	  		{
	  			$.each(alert.options.btns, function(index, btn){
	  				if( typeof btn == 'object' )
	  				{
	  					html += 		getBtnHTML(btn);
	  				}
	  			});
	  		}
	  		else if( typeof alert.options.btns == 'object' )
	  		{
	  			html += 				getBtnHTML(alert.options.btns);
	  		}
	  		else if( alert.options.btns )
	  		{
	  			console.log('jAlert Config Error: Incorrect value for btns (must be object or array of objects): '+alert.options.btns);
	  		}

	  		if( alert.options.btns )
	  		{
	  			html += 			'</div>';
	  		}

	  		html += 			'</div>'+
	  					'</div>'+
	  				'</div>'+
	  			'</div>';

	  		var alertHTML = $(html);

			if( alert.options.replaceOtherAlerts )
			{
				$('.jAlert:visible').closeAlert();
			}

			$('body').append(alertHTML);

			alert.instance = $('#'+alert.options.id);

			animateAlert('show', alert.instance);

			if( alert.options.closeBtn ){

			  	alert.instance.on('click', '.closejAlert', function(e){
			  		e.preventDefault();
					$(this).parents('.jAlert').closeAlert();
					return false;
				});

			}
			
			/* Bind mouseup handler to document if this alert has closeOnClick enabled */
			if( alert.options.closeOnClick ){
				
				/* Unbind any other mouseup */
				$(document).off('mouseup');
				
				/* Bind mouseup */
				$(document).on('mouseup', function(e){
				
					/* Find top visible jAlert and see if it has closeOnClick enabled */
					var lastVisibleAlert = $('.jAlert:visible:last');
					   
				    if( lastVisibleAlert.options.closeOnClick )
				    {
					   lastVisibleAlert.closeAlert();
				    }
				    
				}); 

			}

			/* Bind on keydown handler to document and if esc was pressed, find all visible jAlerts with that close option enabled and close them */
			if( alert.options.closeOnEsc ){
				
				$(document).off('keydown');

				$(document).on('keydown', function(e){

				    if(e.keyCode === 27){

					    /* Find top visible jAlert and see if it has closeOnClick enabled */
						var lastVisibleAlert = $('.jAlert:visible:last');
						   
					    if( lastVisibleAlert.options.closeOnEsc )
					    {
						   lastVisibleAlert.closeAlert();
					    }
					    
				    }

				});

			}

			/* If there are onOpen callbacks, run them. */
			if( alert.options.onOpen )
			{ 
				$.each(alert.options.onOpen, function(index, onOpen){
					onOpen(alert.instance); 
				});
			}

			/* If the alert has an element that should be focused by default */
			if( alert.options.autofocus )
			{
				alert.instance.find(alert.options.autofocus).focus();
			}

			alert.instance.bind("DOMSubtreeModified", function(){
				alert.instance.centerAlert();
			});

			return alert.instance;

		};

		/* Shows an alert based on content type */  
		alert.initialize = function(){

			if( !alert.options.content && !alert.options.image && !alert.options.video && !alert.options.iframe && !alert.options.ajax )
			{
				console.log('jAlert potential error: No content defined');
				return addAlert('');
			}
			else
			{
				if( !alert.options.content )
				{
					alert.options.content = '';
				}
				return addAlert(alert.options.content);
			}

		}

		alert.initialize();
		
		return alert;

	/* END OF PLUGIN */
	};

    /* Default alert.options */
	$.fn.jAlert.defaults = {
			'title': false, //title for the popup (false = don't show)
			'content': false, //html for the popup (replaced if you use image, ajax, or iframe)
			'image': false, //adds a centered img tag
			'imageWidth': 'auto', //defaults to max-width: 100%; width: auto;
			'video': false, //adds a responsive iframe video - value is the "src" of the iframe
			'ajax': false, //uses ajax call to get contents
			'onAjaxFail': function(alert, errorThrown){ //callback for when ajax fails
				alert.closeAlert();
				errorAlert(errorThrown);
			},
			'iframe': false, //uses iframe as content
			'iframeHeight': false, //string. height of the iframe within the popup (false = 90% of viewport height)
			'class': '', //adds a class to the jAlert (add as many as you want space delimited)
			'classes': '', //add classes to the jAlert (space delimited)
			'id': false, //adds an ID to the jAlert
			'showAnimation': 'bounceIn',
			'hideAnimation': 'bounceOut',
			'animationTimeout': 600, //approx duration of animation to wait until onClose
			'theme': 'default', // red, green, blue, black, default
			'backgroundColor': 'black', //white, black
			'size': false, //false = css default, xsm, sm, md, lg, xlg, full, { height: 200, width: 200 }
			'replaceOtherAlerts': false, //if there's already an open jAlert, remove it first
			'closeOnClick': false, //close the alert when you click anywhere
			'closeOnEsc': true, //close the alert when you click the escape key
			'closeBtn': true, //adds a button to the top right of the alert that allows you to close it
			'closeBtnAlt': false, //alternative close button
			'btns': false, //adds buttons to the popup at the bottom. Pass an object for a single button, or an object of objects for many
			/*
				Variety of buttons you could create (also, an example of how to pass the object
				
				'btns': [
							{'text':'Open in new window', 'closeAlert':false, 'href': 'http://google.com', 'target':'_new'},
							{'text':'Cool, close this alert', 'theme': 'blue', 'closeAlert':true},
							{'text':'Buy Now', 'closeAlert':true, 'theme': 'green', 'onClick': function(){ console.log('You bought it!'); } },
							{'text':'I do not want it', 'closeAlert': true, 'theme': 'red', 'onClick': function(){ console.log('Did not want it'); } },
							{'text':'DOA', 'closeAlert': true, 'theme': 'black', 'onClick': function(){ console.log('Dead on arrival'); } }
						]
			*/
			'btnBackground': true, //adds optional background to btns
			'autofocus': false, //pass a selector to autofocus on it

			'onOpen': function(alert){ //on open call back. Fires just after the alert has finished rendering
				return false;
			}, 
			'onClose': function(alert){ //fires when you close the alert
				return false;
			},

			'type': 'modal', //modal, confirm, tooltip

			/* The following only applies when type == 'confirm' */
			'confirmQuestion': 'Are you sure?',
			'confirmBtnText': 'Yes',
			'denyBtnText': 'No',
			'confirmAutofocus': '.confirmBtn', //confirmBtn or denyBtn
			'onConfirm': function(e, btn){
				e.preventDefault();
				console.log('confirmed');
				return false;
			},
			'onDeny': function(e, btn){
				e.preventDefault();
				//console.log('denied');
				return false;
			}
		}
	
	/* If you're not using the DOM (aka, you're not hiding or showing a specific alert, you can just use $.jAlert */
	$.jAlert = function(options){
		return $.fn.jAlert(options);
	}

	/* Alert on click function - attach to existing dom */
	$.fn.alertOnClick = function(options)
	{
		$(this).on('click', function(e){
			e.preventDefault();
			$.jAlert(options);
			return false;
		});
	}

	/* Alert on click function - global, works for changing dom */
	$.alertOnClick = function(selector, options)
	{
		$('body').on('click', selector, function(e){
			e.preventDefault();
			$.jAlert(options);
			return false;
		});
	}

	/* Slowed window resize function */
	var $jAlertResizeTimeout;
	$(window).resize(function () {
		window.clearTimeout($jAlertResizeTimeout);
        $jAlertResizeTimeout = window.setTimeout(function(){
       		$('.jAlert:visible').each(function(){
       			$(this).centerAlert();
       		});
       	}, 200);
    });
	
	/* Onload callback for iframe, img, etc */
	$.fn.jAlert.mediaLoaded = function(elem){
		var wrap = elem.parents('.ja_media_wrap'),
			vid_wrap = wrap.find('.ja_video');
			
		wrap.find('.ja_loader').remove();
		
		if( vid_wrap.length > 0 )
		{
			vid_wrap.fadeIn('fast');
		}
		else
		{
			elem.fadeIn('fast');
		}
		
		elem.parents('.jAlert').centerAlert();
		
	}

/* END OF ON JQUERY LOAD */
})(jQuery);