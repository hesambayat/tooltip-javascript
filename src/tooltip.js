/*!
 * Tooltip - Javascript 0.1.0 (https://hesambayat.github.io/tooltip-javascript/)
 * Copyright 2017 Hesam Bayat (http://pixudio.com)
 * Licensed under MIT (https://github.com/hesambayat/tooltip/blob/master/LICENSE)
 */
;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function(){ return factory })
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.tooltip = factory();
  }

}(this, function () {

  'use strict';

  /**
  * Create a new tooltip.js instance
  * @constructor tooltip
  * @param {HTMLElement} reference - The reference element used to position the app
  * @param {HTMLElement|Object} app
  *      The HTML element used as app, or a configuration used to generate the app.
  * @param {String} [app.tagName='div'] The tag name of the generated app.
  * @param {Array} [app.classNames=['app']] Array of classes to apply to the generated app.
  */
  function tooltip( elements, options ) {

    if ( !elements ){ return }

    var self = this,
        options = options || {},
        attribute = options.attribute || 'data-tooltip',
        once = options.once || 0,
        n = options.display || 1,
        isTouch = false,
        copies = [],
        tooltips = [];

    self.delay = options.delay || 150;
    self.duration = options.duration || 2500;
    self.offset = options.offsetTop || 0;

    function apply(el) {
      var cls = el.className || '';

      el.tooltipped = 0;
      el.className = ( cls + ' tooltip-on' ).trim();

      if ( isTouch ){

        el.addEventListener('touchstart', function() {
          pop( el );
        }, false);

        el.addEventListener('touchend', function() {
          off();
        }, false);

      } else {

        el.addEventListener('mouseover', function() {
          pop( el );
        }, false);

        el.addEventListener('mouseout', function() {
          off();
        }, false);
      }
    }

    function pop( el, popup, copy, already, rect, doc, top, left, margin ){

      if ( n > -1 ){
        if ( el.tooltipped < n && el.getAttribute(attribute) ) {

          pull();

          self.timeoff = setTimeout(function(){

            copy = el.getAttribute(attribute).trim();

            if ( !copy ) return;

            already = copies.indexOf(copy) !== -1;

            if ( once && already ) return;

            if ( !already ){
              copies.push(copy);
            }

            el.tooltipped++;

            popup = document.createElement('div');
            popup.className = 'tooltip';
            popup.innerHTML = '<span class="tooltip-copy">' + copy + '</span>';
            popup.original = el;

            document.body.appendChild(popup);

            doc = document.body.getBoundingClientRect();
            rect = el.getBoundingClientRect();
            top = ( rect.top - doc.top ) - ( popup.offsetHeight + popup.offsetHeight / 2.5 );

            if ( top < ( window.pageYOffset || document.documentElement.scrollTop ) + self.offset ) {
              top = ( rect.top - doc.top ) + ( rect.height + popup.offsetHeight / 2.5 );

              popup.className += ' tooltip-btm';
            }

            left = ( ( rect.left + doc.left ) + rect.width / 2 ) - popup.offsetWidth / 2;

            if ( left < 0 ){
              left = 0;
            }

            if ( doc.width < left + popup.offsetWidth ){
              margin = left + popup.offsetWidth - doc.width;
              left = left - margin;
            }

            popup.style.top = top + 'px';
            popup.style.left = left + 'px';

            tooltips.push(popup);

            options.onpop ? options.onpop(el, popup): null;

            off();

          }, self.delay);
        }
      }
    }

    function off(){

      clear();
      self.timeoff = setTimeout(pull, self.duration);
    }

    function pull( el ){

      clear();

      if ( !tooltips.length ) return;

      el = tooltips.shift();

      options.ondrop ? options.ondrop(el.original): null;

      el.parentElement.removeChild(el);
    }

    function clear(){
      if ( self.timeoff ) clearTimeout(self.timeoff);
    }

    function init(){

      try{
        isTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
      } catch(e){
        // not a touch device
      }

      if ( -1 !== n ){
        n = !isNaN(parseFloat(n)) && isFinite(n) ? n : -1;
      }

      for( var i = 0, len = elements.length; i < len; i++ ){
        apply( elements[i] );
      }

      window.addEventListener('scroll', pull, false);
      window.addEventListener('resize', pull, false);
      document.addEventListener('click', pull, false);
    }

    // Go!
    init();

    return self;
  }

  tooltip.prototype.set = function(option, value){

    this[option] = value;
  }

  return tooltip;
}));
