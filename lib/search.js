var
debug  = require('debug')('yt321:search'),
search = require('youtube-search');

function searchCmd(options) {
  var
  word = options._.join(' '),
  oneLine = options.oneLine;

  debug(options);

  search(word, {
    maxResults: oneLine ? 50 : 10,
    startIndex: 1,
  }, function (err, results) {
    if (err) throw err;

    results.forEach(function (result) {
      result.url = result.url.replace('&feature=youtube_gdata', '');
      if (oneLine) {
        console.log(result.url + ' ' + result.title);
      } else {
        console.log('title: ' + result.title);
        if (result.description) console.log('description: ' + result.description);
        console.log('url: ' + result.url);
        console.log();
      }
    });
  });
}

module.exports = searchCmd;
