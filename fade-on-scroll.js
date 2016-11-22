/*!
 * Synchronize opacity with scroll position.
 * @author WebPraktikos <hi@webpraktikos.com> @webpraktikos
 * @version 1.0.1
 * @license MIT License
 */
;(function( window ) {
  'use strict';

  /**
   * Outer function which remembers shared "page container" for all instances.
   * @param {string} _page - Element on which a scroll listener is attached.
   * @return {function} - Inner function.
   */
  window.FadeOnScroll = function( _page ) {
    var page = _page || 'window';

    /**
     * Changes opacity of the element.
     * @param  {array} _elementsArr - Elements and its options.
     */
    var doInstance = function( _elementsArr ) {
      var _arguments = arguments;

      /**
       * Calculates opacity for the specified element based on its position.
       * @param  {string} _element - Element that will change opacity.
       * @param  {object} _options - Custom options for the element.
       * @return {array} - Element and its opacity.
       */
      var getElOpct = function( _element , _options ) {
        var contex , toEnd;
        var element = document.querySelectorAll( _element );

        /** Merges default options with the passed options. */
        var options = extend( {} , defaultOptions );
        if ( _options ) {
          extend( options, _options );
        }

        /** Default options. */
        var defaultOptions = {
          direction: 'bottom',
          waypoint: 'self'
        }

        var inrVpHeight = window.innerHeight,
          elRect = element[0].getBoundingClientRect(),
          elHeight = elRect.height,
          elTopFromVPTop = elRect.top,
          elTopFromVPBtm = inrVpHeight - elTopFromVPTop,
          elBtmFromVPTop = elTopFromVPTop + elHeight;

        if (  options.waypoint.indexOf( '%' ) > -1 ) {
          var inrVpHeightFraction = 100 / parseInt( options.waypoint , 10 );
          contex = inrVpHeight / inrVpHeightFraction.toFixed( 2 );

        } else if ( options.waypoint.indexOf( 'px' ) > -1 ) {
          contex = parseInt( options.waypoint , 10 );

        } else if ( options.waypoint === 'self' ) {
          contex = elHeight;
        }

        if ( options.direction === 'top' ) {
          toEnd = elBtmFromVPTop;
        }

        if ( options.direction === 'bottom' ) {
          toEnd = elTopFromVPBtm;
        }

        if ( options.direction === 'both' ) {
          var toTop = elBtmFromVPTop / contex;
          toEnd = ( toTop <= 1 ) ? elBtmFromVPTop : elTopFromVPBtm;
        }

        var opct = ( toEnd / contex ).toFixed( 2 );

        return [ _element , opct ];
      }

      /**
       * Gets opacity for all elements.
       * @return {array} - Array of arrays made of element and its opacity.
       */
      var getElOpctArr = function() {

        if ( Object.prototype.toString.call( _arguments[0] ) === '[object Array]' ) {

          return _elementsArr.map(function( item ) {

            return getElOpct( item[0] , item[1] );
          });

        } else {

          return [ getElOpct( _arguments[0] , _arguments[1] ) ];
        }
      }

      /** Changes opacity on the specified element or elements. */
      var changeOpct = function() {

        getElOpctArr().forEach(function( item ) {

          Array.prototype.slice.call( document.querySelectorAll( item[0] ) )
            .forEach(function( subItem ) {
              subItem.style.opacity = item[1]
            })
        })
      }

      /** Changes opacity without waiting for scroll. */
      changeOpct();

      var onScroll = function() {
        var container = ( page === 'window' ) ? window : document.querySelector( page );

        container.addEventListener( 'scroll' , function() {
          window.requestAnimationFrame( changeOpct );
        })
      }

      onScroll();
    }

    /**
     * Search for elements with the class name "fade-on-scroll"
     * and apply "doInstance" function on each.
     */
    var initFromHtml = function() {
      var elmsFromHtmlArr = Array.prototype.slice.call( document.querySelectorAll( '.fade-on-scroll' ) )
        .reduce(function( previous , value , index ) {
          previous.push( [ '.' + Array.prototype.slice.call( value.classList ).join( '.' ) + '[data-fos-options]',
          JSON.parse( value.getAttribute( 'data-fos-options' ) ) ] );

          return previous;
        }, [] );

      doInstance( elmsFromHtmlArr );
    }();

    return doInstance;
  }

  /**
   * Utilities and polyfills.
   ****/

  /** Utility function for object merging. */
  function extend( a, b ) {
    for ( var key in b ) {
      if ( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * Polyfill for "requestAnimationFrame".
   */
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for( var x = 0 ; x < vendors.length && ! window.requestAnimationFrame ; ++x ) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if ( ! window.requestAnimationFrame )
      window.requestAnimationFrame = function( callback , element ) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ));
        var id = window.setTimeout(function() { callback( currTime + timeToCall ); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if ( ! window.cancelAnimationFrame )
      window.cancelAnimationFrame = function( id ) {
        clearTimeout( id );
      };
  }());

})( window );
