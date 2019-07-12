const gitHelper = require('./git-helper');

module.exports = {
  async getCommits(opts) {
    const { tags } = await gitHelper.getTags(opts);

    const groups = gitHelper.getCommitGroups(tags);

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
  },
};
