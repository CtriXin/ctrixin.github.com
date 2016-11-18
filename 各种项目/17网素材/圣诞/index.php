<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>html5圣诞节</title>
<meta id="viewport" name="viewport" content="width=640, initial-scale=0.5, maximum-scale=2.0, minimum-scale=0.5, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-touch-fullscreen" content="yes">
<meta http-equiv="Access-Control-Allow-Origin" content="*">
<meta name="MobileOptimized" content="640">
<meta name="format-detection" content="telephone=no">
<link rel="stylesheet" href="images/main.css" type="text/css">

<script type="text/javascript" src="images/viewport.js"></script>
<script type="text/javascript" src="images/jquery-1.9.1-min.js"></script>
<script src="images/jquery.min.js"></script>
<script src="images/warterfall.js"></script>
<script>var gSound = 'images/christmas.mp3';</script>

<script>
		 
		var deerSprite;
		var newyearCar1Sprite;
		var newyearCar2Sprite;
		var newyearCar3Sprite;
		var title1Sprite;
		var title2Sprite;
		var title3Sprite;
		var openGiftSprite;
		var flowerSprite;
		function animation1()
		{
			$('.pop1').fadeIn(1000);
			setTimeout(function(){$('.pop1').fadeOut(1000);$('.pop2').fadeIn(1000);},3000);
			var duration1 = 15000;
			var duration2 = 15000;
			deerSprite = new createDeerSprite();
			newyearCar1Sprite = new createCarSprite(1,{isVibrate:true});
			$('.bg').animate({'left':'0px'},duration1,function(){});
			$('.deer_group').animate({'left':'-640px'},duration2,function(){clearInterval(newyearCar1Sprite.timeID1);clearInterval(deerSprite.timeID1);newyearCar1Sprite.carRotate=0;newyearCar1Sprite.el.css('-webkit-transform','rotate('+newyearCar1Sprite.carRotate+'deg)');openGiftSprite = new createOpenGiftSprite();});
			title1Sprite = new createTitleSprite(1,{isVibrate:true});
			new createStarSprite(1,{'top':'10px','left':'0px','scale':0.2,'rotate':'0deg'});
			new createStarSprite(2,{'top':'20px','left':'60px','scale':0.25,'rotate':'10deg'});
			new createStarSprite(3,{'top':'320px','left':'120px','scale':0.2,'rotate':'20deg'});
			new createStarSprite(4,{'top':'250px','left':'260px','scale':0.25,'rotate':'30deg'});
			new createStarSprite(5,{'top':'20px','left':'480px','scale':0.3,'rotate':'40deg'});
			new createStarSprite(6,{'top':'320px','left':'410px','scale':0.25,'rotate':'50deg'});
			new createStarSprite(7,{'top':'390px','left':'500px','scale':0.4,'rotate':'60deg'});
			new createStarSprite(8,{'top':'80px','left':'520px','scale':0.35,'rotate':'70deg'});
			new createStarSprite(9,{'top':'420px','left':'30px','scale':0.4,'rotate':'80deg'});
		}
		
		function animation2()
		{
			flowerSprite = new createFlowersSprite(10);
			title2Sprite = new createTitleSprite(2,{isVibrate:false});
			var titleStep = 0;
			$('#title2').animate({'opacity':1,'top':'30px'},{'step':function(now,fx){if(fx.prop=='opacity'){titleStep++;}if(titleStep%2==0 && fx.prop=='opacity'){$(this).css('-webkit-transform','scale('+now+')');}},'duration':3000});
			setTimeout(function(){animation3();},3000);
		}
		
		function animation3()
		{
			clearInterval(flowerSprite.timeID1);
			clearInterval(title2Sprite.timeID1);
			setTimeout(function(){$('.animation2').fadeOut();$('.animation3').fadeIn();},1500);
			title3Sprite = new createTitleSprite(3,{isVibrate:true});
			$('.goto_flower').click(function(){
				//location.href='http://sun-air.net/wechat/event_20131230_2.html';
			});
			$('.share_help_entry').click(function(){
				$('.card_help').fadeIn(500);
			});
			$('.card_help').click(function(){
				$('.card_help').fadeOut(500);
			});
		}
		
		function createDeerSprite()
		{
			this.duration1 = 100;
			this.el = $('.deer');
			this.timeID1 = setInterval(function(){deerSprite.el.toggleClass('deer_frame2');},this.duration1);
		}
		
		function createCarSprite(id,option)
		{
			this.duration1 = 100;
			this.el = $('#newyearcar'+id);
			if(option.isVibrate)
			{
				this.carRotate = 0;
				this.perCarRotate = 0.1;
				this.carMinRotate = -1;
				this.carMaxRotate = 1;
				var carSprite = this;
				this.timeID1 = setInterval(function()
				{
					if(carSprite.carMinRotate<carSprite.carRotate && carSprite.carRotate<carSprite.carMaxRotate)
					{
						carSprite.carRotate = carSprite.carRotate+carSprite.perCarRotate;
					}else if(carSprite.carRotate>=carSprite.carMaxRotate)
					{
						carSprite.perCarRotate = -0.1;
						carSprite.carRotate = carSprite.carRotate+carSprite.perCarRotate;
					}else if(carSprite.carRotate<=carSprite.carMinRotate)
					{
						carSprite.perCarRotate = 0.1;
						carSprite.carRotate = carSprite.carRotate+carSprite.perCarRotate;
					}
					carSprite.el.css('-webkit-transform','rotate('+carSprite.carRotate+'deg)');
				},this.duration1);
			}
		}
		
		function createTitleSprite(id,option)
		{
			this.duration1 = 100;
			this.el = $('#title'+id);
			this.rotate = 0;
			this.perRotate = 0.1;
			this.minRotate = -1;
			this.maxRotate = 1;
			titleSprite = this;
			if(option.isVibrate)
			{
				this.timeID1 = setInterval(function()
				{
					if(titleSprite.minRotate<titleSprite.rotate && titleSprite.rotate<titleSprite.maxRotate)
					{
						titleSprite.rotate = titleSprite.rotate+titleSprite.perRotate;
					}else if(titleSprite.rotate>=titleSprite.maxRotate)
					{
						titleSprite.perRotate = -0.1;
						titleSprite.rotate = titleSprite.rotate+titleSprite.perRotate;
					}else if(titleSprite.rotate<=titleSprite.minRotate)
					{
						titleSprite.perRotate = 0.1;
						titleSprite.rotate = titleSprite.rotate+titleSprite.perRotate;
					}
					titleSprite.el.css('-webkit-transform','rotate('+titleSprite.rotate+'deg)');
				},this.duration1);
			}
		}
		
		function createOpenGiftSprite()
		{
			this.el = $('.opengift');
			this.el.show();
			this.minWidth = 134;
			this.maxWidth = 168;
			this.currentWidth = this.minWidth;
			this.changePosition = 0;
			this.perChangePosition = 2;
			var openGiftSprite = this;
			this.timeID1 = setInterval(function()
			{
				if(openGiftSprite.currentWidth>openGiftSprite.maxWidth || openGiftSprite.currentWidth<openGiftSprite.minWidth)
				{
					openGiftSprite.perChangePosition = -openGiftSprite.perChangePosition;
				}
				openGiftSprite.currentWidth = openGiftSprite.currentWidth+openGiftSprite.perChangePosition;
				openGiftSprite.changePosition = openGiftSprite.changePosition+openGiftSprite.perChangePosition;
				openGiftSprite.el.css('top',parseInt(openGiftSprite.el.css('top'),10)-openGiftSprite.perChangePosition/2+'px');
				openGiftSprite.el.css('left',parseInt(openGiftSprite.el.css('left'),10)-openGiftSprite.perChangePosition/2+'px');
				openGiftSprite.el.css('width',openGiftSprite.currentWidth+'px');
				openGiftSprite.el.css('height',openGiftSprite.currentWidth+'px');
			},100);	
		}
		
		function createStarSprite(id,option)
		{
			this.el = $('#star'+id);
			this.minWidth = 115;
			this.maxWidth = 115;
			this.initScale = option.scale ? option.scale : 1;
			this.minScale = option.minScale ? option.minScale : option.scale/1.2;
			this.maxScale = option.maxScale ? option.maxScale : option.scale*1.2;
			this.initRotate = option.rotate ? option.rotate : '0deg';
			this.perChangeScale = (this.initScale-this.minScale)/5;
			this.el.css('-webkit-transform','scale('+this.initScale+') rotate('+this.initRotate+')');
			this.currentScale = this.initScale;
			this.el.css('top',option.top);
			this.el.css('left',option.left);
			var starSprite = this;
			this.timeID1 = setInterval(function(){
				if(starSprite.currentScale>starSprite.maxScale || starSprite.currentScale<starSprite.minScale)
				{
					starSprite.perChangeScale = -starSprite.perChangeScale;
				}
				starSprite.currentScale = starSprite.currentScale+starSprite.perChangeScale;
				starSprite.el.css('-webkit-transform','scale('+starSprite.currentScale+') rotate('+starSprite.initRotate+')');
				starSprite.el.css('transform','scale('+starSprite.currentScale+') rotate('+starSprite.initRotate+')');
			},100);
		}
		
		function createFlowersSprite(number)
		{
			this.flowerResArr = new Array();
			this.flowerResArr[0] = ['flower_1.png','flower_4.png','flower_6.png','flower_7.png','flower_8.png','flower_10.png','flower_11.png','flower_12.png','flower_14.png'];
			this.flowerResArr[1] = ['flower_2.png','flower_3.png','flower_4.png','flower_5.png','flower_7.png','flower_8.png','flower_9.png','flower_10.png','flower_12.png','flower_13.png'];
			this.flowerCountsPerTime = number;
			this.flowerArr = new Array();
			this.middlePosition = 220;
			this.topWidth = 350;
			this.leftWidth = this.middlePosition;
			this.createFlowerAnimation = function(){
				for(i=0;i<this.flowerCountsPerTime;i++)
				{
					this.flowerArr[i]= document.createElement('img');
					this.flowerArr[i].style.position = 'absolute';
					
					//alert(i%2);
					if(i%2==0)
					{
						this.leftWidth = this.middlePosition-i*6;
					}else{
						this.leftWidth = this.middlePosition+i*6;
					}
					if(this.leftWidth<=this.middlePosition)
					{
						this.flowerArr[i].src = 'images/'+this.flowerResArr[0][(parseInt(Math.random()*9)%9)];
					}else{
						this.flowerArr[i].src = 'images/'+this.flowerResArr[1][(parseInt(Math.random()*10)%10)];
					}
					this.flowerArr[i].style.top = this.topWidth+'px';
					this.flowerArr[i].style.left = this.leftWidth+'px';
					$('.animation2 .flower').append(this.flowerArr[i]);
					$(this.flowerArr[i]).animate({'top':'-300px','left':this.leftWidth<=this.middlePosition ? this.leftWidth-80-(i*65)+'px' : this.leftWidth+80+(i*65)+'px'},2000,'swing',function(){$(this).remove();});
				}
			};
			flowerSprite = this;
			this.timeID1 = setInterval(function(){flowerSprite.createFlowerAnimation(number);},200);
		}
		
		$(document).ready(function(){
			$('.start').click(function(){
				animation1();
				$(this).hide();
				//$('#audio1')[0].play();
			});
			$('.opengift').click(function(){
				clearInterval(title1Sprite.timeID1);
				clearInterval(openGiftSprite.timeID1);
				$('.animation1').hide();
				$('.animation2').show();
				animation2();
			});
		});
		
		
