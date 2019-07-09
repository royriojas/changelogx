describe('commit-msg', () => {
  const proxyquire = require('proxyquire')
    .noCallThru()
    .noPreserveCache();
  const path = require('path');
  const read = require('read-file').sync;

  beforeEach(function be() {
    const me = this;

    me.mockFs = function mockFs(_file) {
      return {
        readFileSync(/* file , opts */) {
          // if ( file === 'commitFile' ) {
          return read(path.resolve(__dirname, _file), {
            encoding: 'utf8',
          });
          // }
        },
      };
    };

    me.mockProcess = me.sandbox.createSpyObj('process', ['exit']);
    me.mockProcess.argv = ['node', 'script', ''];

    me.mockConsole = me.sandbox.createSpyObj('console', ['log', 'error']);
  });

  it('should fail in case on an empty commit file', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/good-commit-feature.txt');

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.have.been.calledWith(1);
  });

  it('should allow well formatted commits', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/good-commit-feature.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.not.have.been.called;
  });

  it('should allow messages with no feature tags', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/good-commit-no-feature.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.not.have.been.called;
  });

  it('should fail if a commit message does not have a tag', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/bad-commit-no-tag.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.have.been.calledWith(1);
  });

  it('should allow merge automatic messages', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/good-commit-merge.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.not.have.been.called;
  });

  it('should allow revert automatic messages', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/good-commit-revert.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.not.have.been.called;
  });

  it('should fail if a commit message is too long', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/bad-commit-too-long.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.have.been.calledWith(1);
  });

  it('should fail if a commit message contains an invalid tag', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/bad-commit-invalid-tag.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.have.been.calledWith(1);
  });

  it('should fail if a commit message does not contain a separation line', function t() {
    const me = this;
    const mockFs = me.mockFs('../fixtures/commits/bad-commit-no-new-line.txt');

    me.mockProcess.argv[2] = 'commit-file';

    proxyquire('../../hooks/commit-msg.js', {
      fs: mockFs,
      './lib/process': me.mockProcess,
      './lib/console': me.mockConsole,
    });

    expect(me.mockProcess.exit).to.have.been.calledWith(1);
  });
});
