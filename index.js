var
path = require('path'),
url = require('url'),
querystring = require('querystring'),
fs = require('fs');

var
debug = require('debug')('yt321'),
async = require('async'),
mkdirp = require('mkdirp'),
ytdl = require('ytdl-core'),
video2mp3 = require('video2mp3');

var
cache_dir = process.env.YT321_CACHE_DIR || path.join(process.env.HOME, '.yt321_cache');

debug('[yt321] mkdir -p ' + cache_dir);
mkdirp.sync(cache_dir);

function getVideoId(youtubeURL) {
  return querystring.parse(url.parse(youtubeURL).query).v;
}

function mp3path(youtubeURL, callback) {
  var
  v = getVideoId(youtubeURL), p;

  if (!v) return callback(Error('invalid url: ' + youtubeURL));
  p = path.join(cache_dir, v + '.mp3');

  debug('[mp3path] start');
  fs.stat(p, function (err, info) {
    if (err) {
      debug('[mp3path] no cached');
      var
      stream = download(youtubeURL);
      debug('[mp3path] convert to mp3');
      video2mp3.convert(stream, p, function (err) {
        if (err) return callback(err);
        callback(null, p);
      });
    } else {
      debug('[mp3path] cached');
      callback(null, p);
    }
  });
}

function download(youtubeURL) {
  debug('[download] start');
  return ytdl(youtubeURL, { filter: function (format) {
    return format.container === 'mp4';
  } });
}

function parsePlayList(str) {
  return str.split('\n').filter(function (s) {
    return !/^\s*#/.test(s) && s.trim();
  }).map(function (s) { return s.trim(); });
}

function readPlayList(filename, callback) {
  fs.readFile(filename, 'utf8', function (err, str) {
    if (err) return callback(err);
    callback(null, parsePlayList(str));
  });
}

exports.getVideoId = getVideoId;
exports.mp3path = mp3path;
exports.parsePlayList = parsePlayList;
exports.readPlayList = readPlayList;
