/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

(function(){var _1=Ext.EventManager;var _2=Ext.lib.Dom;Ext.dd.DragDrop=function(id,_4,_5){if(id){this.init(id,_4,_5);}};Ext.dd.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(x,y){},startDrag:function(x,y){},b4Drag:function(e){},onDrag:function(e){},onDragEnter:function(e,id){},b4DragOver:function(e){},onDragOver:function(e,id){},b4DragOut:function(e){},onDragOut:function(e,id){},b4DragDrop:function(e){},onDragDrop:function(e,id){},onInvalidDrop:function(e){},b4EndDrag:function(e){},endDrag:function(e){},b4MouseDown:function(e){},onMouseDown:function(e){},onMouseUp:function(e){},onAvailable:function(){},defaultPadding:{left:0,right:0,top:0,bottom:0},constrainTo:function(_1d,pad,_1f){if(typeof pad=="number"){pad={left:pad,right:pad,top:pad,bottom:pad};}pad=pad||this.defaultPadding;var b=Ext.get(this.getEl()).getBox();var ce=Ext.get(_1d);var c=ce.dom==document.body?{x:0,y:0,width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()}:ce.getBox(_1f||false);var _23=b.y-c.y;var _24=b.x-c.x;this.resetConstraints();this.setXConstraint(_24-(pad.left||0),c.width-_24-b.width-(pad.right||0));this.setYConstraint(_23-(pad.top||0),c.height-_23-b.height-(pad.bottom||0));},getEl:function(){if(!this._domRef){this._domRef=Ext.getDom(this.id);}return this._domRef;},getDragEl:function(){return Ext.getDom(this.dragElId);},init:function(id,_26,_27){this.initTarget(id,_26,_27);_1.on(this.id,"mousedown",this.handleMouseDown,this,true);},initTarget:function(id,_29,_2a){this.config=_2a||{};this.DDM=Ext.dd.DDM;this.groups={};if(typeof id!=="string"){id=Ext.id(id);}this.id=id;this.addToGroup((_29)?_29:"default");this.handleElId=id;this.setDragElId(id);this.invalidHandleTypes={A:"A"};this.invalidHandleIds={};this.invalidHandleClasses=[];this.applyConfig();this.handleOnAvailable();},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];this.isTarget=(this.config.isTarget!==false);this.maintainOffset=(this.config.maintainOffset);this.primaryButtonOnly=(this.config.primaryButtonOnly!==false);},handleOnAvailable:function(){this.available=true;this.resetConstraints();this.onAvailable();},setPadding:function(_2b,_2c,_2d,_2e){if(!_2c&&0!==_2c){this.padding=[_2b,_2b,_2b,_2b];}else{if(!_2d&&0!==_2d){this.padding=[_2b,_2c,_2b,_2c];}else{this.padding=[_2b,_2c,_2d,_2e];}}},setInitPosition:function(_2f,_30){var el=this.getEl();if(!this.DDM.verifyEl(el)){return;}var dx=_2f||0;var dy=_30||0;var p=_2.getXY(el);this.initPageX=p[0]-dx;this.initPageY=p[1]-dy;this.lastPageX=p[0];this.lastPageY=p[1];this.setStartPosition(p);},setStartPosition:function(pos){var p=pos||_2.getXY(this.getEl());this.deltaSetXY=null;this.startPageX=p[0];this.startPageY=p[1];},addToGroup:function(_37){this.groups[_37]=true;this.DDM.regDragDrop(this,_37);},removeFromGroup:function(_38){if(this.groups[_38]){delete this.groups[_38];}this.DDM.removeDDFromGroup(this,_38);},setDragElId:function(id){this.dragElId=id;},setHandleElId:function(id){if(typeof id!=="string"){id=Ext.id(id);}this.handleElId=id;this.DDM.regHandle(this.id,id);},setOuterHandleElId:function(id){if(typeof id!=="string"){id=Ext.id(id);}_1.on(id,"mousedown",this.handleMouseDown,this,true);this.setHandleElId(id);this.hasOuterHandles=true;},unreg:function(){_1.un(this.id,"mousedown",this.handleMouseDown);this._domRef=null;this.DDM._remove(this);},isLocked:function(){return (this.DDM.isLocked()||this.locked);},handleMouseDown:function(e,oDD){var _3e=e.which||e.button;if(this.primaryButtonOnly&&_3e>1){return;}if(this.isLocked()){return;}this.DDM.refreshCache(this.groups);var pt=new Ext.lib.Point(Ext.lib.Event.getPageX(e),Ext.lib.Event.getPageY(e));if(!this.hasOuterHandles&&!this.DDM.isOverTarget(pt,this)){}else{if(this.clickValidator(e)){this.setStartPosition();this.b4MouseDown(e);this.onMouseDown(e);this.DDM.handleMouseDown(e,this);this.DDM.stopEvent(e);}else{}}},clickValidator:function(e){var _41=Ext.lib.Event.getTarget(e);return (this.isValidHandleChild(_41)&&(this.id==this.handleElId||this.DDM.handleWasClicked(_41,this.id)));},addInvalidHandleType:function(_42){var _43=_42.toUpperCase();this.invalidHandleTypes[_43]=_43;},addInvalidHandleId:function(id){if(typeof id!=="string"){id=Ext.id(id);}this.invalidHandleIds[id]=id;},addInvalidHandleClass:function(_45){this.invalidHandleClasses.push(_45);},removeInvalidHandleType:function(_46){var _47=_46.toUpperCase();delete this.invalidHandleTypes[_47];},removeInvalidHandleId:function(id){if(typeof id!=="string"){id=Ext.id(id);}delete this.invalidHandleIds[id];},removeInvalidHandleClass:function(_49){for(var i=0,len=this.invalidHandleClasses.length;i<len;++i){if(this.invalidHandleClasses[i]==_49){delete this.invalidHandleClasses[i];}}},isValidHandleChild:function(_4c){var _4d=true;var _4e;try{_4e=_4c.nodeName.toUpperCase();}catch(e){_4e=_4c.nodeName;}_4d=_4d&&!this.invalidHandleTypes[_4e];_4d=_4d&&!this.invalidHandleIds[_4c.id];for(var i=0,len=this.invalidHandleClasses.length;_4d&&i<len;++i){_4d=!_2.hasClass(_4c,this.invalidHandleClasses[i]);}return _4d;},setXTicks:function(_51,_52){this.xTicks=[];this.xTickSize=_52;var _53={};for(var i=this.initPageX;i>=this.minX;i=i-_52){if(!_53[i]){this.xTicks[this.xTicks.length]=i;_53[i]=true;}}for(i=this.initPageX;i<=this.maxX;i=i+_52){if(!_53[i]){this.xTicks[this.xTicks.length]=i;_53[i]=true;}}this.xTicks.sort(this.DDM.numericSort);},setYTicks:function(_55,_56){this.yTicks=[];this.yTickSize=_56;var _57={};for(var i=this.initPageY;i>=this.minY;i=i-_56){if(!_57[i]){this.yTicks[this.yTicks.length]=i;_57[i]=true;}}for(i=this.initPageY;i<=this.maxY;i=i+_56){if(!_57[i]){this.yTicks[this.yTicks.length]=i;_57[i]=true;}}this.yTicks.sort(this.DDM.numericSort);},setXConstraint:function(_59,_5a,_5b){this.leftConstraint=_59;this.rightConstraint=_5a;this.minX=this.initPageX-_59;this.maxX=this.initPageX+_5a;if(_5b){this.setXTicks(this.initPageX,_5b);}this.constrainX=true;},clearConstraints:function(){this.constrainX=false;this.constrainY=false;this.clearTicks();},clearTicks:function(){this.xTicks=null;this.yTicks=null;this.xTickSize=0;this.yTickSize=0;},setYConstraint:function(iUp,_5d,_5e){this.topConstraint=iUp;this.bottomConstraint=_5d;this.minY=this.initPageY-iUp;this.maxY=this.initPageY+_5d;if(_5e){this.setYTicks(this.initPageY,_5e);}this.constrainY=true;},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var dx=(this.maintainOffset)?this.lastPageX-this.initPageX:0;var dy=(this.maintainOffset)?this.lastPageY-this.initPageY:0;this.setInitPosition(dx,dy);}else{this.setInitPosition();}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize);}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize);}},getTick:function(val,_62){if(!_62){return val;}else{if(_62[0]>=val){return _62[0];}else{for(var i=0,len=_62.length;i<len;++i){var _65=i+1;if(_62[_65]&&_62[_65]>=val){var _66=val-_62[i];var _67=_62[_65]-val;return (_67>_66)?_62[i]:_62[_65];}}return _62[_62.length-1];}}},toString:function(){return ("DragDrop "+this.id);}};})();if(!Ext.dd.DragDropMgr){Ext.dd.DragDropMgr=function(){var _68=Ext.EventManager;return {ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initalized:false,locked:false,init:function(){this.initialized=true;},POINT:0,INTERSECT:1,mode:0,_execOnAll:function(_69,_6a){for(var i in this.ids){for(var j in this.ids[i]){var oDD=this.ids[i][j];if(!this.isTypeOfDD(oDD)){continue;}oDD[_69].apply(oDD,_6a);}}},_onLoad:function(){this.init();_68.on(document,"mouseup",this.handleMouseUp,this,true);_68.on(document,"mousemove",this.handleMouseMove,this,true);_68.on(window,"unload",this._onUnload,this,true);_68.on(window,"resize",this._onResize,this,true);},_onResize:function(e){this._execOnAll("resetConstraints",[]);},lock:function(){this.locked=true;},unlock:function(){this.locked=false;},isLocked:function(){return this.locked;},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:1000,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(oDD,_70){if(!this.initialized){this.init();}if(!this.ids[_70]){this.ids[_70]={};}this.ids[_70][oDD.id]=oDD;},removeDDFromGroup:function(oDD,_72){if(!this.ids[_72]){this.ids[_72]={};}var obj=this.ids[_72];if(obj&&obj[oDD.id]){delete obj[oDD.id];}},_remove:function(oDD){for(var g in oDD.groups){if(g&&this.ids[g][oDD.id]){delete this.ids[g][oDD.id];}}delete this.handleIds[oDD.id];},regHandle:function(_76,_77){if(!this.handleIds[_76]){this.handleIds[_76]={};}this.handleIds[_76][_77]=_77;},isDragDrop:function(id){return (this.getDDById(id))?true:false;},getRelated:function(_79,_7a){var _7b=[];for(var i in _79.groups){for(j in this.ids[i]){var dd=this.ids[i][j];if(!this.isTypeOfDD(dd)){continue;}if(!_7a||dd.isTarget){_7b[_7b.length]=dd;}}}return _7b;},isLegalTarget:function(oDD,_7f){var _80=this.getRelated(oDD,true);for(var i=0,len=_80.length;i<len;++i){if(_80[i].id==_7f.id){return true;}}return false;},isTypeOfDD:function(oDD){return (oDD&&oDD.__ygDragDrop);},isHandle:function(_84,_85){return (this.handleIds[_84]&&this.handleIds[_84][_85]);},getDDById:function(id){for(var i in this.ids){if(this.ids[i][id]){return this.ids[i][id];}}return null;},handleMouseDown:function(e,oDD){this.currentTarget=Ext.lib.Event.getTarget(e);this.dragCurrent=oDD;var el=oDD.getEl();this.startX=Ext.lib.Event.getPageX(e);this.startY=Ext.lib.Event.getPageY(e);this.deltaX=this.startX-el.offsetLeft;this.deltaY=this.startY-el.offsetTop;this.dragThreshMet=false;this.clickTimeout=setTimeout(function(){var DDM=Ext.dd.DDM;DDM.startDrag(DDM.startX,DDM.startY);},this.clickTimeThresh);},startDrag:function(x,y){clearTimeout(this.clickTimeout);if(this.dragCurrent){this.dragCurrent.b4StartDrag(x,y);this.dragCurrent.startDrag(x,y);}this.dragThreshMet=true;},handleMouseUp:function(e){if(!this.dragCurrent){return;}clearTimeout(this.clickTimeout);if(this.dragThreshMet){this.fireEvents(e,true);}else{}this.stopDrag(e);this.stopEvent(e);},stopEvent:function(e){if(this.stopPropagation){Ext.lib.Event.stopPropagation(e);}if(this.preventDefault){Ext.lib.Event.preventDefault(e);}},stopDrag:function(e){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(e);this.dragCurrent.endDrag(e);}this.dragCurrent.onMouseUp(e);}this.dragCurrent=null;this.dragOvers={};},handleMouseMove:function(e){if(!this.dragCurrent){return true;}if(Ext.isIE&&!e.button){this.stopEvent(e);return this.handleMouseUp(e);}if(!this.dragThreshMet){var _92=Math.abs(this.startX-Ext.lib.Event.getPageX(e));var _93=Math.abs(this.startY-Ext.lib.Event.getPageY(e));if(_92>this.clickPixelThresh||_93>this.clickPixelThresh){this.startDrag(this.startX,this.startY);}}if(this.dragThreshMet){this.dragCurrent.b4Drag(e);this.dragCurrent.onDrag(e);this.fireEvents(e,false);}this.stopEvent(e);return true;},fireEvents:function(e,_95){var dc=this.dragCurrent;if(!dc||dc.isLocked()){return;}var x=Ext.lib.Event.getPageX(e);var y=Ext.lib.Event.getPageY(e);var pt=new Ext.lib.Point(x,y);var _9a=[];var _9b=[];var _9c=[];var _9d=[];var _9e=[];for(var i in this.dragOvers){var ddo=this.dragOvers[i];if(!this.isTypeOfDD(ddo)){continue;}if(!this.isOverTarget(pt,ddo,this.mode)){_9b.push(ddo);}_9a[i]=true;delete this.dragOvers[i];}for(var _a1 in dc.groups){if("string"!=typeof _a1){continue;}for(i in this.ids[_a1]){var oDD=this.ids[_a1][i];if(!this.isTypeOfDD(oDD)){continue;}if(oDD.isTarget&&!oDD.isLocked()&&oDD!=dc){if(this.isOverTarget(pt,oDD,this.mode)){if(_95){_9d.push(oDD);}else{if(!_9a[oDD.id]){_9e.push(oDD);}else{_9c.push(oDD);}this.dragOvers[oDD.id]=oDD;}}}}}if(this.mode){if(_9b.length){dc.b4DragOut(e,_9b);dc.onDragOut(e,_9b);}if(_9e.length){dc.onDragEnter(e,_9e);}if(_9c.length){dc.b4DragOver(e,_9c);dc.onDragOver(e,_9c);}if(_9d.length){dc.b4DragDrop(e,_9d);dc.onDragDrop(e,_9d);}}else{var len=0;for(i=0,len=_9b.length;i<len;++i){dc.b4DragOut(e,_9b[i].id);dc.onDragOut(e,_9b[i].id);}for(i=0,len=_9e.length;i<len;++i){dc.onDragEnter(e,_9e[i].id);}for(i=0,len=_9c.length;i<len;++i){dc.b4DragOver(e,_9c[i].id);dc.onDragOver(e,_9c[i].id);}for(i=0,len=_9d.length;i<len;++i){dc.b4DragDrop(e,_9d[i].id);dc.onDragDrop(e,_9d[i].id);}}if(_95&&!_9d.length){dc.onInvalidDrop(e);}},getBestMatch:function(dds){var _a5=null;var len=dds.length;if(len==1){_a5=dds[0];}else{for(var i=0;i<len;++i){var dd=dds[i];if(dd.cursorIsOver){_a5=dd;break;}else{if(!_a5||_a5.overlap.getArea()<dd.overlap.getArea()){_a5=dd;}}}}return _a5;},refreshCache:function(_a9){for(var _aa in _a9){if("string"!=typeof _aa){continue;}for(var i in this.ids[_aa]){var oDD=this.ids[_aa][i];if(this.isTypeOfDD(oDD)){var loc=this.getLocation(oDD);if(loc){this.locationCache[oDD.id]=loc;}else{delete this.locationCache[oDD.id];}}}}},verifyEl:function(el){try{if(el){var _af=el.offsetParent;if(_af){return true;}}}catch(e){}return false;},getLocation:function(oDD){if(!this.isTypeOfDD(oDD)){return null;}var el=oDD.getEl(),pos,x1,x2,y1,y2,t,r,b,l;try{pos=Ext.lib.Dom.getXY(el);}catch(e){}if(!pos){return null;}x1=pos[0];x2=x1+el.offsetWidth;y1=pos[1];y2=y1+el.offsetHeight;t=y1-oDD.padding[0];r=x2+oDD.padding[1];b=y2+oDD.padding[2];l=x1-oDD.padding[3];return new Ext.lib.Region(t,r,b,l);},isOverTarget:function(pt,_bc,_bd){var loc=this.locationCache[_bc.id];if(!loc||!this.useCache){loc=this.getLocation(_bc);this.locationCache[_bc.id]=loc;}if(!loc){return false;}_bc.cursorIsOver=loc.contains(pt);var dc=this.dragCurrent;if(!dc||!dc.getTargetCoord||(!_bd&&!dc.constrainX&&!dc.constrainY)){return _bc.cursorIsOver;}_bc.overlap=null;var pos=dc.getTargetCoord(pt.x,pt.y);var el=dc.getDragEl();var _c2=new Ext.lib.Region(pos.y,pos.x+el.offsetWidth,pos.y+el.offsetHeight,pos.x);var _c3=_c2.intersect(loc);if(_c3){_bc.overlap=_c3;return (_bd)?true:_bc.cursorIsOver;}else{return false;}},_onUnload:function(e,me){Ext.dd.DragDropMgr.unregAll();},unregAll:function(){if(this.dragCurrent){this.stopDrag();this.dragCurrent=null;}this._execOnAll("unreg",[]);for(i in this.elementCache){delete this.elementCache[i];}this.elementCache={};this.ids={};},elementCache:{},getElWrapper:function(id){var _c7=this.elementCache[id];if(!_c7||!_c7.el){_c7=this.elementCache[id]=new this.ElementWrapper(Ext.getDom(id));}return _c7;},getElement:function(id){return Ext.getDom(id);},getCss:function(id){var el=Ext.getDom(id);return (el)?el.style:null;},ElementWrapper:function(el){this.el=el||null;this.id=this.el&&el.id;this.css=this.el&&el.style;},getPosX:function(el){return Ext.lib.Dom.getX(el);},getPosY:function(el){return Ext.lib.Dom.getY(el);},swapNode:function(n1,n2){if(n1.swapNode){n1.swapNode(n2);}else{var p=n2.parentNode;var s=n2.nextSibling;if(s==n1){p.insertBefore(n1,n2);}else{if(n2==n1.nextSibling){p.insertBefore(n2,n1);}else{n1.parentNode.replaceChild(n2,n1);p.insertBefore(n1,s);}}}},getScroll:function(){var t,l,dde=document.documentElement,db=document.body;if(dde&&(dde.scrollTop||dde.scrollLeft)){t=dde.scrollTop;l=dde.scrollLeft;}else{if(db){t=db.scrollTop;l=db.scrollLeft;}else{}}return {top:t,left:l};},getStyle:function(el,_d7){return Ext.fly(el).getStyle(_d7);},getScrollTop:function(){return this.getScroll().top;},getScrollLeft:function(){return this.getScroll().left;},moveToEl:function(_d8,_d9){var _da=Ext.lib.Dom.getXY(_d9);Ext.lib.Dom.setXY(_d8,_da);},numericSort:function(a,b){return (a-b);},_timeoutCount:0,_addListeners:function(){var DDM=Ext.dd.DDM;if(Ext.lib.Event&&document){DDM._onLoad();}else{if(DDM._timeoutCount>2000){}else{setTimeout(DDM._addListeners,10);if(document&&document.body){DDM._timeoutCount+=1;}}}},handleWasClicked:function(_de,id){if(this.isHandle(id,_de.id)){return true;}else{var p=_de.parentNode;while(p){if(this.isHandle(id,p.id)){return true;}else{p=p.parentNode;}}}return false;}};}();Ext.dd.DDM=Ext.dd.DragDropMgr;Ext.dd.DDM._addListeners();}Ext.dd.DD=function(id,_e2,_e3){if(id){this.init(id,_e2,_e3);}};Ext.extend(Ext.dd.DD,Ext.dd.DragDrop,{scroll:true,autoOffset:function(_e4,_e5){var x=_e4-this.startPageX;var y=_e5-this.startPageY;this.setDelta(x,y);},setDelta:function(_e8,_e9){this.deltaX=_e8;this.deltaY=_e9;},setDragElPos:function(_ea,_eb){var el=this.getDragEl();this.alignElWithMouse(el,_ea,_eb);},alignElWithMouse:function(el,_ee,_ef){var _f0=this.getTargetCoord(_ee,_ef);var fly=Ext.fly(el);if(!this.deltaSetXY){var _f2=[_f0.x,_f0.y];fly.setXY(_f2);var _f3=fly.getLeft(true);var _f4=fly.getTop(true);this.deltaSetXY=[_f3-_f0.x,_f4-_f0.y];}else{fly.setLeftTop(_f0.x+this.deltaSetXY[0],_f0.y+this.deltaSetXY[1]);}this.cachePosition(_f0.x,_f0.y);this.autoScroll(_f0.x,_f0.y,el.offsetHeight,el.offsetWidth);},cachePosition:function(_f5,_f6){if(_f5){this.lastPageX=_f5;this.lastPageY=_f6;}else{var _f7=Ext.lib.Dom.getXY(this.getEl());this.lastPageX=_f7[0];this.lastPageY=_f7[1];}},autoScroll:function(x,y,h,w){if(this.scroll){var _fc=Ext.lib.Dom.getViewWidth();var _fd=Ext.lib.Dom.getViewHeight();var st=this.DDM.getScrollTop();var sl=this.DDM.getScrollLeft();var bot=h+y;var _101=w+x;var _102=(_fc+st-y-this.deltaY);var _103=(_fd+sl-x-this.deltaX);var _104=40;var _105=(document.all)?80:30;if(bot>_fc&&_102<_104){window.scrollTo(sl,st+_105);}if(y<st&&st>0&&y-st<_104){window.scrollTo(sl,st-_105);}if(_101>_fd&&_103<_104){window.scrollTo(sl+_105,st);}if(x<sl&&sl>0&&x-sl<_104){window.scrollTo(sl-_105,st);}}},getTargetCoord:function(_106,_107){var x=_106-this.deltaX;var y=_107-this.deltaY;if(this.constrainX){if(x<this.minX){x=this.minX;}if(x>this.maxX){x=this.maxX;}}if(this.constrainY){if(y<this.minY){y=this.minY;}if(y>this.maxY){y=this.maxY;}}x=this.getTick(x,this.xTicks);y=this.getTick(y,this.yTicks);return {x:x,y:y};},applyConfig:function(){Ext.dd.DD.superclass.applyConfig.call(this);this.scroll=(this.config.scroll!==false);},b4MouseDown:function(e){this.autoOffset(Ext.lib.Event.getPageX(e),Ext.lib.Event.getPageY(e));},b4Drag:function(e){this.setDragElPos(Ext.lib.Event.getPageX(e),Ext.lib.Event.getPageY(e));},toString:function(){return ("DD "+this.id);}});Ext.dd.DDProxy=function(id,_10d,_10e){if(id){this.init(id,_10d,_10e);this.initFrame();}};Ext.dd.DDProxy.dragElId="ygddfdiv";Ext.extend(Ext.dd.DDProxy,Ext.dd.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var self=this;var body=document.body;if(!body||!body.firstChild){setTimeout(function(){self.createFrame();},50);return;}var div=this.getDragEl();if(!div){div=document.createElement("div");div.id=this.dragElId;var s=div.style;s.position="absolute";s.visibility="hidden";s.cursor="move";s.border="2px solid #aaa";s.zIndex=999;body.insertBefore(div,body.firstChild);}},initFrame:function(){this.createFrame();},applyConfig:function(){Ext.dd.DDProxy.superclass.applyConfig.call(this);this.resizeFrame=(this.config.resizeFrame!==false);this.centerFrame=(this.config.centerFrame);this.setDragElId(this.config.dragElId||Ext.dd.DDProxy.dragElId);},showFrame:function(_113,_114){var el=this.getEl();var _116=this.getDragEl();var s=_116.style;this._resizeProxy();if(this.centerFrame){this.setDelta(Math.round(parseInt(s.width,10)/2),Math.round(parseInt(s.height,10)/2));}this.setDragElPos(_113,_114);Ext.fly(_116).show();},_resizeProxy:function(){if(this.resizeFrame){var el=this.getEl();Ext.fly(this.getDragEl()).setSize(el.offsetWidth,el.offsetHeight);}},b4MouseDown:function(e){var x=Ext.lib.Event.getPageX(e);var y=Ext.lib.Event.getPageY(e);this.autoOffset(x,y);this.setDragElPos(x,y);},b4StartDrag:function(x,y){this.showFrame(x,y);},b4EndDrag:function(e){Ext.fly(this.getDragEl()).hide();},endDrag:function(e){var lel=this.getEl();var del=this.getDragEl();del.style.visibility="";lel.style.visibility="hidden";Ext.dd.DDM.moveToEl(lel,del);del.style.visibility="hidden";lel.style.visibility="";},toString:function(){return ("DDProxy "+this.id);}});Ext.dd.DDTarget=function(id,_123,_124){if(id){this.initTarget(id,_123,_124);}};Ext.extend(Ext.dd.DDTarget,Ext.dd.DragDrop,{toString:function(){return ("DDTarget "+this.id);}});