</script>
<script>
var pop_up_note_mode = true;
var note_id = 1;

function id(name)
{
	return document.getElementById(name);
}


function switchsound()
{
	au = id('bgsound');
	ai = id('sound_image');
	if(au.paused)
	{
		au.play();
		ai.src = "http://zt.house365.com/project/wh/weixin/web/20141212_weixiu/images/music_note_big.png";
		pop_up_note_mode = true;
		popup_note();
		id("music_txt").innerHTML = "打开";
		id("music_txt").style.visibility = "visible";
		setTimeout(function(){id("music_txt").style.visibility="hidden"}, 2500);
	}
	else
	{
		pop_up_note_mode = false;
		au.pause();
		ai.src = "http://zt.house365.com/project/wh/weixin/web/20141212_weixiu/images/music_note_big.png";
		id("music_txt").innerHTML = "关闭";
		id("music_txt").style.visibility = "visible";
		setTimeout(function(){id("music_txt").style.visibility="hidden"}, 2500);
	}
}

function on_pop_note_end(event)
{
	note = event.target;
	
	if(note.parentNode == id("note_box"))
	{
		id("note_box").removeChild(note);
		console.log("remove note id " + note.getAttribute("id"));
	}
}

function popup_note()
{
	box = id("note_box");
	
	note = document.createElement("span");
	note.style.cssText = "visibility:visible;position:absolute;background-image:url('http://zt.house365.com/project/wh/weixin/web/20141212_weixiu//music_note_small.png');width:15px;height:25px";
	note.style.left = Math.random() * 20 + 20;
	note.style.top = "75px";
	this_node = "music_note_" + note_id;
	note.setAttribute("ID", this_node);
	note_id += 1;
	scale = Math.random() * 0.4 + 0.4;
	note.style.webkitTransform = "rotate(" + Math.floor(360 * Math.random()) + "deg) scale(" + scale + "," + scale + ")";
	note.style.webkitTransition = "top 2s ease-in, opacity 2s ease-in, left 2s ease-in";
	note.addEventListener("webkitTransitionEnd", on_pop_note_end);
	box.appendChild(note);

	setTimeout("document.getElementById('" + this_node + "').style.left = '0px';", 100);
	setTimeout("document.getElementById('" + this_node + "').style.top = '0px';", 100);
	setTimeout("document.getElementById('" + this_node + "').style.opacity = '0';", 100);
	
	if(pop_up_note_mode)
	{
		setTimeout("popup_note()", 600);
	}	
}

