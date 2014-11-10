#!/usr/bin/env node

var
debug = require('debug')('yt321'),
package = require('../package.json');

var
yargs = require('yargs')
  .usage('Usage:\n  $0 [-dl] URLs...\n  $0 -s WORD')
  .version(package.version, 'version').alias('version', 'V')
  .help('help').alias('help', 'h')
  .boolean('s').alias('s', 'search')
  .describe('s', 'Search WORD in youtube')
  .boolean('l').alias('l', 'loop')
  .describe('l', 'Play in endless loop')
  .boolean('z').alias('z', 'random')
  .describe('z', 'Random play specified urls')
  .boolean('d').alias('d', 'download')
  .describe('d', 'Download mp3')
  .string('@').alias('@', 'list')
  .describe('@', 'Specify play list file'),
argv = yargs.argv;

if (argv.search) {
  search(argv._);
} else if (argv._.length >= 1 || (argv.list && argv.list.length >= 1)) {
  if (argv.download) {
    download(argv._, argv.list || []);
  } else {
    play(argv._, argv.loop, argv.random, argv.list || []);
  }
} else {
  console.error('no specified -s or URLs');
  yargs.showHelp();
}

function search (word) {
  var
  search = require('youtube-search');
  if (!Array.isArray(word)) {
    word = [word];
  }
  word = word.join(' ');
  debug('[search] search ' + word);

  search(word, {
    maxResults: 10,
    startIndex: 1,
  }, function (err, results) {
    if (err) throw err;
    debug('[search] finish search');

    results.forEach(function (result) {
      console.log('title: ' + result.title);
      if (result.description) console.log('description: ' + result.description);
      console.log('url: ' + '\'' + result.url + '\'');
      console.log();
    });
  });
}

function download(urls, list) {
  var
  async = require('async'),
  ytdl = require('ytdl-core'),
  fs = require('fs'),
  yt321 = require('..'),
  path = require('path');
  if (!Array.isArray(list)) list = [list];
  debug('[download] start', urls);
  debug('[download] list', list);

  async.concat(list, yt321.readPlayList, function (err, urlss) {
    if (err) throw err;
    debug('[play] list urls', urlss);

    async.each(urls.concat(urlss), function (url, next) {
      yt321.mp3path(url, function (err, p) {
        if (err) next(err);
        ytdl.getInfo(url, function (err, info) {
          if (err) next(err);

          var
          p2 = path.join(process.cwd(), info.title + '.mp3');
          fs.createReadStream(p)
            .pipe(fs.createWriteStream(p2))
            .on('finish', function () {
              debug('[download] finish ' + url);
              console.log(url + ' => ' + p2);
              next(null);
            });
        });
      });
    }, function (err) {
      if (err) throw err;
      debug('[download] finish all');
    });
  });
}

function play(urls, loop, random, list) {
  var
  async = require('async'),
  yt321 = require('..'),
  mpg321 = require('mpg321');
  if (!Array.isArray(list)) list = [list];
  debug('[play] start', urls);
  debug('[play] list', list);

  async.concat(list, yt321.readPlayList, function (err, urlss) {
    if (err) throw err;
    debug('[play] list urls', urlss);

    async.map(urls.concat(urlss), yt321.mp3path, function (err, ps) {
      if (err) throw err;
      var
      m = mpg321(), child;
      if (loop) {
        debug('[play] loop');
        m.loop(0);
      }
      if (random) {
        debug('[play] random');
        m.random();
      }
      debug('[play] mpg321 ' + ps.join(' '));
      m.file.apply(m, ps);
      child = m.exec();
      process.on('SIGINT', child.kill.bind(child));
    });
  })
}
