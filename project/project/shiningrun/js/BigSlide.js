//作者：jujenjie
//请尊重作者，可用于商业，请保留此段话

$(function(){
	var Big_Slide_boxWidth=$("#Big_Slide").width();//获取幻灯片外部div宽度
	var Big_Slide_boxHeight=$("#Big_Slide").height();//获取幻灯片外部div高度
	var Big_Slide_LiWidth=$("#Big_Slide").children("ul").children("li").eq(0).width();//获取幻灯片Li的宽度
	var Big_Slide_liNubr=$("#Big_Slide").find('li').length;//获取幻灯片Li的数量
	var Big_Slide_Speed=8000;//滚动速度
	var Big_Slide_Tab_Contne="";//初始化tab按钮
	var Big_Slide_Last_NextHeight=$("#Big_Slide_Last").height();//获取按钮高度
	//tab 条宽度
	var Big_Slide_Tab_AWidth=(1/Big_Slide_liNubr)*100;
	var Big_Slide_TabWidth=$("#Big_Slide_Tab").width();//tab的宽度
	var Big_SlideWidth=$("#Big_Slide").width();//Big_Slide的宽度
	$("#Big_Slide_Tab").css("left",(Big_SlideWidth-Big_Slide_TabWidth)*0.5);//Big_Slide_Tab定位
	$("#Big_Slide_Last").css("top",(Big_Slide_boxHeight-Big_Slide_Last_NextHeight)*0.5);
	$("#Big_Slide_Next").css("top",(Big_Slide_boxHeight-Big_Slide_Last_NextHeight)*0.5);
	$("#prevL").css("left",-Big_Slide_LiWidth);
	$("#prevR").css("right",-Big_Slide_LiWidth);
	
	for(var i=0;i<parseInt(Big_Slide_liNubr);i++){
		$("#Big_Slide").children("ul").children("li").eq(i).css("left",(i-1)*Big_Slide_LiWidth);//初始化Li位置
		
		if(i==1){
			Big_Slide_Tab_Contne=Big_Slide_Tab_Contne+"<a class='"+"TabOn' id='"+"TabOn"+i+"' style='width:"+Big_Slide_Tab_AWidth+"%'></a>";
			}else{
				Big_Slide_Tab_Contne=Big_Slide_Tab_Contne+"<a id='TabOn"+i+"' style='width:"+Big_Slide_Tab_AWidth+"%'></a>";//生成tab按钮
				}
		}
	$("#Big_Slide_Tab").html(Big_Slide_Tab_Contne);//写入tab按钮
	
	var Slide_Run = setInterval(Slide_Next,Big_Slide_Speed)//设置滚动器
	
	function Slide_Next(){
		for(var k=0;k<parseInt(Big_Slide_liNubr);k++){
			if(parseInt($("#Big_Slide").children("ul").children("li").eq(k).css("left"))==-Big_Slide_LiWidth)//判断LI是否有位移到0，防止同时多次点击出错
			{
				
				var Big_Slide_liSeat=0;//位置参数归零
				for(var j=0;j<parseInt(Big_Slide_liNubr);j++){
					if(parseInt($("#Big_Slide").children("ul").children("li").eq(j).css("left"))==-Big_Slide_LiWidth){//判断是否第一个
						
						$("#Big_Slide").children("ul").children("li").eq(j).css("left",Big_Slide_LiWidth*(Big_Slide_liNubr-2));//第一个回到最后一个

						}else{
							
						Big_Slide_liSeat=parseInt($("#Big_Slide").children("ul").children("li").eq(j).css("left"))-Big_Slide_LiWidth;//获取位移位置
						$("#Big_Slide").children("ul").children("li").eq(j).animate({left:Big_Slide_liSeat},"slow");//进行位移动画

						}
					}
					
				}
			}
	}
	
	function Slide_Last(){
		for(var k=0;k<parseInt(Big_Slide_liNubr);k++){
			if(parseInt($("#Big_Slide").children("ul").children("li").eq(k).css("left"))==0)//判断LI是否有位移到0，防止同时多次点击出错
			{
				
				var Big_Slide_liSeat=0;//位置参数归零
				for(var j=0;j<parseInt(Big_Slide_liNubr);j++){
					if(parseInt($("#Big_Slide").children("ul").children("li").eq(j).css("left"))==Big_Slide_LiWidth*(Big_Slide_liNubr-2)){//判断是否第一个
						
						$("#Big_Slide").children("ul").children("li").eq(j).css("left",-Big_Slide_LiWidth);//第一个回到最后一个
						
						}else{
							
						Big_Slide_liSeat=parseInt($("#Big_Slide").children("ul").children("li").eq(j).css("left"))+Big_Slide_LiWidth;//获取位移位置
						$("#Big_Slide").children("ul").children("li").eq(j).animate({left:Big_Slide_liSeat},"slow");//进行位移动画
						
						}
					}
					
				}
			}
	}
	
	setInterval(function(){
		for(var n=0;n<parseInt(Big_Slide_liNubr);n++){
			if(parseInt($("#Big_Slide").children("ul").children("li").eq(n).css("left"))==0){
				if((n-1)<0){
					$("#TabOn"+(Big_Slide_liNubr-1)).removeClass("TabOn");
					$("#TabOn"+(n+1)).removeClass("TabOn");
					$("#TabOn"+n).addClass("TabOn");
					}else {
						$("#TabOn0").removeClass("TabOn");
						$("#TabOn"+(n-1)).removeClass("TabOn");
						$("#TabOn"+(n+1)).removeClass("TabOn");
						$("#TabOn"+n).addClass("TabOn");
							}
				}
			}
		},1)
	
	$("#Big_Slide_Next").click(Slide_Next);//下一张按钮
	$("#Big_Slide_Last").click(Slide_Last);//上一张按钮
	$("#Big_Slide_box").mouseenter(function(){clearInterval(Slide_Run)});//鼠标在幻灯片上，停止滚动
	$("#Big_Slide_box").mouseleave(function(){Slide_Run = setInterval(Slide_Next,Big_Slide_Speed)})//鼠标不在幻灯哦上，开始滚动
	
})		