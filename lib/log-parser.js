module.exports = function ( content ) {
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

  var groups = {};

  lines.forEach( function ( line ) {
    var parts = line.split( '$|$' );

    var sha1 = parts[ 0 ] || '';

    sha1 = sha1.replace( '\n', '' );

    var entry = {
      hash: sha1,
      commit: parseSubject( parts[ 1 ] ),
      subject: parts[ 1 ],
      body: parts[ 2 ],
      timestamp: parseInt( parts[ 3 ], 10 ),
      author: parts[ 4 ]
    };

    var entryCommit = entry.commit;
    var feature = entryCommit.feature || 'Uncategorized';

    if ( sha1 ) {
      var featureGroup = groups[ feature ] = groups[ feature ] || {};
      var tagGroup = featureGroup[ entryCommit.tagName ] = featureGroup[ entryCommit.tagName ] || [];
      tagGroup.push( entry );
    }

  } );

  return groups;
};
