(function() {

  var replaceAt = function(str, index, ch) {
    return str.substr(0, index) + ch + str.substr(index + ch.length);
  };

  xtag.register('x-callingnumber', {

    onCreate: function() {
      if(!this.dataset.format) {
        this.dataset.format = '+# (###) ###-####';
      }

      if(this.dataset.number) {
        this.xtag.format();
      } else {
        this.dataset.number = "";
      }
    },

    methods: {
      add: function(digit) {
        this.dataset.number += digit;

        this.xtag.format();
      },

      format: function() {
        var number = this.dataset.number,
            value = this.dataset.format,
            last;

        for(var i = number.length - 1; i >= 0; i--) {
          var digit = number[i];

          last = value.lastIndexOf('#');

          value = replaceAt(value, last, digit);
        }

        // Calculate where/if we need to trim.
        value = value.replace(/[#]/g, '');

        last = value.search(/\d/);
        var trim = last,
            prior = value[last - 1];

        if(prior === '+' || prior === '(') {
          trim = last - 1;
        }

        value = value.substring(trim);

        this.textContent = value;
      }
    }

  });
})();