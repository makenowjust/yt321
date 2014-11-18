var
_        = require('lodash'),
async    = require('async'),
debug    = require('debug')('yt321:download'),
fs       = require('fs'),
path     = require('path'),
sanitize = require('sanitize-filename'),
yt321    = require('./util.js');

function downloadCmd(options) {
  var
  urls = options._,
  list = options.list || [],
  ps, cwd = process.cwd();
  if (!Array.isArray(list)) list = [list];

  async.waterfall([
    function (next) {
      async.concat(list, yt321.readPlayList, next);
    },
    function (urlss, next) {
      urls = urls.concat(urlss);
      yt321.mp3paths(options, urls, next);
    },
    function (ps_, next) {
      ps = ps_;
      async.map(urls, yt321.info.bind(null, options), next);
    },
    function (infos, next) {
      async.each(_.range(infos.length), function (i, next) {
        var
        p1 = ps[i],
        p2 = path.join(cwd, sanitize(infos[i].title) + '.mp3');

        fs.createReadStream(p1)
          .pipe(fs.createWriteStream(p2))
          .on('finish', function () {
            if (!options.quiet) console.log(urls[i] + ' => ' + p2);
            next(null);
          })
          .on('error', function (err) {
            next(err);
          });
      }, next);
    },
  ], function (err) {
    if (err) throw err;
  });
}

module.exports = downloadCmd;
