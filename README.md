# can't-decide

You know you want to watch The Office. You don't know which episode. Twenty
minutes later you're still scrolling the episode list and you haven't watched
anything.

This site decides for you. Pick the seasons you'd accept, press the button, and
it assigns you one episode. The only thing you control is the range it draws
from.

Live site → https://gjama44.github.io/cantdecide/

## The idea

There are plenty of random episode generators already. Nearly all of them let
you press the button again until you get one you like — which means you're
still deciding, just more slowly.

This one gives you an assignment. You can reroll, but it's recorded: the page
keeps count, remembers the episode you were originally given, and says so.
The constraint is the product.

## How it works

- Pick any combination of seasons (they're independent toggles, not a range)
- The site draws one episode at random from everything in those seasons
- Your assignment is saved for the day and survives a reload
- Rerolls are allowed, counted, and shown next to the result
- At midnight the record expires and you get a fresh assignment

## Running it locally

No build step and no dependencies. Clone it and open `index.html`:

```bash
git clone https://github.com/YOUR-USERNAME/cant-decide.git
cd cant-decide
open index.html
```

For live reloading while editing, the VS Code Live Server extension works well.

## Built with

Vanilla HTML, CSS and JavaScript. No framework, no bundler, no npm.

- `index.html` — structure
- `style.css` — styling, with CSS custom properties for the palette
- `episodes.js` — the episode data
- `script.js` — all the logic

State is held in a single `picked` Set and a record in `localStorage`. Every
change updates state and then calls one `paint()` function to redraw. Nothing
else touches the page directly.

## A note on the data

186 entries covering all 201 aired episodes. The gap is the fifteen hour-long
two-parters — "Fun Run" is S4E1–2, one story across two slots — which are
stored as single entries so the picker can never assign you half an episode.

Each entry is `[season, firstEpisode, lastEpisode, title, firstAired]`.

Episode titles and air dates are factual data about the series. This is a fan
project and isn't affiliated with NBC or Universal.

## Still to do

- [ ] Shareable result card
- [ ] Spin animation before the result lands
- [ ] Stop rerolls repeating an episode already served that day
