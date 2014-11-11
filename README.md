#yt321

Play audio from Youtube URL.

```
$ yt321 'your favorite Youtube URL'
```

[![NPM](https://nodei.co/npm/yt321.png)](https://nodei.co/npm/yt321/)
[![Dependency Status](https://david-dm.org/MakeNowJust/yt321.svg)](https://david-dm.org/MakeNowJust/yt321)

##Install

Requires `mpg321` and `ffmpeg` command.
Please see [MakeNowJust/mpg321](https://github.com/MakeNowJust/mpg321) and [fluent-ffmpeg/node-fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg).

And run:

```
$ npm install -g yt321
```

##Usage

###Play from Youtube URL

```
$ yt321 youtube-url
```

Example:

```
$ yt321 http://www.youtube.com/watch?v=8JsG_fWWojM
# wait for downloading video data
```

###Play in endless loop

```
$ yt321 -l youtube-url
```

Example:

```
$ yt321 -l http://www.youtube.com/watch?v=8JsG_fWWojM 
```

###Play from Youtube URL randomly

```
$ yt321 -z youtube-url1 youtube-url2...
```

###Search

```
$ yt321 -s search-word
```

Example:

```
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

title: Healing Music:Relaxation Meditation,New Age Music,Sleep Music, Calm Music, Ambient Music
description: https://itunes.apple.com/us/album/time-to-relax-healing-music/id598490985?l=it&ls=1 www.meditationrelaxclub.com Healing Music: Relaxation Meditation, New Age...
url: 'http://www.youtube.com/watch?v=04vX_pMiD6c&feature=youtube_gdata'

title: 3 HOURS Relaxing Music | Ambient Chillout | Background Study Spa Massage Sleep
description: 3 HOURS Relaxing Music "Mindful Listening". Relax your mind and body during this calming instrumental composion. Use for Zen meditation, Yoga, spa, sleep, ma...
url: 'http://www.youtube.com/watch?v=z7FTBcNaOR8&feature=youtube_gdata'

title: Ambient Mix - Astral Travel Beyond Deep Space by NAKpsy
description: Ambient and Space Ambient music mix. Tracklist: 01. Steve Roach - Dream Body (0:00) 02. Andrew Forrest - Liquid Light (11:00) 03. David Helpling & Jon Jenkin...
url: 'http://www.youtube.com/watch?v=t3Tbvah7waU&feature=youtube_gdata'

title: Space Ambient Mix 1 - Across the Universe - Meditation Music
description: This is space ambient mix i decided to compile. It will take you to the trip across the universe. Enjoy... 1. 00:00 - 15:48 - Jonn Serrie - Starmoods 2. 15:4...
url: 'http://www.youtube.com/watch?v=nTXeWIL1vhA&feature=youtube_gdata'

title: Ambient Music for Study • Work • Focus • Concentration • 1 Hour
description: Try it for free today! http://bit.ly/1jTaVah Created using the Ambient channel on focus@will. focus@will is a new neuroscience based web tool that uses speci...
url: 'http://www.youtube.com/watch?v=Fp78Yu1LYvo&feature=youtube_gdata'

title: Wonderful Chill-Out Ambient Music 2014 ( Album Mix 2 )
description: Wonderful Chill-Out Ambient Music 2014 ( Album Mix 2 ) Chill-Out Ambient Lounge Music 2014 https://www.facebook.com/bestchillout http://tastelikecake.bandcam...
url: 'http://www.youtube.com/watch?v=5UvfTupgLHI&feature=youtube_gdata'

title: RELAX TV - 3 hours of Relaxing Music, Soothing Nature Sounds, Ambient Music
description: Relaxing music and soothing nature sounds, peaceful ambient relaxation, relax TV. You may buy these films in original full HD 1080p quality only on ☯ http://...
url: 'http://www.youtube.com/watch?v=6zqpDVyCB2Y&feature=youtube_gdata'
```

###And more...

Please run `yt321 -h`.


##Author

TSUYUSATO Kitsune (GitHub: @MakeNowJust, Twitter: @make\_now\_just)


##License

Apache-2.0. Please read `LICENSE`.


##Contribute

  1. Fork this repository.
  2. Checkout your feature branch.
  3. Commit your change.
  4. Push and Pull request.

Welcome your pull request :smile:
