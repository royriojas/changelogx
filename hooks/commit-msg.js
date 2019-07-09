#!/usr/bin/env node
const nProcess = require('./lib/process');
const nConsole = require('./lib/console');
const hookCfg = require('./lib/cfg.json');
const parseCommit = require('./lib/parse-commit');

const commitMsg = (module.exports = {
  _cfg: hookCfg,
  _getCommitErrorMessage() {
    return '[COMMIT_HELP]';
  },
  _ok(...args) {
    args.unshift('\x1B[33m\x1B[1m');
    args.push('\x1B[22m\x1B[39m');

    nConsole.log(...args);
  },
  _log(...args) {
    args.unshift('\x1B[90m\x1B[1m');
    args.push('\x1B[22m\x1B[39m');

    nConsole.log(...args);
  },
  _error(...args) {
    args.unshift('\x1B[31m\x1B[1m');
    args.push('\x1B[22m\x1B[39m');

    nConsole.error(args);
  },
  _parseCommit: parseCommit,
  _checkMessage(_commitMsg) {
    const me = this;
    const cfg = me._cfg;
    const maxSubjectLength = cfg.maxSubjectLength;

    const commit = me._parseCommit(_commitMsg);

    const errorFns = [];

    if (!commit.emptyLineAfterSubject) {
      errorFns.push(() => {
        me._error('- Must leave an empty line after the subject');
      });
    }

    const tag = me._cfg.tags[commit.tag];

    if (!tag) {
      errorFns.push(() => {
        me._error('- Please provide a valid tag');
      });
    }

    const subject = commit.subject;

    if (subject.length > maxSubjectLength) {
      errorFns.push(() => {
        me._error(`- Please make sure the first line of your message is less than ${maxSubjectLength} characters long.`);
        me._error('  current length:', subject.length, subject, '\n');
      });
    }

    return errorFns;
  },
  _exit() {
    nProcess.exit(1);
  },
  check(commitMessageFile) {
    const me = this;
    if (!commitMessageFile) {
      me._error('>> No Commit Message File Found. Stopping <<');
      me._exit();
      return;
    }

    const fs = require('fs');

    me._log('\n>>>>> Commit message check start <<<<<');

    const cfg = me._cfg;

    const content = fs.readFileSync(commitMessageFile, {
      encoding: 'utf8',
    });

    const errors = me._checkMessage(content);

    if (errors.length === 0) {
      me._log('\n>>>>> All good. Commit Message is valid <<<<<\n');
    } else {
      const text = me._getCommitErrorMessage();
      me._log(text.replace('[SUBJECT_LIMIT]', cfg.maxSubjectLength), '\n');

      me._error('>>>>> Commit message is not valid <<<<<');
      errors.forEach(fn => {
        fn();
      });

      me._exit();
    }
  },
});

commitMsg.check(nProcess.argv[2]);
