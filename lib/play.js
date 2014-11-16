var
async  = require('async'),
debug  = require('debug')('yt321:play'),
mpg321 = require('mpg321'),
yt321  = require('./util.js');

function playCmd(options) {
  var
  urls = options._,
  loop = options.loop,
  random = options.random,
  list = options.list || [];
  if (!Array.isArray(list)) list = [list];
  debug(options);

  async.waterfall([
    function (next) {
      async.concat(list, yt321.readPlayList, next);
    },
    function (urlss, next) {
      yt321.mp3paths(options, urls.concat(urlss), next);
    },
    function (ps, next) {
      var
      m = mpg321(), child;
      if (loop) {
        debug('set loop');
        m.loop(0);
      }
      if (random) {
        debug('set random');
        m.random();
      }
      debug('play files', ps);
      m.file.apply(m, ps);
      child = m.exec();
      process.on('SIGINT', child.kill.bind(child));
    },
  ], function (err) {
    if (err) throw err;
  });
}

module.exports = playCmd;
