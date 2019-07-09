#!/usr/bin/env node

const cliLauncher = require('clix');
const main = require('../src/main');
const programOptions = require('../src/options');

// cliLauncher.onError = function () {
//  // handle the error here
// };

cliLauncher.launch(programOptions, program => {
  main.run(program);
});
