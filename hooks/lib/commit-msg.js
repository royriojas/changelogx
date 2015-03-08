module.exports = function ( commitMessageFile ) {
  var fs = require( 'fs' );
  var utils = require( './util' );
  var path = require( 'path' );
  var console = require( './console' );

  var nodeProcess = require( './process' );

  var showErrorBlock = utils.showErrorBlock;
  var showTitleBlock = utils.showTitleBlock;
  var showSuccessBlock = utils.showSuccessBlock;

  showTitleBlock( 'Checking commit message' );

  var cfg = require( './hooks-cfg.json' );

  var content = fs.readFileSync( commitMessageFile, {
    encoding: 'utf8'
  } );

  var checkMessage = function ( commitMsg ) {

    var commitTitleMaxLength = cfg.commitTitleMaxLength;

    var commit = require( './parse-commit' )( commitMsg );

    var errorFns = [];

    if ( !commit.emptyLineAfterSubject ) {
      errorFns.push( function () {
        utils.showError( 'Must leave an empty line after the subject' );
      } );
    }

    if ( !/\b(BLD|BUG|FIX|DOC|FEAT|REF|STY|TST|ENH)\b/g.test( commit.tag ) ) {
      errorFns.push( function () {
        utils.showError( 'Please provide a valid tag' );
      } );
    }

    var subject = commit.subject;

    if ( subject.length > commitTitleMaxLength ) {
      errorFns.push( function () {
        utils.showError( 'Please make sure the first line of your message is less than ' + commitTitleMaxLength + ' characters long.' );
        utils.showError( '>>> length:', subject.length, subject, '\n' );
      } );
    }

    return errorFns;
  };

  var errors = checkMessage( content );

  if ( errors.length === 0 ) {
    console.log( 'All good!' );
    showSuccessBlock( 'Commit message is acceptable' );
  } else {
    var text = fs.readFileSync( path.resolve( __dirname, './commit-msg-error.txt' ), {
      encoding: 'utf8'
    } );

    console.error( text.replace('[SUBJECT_LIMIT]', cfg.commitTitleMaxLength) + '\n' );

    errors.forEach( function ( fn ) {
      fn();
    } );

    showErrorBlock( 'Commit message is not acceptable. See message above' );

    nodeProcess.exit( 1 );
  }
};
