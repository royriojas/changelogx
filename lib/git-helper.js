const _exec = require('child_process').exec;
const extend = require('extend');

const exec = (cmd, cb) =>
  _exec(
    cmd,
    {
      maxBuffer: Infinity,
    },
    cb,
  );

const filterTags = (tags, prefix) => {
  if (!prefix) {
    return tags;
  }
  return tags.filter(tag => {
    const regx = new RegExp(`^${prefix}.*$`);
    return regx.test(tag);
  });
};

const validateTags = (tags, range) => {
  if (!range) {
    return tags;
  }
  const oTags = range.split('..');
  if (oTags.length === 1) {
    oTags.unshift('');
  }
  return oTags.reverse();
};

module.exports = {
  getTags(opts) {
    return new Promise((resolve, reject) => {
      exec('git tag --list', (err, stdout /* , stderr */) => {
        if (!err) {
          let tags = stdout
            .split('\n')
            .filter(entry => !!entry)
            .reverse();

          tags = filterTags(tags, opts.tagPrefix);

          tags.push('');
          tags.unshift('HEAD');

          tags = validateTags(tags, opts.tagRange);

          resolve({
            tags,
          });
          return;
        }
        reject(err);
      });
    });
  },
  getCommits(options, { ignoreRegExp, processCommit } = {}) {
    const opts = {
      from: '',
      to: '',
      name: '',
      args: "--pretty=format:'%h$|$%s$|$%b$|$%ct$|$%an$-$-$' --no-merges",
    };

    extend(opts, options);

    let range = opts.from ? `${opts.from}..` : '';
    range += opts.to;

    const gitCmd = `git log ${opts.args} ${range}`;

    const parseLog = require('./log-parser');

    return new Promise((resolve, reject) => {
      exec(gitCmd, (err, stdout) => {
        if (!err) {
          const commits = parseLog(stdout, {
            ignoreRegExp,
            processCommit,
          });
          resolve({
            commits,
          });
          return;
        }
        reject(err);
      });
    });
  },
  getCommitGroups(tags) {
    const groups = [];
    for (let i = 0; i < tags.length; i++) {
      const tagNext = tags[i + 1];
      const currentTag = tags[i];
      const group = {
        name: currentTag,
        from: tagNext,
        to: currentTag,
      };
      typeof tagNext !== 'undefined' && groups.push(group);
    }
    return groups;
  },
};
