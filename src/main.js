var readJSON = require( 'read-json-sync' );
var path = require( 'path' );
var write = require( 'write' ).sync;
var read = require( 'read-file' ).readFileSync;
var gitDir = require( 'git-toplevel' );
var fs = require( 'fs' );

module.exports = {
  commands: {
    'install-hook': function ( cli ) {
      var config = readJSON( path.resolve( __dirname, '../hooks/lib/cfg.json' ) );
      config.maxSubjectLength = cli.opts.maxSubjectLength;

      var hook = read( path.resolve( __dirname, '../hooks/commit-msg.js' ) );

      var helpMessage = read( path.resolve( __dirname, '../hooks/lib/commit-msg-error.txt' ) ).replace( /\n/g, '\\n' );

      hook = hook.replace( /require\(\s*'\.\/lib\/process'\s*\);/g, 'process;' )
        .replace( /require\(\s*'\.\/lib\/cfg\.json'\s*\);/g, JSON.stringify( config, null, 2 ) + ';' )
        .replace( /require\(\s*'\.\/lib\/console'\s*\);/g, 'console;' )
        .replace( /require\(\s*'\.\/lib\/parse-commit'\s*\);/g, require('../hooks/lib/parse-commit').toString())
        .replace( /\[COMMIT_HELP\]/g, helpMessage );

      gitDir().then( function ( dir ) {
        var file = path.resolve( dir, './.git/hooks/commit-msg' );
        cli.subtle( 'Installing `commit-msg` hook to: ', file );
        write( file, hook );
        fs.chmodSync( file, '755' );
        cli.ok( 'Done!' );
      } );
      //console.log(hook);
    },
    log: function (cli) {
      var gitHelper = require('../lib/git-helper');
      var options = {
        tagPrefix: cli.opts.tagPrefix,
        tagRange: cli.opts.tagRange
      };
      var p = gitHelper.getTags(options);

      p.then(function (tags) {
        console.log(tags);
      });
    }
  },
  run: function ( cli ) {
    var me = this;
    var cmd = cli.opts._.join( '' );
    var command = me.commands[ cmd ];

    if ( !command ) {
      command = me.commands.log;
    }

    command && command( cli );
  }
};
