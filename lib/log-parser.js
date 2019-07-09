const shouldIgnoreCommit = (subjectToParse, ignoreRegExpStr) => {
  const ignoreRegExp = ignoreRegExpStr ? new RegExp(ignoreRegExpStr, 'gi') : null;
  if (ignoreRegExp && !!subjectToParse.match(ignoreRegExp)) {
    // console.log('ignoring commit : ', subjectToParse);
    return true;
  }
  return false;
};

const checkIfIgnoreCommit = (subjectToParse, opts) => {
  const regexps = opts.ignoreRegExp || [];
  return regexps.reduce((seq, regex) => seq || shouldIgnoreCommit(subjectToParse, regex), false);
};

module.exports = (content, options) => {
  const extend = require('extend');
  const opts = extend({
    ignoreRegExp: '',
  });

  extend(opts, options);

  content = content || '';
  const lines = content.split('$-$-$');

  const tagNames = require('../hooks/lib/cfg.json').tags;

  const parseSubject = subject => {
    const subj = require('../hooks/lib/parse-commit')(subject);

    let tag = subj.tag || 'NC';

    // FIX is a better prefix than bug. But since we were currently using
    // BUG as a prefix, this fix is required to support both
    if (tag === 'FIX') {
      tag = 'BUG';
    }

    let foundTag = tagNames[(tag || '').trim().toUpperCase()];

    if (!foundTag) {
      tag = 'NC';
      foundTag = 'Other changes';
    }

    const parsedSubject = {
      tagId: tag,
      tagName: foundTag,
      feature: subj.feature,
      shortDescription: subj.subject,
    };

    return parsedSubject;
  };

  const groups = {};

  // skip empty lines
  lines
    .filter(line => !!(line || '').trim())
    .forEach(line => {
      const parts = line.split('$|$');

      let sha1 = parts[0] || '';

      sha1 = sha1.replace('\n', '');
      const subjectToParse = parts[1];

      let entry = {
        hash: sha1,
        commit: parseSubject(subjectToParse),
        subject: subjectToParse,
        body: parts[2],
        timestamp: parseInt(parts[3], 10),
        author: parts[4],
      };

      if (checkIfIgnoreCommit(subjectToParse, opts) || (opts.ignoreCommit && opts.ignoreCommit(entry))) {
        return;
      }

      if (opts.processCommit) {
        entry = opts.processCommit(entry, { commitTags: tagNames });
      }

      const entryCommit = entry.commit;

      const feature = entryCommit.feature || 'Uncategorized';

      if (sha1) {
        const featureGroup = (groups[feature] = groups[feature] || {});
        const tagGroup = (featureGroup[entryCommit.tagName] = featureGroup[entryCommit.tagName] || []);
        tagGroup.push(entry);
      }
    });

  return groups;
};
