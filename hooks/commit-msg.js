#!/usr/bin/env node
var nProcess = require( './lib/process' );
var nConsole = require( './lib/console' );
var hookCfg = require( './lib/cfg.json' );
var parseCommit = require( './lib/parse-commit' );

var commitMsg = module.exports = {
  _cfg: hookCfg,
  _getCommitErrorMessage: function () {
    return '[COMMIT_HELP]';
  },
  _ok: function () {
    var args = [ ].slice.call( arguments );
    args.unshift( '\x1B[33m\x1B[1m' );
    args.push( '\x1B[22m\x1B[39m' );

    nConsole.log.apply( nConsole, args );
  },
  _log: function () {
    var args = [ ].slice.call( arguments );
    args.unshift( '\x1B[90m\x1B[1m' );
    args.push( '\x1B[22m\x1B[39m' );

    nConsole.log.apply( nConsole, args );
  },
  _error: function () {
    var args = [ ].slice.call( arguments );
    args.unshift( '\x1B[31m\x1B[1m' );
    args.push( '\x1B[22m\x1B[39m' );

    nConsole.error.apply( nConsole, args );
  },
  _parseCommit: parseCommit,
  _checkMessage: function ( _commitMsg ) {

    var me = this;
    var cfg = me._cfg;
    var maxSubjectLength = cfg.maxSubjectLength;

    var commit = me._parseCommit( _commitMsg );

    var errorFns = [ ];

    if ( !commit.emptyLineAfterSubject ) {
      errorFns.push( function () {
        me._error( '- Must leave an empty line after the subject' );
      } );
    }

    var tag = me._cfg.tags[ commit.tag ];

    if ( !tag ) {
      errorFns.push( function () {
        me._error( '- Please provide a valid tag' );
      } );
    }

    var subject = commit.subject;

    if ( subject.length > maxSubjectLength ) {
      errorFns.push( function () {
        me._error( '- Please make sure the first line of your message is less than ' + maxSubjectLength + ' characters long.' );
        me._error( '  current length:', subject.length, subject, '\n' );
      } );
    }

    return errorFns;
  },
  _exit: function () {
    nProcess.exit( 1 );
  },
  check: function ( commitMessageFile ) {
    var me = this;
    if ( !commitMessageFile ) {
      me._error( '>> No Commit Message File Found. Stopping <<' );
      me._exit();
      return;
    }

    var fs = require( 'fs' );

    me._log( '\n>>>>> Commit message check start <<<<<' );

    var cfg = me._cfg;

    var content = fs.readFileSync( commitMessageFile, {
      encoding: 'utf8'
    } );

    var errors = me._checkMessage( content );

    if ( errors.length === 0 ) {
      me._log( '\n>>>>> All good. Commit Message is valid <<<<<\n' );
    } else {
      var text = me._getCommitErrorMessage();
      me._log( text.replace( '[SUBJECT_LIMIT]', cfg.maxSubjectLength ), '\n' );

      me._error( '>>>>> Commit message is not valid <<<<<' );
      errors.forEach( function ( fn ) {
        fn();
      } );

      me._exit();
    }
  }
};

commitMsg.check( nProcess.argv[ 2 ] );
