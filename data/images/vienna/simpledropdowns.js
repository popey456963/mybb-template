/* SimpleDropDowns v1.0 - (c)2008 Adam Schwartz (http://polymath.mit.edu) - MIT License */
var SDD={};
SDD.sL='display:none;position:absolute;top:14px;left:0px;cursor:default;color:#000;background:#fff;border:1px solid #000;';
SDD.dA='&#9660;';
SDD.uA='&#9650;';
SDD.lO='';
SDD.oM=function(e,o,t){
	var evt=e;
	if(!e){evt=window.event;}
	var reltg=(evt.relatedTarget)?evt.relatedTarget:evt.toelement;
	while(reltg.tagName!='BODY'){
		if(reltg==t){return;}
		reltg=reltg.parentNode;
	}
	t.style.display="none";
	document.getElementById(o).innerHTML=SDD.dA;
};
document.documentElement.onclick=function(e){SDD.oC(e);};
SDD.oC=function(e){
	if (!SDD.lO || SDD.lO===''){return;}
	var targ;
	var evt=e;
	if(!e){evt=window.event;}
	if(e.target){targ=e.target;}
	else if(e.srcElement){targ=e.srcElement;}
	var reltg=(evt.relatedTarget)?evt.relatedTarget:evt.toelement;
	if (reltg){
		while(reltg.tagName!='BODY'){
			if(reltg==SDD.lO){return;}
			reltg=reltg.parentNode;
		}
	}
	document.getElementById(SDD.lO+'_sddm').style.display="none";
	document.getElementById(SDD.lO+'_sddt').innerHTML=SDD.dA;
	SDD.lO='';
};
SDD.lD=function(f){
	var o=window.onload;
	if(typeof window.onload!='function'){
		window.onload=f;
	}else{
		window.onload=function(){o();f();};
	}
};
SDD.go=function(){
	var d='_sddm',m='_sddt',g='document.getElementById',o=[];
	var e=document.getElementsByTagName('*');
	var l=e.length;
	var p=new RegExp('dropdown');
	var p2=new RegExp('click');
	var j=0;
	for(var k=0;k<l;k++){
		if(p.test(e[k].className)){
			o[j]=e[k];
			j++;
		}
	}
	for(var i=0;i<o.length;i++){
		var click_or_hover_1,click_or_hover_2;
		o[i].style.position='relative';
		var old=o[i].innerHTML;
		var drp=o[i].title;
		o[i].title='';
		var a=o[i].id;
		if(!a||a===''){a='unique'+i;}
		if(p2.test(o[i].className)){
			click_or_hover_1 = "onclick='SDD.lO=\"\";if("+g+"(\""+a+d+"\").style.display!=\"none\"){SDD.lO=\"\";"+g+"(\""+a+d+"\").style.display=\"none\";"+g+"(\""+a+m+"\").innerHTML=\""+SDD.dA+"\";}else{"+g+"(\""+a+d+"\").style.display=\"inline\";"+g+"(\""+a+m+"\").innerHTML=\""+SDD.uA+"\";setTimeout(\"SDD.lO=\\\""+a+"\\\";\",10)};'";
			click_or_hover_2 = "onclick='this.style.display=\"none\";"+g+"(\""+a+m+"\").innerHTML=\""+SDD.dA+"\";'";
		}else{
			click_or_hover_1 = "onmouseover='"+g+"(\""+a+d+"\").style.display=\"inline\";"+g+"(\""+a+m+"\").innerHTML=\""+SDD.uA+"\";' onmouseout='SDD.oM(event,\""+a+m+"\","+g+"(\""+a+d+"\"))'";
			click_or_hover_2 = "onmouseout='SDD.oM(event,\""+a+m+"\",this)'";
		}
		o[i].innerHTML="<a "+click_or_hover_1+">"+old+"<span id='"+a+m+"'>"+SDD.dA+"</span></a><span id='"+a+d+"' "+click_or_hover_2+" class='dropdownmenu' style='"+SDD.sL+"'>"+document.getElementById(drp).innerHTML+"</span>";
	}
};
SDD.lD(SDD.go);