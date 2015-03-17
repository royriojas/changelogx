'use strict';

var path = require( 'path' );

module.exports = {
  configFile: {
    defaultName: 'package.json',
    description: 'Path to your `changelogx` config. By Default will look for a changelogx section on your `package.json`'
  },
  pkgJSONPath: path.resolve( __dirname, '../package.json' ),
  //useDefaultOptions: true,
  optionator: {
    prepend: 'Usage: changelogx [install-hook] [options]',
    options: [
      {
        heading: 'Options'
      },
      {
        option: 'format',
        alias: 'f',
        enum: [
          'html',
          'markdown'
        ],
        type: 'String',
        default: 'html',
        description: 'Use a specific output format, markdown or html.'
      },
      {
        option: 'tagPrefix',
        type: 'String',
        alias: 'p',
        default: '',
        description: 'The tag prefix to filter the tags obtained from git.'
      },
      {
        option: 'tagRange',
        type: 'String',
        alias: 'r',
        default: '',
        description: 'Filter the commits to only the ones between the given tag range'
      },
      {
        option: 'outputFile',
        alias: 'o',
        type: 'path::String',
        description: 'Specify file to write the changelog to. If omitted the output will be printed to the stdout. IF this option is set no other logs will print to stdout (-q is implicit here)'
      },
      {
        option: 'maxSubjectLength',
        alias: 'm',
        type: 'Number',
        default: '140',
        description: 'If the command install-hook is used, this option allows to specify the maximum length for the commit subject'
      }
    ]
  }
};
