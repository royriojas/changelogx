var objUtil = require( './obj-util' );
var sinon = require( 'sinon' );

if ( !global.__chaiInitialized ) {
  var chai = require( 'chai' );
  chai.use( require( 'sinon-chai' ) );
  chai.use( require( 'chai-fuzzy' ) );
  global.expect = chai.expect;

  global.__chaiInitialized = true;
}

beforeEach( function ( done ) {

  var me = this;
  var sandbox = me.sandbox = sinon.sandbox.create();

  var methods = [
    'stub',
    'spy'
  ];

  var many = function ( type, obj, _methods ) {

    var doubles = {};
    _methods = [].concat( _methods );

    for (var m = 0; m < _methods.length; m++) {
      var method = _methods[ m ];

      // Sinon requires doubling target to exist.
      if ( !objUtil.getKeyValue( obj, method ) ) {
        objUtil.setKeyValue( obj, method, Function.prototype );
      }

      if ( /\./.test( method ) ) { // Ex. 'a.b.c'
        var _methodsParts = method.split( '.' );
        doubles[ method ] = sandbox[ type ](
          objUtil.getKeyValue( obj, _methodsParts.slice( 0, -1 ).join( '.' ) ), // Ex. 'a.b'
          _methodsParts.slice( -1 ) // Ex. 'c'
        );
      } else {
        doubles[ method ] = sandbox[ type ]( obj, method );
      }
    }

    return doubles;
  };

  methods.forEach( function ( type ) {
    sandbox[ type + 'Many' ] = function ( obj, _methods ) {
      return many( type, obj, _methods );
    };
  } );

  sandbox.createSpyObj = function ( name, _methods ) {
    var obj = {};
    obj.__name__ = name;
    sandbox.spyMany( obj, _methods );
    return obj;
  };

  done && done();
} );

afterEach( function ( done ) {
  var me = this;
  me.sandbox.restore && me.sandbox.restore();
  done && done();
} );
