/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.print=function(_1,_2,_3){if(!Ext._console){var cs=Ext.DomHelper.insertBefore(document.body.firstChild,{tag:"div",style:"width:250px;height:350px;overflow:auto;border:3px solid #c3daf9;"+"background:#fff;position:absolute;right:5px;top:5px;"+"font-size:11px;z-index:15005;padding:5px;"},true);if(Ext.Resizable){var rz=new Ext.Resizable(cs,{transparent:true,handles:"all",pinned:true,adjustments:[0,0],wrap:true,draggable:Ext.dd.DD?true:false});rz.proxy.applyStyles("border:3px solid #93aac9;background:#c3daf9;position:absolute;visibility:hidden;z-index:50001;");rz.proxy.setOpacity(0.3);}cs.on("dblclick",cs.hide);Ext._console=cs;}var m="";for(var i=0,_8=arguments.length;i<_8;i++){m+=(i==0?"":", ")+arguments[i];}var d=Ext._console.dom;Ext.DomHelper.insertHtml("afterBegin",d,"<pre style=\"white-space:pre-wrap\"><xmp>"+m+"</xmp></pre>"+"<hr noshade style=\"color:#eeeeee;\" size=\"1\">");d.scrollTop=0;Ext._console.show();};Ext.printf=function(_a,_b,_c,_d){Ext.print(String.format.apply(String,arguments));};Ext.dump=function(o){if(!o){Ext.print("null");}else{if(typeof o!="object"){Ext.print(o);}else{var b=["{\n"];for(var key in o){var to=typeof o[key];if(to!="function"&&to!="object"){b.push(String.format("  {0}: {1},\n",key,Ext.util.Format.ellipsis(String(o[key]).replace(/(\n|\r)/g,""),40)));}}var s=b.join("");if(s.length>3){s=s.substr(0,s.length-2);}Ext.print(s+"\n}");}}};Ext._timers={};Ext.timer=function(_13){_13=_13||"def";Ext._timers[_13]=new Date().getTime();};Ext.timerEnd=function(_14,_15){var t=new Date().getTime();_14=_14||"def";var v=String.format("{0} ms",t-Ext._timers[_14]);Ext._timers[_14]=new Date().getTime();if(_15!==false){Ext.print(_14=="def"?v:_14+": "+v);}return v;};
