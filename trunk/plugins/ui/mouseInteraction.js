(function($) {
	
	var num = function(el, prop) {
		return parseInt($.css(el.jquery?el[0]:el,prop))||0;
	};
	
	$.ui.mouseInteraction = function(el,o) {
	
		if(!o) var o = {};
		this.element = el;
		
		this.options = {};
		$.extend(this.options, o);
		o = this.options; //Just Lazyness
		
		if(o.helper == 'clone' || o.helper == 'original') {

			// Let's save the margins for better reference
			o.margins = {
				top: num(el,'marginTop'),
				left: num(el,'marginLeft'),
				bottom: num(el,'marginBottom'),
				right: num(el,'marginRight')
			};

			// We have to add margins to our cursorAt
			if(o.cursorAt.top != 0) o.cursorAt.top += o.margins.top;
			if(o.cursorAt.left != 0) o.cursorAt.left += o.margins.left;
			if(o.cursorAt.bottom != 0) o.cursorAt.bottom += o.margins.bottom;
			if(o.cursorAt.right != 0) o.cursorAt.right += o.margins.right;
			
			if(o.helper == 'original')
				o.wasPositioned = $(el).css('position');
			
		} else {
			o.margins = { top: 0, left: 0, right: 0, bottom: 0 };
		}
		
		var self = this;
		this.mousedownfunc = function(e) { // Bind the mousedown event
			return self.click.apply(self, [e]);	
		}
		o.handle.bind('mousedown', this.mousedownfunc);
		
		//Prevent selection of text when starting the drag in IE
		if($.browser.msie) $(this.element).attr('unselectable', 'on');
		
	}
	
	$.extend($.ui.mouseInteraction.prototype, {
		plugins: {},
		pos: null,
		opos: null,
		currentTarget: null,
		lastTarget: null,
		helper: null,
		timer: null,
		slowMode: false,
		element: null,
		init: false,
		destroy: function() {
			this.options.handle.unbind('mousedown', this.mousedownfunc);
		},
		click: function(e) {

			window.focus();
			if(e.which != 1) return true; //only left click starts dragging
		
			// Prevent execution on defined elements
			var targetName = (e.target) ? e.target.nodeName.toLowerCase() : e.srcElement.nodeName.toLowerCase();
			for(var i=0;i<this.options.dragPrevention.length;i++) {
				if(targetName == this.options.dragPrevention[i]) return true;
			}

			var self = this;
			this.mouseup = function(e) {
					return self.stop.apply(self, [e]);
			}
			this.mousemove = function(e) {
					return self.drag.apply(self, [e]);
			}
			
			var initFunc = function() { //This function get's called at bottom or after timeout
	
				$(document).bind('mouseup', self.mouseup);
				$(document).bind('mousemove', self.mousemove);

				self.opos = $.ui.getPointer(e); // Get the original mouse position

			}
			
			if(this.options.preventionTimeout) { //use prevention timeout
				if(this.timer) clearInterval(this.timer);
				this.timer = setTimeout(function() { initFunc(); }, this.options.preventionTimeout);
				return false;
			}
		
			initFunc();
			return false;
			
		},
		start: function(e) {
			
			var o = this.options;
			o.curOffset = $(this.element).offset({ border: false }); //get the current offset
				
			if(typeof o.helper == 'function') { //If helper is a function, use the node returned by it
				this.helper = o.helper.apply(this.element, [e]);
			} else { //No custom helper
				if(o.helper == 'clone') this.helper = $(this.element).clone()[0];
				if(o.helper == 'original') this.helper = this.element;
			}
			
			if(o.appendTo == 'parent') { // Let's see if we have a positioned parent
				var curParent = this.element.parentNode;
				while (curParent) {
					if(curParent.style && ($(curParent).css('position') == 'relative' || $(curParent).css('position') == 'absolute')) {
						o.pp = curParent;
						o.po = $(curParent).offset({ border: false });
						o.ppOverflow = !!($(o.pp).css('overflow') == 'auto' || $(o.pp).css('overflow') == 'scroll'); //TODO!
						break;	
					}
					curParent = curParent.parentNode ? curParent.parentNode : null;
				};
				
				if(!o.pp) o.po = { top: 0, left: 0 };
			}
			
			this.pos = [this.opos[0],this.opos[1]]; //Use the actual clicked position
			
			if(o.cursorAtIgnore) { // If we want to pick the element where we clicked, we borrow cursorAt and add margins
				o.cursorAt.left = this.pos[0] - o.curOffset.left + o.margins.left;
				o.cursorAt.top = this.pos[1] - o.curOffset.top + o.margins.top;
			}

			//Save the real mouse position
			this.rpos = [this.pos[0],this.pos[1]];
			
			if(o.pp) { // If we have a positioned parent, we pick the draggable relative to it
				this.pos[0] -= o.po.left;
				this.pos[1] -= o.po.top;
			}
			
			this.slowMode = (o.cursorAt && (o.cursorAt.top-o.margins.top > 0 || o.cursorAt.bottom-o.margins.bottom > 0) && (o.cursorAt.left-o.margins.left > 0 || o.cursorAt.right-o.margins.right > 0)) ? true : false; //If cursorAt is within the helper, set slowMode to true

			$(this.helper).css('left', o.curOffset.left+'px').css('top', o.curOffset.top+'px').css('position', 'absolute');
			if(o.helper != 'original') $(this.helper).appendTo((o.appendTo == 'parent' ? this.element.parentNode : o.appendTo));

			// Remap right/bottom properties for cursorAt to left/top
			if(o.cursorAt.right && !o.cursorAt.left) o.cursorAt.left = this.helper.offsetWidth+o.margins.right+o.margins.left - o.cursorAt.right;
			if(o.cursorAt.bottom && !o.cursorAt.top) o.cursorAt.top = this.helper.offsetHeight+o.margins.top+o.margins.bottom - o.cursorAt.bottom;
		
			this.init = true;	

			if(o.onStart) o.onStart.apply(this.element, [this.helper, this.pos, o.cursorAt, this]); // Trigger the onStart callback
			return false;
						
		},
		stop: function(e) {			
			
			var o = this.options;
			
			var self = this;
			$(document).unbind('mouseup', self.mouseup);
			$(document).unbind('mousemove', self.mousemove);

			if(this.init == false)
				return this.opos = this.pos = null;
			
			if(o.beforeStop) o.onStop.apply(this.element, [this.helper, this.pos, o.cursorAt, this]);

				
			if(this.helper != this.element && !o.beQuietAtEnd) { // Remove helper, if it's not the original node
				$(this.helper).remove();
				this.helper = null;
			}
			
			if(!o.beQuietAtEnd && o.wasPositioned)
				$(this.element).css('position', o.wasPositioned);
				
			if(!o.beQuietAtEnd && o.onStop) o.onStop.apply(this.element, [this.helper, this.pos, o.cursorAt, this]);

			this.init = false;
			this.opos = this.pos = $.ui.ddmanager.current = null; // Clear temp variables
			return false;
			
		},
		drag: function(e) {

			if ($.browser.msie && !e.button) return this.stop.apply(this, [e]); // check for IE mouseup when moving into the document again
			var o = this.options;
			
			this.pos = $.ui.getPointer(e); //relative mouse position
			//We can stop here if it's not a actual new position (FF issue)
			if(this.rpos && this.rpos[0] == this.pos[0] && this.rpos[1] == this.pos[1]) return false;
			this.rpos = [this.pos[0],this.pos[1]]; //absolute mouse position
			
			if(o.pp) { //If we have a positioned parent, use a relative position
				this.pos[0] -= o.po.left;
				this.pos[1] -= o.po.top;	
			}
			
			if( (Math.abs(this.rpos[0]-this.opos[0]) > o.preventionDistance || Math.abs(this.rpos[1]-this.opos[1]) > o.preventionDistance) && this.init == false) //If position is more than x pixels from original position, start dragging
				this.start.apply(this,[e]);			
			else {
				if(this.init == false) return false;
			}
		
			if(o.onDrag) o.onDrag.apply(this.element, [this.helper, this.pos, o.cursorAt, this]);
			return false;
			
		}
	});

 })($);
