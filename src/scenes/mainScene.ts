import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {player} from "../player/player.ts";

import internalTiles from "../assets/tileset/emerald_tileset.png"
import newBarkTown from "../assets/tileset/newbarktown.json";
import playerDown from "../assets/sprites/male_pc_down.png";
import playerRight from "../assets/sprites/male_pc_right.png";
import playerUp from "../assets/sprites/male_pc_up.png";

export class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    // @ts-ignore
    private player;
    private moveTimer: Phaser.Time.TimerEvent | null = null;
    private moveDelay: number = 1000;

    preload() {
        this.load.image("internal_tiles", internalTiles);
        this.load.tilemapTiledJSON("new_bark_town", newBarkTown);
        this.load.spritesheet("player_down", playerDown, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_right", playerRight, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_up", playerUp, {frameWidth: 15, frameHeight: 22, spacing: 1});
    }

    create() {
        const map = this.make.tilemap({key: "new_bark_town"});
        const tileset = map.addTilesetImage("emerald_exterior", "internal_tiles")!;
        const ground = map.createLayer("ground", tileset, 0, 0);
        const trees = map.createLayer("trees", tileset, 0, 0);
        const buildings = map.createLayer("buildings", tileset, 0, 0);
        const objects = map.createLayer("objects", tileset, 0, 0);

        // this.sprite = this.add.sprite(0,0, "player_down", 0);
        const pcSprite = this.add.sprite(0,0, "player_down", 0)
        pcSprite.setDepth(2);
        this.player = new player(pcSprite, new Vector2(9, 12));

        this.cameras.main.startFollow(pcSprite);
        this.cameras.main.zoom = 3;
        this.cameras.main.roundPixels = true;
        // const coordinatesDebug = movement.setMapCoordinates(2, 6)
        // this.add.text(coordinatesDebug.x, coordinatesDebug.y, `X: ${144} Y: ${192}`, {fontStyle: "ariel", fontSize: 22});

        // this.cameras.main.roundPixels = true;
        // player.setScale(2, 2);
    }

    update() {
        const cursors = this.input.keyboard?.createCursorKeys();
        console.log(this.time.startTime);
        if (this.moveTimer !== null) {
            this.moveTimer.remove(false);
        }

        this.moveTimer = this.time.addEvent({
            delay: this.moveDelay,
            callback: () => {

            },
            callbackScope: this,
            loop: false
        })

        if (cursors?.left.isDown) {
            this.player.move("left");
        } else if (cursors?.right.isDown) {
            this.player.move("right");
        } else if (cursors?.up.isDown) {
            this.player.move("up");
        } else if (cursors?.down.isDown) {
            this.player.move("down");
        }


    }
}