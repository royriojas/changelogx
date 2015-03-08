"use strict";
var optionator = require("optionator");
module.exports = optionator({
  prepend: "changelogx [options]",
  concatRepeatedArrays: true,
  mergeRepeatedObjects: true,
  options: [{
    heading: "Options"
  }, {
    option: "help",
    alias: "h",
    type: "Boolean",
    description: "Show help"
  }, {
    option: "format",
    alias: "f",
    type: "String",
    description: "Use a specific output format. Markdown Or HTML or a custom module"
  }, {
    option: "version",
    alias: "v",
    type: "Boolean",
    description: "Outputs the version number"
  }, {
    option: "tagPrefix",
    type: "string",
    alias: "p",
    default: "",
    description: "The tag prefix to filter the tags obtained from git"
  }, {
    option: "tagRange",
    type: "String",
    alias: "r",
    default: "",
    description: "Filter the commits to only the ones between the given tag range"
  },
  {
    option: "outputFile",
    alias: "o",
    type: "path::String",
    description: "Specify file to write the changelog to"
  }, {
      option: ""
    }]
});