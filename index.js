module.exports = function ( opts, reporterOpts ) {
  var cLog = require( './lib/changelog' );
  var options = {
    tagPrefix: opts.tagPrefix,
    tagRange: opts.tagRange,
    // use the value from the config or from the cli interface. Cli interface has
    // preference over the config one
    ignoreRegExp: opts.ignoreRegExp || reporterOpts.ignoreRegExp
  };

  var p = cLog.getCommits( options );

  return p.then( function ( data ) {
    var formatter = require( './lib/formatters/' + opts.format );
    return formatter( data, reporterOpts );
  } );
};
