module.exports = function parseCommit( commit ) {

  commit = commit || '';

  var lines = commit.split( '\n' ).filter( function ( line ) {
    return (line[ 0 ] !== '#');
  } );

  var regex = /^(.*?)\:\s(.+)/;

  var match = lines[ 0 ].match( regex );

  var tag = '';
  var subject = lines[ 0 ];
  var feature = '';
  var body = lines.slice( 2 ).join( '\n' );

  if ( match ) {
    tag = match[ 1 ];
    subject = match[ 2 ];
  }

  var subjectParser = /^\((.*?)\)\s*(.*)/;

  var subjectMatch = subject.trim().match( subjectParser );

  if ( subjectMatch ) {
    feature = subjectMatch[ 1 ];
    subject = subjectMatch[ 2 ] || subject;
  }

  var empty = false;

  if ( lines.length > 0 ) {
    if ( lines.length === 1 && lines[ 0 ].length > 0 ) {
      empty = true;
    }
    if ( lines.length > 1 ) {
      empty = (lines[ 1 ] || '').trim() === '';
    }
  }

  if ( !tag ) {
    if ( subject.match( /^Merge/i ) ) {
      tag = 'MERGE';
    }
    if ( subject.match( /^Revert/i ) ) {
      tag = 'REVERT';
    }
  }

  return {
    originalText: commit,
    emptyLineAfterSubject: empty,
    tag: tag,
    feature: feature,
    subject: subject,
    body: body
  };
};