function playbksound()
{
	var audiocontainer = id('audiocontainer');
	if(audiocontainer != undefined)
	{
		audiocontainer.innerHTML = '<audio id="bgsound" loop="loop" autoplay="autoplay"> <source src="' + gSound + '" /> </audio>';
	}
			
	var audio = id('bgsound');
	audio.play();
	
	sound_div = document.createElement("div");
	sound_div.setAttribute("ID", "cardsound");
	sound_div.style.cssText = "position:fixed;right:40px;top:40px;z-index:5000;visibility:visible;";
	box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-20px;top:-80px'></div>";
	bg_htm = "<img id='sound_image' onclick='switchsound()' src='images/music_note_big.png'>";
	txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-40px;top:30px;width:60px'></div>"
	sound_div.innerHTML = bg_htm + box_htm + txt_htm;
	document.body.appendChild(sound_div);
	setTimeout("popup_note()", 100);
}	

function in_weixin()
{
	var ua = navigator.userAgent.toLowerCase();

	if(ua.match(/MicroMessenger/i) == "micromessenger") {return true;}
	
	return false;
}
(function(){
				var onBridgeReady = function () {	
					
					playbksound();			
					
					// 发送给好友;
					WeixinJSBridge.on('menu:share:appmessage', function(argv){						WeixinJSBridge.invoke('sendAppMessage',{
							'img_url' : imgUrl,
							'img_width' : '640',
							'img_height' : '640',
							'link' : link,
							'desc' : desc,
							'title' : title
							}, function(res) {});
					});
					// 分享到朋友圈;
					WeixinJSBridge.on('menu:share:timeline', function(argv){						WeixinJSBridge.invoke('shareTimeline',{
						'img_url' : imgUrl,
						'img_width' : '640',
						'img_height' : '640',
						'link' : link,
						'desc' : desc,
						'title' : desc
						}, function(res) {
						});
					});
				};
				
				if(document.addEventListener){
					document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				} else if(document.attachEvent){
					document.attachEvent('WeixinJSBridgeReady' , onBridgeReady);
					document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
				}
			if(!in_weixin())
	{
		setTimeout("playbksound()", 500);
		//setTimeout("translateUrl(link)", 1000);
	}
			})();

	</script>
