/**
 * The `build-workflow` module
 * @module build-workflow
 */

/**
 *
 * Module with utilities to set and retrieve values on an object using a `path`
 * @class objUtil
 * @static
 */
var objUtil = {
  /**
   * Returns the value from the given object which matches the passed key
   *
   * @method getKeyValue
   * @param obj {Object} The object to get the values from
   * @param key {String} a string representing a key in the object. Subkeys are supported
   * separating them with dots. i.e. `key1.subkey1.subsubkey1`
   * @returns {Mixed} the value of the given key in the passed obj
   * @example
   * ```javascript
   * var objUtil = require('obj-util');
   *
   * var obj = {
   *   some: {
   *     key: 'some value'
   *   }
   * };
   *
   * objUtil.getKeyValue(obj, 'some.key'); // 'some value'
   *
   * ```
   */
  getKeyValue: function ( obj, key ) {
    if ( !obj ) {
      return null;
    }

    var temp = obj,
      keys = key.split( '.' );

    for (var ix = 0; ix < keys.length; ix++) {
      var theKey = keys[ ix ];
      temp = temp[ theKey ];
      if ( typeof temp === 'undefined' || temp === null ) {
        temp = null;
        break;
      }
    }
    return temp;
  },
  /**
   * Sets a value in an object if a matching key is found inside the given object
   *
   * @method setKeyValue
   * @param obj {Object} the object where to set the value using if the key is found
   * @param key {String} a string that represents the key. Subkeys are supported by separating them with dots.
   * @param val the value to be set in the object
   * @example
   * ```javascript
   * var objUtil = require('obj-util');
   *
   * var obj = {
   * };
   * objUtil.setKeyValue(obj, 'some.key', 'some value');
   * obj.some.key === 'some value' //==> true
   * ```
   */
  setKeyValue: function ( obj, key, val ) {
    if ( !obj ) {
      return;
    }

    var temp = obj,
      keys = key.split( '.' );

    for (var ix = 0, len = keys.length; ix < len; ix++) {
      var theKey = keys[ ix ],
        t = temp[ theKey ];

      if ( typeof t === 'undefined' || t === null ) {
        var isPrevLast = (ix < len - 1);

        temp[ theKey ] = isPrevLast ? {} : val;

        if ( isPrevLast ) {
          temp = temp[ theKey ];
        }
      } else {
        if ( ix < len ) {
          temp = t;
        }
      }
    }
  }
};

module.exports = objUtil;
