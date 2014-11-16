var
async = require('async'),
debug = require('debug')('yt321:info'),
yt321 = require('./util.js');

function infoCmd(options) {
  var
  urls = options._,
  list = options.list || [],
  oneLine = options.oneLine;
  if (!Array.isArray(list)) list = [list];

  async.waterfall([
    function (next) {
      async.concat(list, yt321.readPlayList, next);
    },
    function (urlss, next) {
      async.map(urls.concat(urlss), yt321.info.bind(null, options), next);
    },
    function (info, next) {
      info.forEach(function (result) {
        if (oneLine) {
          console.log(result.url + ' ' + result.title);
        } else {
          console.log('title: ' + result.title);
          if (result.description) console.log('description: ' + result.description);
          console.log('url: ' + result.url);
          console.log();
        }
      });
      next(null);
    }
  ], function (err) {
    if (err) throw err;
  });
}

module.exports = infoCmd;
