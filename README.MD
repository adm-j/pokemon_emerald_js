# POKEMON EMERALD JS

This is a recreation of the game mechanics found in pokemon Emerald using Phaser 3, Vite and nodejs.
The purpose of this is for me to learn more about game programming, thus this will not be a 
complete remake or anything of that nature.

## Project setup

This project uses <b>Node 21.6.2</b>

Running this project locally will be as simple as installing dependencies ```npm i``` and using vite to run a dev server ```npm run dev```

An additional script is included to "extrude" tiles within tile ```npm run extrude-tiles```, this is to pad tilesets
to prevent rendering issues when used for tilemaps due to the camera zoom.

Tilemaps are being created with tiled, sprite sheets and sprites are from various sources. Full credit will be given in due course. (todo: add sources)


### Current Progress:

Note this is not an indepth look at progression but more of a basic summary of things I'm working on. More may be added later.

- Movement
  - ~~grid based movement~~
  - ~~collision~~
  - ~~transitioning from one scene to another~~
- Battle system
  - ~~create logic for stats and calculating damage~~
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

### Credit:

This project is using a number of community made tilemaps and sprites. Sorry I haven't listened them yet!