# leya

A little 1st Monthsarry gift for Leya, my Love. 💗

It's a tiny care game: help Love **eat 🍱**, **study 📚**, and **sleep 😴**.
When she falls asleep she starts dreaming, and the dream is where the letter, the photos and the music are.

Plain HTML, CSS and JavaScript, so it runs as a static site on GitHub Pages (no backend, no build step).

## Structure

```text
index.html          screens: intro, game, dream, final
css/style.css       all the styles and animations
js/script.js        game flow, messages, memory list, music
assets/
├── character/      optional custom character image (see below)
├── memories/       photos used in the dream montage
├── clips/          short video clips used in the montage
└── audio/          background song goes here
```

The rooms (kitchen, study area, bedroom) and the dream world are drawn with CSS, so there are no background images.

## Adding the song 🎵

The music is meant to be **"Na Para Bang" by Mariah Deborah**. It isn't included because it's copyrighted.
Put your own legally obtained copy here:

```text
assets/audio/love-song.mp3
```

then commit and push it. The music starts in the dream, and there's a 🎵 button (top right) for play/pause and volume.
Without the file the site still works and just skips the music.

## Editing things

- **Letter:** it's in `index.html` inside `<div class="letter">`.
- **Photo captions / order / adding clips:** the `MEMORIES` list at the top of `js/script.js`.
- **Bubble messages:** the `MSG` object in `js/script.js`.
- **Character:** the anime Leya is drawn as inline SVG in `index.html`, based on her photos (long dark-brown wavy hair with lighter ends, middle part with curtain bangs, pearl earrings, her turquoise halter top with yellow flowers).
  To use a custom illustration instead, save a transparent PNG/WebP in `assets/character/` and set
  `CHARACTER_IMAGE = 'assets/character/leya.png'` in `js/script.js`.

## Run locally

Open `index.html` in a browser, or serve the folder (for example `python -m http.server`) so the video clips load the same way they do on GitHub Pages.
