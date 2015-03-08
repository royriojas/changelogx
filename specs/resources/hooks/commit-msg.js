var proxyquire = require( 'proxyquire' ).noCallThru().noPreserveCache();
var path = require( 'path' );
var fs = require( 'fs' );

var loadFileSync = function ( file ) {
  return fs.readFileSync( file, {
    encoding: 'utf8'
  } );
};

describe( 'commit-msg', function () {
  beforeEach( function () {

    var me = this;
    me.mockProcess = me.sandbox.createSpyObj( 'process', [
      'exit'
    ] );
    me.mockLog = me.sandbox.createSpyObj( 'log', [
      'log',
      'error'
    ] );
    me.mockUtil = me.sandbox.createSpyObj( 'util', [
      'createStream',
      'showTitleBlock',
      'showErrorBlock',
      'showError',
      'showSuccessBlock'
    ] );

  } );

  afterEach( function () {} );

  it( 'should validate a commit message with a feature', function () {
    var me = this;
    var mockFs = {
      readFileSync: function ( file /*, opts */ ) {
        if ( file === 'commitFile' ) {
          return loadFileSync( path.resolve( __dirname, '../../fixtures/commits/good-commit-feature.txt' ) );
        }
      }
    };

    me.sandbox.spy( mockFs, 'readFileSync' );
    var exitSpy = me.mockProcess.exit;

    var commitMessage = proxyquire( '../../../resources/hooks/lib/commit-msg.js', {
      fs: mockFs,
      './process': me.mockProcess,
      './console': me.mockLog,
      './util': me.mockUtil
    } );

    commitMessage( 'commitFile' );

    expect( exitSpy ).to.not.have.been.called;

  } );

  it( 'should validate a commit message with a feature', function () {
    var me = this;
    var mockFs = {
      readFileSync: function ( file /*, opts */ ) {
        if ( file === 'commitFile' ) {
          return loadFileSync( path.resolve( __dirname, '../../fixtures/commits/good-commit-no-feature.txt' ) );
        }
      }
    };

    me.sandbox.spy( mockFs, 'readFileSync' );

    var commitMessage = proxyquire( '../../../resources/hooks/lib/commit-msg.js', {
      fs: mockFs,
      './process': me.mockProcess,
      './console': me.mockLog,
      './util': me.mockUtil
    } );

    commitMessage( 'commitFile' );

    expect( me.mockProcess.exit ).to.not.have.been.called;

  } );

  it( 'should fail if a commit message does not have a tag', function () {
    var me = this;
    var mockFs = {
      readFileSync: function ( file /*, opts */ ) {
        if ( file === 'commitFile' ) {
          return loadFileSync( path.resolve( __dirname, '../../fixtures/commits/bad-commit-no-tag.txt' ) );
        }
      }
    };

    me.sandbox.spy( mockFs, 'readFileSync' );

    var commitMessage = proxyquire( '../../../resources/hooks/lib/commit-msg.js', {
      fs: mockFs,
      './process': me.mockProcess,
      './console': me.mockLog,
      './util': me.mockUtil
    } );

    commitMessage( 'commitFile' );

    expect( me.mockProcess.exit ).to.have.been.calledWith( 1 );

  } );

  it( 'should fail if a commit message is too long', function () {
    var me = this;
    var mockFs = {
      readFileSync: function ( file /*, opts */ ) {
        if ( file === 'commitFile' ) {
          return loadFileSync( path.resolve( __dirname, '../../fixtures/commits/bad-commit-too-long.txt' ) );
        }
      }
    };

    me.sandbox.spy( mockFs, 'readFileSync' );

    var commitMessage = proxyquire( '../../../resources/hooks/lib/commit-msg.js', {
      fs: mockFs,
      './process': me.mockProcess,
      './console': me.mockLog,
      './util': me.mockUtil
    } );

    commitMessage( 'commitFile' );

    expect( me.mockProcess.exit ).to.have.been.calledWith( 1 );

  } );

  it( 'should fail if a commit message contains an invalid tag', function () {
    var me = this;
    var mockFs = {
      readFileSync: function ( file ) {
        if ( file === 'commitFile' ) {
          return loadFileSync( path.resolve( __dirname, '../../fixtures/commits/bad-commit-invalid-tag.txt' ) );
        }
      }
    };

    me.sandbox.spy( mockFs, 'readFileSync' );

    var commitMessage = proxyquire( '../../../resources/hooks/lib/commit-msg.js', {
      fs: mockFs,
      './process': me.mockProcess,
      './console': me.mockLog,
      './util': me.mockUtil
    } );

    commitMessage( 'commitFile' );

    expect( me.mockProcess.exit ).to.have.been.calledWith( 1 );

  } );

  it( 'should fail if a commit message does not contain a separation line', function () {
    var me = this;
    var mockFs = {
      readFileSync: function ( file, opts ) {
        if ( file === 'commitFile' ) {
          return loadFileSync( path.resolve( __dirname, '../../fixtures/commits/bad-commit-no-new-line.txt' ) );
        } else {
          return fs.readFileSync( file, opts );
        }
      }
    };

    me.sandbox.spy( mockFs, 'readFileSync' );

    var commitMessage = proxyquire( '../../../resources/hooks/lib/commit-msg.js', {
      fs: mockFs,
      './process': me.mockProcess,
      './console': me.mockLog,
      './util': me.mockUtil
    } );

    commitMessage( 'commitFile' );
    expect( me.mockProcess.exit ).to.have.been.calledWith( 1 );

  } );
} );
