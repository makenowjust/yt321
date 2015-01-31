yt321
===

Play audio from Youtube URL.

```console
$ yt321 'your favorite Youtube URL'
```

[![NPM](https://nodei.co/npm/yt321.png)](https://nodei.co/npm/yt321/)
[![Dependency Status](https://david-dm.org/MakeNowJust/yt321.svg)](https://david-dm.org/MakeNowJust/yt321)

Install
---

Requires `mpg321` and `ffmpeg` command.
Please see [MakeNowJust/mpg321](https://github.com/MakeNowJust/mpg321) and [fluent-ffmpeg/node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

And run:

```console
$ npm install -g yt321
```

Usage
--

### Play from Youtube URL

```console
$ yt321 youtube-url
```

Example:

```console
$ yt321 http://www.youtube.com/watch?v=8JsG_fWWojM
# wait for downloading video data
```

### Play in endless loop

```console
$ yt321 -l youtube-url
```

Example:

```console
$ yt321 -l http://www.youtube.com/watch?v=8JsG_fWWojM 
```

### Play from Youtube URL randomly

```console
$ yt321 -z youtube-url1 youtube-url2...
```

### Search

```console
$ yt321 -s search-word
```

Example:

```console
$ yt321 -s ambient music
title: Top Chill-Out Ambient Music 2014
description: Top Chill-Out Ambient Music 2014 Best chill-out relaxing ambient music 2014 selection ! https://www.facebook.com/bestchillout Tracklist: 01 Indigolab - Dream...
url: 'http://www.youtube.com/watch?v=1on-Oc8xUyg&feature=youtube_gdata'

title: 10 Hours - Ambient / Soundscapes Relaxation Sleep Mix
description: 10 Hours - Ambient / Soundscapes Relaxation Sleep Mix Ambient soundscape soundscapes rain rainfall 10 hours ten relaxing mood sleep sleeping gentle soothing ...
url: 'http://www.youtube.com/watch?v=8JsG_fWWojM&feature=youtube_gdata'

title: Nordic Ambient Music [3 hours]
description: edit: wow almost 10k views, thanks everyone glad you enjoy the music as much as I do some of you may remember a skyrim mod that disappeared from the nexus my...
url: 'http://www.youtube.com/watch?v=BiyBAmCE7d0&feature=youtube_gdata'

and more...
```

### Search with peco

```console
$ yt321 $(yt321 -1s search-word | peco | awk '{print $1}')
```

### And more...

Please run `yt321 -h`.


Author
---

TSUYUSATO Kitsune (GitHub: @MakeNowJust, Twitter: @make\_now\_just)


License
---

Apache-2.0. Please read `LICENSE`.


Contribute
---

  1. Fork this repository.
  2. Checkout your feature branch.
  3. Commit your change.
  4. Push and Pull request.

Welcome your pull request :smile:
