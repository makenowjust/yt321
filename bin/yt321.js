#!/usr/bin/env node

var
debug = require('debug')('yt321'),
init = require('../lib/init.js'),
package = require('../package.json');

var
yargs = require('yargs')
  .usage('Usage:\n  $0 [-1dfilqz] [-@ FILE]... URL...\n  $0 [-1] -s WORD\n  $0 [-hV]')
  .boolean('download').alias('download', 'd')
  .describe('download', 'Download mp3')
  .boolean('force').alias('force', 'f')
  .describe('force', 'Force downloading specified Youtube URL, not use cache')
  .help('help').alias('help', 'h')
  .boolean('info').alias('info', 'i')
  .describe('info', 'Show information of YoutubeURL\'s video')
  .string('list').alias('list', '@')
  .describe('list', 'Specify play list file')
  .boolean('loop').alias('loop', 'l')
  .describe('loop', 'Play in endless loop')
  .boolean('one-line').alias('one-line', '1')
  .describe('one-line', 'Print information as one line for peco and percol')
  .boolean('quiet').alias('quiet', 'q')
  .describe('quiet', 'Not print downloading & convert information and more')
  .boolean('random').alias('random', 'z')
  .describe('random', 'Random play specified urls')
  .boolean('search').alias('search', 's')
  .describe('search', 'Search WORD in youtube')
  .version(package.version, 'version').alias('version', 'V'),
options = yargs.argv;

// init
init(options);

if (options.search) {
  require('../lib/search.js')(options);
} else if (options._.length >= 1 || (options.list && options.list.length >= 1)) {
  if (options.info) {
    require('../lib/info.js')(options);
  } else if (options.download) {
    require('../lib/download.js')(options);
  } else {
    require('../lib/play.js')(options);
  }
} else {
  console.error('no specified effective options');
  console.log(yargs.help());
}
