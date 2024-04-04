# POKEMON EMERALD JS

This is a recreation of pokemon Emerald and its various mechanics using Phaser 3, Vite and nodejs.

## Project setup

This project uses <b>Node 21.6.2</b>

Running this project locally will be as simple as installing dependencies ```npm i``` and using vite to run a dev server ```npm run dev```

An additional script is included to "extrude" tiles within tile ```npm run extrude-tiles```, this is to pad tilesets
to prevent rendering issues when used for tilemaps.

Tilemaps are being created with tiled, sprite sheets and sprites are from sources (todo: include sources)


### Current Progress:

Note this is not an indepth look at progression but more of a summary.

- Movement
  - ~~grid based movement~~
  - ~~collision~~
  - transitioning from one scene to another
- Battle system
  - create logic for stats and calculating damage
  - menus
  - animations
  - scene transition
- Inventory
  - menus
  - item functionalities
- Party system
  - menu
  - view party members screens
- Npc events/interactions
  - ~~Chat box~~
  - Scrolling text system
  - Custom events