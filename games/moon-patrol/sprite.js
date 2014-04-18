//////////////////////////////////////////////SPRITE START

var	spriteArray=new Array() ;
var	maxSprites=500 ;

var	UNDONE =0 ;
var	INUSE=1 ;
var	DISABLED=2 ;

var debug ;


function SpriteInstance_SetUp(divRef,imgRef)
{
	this.imgRef=imgRef ;
	this.divRef=divRef ;
}

function SpriteInstance_SetState(state)
{
	this.state=state 
}

function SpriteInstance_GetState()
{
	return this.state ;
}

function SpriteInstance()
{
	this.state=UNDONE ;
	this.divRef=null ;
	this.imgRef=null ;
	this.SetState=SpriteInstance_SetState ;
	this.SetUp=SpriteInstance_SetUp ;
	this.GetState=SpriteInstance_GetState ;
}




function InitSprites()
{	
	var i ;
	for(i=0 ; i<maxSprites ; i++)
		spriteArray[i]=new SpriteInstance() ;
	system=new GetBrowserId() ;
}

//////////////////////////////////////////////////////////////////////
// Identify the browser
//////////////////////////////////////////////////////////////////////
function GetBrowserId(){
	this.version=0 ;
	this.browser="" ;
	this.compatible=false ;
	var navName=navigator.userAgent.toLowerCase();
	var navVersion=parseInt(navigator.appVersion);

	if(navName.indexOf('msie')!=-1)
	{
		this.browser="Explorer" ;
		if(navName.indexOf("msie 5")!=-1 || navName.indexOf("msie 6") || navName.indexOf("msie 7"))
			this.compatible=true ;
	}
	else
		if(navName.indexOf('mozilla')!=-1)
		{
			this.browser="Mozilla" ;
			if(navVersion>4)
				this.compatible=true ;
		}
}

	 


function GetFreeSprite()
{
	var i ;
	for(i=0 ; i<maxSprites ; i++)
	{
		if(spriteArray[i].GetState()==UNDONE)
		{
	 
   			var imgRef=document.createElement('IMG');
 			document.getElementsByTagName("body").item(0).appendChild(imgRef);
			imgRef.style.position="absolute";
			imgRef.style.overflow="hidden";	  
			
			spriteArray[i].SetUp(0,imgRef) ; 
			return spriteArray[i] ;
		}
		if(spriteArray[i].GetState()==DISABLED)
		{
			return spriteArray[i] ;
		}
		
	}

	return null ;
}

function Sprite_SetImage(url,w,h,icount)
{
	this.sprite.imgRef.src=url ;
	this.w=w ;
	this.h=h ;
	this.incarnations=icount;
	this.currentIncarnation=0 ;
}

function Sprite_SetZ(z)
{
	this.sprite.imgRef.style.zIndex=z ;
}

// Get the y cooridnate of this sprite
function 	Sprite_GetY()
{
	return	this.y ;
}

function	Sprite_GetX()
{
	return	this.x ;
}



// Destroy the sprite and make it available
function	Sprite_Destroy()
{
	this.sprite.imgRef.style.visibility="hidden" ;
	this.sprite.state=DISABLED ;
}

//////////////////////////////////////////////
// Check for the intersection of a point in the sprite
///////////////////////////////////////////////
function Sprite_PointIntersect(x,y)
{
	var	rx=this.x ;
	var	ry=this.y+(this.currentIncarnation * this.h) ;

	if(x>=rx && x<=rx+this.w)
		if(y>=ry && y<=ry+this.h)
			return 1 ;
	return 0 ;
}

// Function to set all sprite details
function Sprite_SetSprite(image,x,y,w,h,incarnations,startIncarnation,z)
{
	this.SetImage(image,w,h,incarnations) ;
	this.MoveTo(x,y) ;
	this.SetZ(z) ;
	this.SetIncarnation(startIncarnation) ;
}



function Sprite_Show()
{
	this.sprite.imgRef.style.visibility='visible' ;
}

function	Sprite_Hide()
{
	this.sprite.imgRef.style.visibility='hidden' ;
}

function	Sprite_MoveTo(x,y) 
{
	this.y=y;
	this.sprite.imgRef.style.top=y ;
	this.x=x;
	this.sprite.imgRef.style.left=x ;
	this.SetIncarnation(this.currentIncarnation) ;
}

function	Sprite_MoveX(x)
{
	this.MoveTo(x,this.y) ;
}

function	Sprite_MoveY(y) 
{
	this.MoveTo(this.x,y) ;
}

	

function Sprite_SetIncarnationIe(f)
{
	f=f>(this.incarnations-1)?0:f ;
	this.iX=Math.round(this.x);
	this.iY=Math.round(this.y);
  	this.sprite.imgRef.style.clip="rect("+f*this.h+" "+this.w+" "+(f+1)*this.h+" 0)";
	this.sprite.imgRef.style.top=this.iY+-(f*this.h);
	this.currentIncarnation=f ;
  
}

function Sprite_SetIncarnationDOM2(f)
{
	f=f>(this.incarnations-1)?0:f ;

 	this.iX=Math.round(this.x);
	this.iY=Math.round(this.y);									

	this.sprite.imgRef.style.left=this.iX+0;
	this.sprite.imgRef.style.top=this.iY+0;
	this.sprite.imgRef.style.backgroundPosition=-(0*this.w)+"px "+-(f*this.h)+"px";
	this.currentIncarnation=f ;

}

function Sprite_SetOpacityIe(op)
{
	if(op<100){
		this.sprite.imgRef.style.filter="alpha(opacity="+op+")";
		this.opacity=op
	}else{
		this.sprite.imgRef.style.filter="";
		this.opacity=100
	}
}

function Sprite_SetOpacityDOM2(op){
	this.sprite.imgRef.style.MozOpacity=op+"%";
	this.opacity=op;
}



function Sprite_Resize(x,y){
	this.w=x;
	this.h=y;
	this.sprite.imgRef.style.width=this.w;
	this.sprite.imgRef.style.height=this.h*this.incarnations;
	this.SetIncarnation(this.currentIncarnation)
}




function Sprite()
{
	this.sprite=GetFreeSprite() ;
	if(this.sprite==null)
		return ;

	this.sprite.state=INUSE ;
	this.Show=Sprite_Show ;
	this.Hide=Sprite_Hide; 
	this.MoveTo=Sprite_MoveTo ;
	if(system.browser=="Explorer")
	{
		this.SetIncarnation=Sprite_SetIncarnationIe ;
		this.SetOpacity=Sprite_SetOpacityIe ;
	}
	if(system.browser=="Mozilla")
	{
		this.SetIncarnation=Sprite_SetIncarnationIe ;
		this.SetOpacity=Sprite_SetOpacityDOM2;
	}
	this.SetImage=Sprite_SetImage ;
	this.Resize=Sprite_Resize ;
	this.MoveX=Sprite_MoveX ;
	this.MoveY=Sprite_MoveY ;
	this.Destroy=Sprite_Destroy ;
	this.SetZ=Sprite_SetZ ;
	this.PointIntersect=Sprite_PointIntersect ;
	this.SetSprite=Sprite_SetSprite ;
	this.GetX=Sprite_GetX ;
	this.GetY=Sprite_GetY ;
	
	this.x=0 ;
	this.y=0 ;
	this.w=this.h=0 ;
	this.incarnations=0 ;
	this.currentIncarnation=0 ;
	this.opacity=100 ;

}




//////////////////////////////////////////////SPRITE END

