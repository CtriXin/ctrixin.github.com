var playbox = {//领取积分
	play: function(){
		var src = $("#audio").attr("src");
		var cls = $("#playbox").attr("class");
		if(src!=""){
			var audio = document.getElementById("audio"); 
			if(cls=="btn_music"){
				audio.play();
				$("#playbox").removeAttr("class");
				$("#playbox").attr("class", "btn_music on");
			}else{
				audio.pause();
				$("#playbox").removeAttr("class");
				$("#playbox").attr("class", "btn_music");
			}
			
		}
	}
};
