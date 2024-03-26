# POKEMON EMERALD JS

This is a recreation of pokemon Emerald and its various mechanics using Phaser 3, Vite and nodejs.

## Project setup

This project uses <b>Node 21.6.2</b>

Running this project locally will be as simple as installing dependencies ```npm i``` and using vite to run a dev server ```npm run dev```

An additional script is included to "extrude" tiles within tile ```npm run extrude-tiles```, this is to pad tilesets
to prevent rendering issues when used for tilemaps.

Tilemaps are being created with tiled, sprite sheets and sprites are from sources (todo: include sources)


### TODO:

- Refactor player movement
- Add collision
- rewrite extrude.js logic to use extrude dir for spritesheets, create output dir for using with phaser
- clean up/refactor directories for assets