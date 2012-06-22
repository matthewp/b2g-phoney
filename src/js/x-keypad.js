(function() {

  var down = function() {
    this.classList.add('selected');
  };

  xtag.register('x-keypad', {

    events: {
      'tap:delegate(x-key)': function(e) {
        this.classList.remove('selected');
      },

      'mousedown:delegate(x-key)': down,
      'touchstart:delegate(x-key)': down,

      'tap': function(e) {
        var val = e.target.dataset.value;

        var evt = new CustomEvent('tap', { 'detail': { 'value': val} });
        this.dispatchEvent(evt);
      }
    }

  });

  xtag.register('x-key', {

  });

})();