$(function(){
	//banner:
	bannerRun();
	//吸顶条
	ScroTop();
	//回到顶部:
	goTop();
	//左边栏：
	boxblock();
	//搜索框：
	sel();
	//导航：
	hovers();
})

function hovers(){
	$('.banner_top ul').children().hover(function() {
		$(this).css({backgroundColor:'#ed3577'});
	}, function() {
		$(this).css({backgroundColor:'#ff6599'});
	});
}

//搜索框：
function sel(){
	$('.sel').mouseover(function(event) {
		$('.sel-in').css({display:'block'});
	});
	$('.sel').mouseout(function(event){
		$('.sel-in').css({display:'none'});
	});
	$('.sel-in li').mouseover(function(event){
		$(this).css({background:'#f5f5f5'});
	});
	$('.sel-in li').mouseout(function(event){
		$(this).css({background:'#fff'});
	});
	$('.sel-in li').click(function(event) {
		$('.sel-top').html($(this).html());
		$('.sel-in').css({display:'none'});
	});
}

	

//左边栏：
function boxblock(){
	var oBanLeftUl=$('.banner_foot_ul');
	var aBanLeftLi=$('.lefta');
	aBanLeftLi.mousemove(function(event) {
		if($(this).index()==0){
			$(this).css({borderBottom:'1px solid #e6e6e6',borderRight:'1px solid #fff'});
		}else{
			$(this).css({borderBottom:'1px solid #e6e6e6',borderTop:'1px solid #e6e6e6',borderRight:'1px solid #fff'});
		}
		$(this).children().eq(1).css({display:'block'});
		$(this).children().eq(0).css({borderBottom:'none'});

		aBanLeftLi.eq($(this).index()-1).children().eq(0).css({borderBottom:'none'});

	});
	aBanLeftLi.mouseout(function(event) {
		if($(this).index()==4){
			$(this).css({borderBottom:'1px solid #e6e6e6',borderTop:'none',borderRight:'1px solid #e6e6e6'});
			$(this).children().eq(0).css({borderBottom:'none'});
		}else{
			$(this).children().eq(0).css({borderBottom:'1px dotted #e6e6e6'});
			$(this).css({borderBottom:'none',borderTop:'none',borderRight:'1px solid #e6e6e6'});
		}
		$(this).children().eq(1).css({display:'none'});
		
		aBanLeftLi.eq($(this).index()-1).children().eq(0).css({borderBottom:'1px dotted #e6e6e6'});
	});
}


//回到顶部
function goTop(){
	var oBack=$('.back');
	$(window).scroll(function(){
		var scrolltop=$(document).scrollTop();
		if(scrolltop>=1000){
			oBack.css({display:'block'});
		}else{
			oBack.css({display:'none'});
		}
	});
	oBack.click(function(){
        var speed=800;//滑动的速度
        $('body,html').animate({scrollTop:0},speed);
        return false;
	});
}

//吸顶条scrolltop
function ScroTop(){
	var oTop1=$('#banner_top');
	var oTop2=$('#banner_top2');
	var iTop=oTop1.offset().top;
	$(window).scroll(function(){
		var scrolltop=$(document).scrollTop();
		if(scrolltop>=iTop){
			oTop1.css({
				'position':'fixed',
				'top':0,
				'left':0,
				'zIndex':1000
			});
			oTop2.css('display','block');
		}else{
			oTop1.css('position','static');
			oTop2.css('display','none');
		}
	});

}

//banner图:
function bannerRun(){
	var oBanner=$('#banner_ul');
	var aBanner=oBanner.children();
	var aBind=$('#bind li');
	var iNow=0;
	var timer=null;

	function go(){
		aBind.attr('class','');
		aBind.eq(iNow%5).attr('class','current');
		aBanner.stop().fadeTo(500,0);
		aBanner.eq(iNow%5).stop().fadeTo(500,1);
	}
	go();
	aBind.click(function(){
		aBind.attr('class','');
		$(this).attr('class','current');
		aBanner.stop().fadeTo(500,0);
		aBanner.eq($(this).index()).stop().fadeTo(500,1);
		iNow=$(this).index();
	});
	$('#ban_btn_next').click(function(){
		iNow++;
		go();
		clearInterval(timer);
	});
	$('#ban_btn_prev').click(function(){
		iNow--;
		go();
		clearInterval(timer);
	});
	oBanner.mouseover(function(event) {
		$('#ban_btn_next').css('display','block');
		$('#ban_btn_prev').css('display','block');
		clearInterval(timer);	
	});
	oBanner.mouseout(function(){
		$('#ban_btn_next').css('display','none');
		$('#ban_btn_prev').css('display','none');
		timer=setInterval(function(){
			iNow++;
			go();
		},2000)
	});
	$('#banner_btn').mouseover(function(){
		$('#ban_btn_next').css('display','block');
		$('#ban_btn_prev').css('display','block');
	});
	$('#banner_btn').mouseout(function(){
		$('#ban_btn_next').css('display','none');
		$('#ban_btn_prev').css('display','none');
	})
}