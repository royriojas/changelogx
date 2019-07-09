describe('infer-config', () => {
  const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();

  it('should return a default config based on the package.json on the current working directory', () => {
    const inferConfig = proxyquire('../../src/infer-config', {
      '../hooks/lib/process': {
        cwd() {
          return 'specs/fixtures/pkgs/repository';
        },
      },
    });

    const cfg = inferConfig();
    expect(cfg).to.deep.equal({
      changelogx: {
        ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/user/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/user/demo-name/issues/{0}',
        projectName: 'demo-name',
      },
    });
  });

  it('should return a default config based on the package.json even when no `repository.url` is provided', () => {
    const inferConfig = proxyquire('../../src/infer-config', {
      '../hooks/lib/process': {
        cwd() {
          return 'specs/fixtures/pkgs/no-repo-url';
        },
      },
    });

    const cfg = inferConfig();
    expect(cfg).to.deep.equal({
      changelogx: {
        ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/demo-name/issues/{0}',
        projectName: 'demo-name',
      },
    });
  });

  it('should return a default config based on the package.json even when no `repository` is provided', () => {
    const inferConfig = proxyquire('../../src/infer-config', {
      '../hooks/lib/process': {
        cwd() {
          return 'specs/fixtures/pkgs/no-repository';
        },
      },
    });

    const cfg = inferConfig();
    expect(cfg).to.deep.equal({
      changelogx: {
        ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/demo-name/issues/{0}',
        projectName: 'demo-name',
      },
    });
  });

  it('should return a default config based on the package.json even when no `repository` is provided', () => {
    const inferConfig = proxyquire('../../src/infer-config', {
      '../hooks/lib/process': {
        cwd() {
          return 'specs/fixtures/pkgs/git';
        },
      },
    });

    const cfg = inferConfig();
    expect(cfg).to.deep.equal({
      changelogx: {
        ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/some/repo/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/some/repo/issues/{0}',
        projectName: 'demo-name',
      },
    });
  });

  it('should return a default config based on the package.json even when `repository` is provided as string', () => {
    const inferConfig = proxyquire('../../src/infer-config', {
      '../hooks/lib/process': {
        cwd() {
          return 'specs/fixtures/pkgs/repo-with-author-as-object';
        },
      },
    });

    const cfg = inferConfig();
    expect(cfg).to.deep.equal({
      changelogx: {
        ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/file-entry-cache/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/file-entry-cache/issues/{0}',
        projectName: 'file-entry-cache',
      },
    });
  });

  it('should return a default config based on the package.json even when no `repository` is provided and author is an object', () => {
    const inferConfig = proxyquire('../../src/infer-config', {
      '../hooks/lib/process': {
        cwd() {
          return 'specs/fixtures/pkgs/no-repository-author-object';
        },
      },
    });

    const cfg = inferConfig();
    expect(cfg).to.deep.equal({
      changelogx: {
        ignoreRegExp: ['BLD: Release', 'DOC: Generate Changelog', 'Generated Changelog'],
        issueIDRegExp: '#(\\d+)',
        commitURL: 'https://github.com/royriojas/demo-name/commit/{0}',
        authorURL: 'https://github.com/{0}',
        issueIDURL: 'https://github.com/royriojas/demo-name/issues/{0}',
        projectName: 'demo-name',
      },
    });
  });
});
