var gitHelper = require( './git-helper' );
var Promise = require( 'es6-promise' ).Promise;

module.exports = {
  getCommits: function ( opts ) {
    var tags = gitHelper.getTags( opts );

    return tags.then( function ( res ) {
      var groups = gitHelper.getCommitGroups( res.tags );

      var groupsPromise = groups.reduce( function ( seq, group ) {
        return seq.then( function () {
          return gitHelper.getCommits( group );
        } ).then( function ( res ) {
          group.commits = res.commits;
        } );
      }, Promise.resolve() );

      return groupsPromise.then( function groupCallback() {
        return groups;
        //grunt.verbose.write( 'groups with commits', groups );

        //var str = opts.renderer( groups );

        //grunt.file.write( me.data.dest, str );
        //grunt.log.ok( 'file created', me.data.dest );
        //done();
      } );
    } );
  }
};