<div id="audiocontainer"></div>
<div id="cardsound" style="position: fixed; right:40px; top: 40px; z-index: 5000; visibility: visible;"></div>
</head>
<body>
	<div class="wrapper">
		<div class="bg"></div>
		<div class="animation1">
			<div class="start"></div>
			<div id="star1" class="star"></div>
			<div id="star2" class="star"></div>
			<div id="star3" class="star"></div>
			<div id="star4" class="star"></div>
			<div id="star5" class="star"></div>
			<div id="star6" class="star"></div>
			<div id="star7" class="star"></div>
			<div id="star8" class="star"></div>
			<div id="star9" class="star"></div>
			<h3 id="title1" class="title"></h3>
			<div class="deer_group">
				<div class="pop1"></div>
				<div class="pop2"><div class="content_border"><img src="images/desc_1.png" class="content_1"><?=$name?></div><img src="images/desc_2.png" class="content_3"></div>
				<div class="deer"></div>
				<div id="newyearcar1" class="newyearcar"></div>
				<div class="opengift"></div>
			</div>
		</div>
		<div class="animation2">
			<h3 id="title2" class="title"></h3>
			<div class="flower"></div>
			<div id="newyearcar2" class="newyearcar"></div>
		</div>
		<div class="animation3">
			<h3 id="title3" class="title"></h3>
			 			<div class="share_help_entry"></div>
		 
           

 <div id="sharemcover" onClick="document.getElementById('sharemcover').style.display='';" style=" display:none"><img src="http://img.ishangtong.com/baeimages/MgnnofmleM.png"></div>
 <div class="cardWrap">
    
