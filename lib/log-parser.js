var shouldIgnoreCommit = function ( subjectToParse, ignoreRegExpStr ) {
  var ignoreRegExp = ignoreRegExpStr ? new RegExp( ignoreRegExpStr, 'gi' ) : null;
  if ( ignoreRegExp && !!subjectToParse.match( ignoreRegExp ) ) {
    //console.log('ignoring commit : ', subjectToParse);
    return true;
  }
  return false;
};

var checkIfIgnoreCommit = function ( subjectToParse, opts ) {
  var regexps = opts.ignoreRegExp || [ ];
  return regexps.reduce( function ( seq, regex ) {
    return seq || shouldIgnoreCommit( subjectToParse, regex );
  }, false );
};

module.exports = function ( content, options ) {
  var extend = require( 'extend' );
  var opts = extend( { ignoreRegExp: '' } );

  extend( opts, options );

  content = content || '';
  var lines = content.split( '$-$-$' );

  var tagNames = require( '../hooks/lib/cfg.json' ).tags;

  var parseSubject = function ( subject ) {

    var subj = require( '../hooks/lib/parse-commit' )( subject );

    var tag = subj.tag || 'NC';

    // FIX is a better prefix than bug. But since we were currently using
    // BUG as a prefix, this fix is required to support both
    if ( tag === 'FIX' ) {
      tag = 'BUG';
    }

    var foundTag = tagNames[ tag ];

    var parsedSubject = {
      tagId: tag,
      tagName: foundTag,
      feature: subj.feature,
      shortDescription: subj.subject
    };

    return parsedSubject;
  };

  var groups = { };

  // skip empty lines
  lines.filter( function ( line ) {
    return !!(line || '').trim();
  } ).forEach( function ( line ) {

    var parts = line.split( '$|$' );

    var sha1 = parts[ 0 ] || '';

    sha1 = sha1.replace( '\n', '' );
    var subjectToParse = parts[ 1 ];

    var entry = {
      hash: sha1,
      commit: parseSubject( subjectToParse ),
      subject: subjectToParse,
      body: parts[ 2 ],
      timestamp: parseInt( parts[ 3 ], 10 ),
      author: parts[ 4 ]
    };

    var entryCommit = entry.commit;

    if ( checkIfIgnoreCommit( subjectToParse, opts ) ) {
      return;
    }

    var feature = entryCommit.feature || 'Uncategorized';

    if ( sha1 ) {
      var featureGroup = groups[ feature ] = groups[ feature ] || { };
      var tagGroup = featureGroup[ entryCommit.tagName ] = featureGroup[ entryCommit.tagName ] || [];
      tagGroup.push( entry );
    }

  } );

  return groups;
};
