/*
 * Ext - JS Library 1.0 Alpha 2
 * Copyright(c) 2006-2007, Jack Slocum.
 * 
 * http://www.extjs.com/license.txt
 */

Ext.form.Field = function(config){
    Ext.form.Field.superclass.constructor.call(this, config);
    this.addEvents({
        focus : true,
        blur : true,
        specialkey: true
    });
};

Ext.extend(Ext.form.Field, Ext.Component,  {
    invalidClass : "x-form-invalid",
    invalidText : "The value in this field is invalid",
    focusClass : "x-form-focus",
    validationEvent : "keyup",
    validationDelay : 250,
    defaultAutoCreate : {tag: "input", type: "text", size: "20", autocomplete: "off"},
    fieldClass: "x-form-field",
    hasFocus : false,

    onRender : function(ct){
        if(this.el){
            this.el = Ext.get(this.el);
            ct.dom.appendChild(this.el.dom);
        }else {
            var cfg = typeof this.autoCreate == "object" ?
                      this.autoCreate : this.defaultAutoCreate;
            this.el = ct.createChild(cfg);
        }
        if(this.width || this.height){
            this.setSize(this.width || "", this.height || "");
        }
        if(this.style){
            this.el.applyStyles(this.style);
            delete this.style;
        }
        this.el.addClass([this.fieldClass, this.cls]);
    },

    afterRender : function(){
        this.initEvents();
    },

    fireKey : function(e){
        if(e.isNavKeyPress()){
            this.fireEvent("specialkey", this, e);
        }
    },

    initEvents : function(){
        this.el.on(Ext.isIE ? "keydown" : "keypress", this.fireKey,  this);
        this.el.on("focus", this.onFocus,  this);
        this.el.on("blur", this.onBlur,  this);
    },

    onFocus : function(){
        if(!Ext.isOpera){ // don't touch in Opera
            this.el.addClass(this.focusClass);
        }
        this.hasFocus = true;
        this.fireEvent("focus", this);
    },

    onBlur : function(){
        this.el.removeClass(this.focusClass);
        this.hasFocus = false;
        if(this.validationEvent != "blur"){
            this.validate();
        }
        this.fireEvent("blur", this);
    },

    setSize : function(w, h){
        this.el.setSize(w, h);
        var h = this.el.dom.offsetHeight; // force browser recalc
    },

    isValid : function(){
        return this.validateValue(this.getValue());
    },

    validate : function(){
        if(this.validateValue(this.getValue())){
            this.clearInvalid();
        }
    },

    validateValue : function(value){
        return true;
    },
    
    markInvalid : function(msg){
        this.el.addClass(this.invalidClass);
        this.el.dom.title = (msg || this.invalidText);
    },

    clearInvalid : function(){
        this.el.removeClass(this.invalidClass);
        this.el.dom.title = "";
    },

    getValue : function(){
        return this.el.getValue();
    },

    setValue : function(v){
        this.el.dom.value = v;
        this.validate();
    }
});