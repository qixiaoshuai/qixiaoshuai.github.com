$(function(){
	//头部部分：
	top();
	//导航部分：
	bann();
	//游戏下载部分：
	dtltop();
	//图：
	dtldown();
	//新闻:
	news();
	//新服：
	serzone();
	//人物：
	person();
	//玩家交流：
	playtalk();
	//合作
	hezuo();
	//活动中心：
	active();
});

//头部部分：
function top(){
	//哈哈哈哈
	$('.youin').bind('mouseover',function(event){
		$('.tr2-2').css({zIndex:'10',backgroundColor:'#f2f2f2',color:'#681683'});
		$('.you').css({zIndex:'9'}).show();

	});
	$('.youin').bind('mouseout',function(event) {
		$('.tr2-2').css({zIndex:'1',backgroundColor:'transparent',color:'#4a4a4a'});
		$('.you').hide();
	});
}
//导航部分：
function bann(){
	$('.banner-in li').hover(function(){
		$(this).css({height:'71px',borderBottom:'5px solid #fef89d'});
	}, function() {
		$(this).css({height:'76px',borderBottom:'none'});
	});

	$('.bt1').hover(function() {
		$('.bt-1').show();
		$(this).css({height:'76px',borderBottom:'none'});
	}, function(){
		$('.bt-1').hide();
	});

	$('.bt-1 a').hover(function() {
		$(this).css({color:'#f3ca90',textDecoration:'underline'});
	}, function() {
		$(this).css({color:'#fff',textDecoration:'none'});
	});
}
//游戏下载：
function dtltop(){

	for(var i=2;i<6;i++){
		(function(i){
			$('.dtl-top'+i).hover(function(event){
				//alert(i);
				// alert($(this).css(backgroundPosition));
				$(this).css({backgroundPosition:-100*(i-2)-217+'px -110px'});
			},function(){
				$(this).css({backgroundPosition:-100*(i-2)-217+'px 0px'});
			});
		})(i);
		
	}

	$('.dtl-top1').hover(function(event){
		$(this).css({backgroundPosition:'0px -110px'});
	},function(){
		$(this).css({backgroundPosition:'0px 0px'});
	});
}
//图：
function dtldown(){
	var iNow=0;
	var timer=null;

	dtlgo();
	function dtlgo(){
		timer=setInterval(function(){
			$('.dtl-down-sel li').removeClass('on').eq(iNow%5).addClass('on');
			$('.dtl-down-con a').stop().animate({
				'opacity':0
			},300).eq(iNow%5).stop().animate({
				'opacity':1
			},300);
			iNow++;
		},1500);
	}
	
	$('.dtl-down-sel li').mouseover(function(event) {
		clearInterval(timer);
		$('.dtl-down-sel li').removeClass('on').eq($(this).index()).addClass('on');
		$('.dtl-down-con a').stop().animate({
			'opacity':0
		},300).eq($(this).index()).stop().animate({
			'opacity':1
		},300);
		iNow=$(this).index();
	});
	$('.dtl-down-con a').hover(function() {
		clearInterval(timer);
	}, function() {
		dtlgo();
	});;
	$('.dtl-down-sel li').mouseout(function(event) {
		dtlgo();
	});
}

//新闻：
function news(){
	$('.din').mouseover(function(event) {
		$('.din').removeClass('active').eq($(this).index()).addClass('active');
		$('.din').children('.dtr3-2').hide().eq($(this).index()).show();
	});
}

//新服：
function serzone(){
	var speed=0;
	var iNow=1;
	var old=0;
	var timer=null;
	var timer2=0;
	//每一小节走到头了

	$('.dtrul').hover(function() {
		clearInterval(timer2);
	}, function() {
		run();
	});

	run();
	function run(){
		clearInterval(timer2);
		timer2=setInterval(function(){
			if(old<-72){
				old=0;
			}
			clearInterval(timer);
			timer=setInterval(function(){
				if(speed<-23){
					old+=speed;
					speed=0;
					iNow++;//表示走完了一小节
					clearInterval(timer);//停止这一小节；
				}
				//每一小节的：
				speed--;
				$('.dtrul').css({'top':old+speed+'px'});
			},30);
		},1500);
	}
}


//人物：
function person(){
	$('.altop li').mouseover(function(event) {
		$('.altop li').removeAttr('class').eq($(this).index()).addClass('altop-'+$(this).index());
		$('.altop li').children('img').hide().eq($(this).index()).show();
	});
}

//玩家交流：
function playtalk(){
	$('.box2-1 .play').mouseover(function(event) {
		$('.box2-1 .play').removeClass('active').eq($(this).index()).addClass('active');
		$('.box2-1 .play').children('.playing').hide().eq($(this).index()).show();
	});

	$('.box2-2 .play').mouseover(function(event) {
		$('.box2-2 .play').removeClass('active').eq($(this).index()).addClass('active');
		$('.box2-2 .play').children('.playing').hide().eq($(this).index()).show();
	});

	$('.box3-2 .play').mouseover(function(event) {
		$('.box3-2 .play').removeClass('active').eq($(this).index()).addClass('active');
		$('.box3-2 .play').children('.playing').hide().eq($(this).index()).show();
	});
}
//合作
function hezuo(){
	$('.box1-3').hover(function() {
		$('.hezuo').show();
		$(this).css('backgroundPosition','-451px -311px');
	}, function() {
		$('.hezuo').hide();
		$(this).css('backgroundPosition','-451px -273px');
	});

	$('.box1-4').hover(function() {
		$('.box1-4 img').addClass('on');
	}, function() {
		$('.box1-4 img').removeClass('on');
	});
}

//活动中心：
function active(){
	$('.act li').mouseover(function(event) {
		$('.act li').removeClass('active').eq($(this).index()).addClass('active'); 
	});
}










