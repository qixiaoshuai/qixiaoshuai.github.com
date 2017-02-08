//弧度转角度：
function a2d(n){
	return 180/Math.PI*n;
}
//随机数：
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

var timer=null;//地球
var timer2=null;//延迟后地球转
var timer3=null;//随机生成
var timer4=null;
var bOver=true;
var bDphoto=true;

window.onresize=function(){
	var iClinetHeight=document.documentElement.clientHeight;
	var iClinetWidth=document.documentElement.clientWidth;
	var aBox=document.querySelectorAll('.box');
	for(var i=0;i<aBox.length;i++){
		aBox[i].style.height=iClinetHeight+'px';
	}
}



window.onload=function(){

	//所有块大小(高)
	var iClinetHeight=document.documentElement.clientHeight;
	var iClinetWidth=document.documentElement.clientWidth;
	var aBox=document.querySelectorAll('.box');//all box

	//地球部分导航
	var oNav=document.querySelector('nav');
	var aNav=oNav.children;
	var navD=0;//旋转角度

	//地方列表：
	var oSection=document.querySelector('section');
	var aSection=oSection.children;

	//主页：
	var oMain=document.querySelector('.main');
	//各个地方：
	var oLike=document.querySelector('.like');
	var oExper=document.querySelector('.exper');
	var oSkill=document.querySelector('.skill');
	var oShare=document.querySelector('.share');
	//云
	var oFoot=document.querySelector('footer');
	var oCould=document.querySelector('.cloud');
	var oCouldLeft=document.querySelector('.cloud-left');
	var aCouldLeft=oCouldLeft.children;
	var oCouldRight=document.querySelector('.cloud-right');
	var aCouldRight=oCouldRight.children;
	//气球：
	var oBalloon=document.querySelector('.balloon');


	//箭头和地方提示：
	// var navaSpan=['<b>法国</b><b>-艺术之都</b>','<b>和家乡</b><b>一样的荷兰</b>','<b>去看看</b>','<b>开挂民族</b>'];
	var navaSpan=['<b>兴趣爱好</b>','<b>个人经历</b>','<b>技能</b>','<b>作品展示</b>'];
	//箭头出现判断
	var bMouse=false;

	//相机：
	var oCamera=document.querySelector('.camera');
	var oCameraIn=document.querySelector('.camera-in'); 

	clearInterval(timer);

//所有块大小(高)
	for(var i=0;i<aBox.length;i++){
		aBox[i].style.height=iClinetHeight+'px';
	}


//地球部分：

	//拖拽的地球：
	document.addEventListener('mousedown',function(ev){
		clearInterval(timer);
		var oldD=navD;
		var navD1=navDeg(ev);//按下的角度
		function navDeg(ev){
			var navX=oNav.offsetLeft+oNav.offsetWidth/2;//xy 坐标
			var navY=oNav.offsetTop+oNav.offsetHeight/2;
			var navX1=ev.clientX-navX;
			var navY1=ev.clientY-navY;

			var b=navY-navY1;
			var a=navX1-navX;
			var d=Math.atan2(a,b);
			var navD1=a2d(d);
			return navD1;
		}
		function navMove(ev){
			var navD2=navDeg(ev);//旋转后的角度
			navD=navD2-navD1+oldD;
			oNav.style.WebkitTransform='rotate('+navD+'deg)';
		}
		function navUp(){

			//离开后定时：
			clearTimeout(timer2);
			timer2=setTimeout(function(){
				clearInterval(timer);
				timer=setInterval(navRun,30);
			},3000);
			document.removeEventListener('mousemove',navMove,false);
			document.removeEventListener('mouseup',navUp,false);
			
		}
		document.addEventListener('mousemove',navMove,false);
		document.addEventListener('mouseup',navUp,false);
		ev.preventDefault();
		return false;
	},false);


	//自动旋转的地球：
	clearInterval(timer);
	timer=setInterval(navRun,30);
	function navRun(){
		navD+=0.2;
		oNav.style.WebkitTransform='rotate('+navD+'deg)';
	}

	document.addEventListener('keydown',function(ev){
		if(ev.keyCode=='39'){
			clearInterval(timer);
			timer=setInterval(function(){
				navD-=0.2;
				oNav.style.WebkitTransform='rotate('+navD+'deg)';
			},30);
		}
		if(ev.keyCode=='37'){
			gril(ev);//girl
			clearInterval(timer);
			timer=setInterval(navRun,30);
		}
		if(ev.keyCode=='32'){
			clearInterval(timer);
		}
	},false);

	//暂停旋转：

	oNav.addEventListener('mouseover',function(){
		clearInterval(timer);
		clearTimeout(timer2);
	},false);

	oNav.addEventListener('mouseout',function(){
		clearTimeout(timer2);
		timer2=setTimeout(function(){
			clearInterval(timer);
			timer=setInterval(navRun,30);
		},1000);
	},false);



//漂浮的云
	function couldRun(obj){
		if(!bOver)return;
		bOver=false;
		//地球：清除定时器，暂停
		oMain.style.zIndex=-1;
		clearInterval(timer);
		//云朵：
		oFoot.style.zIndex=1;
		for(i=0;i<aCouldLeft.length;i++){
			aCouldLeft[i].style.animation='coludLeft 3s ease '+i/3+'s';
			aCouldRight[i].style.animation='coludRight 3s ease '+i/3+'s';
		}
		obj.style.display='block';
		move(obj,{opacity:1},{duration:3000});

		//气球：
	
		//all运动结束
		setTimeout(function(){
			oFoot.style.zIndex=-10;
			for(i=0;i<aCouldLeft.length;i++){
				aCouldLeft[i].style.animation='none';
				aCouldRight[i].style.animation='none';
			}
			bOver=true;
		},3500);
	}

//进入子页：
	aNav[0].addEventListener('click',function(){
		oLike.setAttribute('name','yes');
		couldRun(oLike);
	},false);



//箭头和地方提示：

	//箭头：
	for(var i=0;i<aNav.length;i++){
		aNav[i].index=i;
		aNav[i].addEventListener('mouseover',function(){
			bMouse=true;
			for(var j=0;j<aNav.length;j++){
				aNav[j].innerHTML='';
			}
			this.style.opacity='0.8';
			var oSpan=document.createElement('span');
			oSpan.classList.add('navon');
			this.appendChild(oSpan);
		},false);
		aNav[i].addEventListener('mouseout',function(){
			bMouse=false;
			this.innerHTML='';
			this.style.opacity='1';
		},false);
	}

	//随机生成：
	clearTimeout(timer3);
	timer3=setInterval(function(){
		var n=rnd(0,4);
		var oSpan=document.createElement('span');
		oSpan.classList.add('navrun');
		if(aNav[n].innerHTML==''){
			oSpan.innerHTML=navaSpan[n];
			aNav[n].appendChild(oSpan);
			setTimeout(function(){
				if(bMouse){
					return;
				}
				aNav[n].innerHTML='';
			},2000);
		}else{
			return;
		}
	},500);
	


//巴黎部分：
	var oDraw=document.querySelector('.draw');
	var oDrawing=document.querySelector('.drawing');
	var oDrewBack=document.querySelector('.draw-back');
	var oDrewBtn=document.querySelector('.draw-btn');
	var oDrawPhoto=document.querySelector('.draw-photo');
	var oDrawSpan=document.querySelector('.draw-span');

	var oDrawSelf=document.querySelector('.draw-self');
	var bDraw=true;

	//点击出现画板
	oDraw.addEventListener('click',function(){
		oDrawing.className='drawing drawcli';
		oDrawPhoto.className='draw-photo photocli';
	},false);
	//点击画板消失
	oDrewBack.addEventListener('click',function(ev){
		//阻止事件冒泡
		window.event? window.event.cancelBubble = true : ev.stopPropagation();
		oDrawing.className='drawing';
		oDrawPhoto.className='draw-photo';
	},true);
 
	//点击我要画画
	oDrewBtn.addEventListener('click',function(ev){
		window.event? window.event.cancelBubble = true : ev.stopPropagation();
		if(!bDphoto)return;
		if(bDraw==true && bDphoto==true){
			oDrewBtn.innerHTML='赏画';
			oDrawSelf.style.display='block';
			oDrawPhoto.style.display='none';
			oDrawPhoto.classList.remove('photocli');
			bDraw=false;
		}else{
			oDrewBtn.innerHTML='我也要画';
			oDrawSelf.style.display='none';
			oDrawPhoto.style.display='block';
			oDrawPhoto.classList.add('photocli');
			bDraw=true;
			
		}
	},false);

	//点击画板翻页：
	var idraw=0;
	var timer4=null;
	oDrawPhoto.addEventListener('click',function(ev){
		if(!bDphoto)return;
		bDphoto=false;
		window.event? window.event.cancelBubble = true : ev.stopPropagation();
		oDrawSpan.style.transition='zIndex 1.4s linear 0.7s,transform 1.4s linear';
		oDrawSpan.style.transform='perspective(800px) rotateY(-360deg)';	
		setTimeout(function(){
			oDrawSpan.style.zIndex='-1';
		},700);
	},false);
	oDrawPhoto.addEventListener('transitionend',function(){
		idraw++;
		oDrawSpan.style.transition='none';
		oDrawSpan.style.transform='perspective(800px) rotateY(0deg)';
		oDrawSpan.style.zIndex='1';
		oDrawSpan.style.background='url(images/photo'+idraw%6+'.jpg)';
		oDrawPhoto.style.background='url(images/photo'+(idraw+1)%6+'.jpg)';
		bDphoto=true;
	},false);


	//画画板块：
	var CanvasDraw=document.querySelector('.canvasDraw');
	var oDrawsColor=document.querySelector('.drawscolor');
	var oDrawPen=document.querySelector('.drawspen');
	var oDrawsagain=document.querySelector('.drawsagain');
	var iPenChange=true;
	var gd=CanvasDraw.getContext('2d');

	CanvasDraw.onmousedown=function(ev){
		window.event? window.event.cancelBubble = true : ev.stopPropagation();
		var x=ev.clientX-oDraw.offsetLeft;
		var y=ev.clientY-oDraw.offsetTop-30;

		gd.beginPath();
		gd.strokeStyle=oDrawsColor.value;
		gd.lineWidth=5;
		gd.moveTo(x,y);
		document.onmousemove=function(ev){
			var x=ev.clientX-oDraw.offsetLeft;
			var y=ev.clientY-oDraw.offsetTop-30;
			gd.lineTo(x,y);

			if(iPenChange){
				gd.stroke();
			}else{
				gd.clearRect(x,y,10,10);
			}
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}
		return false;
	}
	oDrawPen.onclick=function(){
		if(iPenChange){
			iPenChange=false;
			oDrawPen.innerHTML='橡皮';
		}else{
			iPenChange=true;
			oDrawPen.innerHTML='笔';
		}	
	}
	oDrawsagain.onclick=function(){
		gd.clearRect(0,0,CanvasDraw.width,CanvasDraw.height);
	}


	//音乐部分：
	var oSing=document.querySelector('.sing');
	var oSingIn=document.querySelector('.sing-in');
	var oSingUl=document.querySelector('.sing-in ul');
	var oPlay=document.querySelector('.sing-play span');
	var oPlayPrev=document.querySelector('.sing-play i');
	var oPlayNext=document.querySelector('.sing-play b');
	var oSingClose=document.querySelector('.sing-close');
	var oA = new Audio();
	var iPlay=true;//播放设定 初设定可以点了，没有播放时为true
	var iMusic=0;
	var iLaotou=true;//点击老头 初设定 可以点了
	var musicArr=['青海湖','寂静的天空','海然海然'];

	//点击老头出现播放器
	oSing.addEventListener('click',function(ev){
		oSingIn.style.display='block';
		oSingIn.classList.add('sactive');
		oSingClose.style.display='block';
		oSingClose.classList.add('sactive');
		//oSingIn.className='sing-in sactive';
	},false);

	//关闭播放器
	oSingClose.addEventListener('click',function(ev){
		window.event? window.event.cancelBubble = true : ev.stopPropagation();
		oSingIn.style.display='none';
		oSingIn.classList.remove('sactive');
		oSingClose.style.display='none';
		oSingClose.classList.remove('sactive');
		//oSingIn.className='sing-in';
		
	},false);


	//提前加载：
	oA.src='music/'+musicArr[iMusic]+'.mp3';

	//播放按钮:
	oPlay.addEventListener('click',function(ev){
		if(oA.paused){
			oA.play();
			oPlay.style.backgroundImage="url(images/play.png)";
			iPlay=false;
			for(var i=0;i<musicLi.length;i++){
				musicLi[i].className='';
			}
			musicLi[iMusic].className='active';	
		}else{
			oA.pause();
			oPlay.style.backgroundImage="url(images/stop.png)";
			iPlay=true;
			for(var i=0;i<musicLi.length;i++){
				musicLi[i].className='';
			}
		}
	},false);

	//上一首
	oPlayPrev.addEventListener('click',function(ev){
		iMusic--;
		if(iMusic<0){
			iMusic=2;
		}
		oA.src='music/'+musicArr[iMusic]+'.mp3';
		oA.play();
		for(var i=0;i<musicLi.length;i++){
			musicLi[i].className='';
		}
		musicLi[iMusic].className='active';	
	},false);

	//下一首
	oPlayNext.addEventListener('click',function(ev){
		iMusic++;
		if(iMusic>2){
			iMusic=0;
		}
		oA.src='music/'+musicArr[iMusic]+'.mp3';
		oA.play();
		for(var i=0;i<musicLi.length;i++){
			musicLi[i].className='';
		}
		musicLi[iMusic].className='active';
	},false);

	//列表
	//列表展示
	for(var i=0; i<musicArr.length;i++){
		var oLi=document.createElement('li');
		oLi.innerHTML=musicArr[i];
		oSingUl.appendChild(oLi);
	}
	//列表点击
	var musicLi=document.querySelectorAll('.sing-in li');
	for(var i=0; i<musicLi.length;i++){
		musicLi[i].index=i;
		musicLi[i].onclick=function(){
			
			if(iMusic==this.index && !oA.paused){
				console.log("正在播放的暂停");
				oA.pause();
				oPlay.style.backgroundImage="url(images/stop.png)";
				for(var i=0;i<musicLi.length;i++){
					musicLi[i].className='';
				}
			}else if(iMusic==this.index && oA.paused){
				console.log("暂停中的播放");
				oA.play();
				oPlay.style.backgroundImage="url(images/play.png)";
				for(var i=0;i<musicLi.length;i++){
					musicLi[i].className='';
				}
				this.className='active';	
			}else{
				console.log("未播放 开播");
				iMusic=this.index;
				oA.src='music/'+musicArr[iMusic]+'.mp3';
				oA.play();
				oPlay.style.backgroundImage="url(images/play.png)";
				for(var i=0;i<musicLi.length;i++){
					musicLi[i].className='';
				}
				this.className='active';	
			}
			
		};
	}



//相机部分：以及退出效果
	var oCamsay=document.querySelector('.camsay');
	oCamera.addEventListener('mouseover',function(){
		oCamera.style.transform='scale(1.3)';
		oCamsay.style.display='block';
		oCamera.classList.remove('cammoves');
		if(oMain.style.zIndex=='-1'){
			oCamsay.innerHTML='拍照留念</br>回家啦';
			
		}else{
			oCamsay.innerHTML='带上我去</br>旅行吧';
		}
	
	},false);
	oCamera.addEventListener('mouseout',function(){
		oCamera.style.transform='scale(1)';
		oCamsay.style.display='none';
		oCamera.classList.add('cammoves');
	},false);
	oCamera.addEventListener('click',function(){
		for(var i=0;i<aSection.length;i++){
			//判断是哪个模块
			if(aSection[i].getAttribute('name')=='yes'){
				oCameraIn.style.display='block';
				//模块消失
				(function(obj){
					setTimeout(function(){
						//obj.style.display='none';
						obj.removeAttribute('name');
						oCameraIn.style.display='none';
						obj.style.transition='transform 2s ease 1s';
						obj.style.transform='translate3d(50%,-45%,0) rotate(720deg) scale(0)';
						obj.addEventListener('transitionend',function(){
							obj.style.display='none';
							obj.style.opacity=0;
							obj.style.transform=null;
							oMain.style.zIndex=0;
						});

					},1000);
				})(aSection[i]);
			}
		}
	},false);



//灯塔：技能部分：
	
	var oSkillIn=document.querySelector('.skill-in');
	var aSkillIn=oSkillIn.children;
	aNav[2].addEventListener('click',function(){
		oSkill.setAttribute('name','yes');
		couldRun(oSkill);
		for(var i=0;i<aSkillIn.length;i++){
			aSkillIn[i].style.animation='paopaogo 2s ease-out '+(3+i/2)+'s forwards';
			aSkillIn[i].classList.add('ski'+i);
		}

	},false);
	

//荷兰：	

	var oExperIn=document.querySelector('.exper-in');
	var oExperUl=document.querySelector('.exper-ul');
	var aExperUl=oExperUl.children;
	aNav[1].addEventListener('click',function(){
		oExper.setAttribute('name','yes');
		couldRun(oExper);
		setTimeout(function(){
			oExperIn.style.display='block';
			move(oExperIn,{opacity:1},{duration:3000});
			for(var i=0;i<4;i++){
				aExperUl[i].classList.add('eu'+i);
			}
		},6000);

	},false);




//share 中国最后介绍：

	var oWebList=document.querySelector('.share ul');
	var aWebList=document.querySelectorAll('.share ul li a');
	var oTellMe=document.querySelector('.me');

	//进入中国：
	aNav[3].addEventListener('click',function(){
		oShare.setAttribute('name','yes');
		couldRun(oShare);
		oWebList.style.animation='webpro 2.5s ease 3s forwards';
		oTellMe.style.animation='tellMe 2.5s ease 3s forwards';
		oWebList.style.transition='all 2s';
		oTellMe.style.transition='all 2s';
	},false);


	
	for(var i=0;i<aWebList.length;i++){
		(function(i){
			aWebList[i].addEventListener('mouseover',function(){
				console.log(this);
				this.style.marginLeft='-100px';
				this.style.paddingRight='100px';
				this.style.transition='all 1s';
			},false);
			aWebList[i].addEventListener('mouseout',function(){
				this.style.marginLeft='0px';
				this.style.paddingRight='0px';
				this.style.transition='all 1s';
			},false);
		})(i);
	}

}