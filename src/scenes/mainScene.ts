import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {player} from "../player/player.ts";
import {Controller} from "../util/controller.ts"

import internalTiles from "../assets/tileset/emerald_tileset.png"
import littleRootTown from "../assets/tilemap/littleroottown.json";
import playerDown from "../assets/sprites/male_pc_down.png";
import playerUp from "../assets/sprites/male_pc_up.png";
import playerRight from "../assets/sprites/male_pc_right.png";
import playerLeft from "../assets/sprites/male_pc_left.png";

export class mainScene extends Phaser.Scene {
    constructor() {
        super("mainScene");
    }

    // @ts-ignore
    private player;
    private controller;

    preload() {
        this.load.image("internal_tiles", internalTiles);
        this.load.tilemapTiledJSON("little_root_town", littleRootTown);
        this.load.spritesheet("player_up", playerUp, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_down", playerDown, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_right", playerRight, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_left", playerLeft, {frameWidth: 15, frameHeight: 22, spacing: 1});
    }

    create() {
        const map = this.make.tilemap({key: "little_root_town"});
        const tileset = map.addTilesetImage("emerald_exterior", "internal_tiles")!;
        const ground = map.createLayer("ground", tileset, 0, 0);
        const trees = map.createLayer("trees", tileset, 0, 0);
        const buildings = map.createLayer("buildings", tileset, 0, 0);
        const objects = map.createLayer("objects", tileset, 0, 0);
        const collision = map.createLayer("collision", tileset, 0, 0);

        ground?.setDepth(0);
        trees?.setDepth(1);
        objects?.setDepth(0);
        buildings?.setDepth(1);
        collision?.setDepth(-1);
        collision.setCollisionByExclusion([0, 1])

        const pcSprite = this.add.sprite(0,0, "player_down", 0)
        pcSprite.setDepth(2);
        this.player = new player(this, pcSprite, collision, new Vector2(9, 12));
        // this.controller = new Controller(this);
        // this.controller.AddKeyboardControls();

        this.cameras.main.startFollow(pcSprite);
        this.cameras.main.zoom = 3;
        this.cameras.main.roundPixels = true;

        this.physics.add.collider(this.player, collision);
    }

    update() {
        const cursors = this.input.keyboard?.createCursorKeys();
        // this.player.checkForCollison();

        if (cursors?.left.isDown) {
            this.player.move(Vector2.LEFT);
        } else if (cursors?.right.isDown) {
            this.player.move(Vector2.RIGHT);
        } else if (cursors?.up.isDown) {
            this.player.move(Vector2.UP);
        } else if (cursors?.down.isDown) {
            this.player.move(Vector2.DOWN);
        }


    }
}