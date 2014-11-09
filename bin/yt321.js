#!/usr/bin/env node

var
debug = require('debug')('yt321'),
package = require('../package.json');

var
yargs = require('yargs')
  .usage('Usage:\n  $0 [-dl] -u URL\n  $0 -s WORD')
  .version(package.version, 'version').alias('version', 'V')
  .help('help').alias('help', 'h')
  .string('u').alias('u', 'url')
  .describe('u', 'Play youtube URL')
  .string('s').alias('s', 'search')
  .describe('s', 'Search WORD in youtube')
  .boolean('l').alias('l', 'loop')
  .describe('l', 'Play in endless loop')
  .boolean('d').alias('d', 'download')
  .describe('d', 'Download mp3'),
argv = yargs.argv;

if (typeof argv.search === 'string') {
  search(argv.search);
} else if (typeof argv.url === 'string') {
  if (argv.download) {
    download(argv.url);
  } else {
    play(argv.url, argv.loop);
  }
} else {
  console.error('no specified -u and -s');
  yargs.showHelp();
}

function search (word) {
  var
  search = require('youtube-search');
  debug('[search] search ' + word);

  search(word, {
    maxResults: 10,
    startIndex: 1,
  }, function (err, results) {
    if (err) throw err;
    debug('[search] finish search');

    results.forEach(function (result) {
      console.log('title: ' + result.title);
      console.log('description: ' + result.description);
      console.log('url: ' + '\'' + result.url + '\'');
      console.log();
    });
  });
}

function download(url) {
  var
  ytdl = require('ytdl-core'),
  fs = require('fs'),
  yt321 = require('..'),
  path = require('path');
  debug('[download] start ' + url);

  yt321.mp3path(url, function (err, p) {
    if (err) throw err;
    ytdl.getInfo(url, function (err, info) {
      if (err) throw err;

      fs.createReadStream(p)
        .pipe(fs.createWriteStream(path.join(process.cwd(), info.title + '.mp3')))
        .on('finish', function () {
          debug('[download] finish');
          process.exit();
        });
    });
  });
}

function play(url, loop) {
  var
  yt321 = require('..'),
  mpg321 = require('mpg321');
  debug('[play] start ' + url);

  yt321.mp3path(url, function (err, p) {
    if (err) throw err;
    var
    m = mpg321(), child;
    if (loop) {
      debug('[play] loop');
      m.loop(0);
    }
    debug('[play] mpg321 ' + p);
    child = m.file(p).exec();
    process.on('SIGINT', child.kill.bind(child));
  });
}
