var
debug = require('debug')('yt321:init'),
mkdirp = require('mkdirp'),
yt321 = require('./util.js');

function init(options) {
  debug('cache directory is ' + yt321.cacheDir);
  mkdirp.sync(yt321.cacheDir);
}

module.exports = init;
