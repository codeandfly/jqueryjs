/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.grid.AbstractGridView=function(){this.grid=null;this.events={"beforerowremoved":true,"beforerowsinserted":true,"beforerefresh":true,"rowremoved":true,"rowsinserted":true,"rowupdated":true,"refresh":true};};Ext.extend(Ext.grid.AbstractGridView,Ext.util.Observable,{rowClass:"x-grid-row",cellClass:"x-grid-cell",tdClass:"x-grid-td",hdClass:"x-grid-hd",splitClass:"x-grid-hd-split",init:function(_1){this.grid=_1;var _2=this.grid.container.id;this.colSelector="#"+_2+" ."+this.cellClass+"-";this.tdSelector="#"+_2+" ."+this.tdClass+"-";this.hdSelector="#"+_2+" ."+this.hdClass+"-";this.splitSelector="#"+_2+" ."+this.splitClass+"-";},getColumnRenderers:function(){var _3=[];var cm=this.grid.colModel;var _5=cm.getColumnCount();for(var i=0;i<_5;i++){_3[i]=cm.getRenderer(i);}return _3;},getColumnIds:function(){var _7=[];var cm=this.grid.colModel;var _9=cm.getColumnCount();for(var i=0;i<_9;i++){_7[i]=cm.getColumnId(i);}return _7;},buildIndexMap:function(){var _b={};var _c={};var cm=this.grid.colModel;var dm=this.grid.dataSource;for(var i=0,len=cm.getColumnCount();i<len;i++){var di=cm.getDataIndex(i);var _12=dm.getIndex(di);_b[i]=_12;_c[_12]=i;}return {"colToData":_b,"dataToCol":_c};},getDataIndexes:function(){if(!this.indexMap){this.indexMap=this.buildIndexMap();}return this.indexMap.colToData;},getColumnIndexByDataIndex:function(_13){if(!this.indexMap){this.indexMap=this.buildIndexMap();}return this.indexMap.dataToCol[_13];},setCSSStyle:function(_14,_15,_16){var _17="#"+this.grid.id+" .x-grid-col-"+_14;Ext.util.CSS.updateRule(_17,_15,_16);},generateRules:function(cm){var _19=[];for(var i=0,len=cm.getColumnCount();i<len;i++){var cid=cm.getColumnId(i);_19.push(this.colSelector,cid," {\n",cm.config[i].css,"}\n",this.tdSelector,cid," {\n}\n",this.hdSelector,cid," {\n}\n",this.splitSelector,cid," {\n}\n");}return Ext.util.CSS.createStyleSheet(_19.join(""));}});
