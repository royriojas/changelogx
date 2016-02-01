var Promise = require( 'es6-promise' ).Promise;
var _exec = require( 'child_process' ).exec;
var extend = require( 'extend' );

var exec = function ( cmd, cb ) {
  return _exec( cmd, { maxBuffer: Infinity }, cb );
};

var filterTags = function ( tags, prefix ) {
  if ( !prefix ) {
    return tags;
  }
  return tags.filter( function ( tag ) {
    var regx = new RegExp( '^' + prefix + '.*$' );
    return regx.test( tag );
  } );
};

var validateTags = function ( tags, range ) {
  if ( !range ) {
    return tags;
  }
  var oTags = range.split( '..' );
  if ( oTags.length === 1 ) {
    oTags.unshift( '' );
  }
  return oTags.reverse();
};

module.exports = {
  getTags: function ( opts ) {
    return new Promise( function ( resolve, reject ) {
      exec( 'git for-each-ref --sort=\'-*authordate\' --format=\'%(tag)\' refs/tags', function ( err, stdout /*, stderr */ ) {
        if ( !err ) {
          var tags = stdout.split( '\n' ).filter( function ( entry ) {
            return !!entry;
          } );

          tags = filterTags( tags, opts.tagPrefix );

          tags.push( '' );
          tags.unshift( 'HEAD' );

          tags = validateTags( tags, opts.tagRange );

          resolve( { tags: tags } );
          return;
        }
        reject( { error: err } );
      } );
    } );
  },
  getCommits: function ( options, ignoreRegExp ) {
    var opts = {
      from: '',
      to: '',
      name: '',
      args: '--pretty=format:\'%h$|$%s$|$%b$|$%ct$|$%an$-$-$\' --no-merges'
    };

    extend( opts, options );

    var range = opts.from ? opts.from + '..' : '';
    range = range + opts.to;

    var gitCmd = 'git log ' + opts.args + ' ' + range;

    var parseLog = require( './log-parser' );

    return new Promise( function ( resolve, reject ) {
      exec( gitCmd, function ( err, stdout ) {
        if ( !err ) {
          var commits = parseLog( stdout, { ignoreRegExp: ignoreRegExp } );
          resolve( { commits: commits } );
          return;
        }
        reject( { error: err } );
      } );
    } );
  },
  getCommitGroups: function ( tags ) {
    var groups = [ ];
    for (var i = 0; i < tags.length; i++) {
      var tagNext = tags[ i + 1 ];
      var currentTag = tags[ i ];
      var group = { name: currentTag, from: tagNext, to: currentTag };
      (typeof tagNext !== 'undefined') && groups.push( group );
    }
    return groups;
  }
};
