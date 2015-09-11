describe( 'infer-config', function () {
  var proxyquire = require( 'proxyquire' ).noCallThru().noPreserveCache();

  it( 'should return a default config based on the package.json on the current working directory', function () {
    var inferConfig = proxyquire( '../../src/infer-config', {
      '../hooks/lib/process': {
        cwd: function () {
          return 'specs/fixtures/pkgs/repository';
        }
      }
    } );

    var cfg = inferConfig();
    expect( cfg ).to.deep.equal( {
      changelogx: {
        'ignoreRegExp': [
          'BLD: Release',
          'DOC: Generate Changelog',
          'Generated Changelog'
        ],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/user/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/user/demo-name/issues/{0}',
        projectName: 'demo-name'
      }
    } );
  } );

  it( 'should return a default config based on the package.json even when no `repository.url` is provided', function () {
    var inferConfig = proxyquire( '../../src/infer-config', {
      '../hooks/lib/process': {
        cwd: function () {
          return 'specs/fixtures/pkgs/no-repo-url';
        }
      }
    } );

    var cfg = inferConfig();
    expect( cfg ).to.deep.equal( {
      changelogx: {
        'ignoreRegExp': [
          'BLD: Release',
          'DOC: Generate Changelog',
          'Generated Changelog'
        ],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/demo-name/issues/{0}',
        projectName: 'demo-name'
      }
    } );
  } );

  it( 'should return a default config based on the package.json even when no `repository` is provided', function () {
    var inferConfig = proxyquire( '../../src/infer-config', {
      '../hooks/lib/process': {
        cwd: function () {
          return 'specs/fixtures/pkgs/no-repository';
        }
      }
    } );

    var cfg = inferConfig();
    expect( cfg ).to.deep.equal( {
      changelogx: {
        'ignoreRegExp': [
          'BLD: Release',
          'DOC: Generate Changelog',
          'Generated Changelog'
        ],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/demo-name/issues/{0}',
        projectName: 'demo-name'
      }
    } );
  } );

  it( 'should return a default config based on the package.json even when no `repository` is provided', function () {
    var inferConfig = proxyquire( '../../src/infer-config', {
      '../hooks/lib/process': {
        cwd: function () {
          return 'specs/fixtures/pkgs/git';
        }
      }
    } );

    var cfg = inferConfig();
    expect( cfg ).to.deep.equal( {
      changelogx: {
        'ignoreRegExp': [
          'BLD: Release',
          'DOC: Generate Changelog',
          'Generated Changelog'
        ],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/some/repo/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/some/repo/issues/{0}',
        projectName: 'demo-name'
      }
    } );
  } );

  it( 'should return a default config based on the package.json even when `repository` is provided as string', function () {
    var inferConfig = proxyquire( '../../src/infer-config', {
      '../hooks/lib/process': {
        cwd: function () {
          return 'specs/fixtures/pkgs/repo-with-author-as-object';
        }
      }
    } );

    var cfg = inferConfig();
    expect( cfg ).to.deep.equal( {
      changelogx: {
        'ignoreRegExp': [
          'BLD: Release',
          'DOC: Generate Changelog',
          'Generated Changelog'
        ],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/file-entry-cache/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/file-entry-cache/issues/{0}',
        projectName: 'file-entry-cache'
      }
    } );
  } );

  it( 'should return a default config based on the package.json even when no `repository` is provided and author is an object', function () {
    var inferConfig = proxyquire( '../../src/infer-config', {
      '../hooks/lib/process': {
        cwd: function () {
          return 'specs/fixtures/pkgs/no-repository-author-object';
        }
      }
    } );

    var cfg = inferConfig();
    expect( cfg ).to.deep.equal( {
      changelogx: {
        'ignoreRegExp': [
          'BLD: Release',
          'DOC: Generate Changelog',
          'Generated Changelog'
        ],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/demo-name/issues/{0}',
        projectName: 'demo-name'
      }
    } );
  } );


} );
