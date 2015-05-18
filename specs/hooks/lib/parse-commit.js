describe( 'parse-commit', function () {

  var parseCommit = require( '../../../hooks/lib/parse-commit' );

  it( 'should parse a commit', function () {

    var result = parseCommit( 'BLD: (Some Feature) Fix for DE1222' );

    expect( result ).to.be.like( {
      originalText: 'BLD: (Some Feature) Fix for DE1222',
      emptyLineAfterSubject: true,
      tag: 'BLD',
      feature: 'Some Feature',
      subject: 'Fix for DE1222',
      body: ''
    } );
  } );

  it( 'should not fail in case of an empty commit', function () {
    var result = parseCommit( '' );

    expect( result ).to.be.like( {
      originalText: '',
      emptyLineAfterSubject: false,
      tag: '',
      feature: '',
      subject: '',
      body: ''
    } );

  } );

  it( 'should parse a commit without a feature', function () {
    var result = parseCommit( 'BLD: Fix for DE1222' );

    expect( result ).to.be.like( {
      originalText: 'BLD: Fix for DE1222',
      emptyLineAfterSubject: true,
      tag: 'BLD',
      feature: '',
      subject: 'Fix for DE1222',
      body: ''
    } );
  } );

  it( 'should parse a commit with no description part', function () {
    var result = parseCommit( 'BLD: (some feature)' );

    expect( result ).to.be.like( {
      originalText: 'BLD: (some feature)',
      emptyLineAfterSubject: true,
      tag: 'BLD',
      feature: 'some feature',
      subject: '(some feature)',
      body: ''
    } );
  } );

  it( 'should parse a commit with a body', function () {
    var result = parseCommit( 'BLD: (some feature)    fix for something important DE1231\n\nThe Body will be here' );

    expect( result ).to.be.like( {
      originalText: 'BLD: (some feature)    fix for something important DE1231\n\nThe Body will be here',
      emptyLineAfterSubject: true,
      tag: 'BLD',
      feature: 'some feature',
      subject: 'fix for something important DE1231',
      body: 'The Body will be here'
    } );
  } );

  it( 'should parse a commit with tag FEATURE', function () {

    var result = parseCommit( 'FEAT: (install-hooks) better parsing of the commit messages' );

    expect( result ).to.be.like( {
      originalText: 'FEAT: (install-hooks) better parsing of the commit messages',
      emptyLineAfterSubject: true,
      tag: 'FEAT',
      feature: 'install-hooks',
      subject: 'better parsing of the commit messages',
      body: ''
    } );
  } );

  it( 'should parse an automatic commit for merge and infer the tag as MERGE', function () {
    var result = parseCommit( 'Merge branch `some branch`' );

    expect( result ).to.be.like( {
      originalText: 'Merge branch `some branch`',
      emptyLineAfterSubject: true,
      tag: 'MERGE',
      feature: '',
      subject: 'Merge branch `some branch`',
      body: ''
    } );
  } );

  it( 'should parse an automatic commit for revert and infer the tag as REVERT', function () {
    var result = parseCommit( 'Revert some potential dangerours commit' );

    expect( result ).to.be.like( {
      originalText: 'Revert some potential dangerours commit',
      emptyLineAfterSubject: true,
      tag: 'REVERT',
      feature: '',
      subject: 'Revert some potential dangerours commit',
      body: ''
    } );
  } );

} );
