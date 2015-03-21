module.exports = function () {
  var readJSON = require( 'read-json-sync' );
  var path = require( 'path' );

  var nodeProcess = require( '../hooks/lib/process' );
  var parse = require( 'github-url-from-git' );

  var pkg = readJSON( path.resolve( nodeProcess.cwd(), 'package.json' ) );
  //console.log( 'pkg', pkg.repository );
  var repo = pkg.repository || {};
  var url = repo.url || '';
  if ( !url ) {
    // assume github
    url = pkg.author + '/' + pkg.name;
  }

  if ( !url.match( /^http/ ) && !url.match( /^git@github\.com/ ) ) {
    url = 'git@github.com:' + url;
  }

  var repoUrl = parse( url );

  return {
    'changelogx': {
      'issueIDRegExp': '#(\\d+)',
      'commitURL': '[REPO_URL]/commit/{0}'.replace( '[REPO_URL]', repoUrl ),
      'authorURL': 'https://github.com/{0}',
      'issueIDURL': '[REPO_URL]/issues/{0}'.replace( '[REPO_URL]', repoUrl ),
      'projectName': pkg.name
    }
  };
};
