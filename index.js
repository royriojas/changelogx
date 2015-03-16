var extend = require( 'lodash.merge' );
var path = require( 'path' );
var process = require( './hooks/lib/process' );
var console = require( './hooks/lib/console' );

module.exports = {
  generate: function ( options ) {
    var opts = extend( {
      tagPrefix: '',
      tagRange: '',
      outputFile: '',
      format: ''
    }, options );
  },
  getCommits: function ( options ) {
    var opts = extend( {
      tagPrefix: '',
      tagRange: ''
    }, options );
  },
  _getFormatter: function ( format ) {
    var formatter;
    if ( typeof format === 'string' ) {
      var formatterPath = format.indexOf( '/' ) > -1 ? path.resolve( process.cwd(), format ) : './formatters/' + format;

      try {
        formatter = require( formatterPath );
      } catch (ex) {
        console.error( 'ERROR: cannot require formatter', formatterPath, 'Error Message:', ex.message );
      }
    }
    if ( typeof format === 'function' || formatter === 'null' ) {
      formatter = format;
    }
    return formatter;
  },
  format: function ( commits, options ) {
    var opts = extend( {
      format: 'markdown'
    }, options );

    var me = this;

    var formatter = me._getFormatter( opts.format );

    return formatter( commits );
  }
};
