var twigRenderer = require( '../../lib/twig-renderer' );
var path = require( 'path' );
var changelogRenderer = twigRenderer( path.resolve( __dirname, '../../resources/changelog.twig' ) );
var moment = require( 'moment' );
var sFormat = require( 'stringformat' );
var capitalize = require( 'lodash.capitalize' );
var marked = require( 'marked' );

module.exports = function ( data, opts ) {
  var issueMatcher = new RegExp( opts.issueIDRegExp, 'g' );
  //console.log('>> here', changelogRenderer);
  return changelogRenderer.render( {
    groups: data,
    opts: opts,
    hasCommits: function ( group ) {
      var groupCommits = group.commits;
      var keys = Object.keys( groupCommits );
      var hasCommits = false;

      if ( keys.length > 0 ) {
        for (var i = 0; i < keys.length; i++) {
          var feature = groupCommits[ keys[ i ] ];
          var subkeys = Object.keys( feature );
          for (var idx = 0; idx < subkeys.length; i++) {
            var commits = feature[ subkeys[ idx ] ];
            if ( commits.length > 0 ) {
              hasCommits = true;
              break;
            }
          }
        }
      }
      return hasCommits;
    },
    commitURL: opts.commitURL,
    authorURL: opts.authorURL,
    projectName: opts.projectName,
    renderBody: function ( body ) {

      body = body.replace( issueMatcher, function ( a, b1 ) {
        return sFormat( '<a target="_blank" class="info-link" href="{0}"><span>{1}</span></a>', sFormat( opts.issueIDURL, b1 ), a );
      } );

      return marked( body );
    },
    renderDate: function ( timestamp ) {
      var dateStr = moment.unix( timestamp ).format( 'DD/MM/YYYY HH:mm:ss' );
      return dateStr;
    },
    renderFeature: function ( feature ) {
      feature = feature.replace( issueMatcher, function ( a, b1 ) {
        return sFormat( '<a target="_blank" class="info-link" href="{0}"><span>{1}</span></a>', sFormat( opts.issueIDURL, b1 ), a );
      } );

      return marked( capitalize( feature ) ).replace( /<(\/)*p>/g, '' );
    },
    renderDescription: function ( log ) {

      var commit = log.commit;
      var shortDescription = commit.shortDescription;

      shortDescription = shortDescription.replace( issueMatcher, function ( a, b1 ) {
        return sFormat( '<a target="_blank" class="info-link" href="{0}"><span>{1}</span></a>', sFormat( opts.issueIDURL, b1 ), a );
      } );

      return marked( capitalize( shortDescription ) ).replace( /<(\/)*p>/g, '' );
    },
    format: sFormat
  } );
};
