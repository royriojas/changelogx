module.exports = function (args) {
  var options = require('./options');
  var opts = options.parse(args);

  if (opts.help) {
    console.log(options.generateHelp());
    return;
  }

  var changelogx = require('./index');



};