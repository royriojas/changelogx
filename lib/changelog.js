const gitHelper = require('./git-helper');

module.exports = {
  getCommits(opts) {
    const tags = gitHelper.getTags(opts);

    return tags.then(res => {
      const groups = gitHelper.getCommitGroups(res.tags);

      const groupsPromise = groups.reduce(
        (seq, group) =>
          seq
            .then(() => gitHelper.getCommits(group, opts))
            .then(_res => {
              group.commits = _res.commits;
            }),
        Promise.resolve(),
      );

      return groupsPromise.then(() => groups);
    });
  },
};
