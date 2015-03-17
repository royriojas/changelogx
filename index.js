module.exports = function ( opts, reporterOpts ) {
  var cLog = require( './lib/changelog' );
  var options = {
    tagPrefix: opts.tagPrefix,
    tagRange: opts.tagRange
  };

  var p = cLog.getCommits( options );

  return p.then( function ( data ) {
    var formatter = require( './lib/formatters/' + opts.format );
    return formatter( data, reporterOpts );
  } );
};
