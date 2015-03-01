var
async       = require('async'),
debug       = require('debug')('yt321:util'),
fs          = require('fs'),
path        = require('path'),
progress    = require('progress'),
querystring = require('querystring'),
url         = require('url'),
video2mp3   = require('video2mp3')
ytdl        = require('ytdl-core');

var
red   = '\u001b[41m \u001b[0m',
green = '\u001b[42m \u001b[0m';

// cacheDir
var
cacheDir = process.env.YT321_PATH;

if (!cacheDir) {
  if (process.platform === 'win32') {
    cacheDir = path.join(process.env.LOCALAPPDATA || process.env.APPDATA, 'yt321');
  } else {
    cacheDir = path.join(process.env.HOME, '.yt321_cache');
  }
}

exports.cacheDir = cacheDir;

// get mp3path from Youtube URL.
// effective options
//   - `options.force` is true, force download mp3, ignored cache.
function mp3path(options, youtubeURL, callback) {
  var
  urlObj = url.parse(youtubeURL), v, p;

  // if `url` is file path or file protocol, use it.
  if (urlObj.protocol === null || urlObj.protocol === 'file:') {
    debug('[mp3path] local file ' + youtubeURL);
    // why not use `urlObj.path`? because it is escaped such as 'Space ' to 'Space%20', it is wrong.
    return callback(null, youtubeURL);
  }

  // `'?v=xxxxx` is video id.
  v = querystring.parse(urlObj.query).v;
  if (!v) {
    return callback(Error('invalid url: ' + youtubeURL));
  }

  // cache path
  p = path.join(cacheDir, v + '.mp3');

  if (options.force) {
    debug('[mp3path] options.force = true ("-f" or "--force")');
    return downloadAndConvert(options, youtubeURL, p, callback);
  }

  // check cache
  fs.stat(p, function (err, info) {
    if (err) {
      debug('[mp3path] having no cache for ' + youtubeURL);
      downloadAndConvert(options, youtubeURL, p, callback);
    } else {
      debug('[mp3path] having cache for ' + youtubeURL);
      callback(null, p);
    }
  });
}

exports.mp3path = mp3path;

// mp3paths
function mp3paths(options, urls, callback) {
  var
  prog, id;

  if (!options.quiet) {
    prog = new progress('downloading & converting [:bar] :percent :elapseds', {
      complete: green,
      incomplete: red,
      total: urls.length,
      width: 30,
      clear: true,
    });
    prog.render();
    prog.tick(0);
    id = setInterval(prog.render.bind(prog), 100);
  }

  async.map(urls, function (url, next) {
    mp3path(options, url, function (err, p) {
      if (prog) prog.tick();
      next(err, p);
    });
  }, function (err, ps) {
    if (prog) {
      clearInterval(id);
    }
    callback(err, ps);
  });
}

exports.mp3paths = mp3paths;

// download & convert
function downloadAndConvert(options, youtubeURL, p, callback) {
  var
  stream = ytdl(youtubeURL, {
    filter: function (fmt) { return fmt.container === 'mp4'; },
  });
  debug('[download&convert] start download & convert');
  debug('[download&convert] ' + youtubeURL + ' => ' + p);
  video2mp3.convert(stream, p, function (err) {
    if (err) return callback(err);
    callback(null, p);
  });
}

exports.downloadAndConvert = downloadAndConvert;

// info
function info(options, youtubeURL, callback) {
  var
  urlObj = url.parse(youtubeURL), v, p;

  // if `url` is file path or file protocol, return a object.
  if (urlObj.protocol === null || urlObj.protocol === 'file:') {
    return callback(null, {
      url: youtubeURL,
      title: path.basename(urlObj.path, '.mp3'),
    });
  }

  // `'?v=xxxxx` is video id.
  v = querystring.parse(urlObj.query).v;
  if (!v) {
    return callback(Error('invalid url: ' + youtubeURL));
  }

  // cache path
  p = path.join(cacheDir, v + '.info');

  if (options.force) {
    debug('[info] options.force = true ("-f" or "--force")');
    return getInfo(options, youtubeURL, p, callback);
  }

  fs.stat(p, function (err, info) {
    if (err) {
      debug('[info] having no cache for ' + youtubeURL);
      getInfo(options, youtubeURL, p, callback);
    } else {
      debug('[info] having cache for ' + youtubeURL);
      fs.readFile(p, 'utf8', function (err, str) {
        if (err) return callback(err);
        try {
          callback(null, JSON.parse(str));
        } catch(e) {
          callback(e);
        }
      });
    }
  });
}

exports.info = info;

// get and save info
function getInfo(options, youtubeURL, p, callback) {
  ytdl.getInfo(youtubeURL, function (err, info) {
    if (err) return callback(err);
    info.url = youtubeURL;
    fs.writeFile(p, JSON.stringify(info), function (err) {
      if (err) return callback(err);
      callback(null, info);
    });
  });
}

// parse play list
function parsePlayList(str) {
  return str.split('\n').map(function (line) {
    return line.trim();
  }).filter(function (line) {
    return line && !/^\s*#/.test(line);
  });
}

exports.parsePlayList = parsePlayList;

// read play list
function readPlayList(playListPath, callback) {
  debug('[readPlayList] read ' + playListPath);
  fs.readFile(playListPath, 'utf8', function (err, str) {
    if (err) return callback(err);
    callback(null, parsePlayList(str));
  });
}

exports.readPlayList = readPlayList;
