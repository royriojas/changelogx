const write = require('write').sync;
const read = require('read-file').sync;
const gitDir = require('git-toplevel');
const fs = require('fs');

const readJSON = require('read-json-sync');
const path = require('path');

const nodeProcess = require('../hooks/lib/process');

module.exports = {
  commands: {
    'install-hook': function installHook(cli) {
      const config = readJSON(path.resolve(__dirname, '../hooks/lib/cfg.json'));
      config.maxSubjectLength = cli.opts.maxSubjectLength;

      let hook = read(path.resolve(__dirname, '../hooks/commit-msg.js'), {
        encoding: 'utf8',
      });

      const helpMessage = read(path.resolve(__dirname, '../hooks/lib/commit-msg-error.txt'), {
        encoding: 'utf8',
      }).replace(/\n/g, '\\n');

      hook = hook
        .replace(/require\(\s*'\.\/lib\/process'\s*\);/g, 'process;')
        .replace(/require\(\s*'\.\/lib\/cfg\.json'\s*\);/g, `${JSON.stringify(config, null, 2)};`)
        .replace(/require\(\s*'\.\/lib\/console'\s*\);/g, 'console;')
        .replace(/require\(\s*'\.\/lib\/parse-commit'\s*\);/g, require('../hooks/lib/parse-commit').toString())
        .replace(/\[COMMIT_HELP\]/g, helpMessage);

      gitDir().then(dir => {
        const file = path.resolve(dir, './.git/hooks/commit-msg');
        cli.subtle('Installing `commit-msg` hook to: ', file);
        write(file, hook);
        fs.chmodSync(file, '755');
        cli.ok('Done!');
      });
    },
    _getConfig: require('./infer-config'),
    log(cli) {
      const opts = cli.opts;
      if (!opts.outputFile) {
        opts.quiet = true;
      }

      let cfg = cli.getConfig().changelogx;

      if (!cfg) {
        cli.subtle('Changelogx configuration not found on ', cli.pathToConfig);
        cfg = this._getConfig().changelogx;

        cli.subtle('The following configuration will be used, based on your package.json. Please check it is correct: ');
        cli.subtle(`\n\n${JSON.stringify(cfg, null, 2)}\n\n`);
      }

      const p = require('../index')(opts, cfg);

      p.then(text => {
        if (!opts.outputFile) {
          nodeProcess.stdout.write(text);
        } else {
          write(path.resolve(nodeProcess.cwd(), opts.outputFile), text);
          cli.ok('Done!');
        }
      }).catch(err => {
        console.log('err', err);
      });
    },
  },
  run(cli) {
    const me = this;
    const cmd = cli.opts._.join('');
    let command = me.commands[cmd];

    if (!command) {
      command = me.commands.log;
    }

    command && command.apply(me.commands, [cli]);
  },
};
