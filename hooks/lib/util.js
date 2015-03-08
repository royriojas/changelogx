var Stream = require( 'stream' );
var nodeProcess = require( './process' );
var console = require( './console' );

module.exports = {
  createStream: function () {
    var stream = new Stream();
    stream.writable = true;
    var first = true;
    stream.write = function ( data ) {

      if ( first ) {
        first = false;
        data = '  ' + data;
      }

      data = data.replace( /\n/g, '\n  ' );
      nodeProcess.stdout.write( data );

    };
    stream.end = function () {
      // closed
    };
    return stream;
  },
  showTitleBlock: function ( message, prefix ) {
    message = message || '';
    prefix = prefix || '';

    var messageLength = message.trim().length;
    if ( messageLength > 0 ) {
      message = prefix ? prefix + ': ' + message : message;
      messageLength = message.length;
      var dividerString = new Array( messageLength + 11 ).join( '=' );
      console.log( '\n\x1B[33m\x1B[1m' + dividerString );
      console.log( '==== \x1B[1m' + message + ' ====' );
      console.log( dividerString + '\n\x1B[22m\x1B[39m' );
    }
  },
  showErrorBlock: function ( message, prefix ) {
    message = message || '';
    prefix = (typeof prefix === 'undefined' || prefix === null) ? 'ERROR: ' : prefix;

    var messageLength = message.trim().length;
    if ( messageLength > 0 ) {
      message = prefix + message;
      messageLength = message.length;
      var dividerString = new Array( messageLength + 11 ).join( '#' );
      console.error( '\n\x1B[31m\x1B[1m' + dividerString );
      console.error( '#### ' + message + ' ####' );
      console.error( dividerString + '\x1B[22m\n\x1B[39m' );
    }
  },
  showError: function ( message, prefix ) {
    message = message || '';
    prefix = prefix || 'ERROR';

    var messageLength = message.trim().length;

    if ( messageLength > 0 ) {
      message = prefix + ': ' + message;
      console.error( '\x1B[31m\x1B[1m' + message + '\x1B[22m\n\x1B[39m' );
    }
  },
  showSuccessBlock: function ( message, prefix ) {
    message = message || '';
    prefix = prefix || '';

    var messageLength = message.trim().length;
    if ( messageLength > 0 ) {
      message = prefix ? prefix + ': ' + message : message;
      messageLength = message.length;
      var dividerString = new Array( messageLength + 11 ).join( '=' );
      console.log( '\n\x1B[32m\x1B[1m' + dividerString );
      console.log( '==== \x1B[1m' + message + ' ====' );
      console.log( dividerString + '\n\x1B[22m\x1B[39m' );
    }
  }
};
