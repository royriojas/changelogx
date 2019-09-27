module.exports = (opts, reporterOpts) => {
  const cLog = require('./lib/changelog');
  const options = {
    tagPrefix: opts.tagPrefix || reporterOpts.tagPrefix,
    tagRange: opts.tagRange || reporterOpts.tagRange,
    // use the value from the config or from the cli interface. Cli interface has
    // preference over the config one
    ignoreRegExp: opts.ignoreRegExp || reporterOpts.ignoreRegExp,
    processCommit: reporterOpts.processCommit,
    processTags: reporterOpts.processTags,
  };

  const p = cLog.getCommits(options);

  return p.then(data => {
    const formatter = require(`./lib/formatters/${opts.format}`);
    return formatter(data, reporterOpts);
  });
};
