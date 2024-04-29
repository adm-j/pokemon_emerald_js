import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {player} from "../game/player.ts";
import {TextBox} from "../game/TextBox.ts"
import {Controller} from "../util/controller.ts"

import internalTiles from "../assets/tileset/emerald_tileset.png"
import littleRootTown from "../assets/tilemap/littleroottown.json";
import playerDown from "../assets/sprites/player/male_pc_down.png";
import playerUp from "../assets/sprites/player/male_pc_up.png";
import playerRight from "../assets/sprites/player/male_pc_right.png";
import playerLeft from "../assets/sprites/player/male_pc_left.png";

import girlDown from "../assets/sprites/npc/girl/girl_down.png";
import girlLeft from "../assets/sprites/npc/girl/girl_left.png";
import girlRight from "../assets/sprites/npc/girl/girl_right.png";
import girlUp from "../assets/sprites/npc/girl/girl_up.png";

import {npc} from "../game/npc.ts";
import {SceneName} from "../game/Enums.ts";
import {GameState} from "../main.ts";
import {randomVector} from "../util/util.ts";

export class LittlerootTown extends Phaser.Scene {
    constructor() {
        super(SceneName.littleRootTown);
    }

    private player! : player;
    private npcGroup! : npc[];

    preload() {
        this.load.image("internal_tiles", internalTiles);
        this.load.tilemapTiledJSON("little_root_town", littleRootTown);
        this.load.spritesheet("player_up", playerUp, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_down", playerDown, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_right", playerRight, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_left", playerLeft, {frameWidth: 15, frameHeight: 22, spacing: 1});

        this.load.spritesheet("girl_down", girlDown, {frameWidth: 13, frameHeight: 18});
        this.load.spritesheet("girl_left", girlLeft, {frameWidth: 13, frameHeight: 18});
        this.load.spritesheet("girl_right", girlRight, {frameWidth: 13, frameHeight: 18});
        this.load.spritesheet("girl_up", girlUp, {frameWidth: 13, frameHeight: 18});

    }

    create() {
        const map = this.make.tilemap({key: "little_root_town"});
        const tileset = map.addTilesetImage("emerald_exterior", "internal_tiles")!;
        const ground = map.createLayer("ground", tileset, 0, 0);
        const trees = map.createLayer("trees", tileset, 0, 0);
        const buildings = map.createLayer("buildings", tileset, 0, 0);
        const objects = map.createLayer("objects", tileset, 0, 0);
        const collision = map.createLayer("collision", tileset, 0, 0)!;

        ground?.setDepth(0);
        trees?.setDepth(1);
        objects?.setDepth(0);
        buildings?.setDepth(1);
        collision?.setDepth(-1);
        collision?.setCollisionByExclusion([0, 1])

        const pcSprite = this.add.sprite(0,0, "player_down", 0);
        const girl = this.add.sprite(0, 0, "girl_down", 0);
        const girl2 = this.add.sprite(0, 0, "girl_up", 0);

        const playerCharacter = new player(this.tweens, pcSprite, collision, new Vector2(9, 12));
        const npcTest: npc[] = [
            new npc(this.tweens, girl, collision, new Vector2(14, 12), "girl_1"),
            new npc(this.tweens, girl2, collision, new Vector2(16, 12), "girl_2"),
        ];

        this.player = playerCharacter;
        this.npcGroup = npcTest;


        this.time.addEvent({
            delay: 1000,
            callback: () => {
                for (let i =0; i<this.npcGroup.length; i++) {
                    const randomMS = Math.floor(Math.random() * 1000);
                    setTimeout(()=> {
                    this.npcGroup[i].wander(randomVector());
                    }, randomMS);
                }
            },
            loop: true,
            callbackScope: this,
        })

        this.cameras.main.startFollow(pcSprite);
        this.cameras.main.zoom = 3;
        this.cameras.main.roundPixels = true;
    }

    update() {
        const cursors = this.input.keyboard?.createCursorKeys();

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