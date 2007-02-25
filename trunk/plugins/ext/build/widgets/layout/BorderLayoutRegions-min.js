/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.CenterLayoutRegion=function(_1,_2){Ext.CenterLayoutRegion.superclass.constructor.call(this,_1,_2,"center");this.visible=true;this.minWidth=_2.minWidth||20;this.minHeight=_2.minHeight||20;};Ext.extend(Ext.CenterLayoutRegion,Ext.LayoutRegion,{hide:function(){},show:function(){},getMinWidth:function(){return this.minWidth;},getMinHeight:function(){return this.minHeight;}});Ext.NorthLayoutRegion=function(_3,_4){Ext.NorthLayoutRegion.superclass.constructor.call(this,_3,_4,"north","n-resize");if(this.split){this.split.placement=Ext.SplitBar.TOP;this.split.orientation=Ext.SplitBar.VERTICAL;this.split.el.addClass("x-layout-split-v");}var _5=_4.initialSize||_4.height;if(typeof _5!="undefined"){this.el.setHeight(_5);}};Ext.extend(Ext.NorthLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.VERTICAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var _6=this.el.getBox();if(this.split){_6.height+=this.split.el.getHeight();}return _6;},updateBox:function(_7){if(this.split&&!this.collapsed){_7.height-=this.split.el.getHeight();this.split.el.setLeft(_7.x);this.split.el.setTop(_7.y+_7.height);this.split.el.setWidth(_7.width);}if(this.collapsed){this.updateBody(_7.width,null);}Ext.NorthLayoutRegion.superclass.updateBox.call(this,_7);}});Ext.SouthLayoutRegion=function(_8,_9){Ext.SouthLayoutRegion.superclass.constructor.call(this,_8,_9,"south","s-resize");if(this.split){this.split.placement=Ext.SplitBar.BOTTOM;this.split.orientation=Ext.SplitBar.VERTICAL;this.split.el.addClass("x-layout-split-v");}var _a=_9.initialSize||_9.height;if(typeof _a!="undefined"){this.el.setHeight(_a);}};Ext.extend(Ext.SouthLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.VERTICAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var _b=this.el.getBox();if(this.split){var sh=this.split.el.getHeight();_b.height+=sh;_b.y-=sh;}return _b;},updateBox:function(_d){if(this.split&&!this.collapsed){var sh=this.split.el.getHeight();_d.height-=sh;_d.y+=sh;this.split.el.setLeft(_d.x);this.split.el.setTop(_d.y-sh);this.split.el.setWidth(_d.width);}if(this.collapsed){this.updateBody(_d.width,null);}Ext.SouthLayoutRegion.superclass.updateBox.call(this,_d);}});Ext.EastLayoutRegion=function(_f,_10){Ext.EastLayoutRegion.superclass.constructor.call(this,_f,_10,"east","e-resize");if(this.split){this.split.placement=Ext.SplitBar.RIGHT;this.split.orientation=Ext.SplitBar.HORIZONTAL;this.split.el.addClass("x-layout-split-h");}var _11=_10.initialSize||_10.width;if(typeof _11!="undefined"){this.el.setWidth(_11);}};Ext.extend(Ext.EastLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.HORIZONTAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var box=this.el.getBox();if(this.split){var sw=this.split.el.getWidth();box.width+=sw;box.x-=sw;}return box;},updateBox:function(box){if(this.split&&!this.collapsed){var sw=this.split.el.getWidth();box.width-=sw;this.split.el.setLeft(box.x);this.split.el.setTop(box.y);this.split.el.setHeight(box.height);box.x+=sw;}if(this.collapsed){this.updateBody(null,box.height);}Ext.EastLayoutRegion.superclass.updateBox.call(this,box);}});Ext.WestLayoutRegion=function(mgr,_17){Ext.WestLayoutRegion.superclass.constructor.call(this,mgr,_17,"west","w-resize");if(this.split){this.split.placement=Ext.SplitBar.LEFT;this.split.orientation=Ext.SplitBar.HORIZONTAL;this.split.el.addClass("x-layout-split-h");}var _18=_17.initialSize||_17.width;if(typeof _18!="undefined"){this.el.setWidth(_18);}};Ext.extend(Ext.WestLayoutRegion,Ext.SplitLayoutRegion,{orientation:Ext.SplitBar.HORIZONTAL,getBox:function(){if(this.collapsed){return this.collapsedEl.getBox();}var box=this.el.getBox();if(this.split){box.width+=this.split.el.getWidth();}return box;},updateBox:function(box){if(this.split&&!this.collapsed){var sw=this.split.el.getWidth();box.width-=sw;this.split.el.setLeft(box.x+box.width);this.split.el.setTop(box.y);this.split.el.setHeight(box.height);}if(this.collapsed){this.updateBody(null,box.height);}Ext.WestLayoutRegion.superclass.updateBox.call(this,box);}});
