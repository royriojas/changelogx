module.exports = function () {
  var childProcess = require( 'child_process' );
  var spawn = childProcess.spawn;
  var exec = childProcess.exec;

  var utils = require( './util.js' );
  var cfg = require( './hooks-cfg.json' );

  var nodeProcess = require( './process' );
  var console = require( './console' );

  var showErrorBlock = utils.showErrorBlock;
  var showTitleBlock = utils.showTitleBlock;
  var showSuccessBlock = utils.showSuccessBlock;

  // hooks are always executed from the root
  // directory of the git repo (the one where .git/ lives in)
  nodeProcess.chdir( cfg.pathToSource );

  exec( 'which grunt', function ( err, stdout /*, stderr */ ) {
    if ( err ) {
      console.log( 'grunt not found. Prepush hook will be ignored', err );
      return;
    }
    if ( stdout && stdout.length > 0 ) { // grunt exits

      showTitleBlock( 'Validation Hook Started' );

      var cp = spawn( 'grunt', [
        'prepush'
      ], {
        stdio: 'inherit'
      } );

      cp.on( 'close', function ( code ) {
        if ( code !== 0 ) {
          showErrorBlock( ' Review your errors and try again ', 'VALIDATION FAILED :' );
          nodeProcess.exit( 1 );
        } else {
          showSuccessBlock( 'Validation Hook Completed!.' );
        }
      } );

    } else {
      console.log( 'It seems you don\'t have `grunt` in your system. No checks will be done. Pray you don\'t break things, and the build goes green' );
    }
  } );
};
