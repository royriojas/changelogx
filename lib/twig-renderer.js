module.exports = function ( file ) {

  var twig = require( 'twig' ).twig;

  var page = twig( { path: file, async: false } );

  return {
    render: function ( data ) {
      return page.render( { it: data } );
    }
  };
};