<style>
.btn_music {
display: inline-block;
width: 35px;
height: 35px;
background: url('http://apisimsim.duapp.com/index/images/play.png') no-repeat center center;
background-size: 100% auto;
position: absolute;
z-index: 100;
left: 15px;
top: 30px;
}
.btn_music.on {
    background-image: url("http://apisimsim.duapp.com/index/images/stop.png");
}

.copyright {
padding: 8px 0 8px 0;
position: fixed;
z-index: 9999;
font-size: 18px;
bottom: 0;
width: 100%;
color: #477585;
text-align: center;
display: block;
}
 
 </style>

<div class="messageBox">
            <div class="user">
                       <div class="message">圣诞节快乐</div>
                 
                <div class="name">小猪猪</div>
                <div class="time">2014-12-25</div>
            </div>
            
               <div  class="dh" id="dh" style="display:none">
            <select class="selectstyle fl"
  id="bjdh" onChange="doit()" name="bjdh"   > 
                    <option    value="0">请选择动画</option>
                     <option    value="1">下落的枫叶</option>
                     <option    value="2">飘雪</option>
                     <option    value="4">飘玫瑰</option>
                      <option   selected   value="5">驯鹿</option>
 						 <option    value="7">金元宝</option>
                    </select>
                     <select class="selectstyle fr"
  id="bjid" onChange="doit()" name="bjid"   > 
                    
                   <option     selected   value="2433"></option> 
                    </select>
                    </div>
    </div>
    
</div>
            
            <div class="share_help_entry"></div>
			<div class="card_help"></div>
			<div id="newyearcar3" class="newyearcar"></div>
		</div>
	</div>
		
	<div id="preload" style="display:none" >
		<img src="images/reindeer_2.png">
		<img src="images/flower_1.png">
		<img src="images/flower_2.png">
		<img src="images/flower_3.png">
		<img src="images/flower_4.png">
		<img src="images/flower_5.png">
		<img src="images/flower_6.png">
		<img src="images/flower_7.png">
		<img src="images/flower_8.png">
		<img src="images/flower_9.png">
		<img src="images/flower_10.png">
		<img src="images/flower_11.png">
		<img src="images/flower_12.png">
		<img src="images/flower_13.png">
		<img src="images/flower_14.png">
	</div>
 



