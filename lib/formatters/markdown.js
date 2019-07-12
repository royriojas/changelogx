const path = require('path');

const moment = require('moment');
const sFormat = require('stringformat');
const twigRenderer = require('../../lib/twig-renderer');

const changelogRenderer = twigRenderer(path.resolve(__dirname, '../../resources/changelog-markdown.twig'));

module.exports = (data, opts) => {
  const issueMatcher = new RegExp(opts.issueIDRegExp, 'g');
  // console.log('>> here', changelogRenderer);
  return changelogRenderer.render({
    groups: data,
    opts,
    hasCommits(group) {
      const groupCommits = group.commits;
      const keys = Object.keys(groupCommits);
      let hasCommits = false;

      if (keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
          const feature = groupCommits[keys[i]];
          const subkeys = Object.keys(feature);
          for (let idx = 0; idx < subkeys.length; i++) {
            const commits = feature[subkeys[idx]];
            if (commits.length > 0) {
              hasCommits = true;
              break;
            }
          }
        }
      }
      return hasCommits;
    },
    commitURL: opts.commitURL,
    authorURL: opts.authorURL,
    projectName: opts.projectName,
    renderBody(body, times) {
      body = body.replace(issueMatcher, (...args) => {
        const [a, b1] = args;

        const formattedURL = typeof opts.issueIDURL === 'function' ? opts.issueIDURL('body', ...args) : sFormat(opts.issueIDURL, b1);

        return sFormat('<a target="_blank" class="info-link" href="{0}"><span>{1}</span></a>', formattedURL, a);
      });

      const lines = body.split('\n');
      if (lines.length > 1) {
        body = lines.join(`\n${new Array(times + 1).join(' ')}`);
      }

      return body;
    },
    renderDate(timestamp) {
      const dateStr = moment.unix(timestamp).format('DD/MM/YYYY HH:mm:ss');
      return dateStr;
    },
    renderFeature(feature) {
      feature = feature.replace(issueMatcher, (a, b1) => sFormat('[{1}]({0})', sFormat(opts.issueIDURL, b1), a));

      return feature;
    },
    renderDescription(log) {
      const commit = log.commit;
      let shortDescription = commit.shortDescription;

      shortDescription = shortDescription.replace(issueMatcher, (...args) => {
        const [a, b1] = args;
        const formattedURL = typeof opts.issueIDURL === 'function' ? opts.issueIDURL('description', ...args) : sFormat(opts.issueIDURL, b1);

        return sFormat('[{1}]({0})', formattedURL, a);
      });

      return shortDescription; // marked( capitalize( shortDescription ) ).replace( /<(\/)*p>/g, '' );
    },
    format: sFormat,
  });
};
