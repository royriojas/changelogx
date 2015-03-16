'use strict';

var path = require( 'path' );

module.exports = {
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
        type: 'String',
        description: 'Use a specific output format. Markdown Or HTML or a custom module'
      },
      {
        option: 'tagPrefix',
        type: 'String',
        alias: 'p',
        default: '',
        description: 'The tag prefix to filter the tags obtained from git'
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
        description: 'Specify file to write the changelog to. If omitted the output will be printed to the stdout'
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