<script type="text/javascript">

function doit(){
	 window.location = "?hkid="+$("#bjid").val()+"&name="+encodeURIComponent($.trim($(".name").html()))+"&dh="+$("#bjdh").val()+"&info="+encodeURIComponent($.trim($(".message").html()));
}
function changeText(cont1,cont2,speed){
	var Otext=cont1.text();
	var Ocontent=Otext.split("");
	var i=0;
	function show(){
		if(i<Ocontent.length)
		{		
			cont2.append(Ocontent[i]);
			i=i+1;
		} 
		 
	};
		var Otimer=setInterval(show,speed);	
};
 	

$(document).ready(function(){

	$(".name").click(function(){
		
	 
		
		$(".dh").show();
			if($(this).find(".sort_input").attr("type") == "text"){return false;}
			var name = $.trim($(this).html());
			var m = $.trim($(this).text());
			$(this).html("<input type=text value=\""+name+"\" class=\"sort_input\">");
			$(this).find(".sort_input").focus();
			$(this).find(".sort_input").bind("blur", function(){
				var n = $.trim($(this).val());
				if(n != m && n != ""){
					//window.location = "sort.php?val="+encodeURIComponent(n);
					//发送信息
					$(this).parent().html(n);
				}else{
					$(this).parent().html(name);
				}
			});
	});
	$(".message").click(function(){
		 
		$(".dh").show();
			if($(this).find(".sort_textarea").attr("name") == "textarea"){return false;}
			var message = $.trim($(this).html());
			var mm = $.trim($(this).text());
			$(this).html("<textarea name=\"textarea\" class=\"sort_textarea\">"+message+"</textarea>");
			$(this).find(".sort_textarea").focus();
			//$(this).find(".sort_textarea").select() ;
			$(this).find(".sort_textarea").bind("blur", function(){
				 
				var nn = $.trim($(this).val());
				if(nn != mm && nn != ""){
					//window.location = "sort.php?val="+encodeURIComponent(n);
					//发送信息
					$(this).parent().html(nn);
				}else{
					$(this).parent().html(message);
				}
			});
	});
	
	/*changeText($(".message"),$(".message2"),150);
	clearInterval(Otimer);*/
});

 
   document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage', { 
                "img_url": "images/reindeer_2.png",
                "img_width": "640",
                "img_height": "640",
                "link": "index.php?hkid=2433&name="+encodeURIComponent($.trim($(".name").html()))+"&dh="+$("#bjdh").val()+"&info="+encodeURIComponent($.trim($(".message").html()))+"&from=app",
                "desc":  $(".message").html(),
                "title": $(".message").html()
            }, function (res) {
                //_report('send_msg', res.err_msg);
				<?=$contont_weixin?>
            })
        });

        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": "images/reindeer_2.png",
                "img_width": "640",
                "img_height": "640",
                 "link": "index.php?hkid=2433&name="+encodeURIComponent($.trim($(".name").html()))+"&dh="+$("#bjdh").val()+"&info="+encodeURIComponent($.trim($(".message").html()))+"&from=app",
                "desc":  $(".message").html(),
                "title": $(".message").html()
            }, function (res) {
                //_report('timeline', res.err_msg);
				<?=$contont_weixin?>
            });
        });

        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            WeixinJSBridge.invoke('shareWeibo', {
                "content": $(".message").html(),
                "url": "index.php?hkid=2433&name="+encodeURIComponent($.trim($(".name").html()))+"&dh="+$("#bjdh").val()+"&info="+encodeURIComponent($.trim($(".message").html()))+"&from=app"
            }, function (res) {
                //_report('weibo', res.err_msg);
				<?=$contont_weixin?>
            });
        });
        }, false)
</script>
 

 
<script type="text/javascript">
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
WeixinJSBridge.call('hideToolbar');
});
</script>

 <div class="copyright">  </div>


</body>
</html>