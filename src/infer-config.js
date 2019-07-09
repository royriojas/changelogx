module.exports = function inferConfig() {
  const readJSON = require('read-json-sync');
  const path = require('path');

  const nodeProcess = require('../hooks/lib/process');
  const parse = require('github-url-from-git');

  const pkg = readJSON(path.resolve(nodeProcess.cwd(), 'package.json'));

  if (typeof pkg.repository === 'string') {
    pkg.repository = {
      url: pkg.repository,
    };
  }

  const repo = pkg.repository || {};
  let url = repo.url || '';
  if (!url) {
    // assume github
    let author = pkg.author;
    if (typeof author === 'object') {
      author = author.name;
    }
    url = `${author}/${pkg.name}`;
  }

  if (!url.match(/^http/) && !url.match(/^git@github\.com/)) {
    url = `git@github.com:${url}`;
  }

  const repoUrl = parse(url);

  return {
    changelogx: {
      ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
      issueIDRegExp: '#(\\d+)',
      commitURL: '[REPO_URL]/commit/{0}'.replace('[REPO_URL]', repoUrl),
      authorURL: 'https://github.com/{0}',
      issueIDURL: '[REPO_URL]/issues/{0}'.replace('[REPO_URL]', repoUrl),
      projectName: pkg.name,
    },
  };
};
