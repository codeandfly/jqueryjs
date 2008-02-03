(function($) {

  $.ec.bounce = function(o) {

    return this.queue(function() {

      // Create element
      var el = $(this), props = ['position','top','left'];

      // Set options
      var mode = o.options.mode || 'effect'; // Default Mode
      var direction = o.options.direction || 'up'; // Default direction
      var distance = o.options.distance || 20; // Default distance
      var times = o.options.times || 5; // Default # of times
      var speed = o.options.duration || 250; // Default speed per bounce
      if (/show|hide/.test(mode)) props.push('opacity'); // Avoid touching opacity to prevent clearType and PNG issues in IE

      // Adjust
      $.ec.save(el, props); el.show(); // Save & Show
      $.ec.createWrapper(el); // Create Wrapper
      var ref = (direction == 'up' || direction == 'down') ? 'top' : 'left';
      var motion = (direction == 'up' || direction == 'left') ? 'pos' : 'neg';
      var distance = o.options.distance || (ref == 'top' ? el.outerHeight({margin:true}) / 3 : el.outerWidth({margin:true}) / 3);
      if (mode == 'show') el.css('opacity', 0).css(ref, motion == 'pos' ? -distance : distance); // Shift
      if (mode == 'hide') distance = distance / (times * 2);
      if (mode != 'hide') times--;
      
      // Animate
      if (mode == 'show') { // Show Bounce
        var animation = {opacity: 1};
        animation[ref] = (motion == 'pos' ? '+=' : '-=') + distance;
        el.animate(animation, speed / 2, o.options.easing);
        distance = distance / 2;
        times--;
      };
      for (var i = 0; i < times; i++) { // Bounces
        var animation1 = {}, animation2 = {};
        animation1[ref] = (motion == 'pos' ? '-=' : '+=') + distance;
        animation2[ref] = (motion == 'pos' ? '+=' : '-=') + distance;
        el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing);
        distance = (mode == 'hide') ? distance * 2 : distance / 2;
      };
      if (mode == 'hide') { // Last Bounce
        var animation = {opacity: 0};
        animation[ref] = (motion == 'pos' ? '-=' : '+=')  + distance;
        el.animate(animation, speed / 2, o.options.easing, function(){
          el.hide(); // Hide
          $.ec.restore(el, props); $.ec.removeWrapper(el); // Restore
          if(o.callback) o.callback.apply(this, arguments); // Callback
        });
      } else {
        var animation1 = {}, animation2 = {};
        animation1[ref] = (motion == 'pos' ? '-=' : '+=') + distance;
        animation2[ref] = (motion == 'pos' ? '+=' : '-=') + distance;
        el.animate(animation1, speed / 2, o.options.easing).animate(animation2, speed / 2, o.options.easing, function(){
          $.ec.restore(el, props); $.ec.removeWrapper(el); // Restore
          if(o.callback) o.callback.apply(this, arguments); // Callback
        });
      };
      el.queue('fx', function() { el.dequeue(); });
      el.dequeue();
    });
    
  };

})(jQuery);