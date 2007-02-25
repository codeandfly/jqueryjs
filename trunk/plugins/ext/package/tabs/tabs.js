/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.TabPanel=function(_1,_2){this.el=Ext.get(_1,true);if(_2){if(typeof _2=="boolean"){this.tabPosition=_2?"bottom":"top";}else{Ext.apply(this,_2);}}if(this.tabPosition=="bottom"){this.bodyEl=Ext.get(this.createBody(this.el.dom));this.el.addClass("x-tabs-bottom");}this.stripWrap=Ext.get(this.createStrip(this.el.dom),true);this.stripEl=Ext.get(this.createStripList(this.stripWrap.dom),true);this.stripBody=Ext.get(this.stripWrap.dom.firstChild.firstChild,true);if(Ext.isIE){Ext.fly(this.stripWrap.dom.firstChild).setStyle("overflow-x","hidden");}if(this.tabPosition!="bottom"){this.bodyEl=Ext.get(this.createBody(this.el.dom));this.el.addClass("x-tabs-top");}this.items=[];this.bodyEl.setStyle("position","relative");if(!this.items.indexOf){this.items.indexOf=function(o){for(var i=0,_5=this.length;i<_5;i++){if(this[i]==o){return i;}}return -1;};}this.active=null;this.activateDelegate=this.activate.createDelegate(this);this.events={"tabchange":true,"beforetabchange":true};Ext.EventManager.onWindowResize(this.onResize,this);this.cpad=this.el.getPadding("lr");this.hiddenCount=0;};Ext.extend(Ext.TabPanel,Ext.util.Observable,{tabPosition:"top",currentTabWidth:0,minTabWidth:40,maxTabWidth:250,preferredTabWidth:175,resizeTabs:false,monitorResize:true,addTab:function(id,_7,_8,_9){var _a=new Ext.TabPanelItem(this,id,_7,_9);this.addTabItem(_a);if(_8){_a.setContent(_8);}return _a;},getTab:function(id){return this.items[id];},hideTab:function(id){var t=this.items[id];if(!t.isHidden()){t.setHidden(true);this.hiddenCount++;this.autoSizeTabs();}},unhideTab:function(id){var t=this.items[id];if(t.isHidden()){t.setHidden(false);this.hiddenCount--;this.autoSizeTabs();}},addTabItem:function(_10){this.items[_10.id]=_10;this.items.push(_10);if(this.resizeTabs){_10.setWidth(this.currentTabWidth||this.preferredTabWidth);this.autoSizeTabs();}else{_10.autoSize();}if(this.items.length==1){this.activate(_10.id);}},removeTab:function(id){var _12=this.items;var tab=_12[id];if(!tab){return;}var _14=_12.indexOf(tab);if(this.active==tab&&_12.length>1){var _15=this.getNextAvailable(_14);if(_15){_15.activate();}}this.stripEl.dom.removeChild(tab.pnode.dom);if(tab.bodyEl.dom.parentNode==this.bodyEl.dom){this.bodyEl.dom.removeChild(tab.bodyEl.dom);}_12.splice(_14,1);delete this.items[tab.id];tab.fireEvent("close",tab);tab.purgeListeners();this.autoSizeTabs();},getNextAvailable:function(_16){var _17=this.items;var _18=_16;while(_18<_17.length){var _19=_17[++_18];if(_19&&!_19.isHidden()){return _19;}}_18=_16;while(_18>=0){var _19=_17[--_18];if(_19&&!_19.isHidden()){return _19;}}return null;},disableTab:function(id){var tab=this.items[id];if(tab&&this.active!=tab){tab.disable();}},enableTab:function(id){var tab=this.items[id];tab.enable();},activate:function(id){var tab=this.items[id];if(!tab){return null;}if(tab==this.active){return tab;}var e={};this.fireEvent("beforetabchange",this,e,tab);if(e.cancel!==true&&!tab.disabled){if(this.active){this.active.hide();}this.active=this.items[id];this.active.show();this.fireEvent("tabchange",this,this.active);}return tab;},getActiveTab:function(){return this.active;},syncHeight:function(_21){var _22=(_21||this.el.getHeight())-this.el.getBorderWidth("tb")-this.el.getPadding("tb");var bm=this.bodyEl.getMargins();var _24=_22-(this.stripWrap.getHeight()||0)-(bm.top+bm.bottom);this.bodyEl.setHeight(_24);return _24;},onResize:function(){if(this.monitorResize){this.autoSizeTabs();}},beginUpdate:function(){this.updating=true;},endUpdate:function(){this.updating=false;this.autoSizeTabs();},autoSizeTabs:function(){var _25=this.items.length;var _26=_25-this.hiddenCount;if(!this.resizeTabs||_25<1||_26<1||this.updating){return;}var w=Math.max(this.el.getWidth()-this.cpad,10);var _28=Math.floor(w/_26);var b=this.stripBody;if(b.getWidth()>w){var _2a=this.items;this.setTabWidth(Math.max(_28,this.minTabWidth)-2);if(_28<this.minTabWidth){}}else{if(this.currentTabWidth<this.preferredTabWidth){this.setTabWidth(Math.min(_28,this.preferredTabWidth)-2);}}},getCount:function(){return this.items.length;},setTabWidth:function(_2b){this.currentTabWidth=_2b;for(var i=0,len=this.items.length;i<len;i++){if(!this.items[i].isHidden()){this.items[i].setWidth(_2b);}}},destroy:function(_2e){Ext.EventManager.removeResizeListener(this.onResize,this);for(var i=0,len=this.items.length;i<len;i++){this.items[i].purgeListeners();}if(_2e===true){this.el.update("");this.el.remove();}}});Ext.TabPanelItem=function(_31,id,_33,_34){this.tabPanel=_31;this.id=id;this.disabled=false;this.text=_33;this.loaded=false;this.closable=_34;this.bodyEl=Ext.get(_31.createItemBody(_31.bodyEl.dom,id));this.bodyEl.setVisibilityMode(Ext.Element.VISIBILITY);this.bodyEl.setStyle("display","block");this.bodyEl.setStyle("zoom","1");this.hideAction();var els=_31.createStripElements(_31.stripEl.dom,_33,_34);this.el=Ext.get(els.el,true);this.inner=Ext.get(els.inner,true);this.textEl=Ext.get(this.el.dom.firstChild.firstChild.firstChild,true);this.pnode=Ext.get(els.el.parentNode,true);this.el.on("click",this.onTabClick,this);if(_34){var c=Ext.get(els.close,true);c.dom.title=this.closeText;c.addClassOnOver("close-over");c.on("click",this.closeClick,this);}this.events={"activate":true,"beforeclose":true,"close":true,"deactivate":true};this.hidden=false;};Ext.extend(Ext.TabPanelItem,Ext.util.Observable,{purgeListeners:function(){Ext.util.Observable.prototype.purgeListeners.call(this);this.el.removeAllListeners();},show:function(){this.pnode.addClass("on");this.showAction();if(Ext.isOpera){this.tabPanel.stripWrap.repaint();}this.fireEvent("activate",this.tabPanel,this);},isActive:function(){return this.tabPanel.getActiveTab()==this;},hide:function(){this.pnode.removeClass("on");this.hideAction();this.fireEvent("deactivate",this.tabPanel,this);},hideAction:function(){this.bodyEl.hide();this.bodyEl.setStyle("position","absolute");this.bodyEl.setLeft("-20000px");this.bodyEl.setTop("-20000px");},showAction:function(){this.bodyEl.setStyle("position","relative");this.bodyEl.setTop("");this.bodyEl.setLeft("");this.bodyEl.show();},setTooltip:function(_37){this.textEl.dom.title=_37;},onTabClick:function(e){e.preventDefault();this.tabPanel.activate(this.id);},getWidth:function(){return this.inner.getWidth();},setWidth:function(_39){var _3a=_39-this.pnode.getPadding("lr");this.inner.setWidth(_3a);this.textEl.setWidth(_3a-this.inner.getPadding("lr"));this.pnode.setWidth(_39);},setHidden:function(_3b){this.hidden=_3b;this.pnode.setStyle("display",_3b?"none":"");},isHidden:function(){return this.hidden;},getText:function(){return this.text;},autoSize:function(){this.el.beginMeasure();this.textEl.setWidth(1);this.setWidth(this.textEl.dom.scrollWidth+this.pnode.getPadding("lr")+this.inner.getPadding("lr"));this.el.endMeasure();},setText:function(_3c){this.text=_3c;this.textEl.update(_3c);this.textEl.dom.title=_3c;if(!this.tabPanel.resizeTabs){this.autoSize();}},activate:function(){this.tabPanel.activate(this.id);},disable:function(){if(this.tabPanel.active!=this){this.disabled=true;this.pnode.addClass("disabled");}},enable:function(){this.disabled=false;this.pnode.removeClass("disabled");},setContent:function(_3d,_3e){this.bodyEl.update(_3d,_3e);},getUpdateManager:function(){return this.bodyEl.getUpdateManager();},setUrl:function(url,_40,_41){if(this.refreshDelegate){this.un("activate",this.refreshDelegate);}this.refreshDelegate=this._handleRefresh.createDelegate(this,[url,_40,_41]);this.on("activate",this.refreshDelegate);return this.bodyEl.getUpdateManager();},_handleRefresh:function(url,_43,_44){if(!_44||!this.loaded){var _45=this.bodyEl.getUpdateManager();_45.update(url,_43,this._setLoaded.createDelegate(this));}},refresh:function(){if(this.refreshDelegate){this.loaded=false;this.refreshDelegate();}},_setLoaded:function(){this.loaded=true;},closeClick:function(e){var o={};this.fireEvent("beforeclose",this,o);if(o.cancel!==true){this.tabPanel.removeTab(this.id);}},closeText:"Close this tab"});Ext.TabPanel.prototype.createStrip=function(_48){var _49=document.createElement("div");_49.className="x-tabs-wrap";_48.appendChild(_49);return _49;};Ext.TabPanel.prototype.createStripList=function(_4a){_4a.innerHTML="<div class=\"x-tabs-strip-wrap\"><table class=\"x-tabs-strip\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody><tr></tr></tbody></table></div>";return _4a.firstChild.firstChild.firstChild.firstChild;};Ext.TabPanel.prototype.createBody=function(_4b){var _4c=document.createElement("div");Ext.id(_4c,"tab-body");Ext.fly(_4c).addClass("x-tabs-body");_4b.appendChild(_4c);return _4c;};Ext.TabPanel.prototype.createItemBody=function(_4d,id){var _4f=Ext.getDom(id);if(!_4f){_4f=document.createElement("div");_4f.id=id;}Ext.fly(_4f).addClass("x-tabs-item-body");_4d.insertBefore(_4f,_4d.firstChild);return _4f;};Ext.TabPanel.prototype.createStripElements=function(_50,_51,_52){var td=document.createElement("td");_50.appendChild(td);if(_52){td.className="x-tabs-closable";if(!this.closeTpl){this.closeTpl=new Ext.Template("<a href=\"#\" class=\"x-tabs-right\"><span class=\"x-tabs-left\"><em class=\"x-tabs-inner\">"+"<span unselectable=\"on\" title=\"{text}\" class=\"x-tabs-text\">{text}</span>"+"<div unselectable=\"on\" class=\"close-icon\">&#160;</div></em></span></a>");}var el=this.closeTpl.overwrite(td,{"text":_51});var _55=el.getElementsByTagName("div")[0];var _56=el.getElementsByTagName("em")[0];return {"el":el,"close":_55,"inner":_56};}else{if(!this.tabTpl){this.tabTpl=new Ext.Template("<a href=\"#\" class=\"x-tabs-right\"><span class=\"x-tabs-left\"><em class=\"x-tabs-inner\">"+"<span unselectable=\"on\" title=\"{text}\" class=\"x-tabs-text\">{text}</span></em></span></a>");}var el=this.tabTpl.overwrite(td,{"text":_51});var _56=el.getElementsByTagName("em")[0];return {"el":el,"inner":_56};}};

