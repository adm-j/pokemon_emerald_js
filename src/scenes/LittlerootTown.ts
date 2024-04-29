import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {player} from "../game/player.ts";
import {TextBox} from "../game/TextBox.ts"
import {Controller} from "../util/controller.ts"

import internalTiles from "../assets/tileset/emerald_tileset.png"
import littleRootTown from "../assets/tilemap/littleroottown.json";
import playerDown from "../assets/sprites/male_pc_down.png";
import playerUp from "../assets/sprites/male_pc_up.png";
import playerRight from "../assets/sprites/male_pc_right.png";
import playerLeft from "../assets/sprites/male_pc_left.png";
import {npc} from "../game/npc.ts";
import {SceneName} from "../game/Enums.ts";
import {GameState} from "../main.ts";
import {randomVector} from "../util/util.ts";

export class LittlerootTown extends Phaser.Scene {
    constructor() {
        super(SceneName.littleRootTown);
    }

    // @ts-ignore
    private player;
    private npcGroup;
    private controller;
    private events;

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
        const collision = map.createLayer("collision", tileset, 0, 0)!;

        ground?.setDepth(0);
        trees?.setDepth(1);
        objects?.setDepth(0);
        buildings?.setDepth(1);
        collision?.setDepth(-1);
        collision?.setCollisionByExclusion([0, 1])

        // const npcTest = this.add.sprite(240, 240, "player_down", 0)
        // this.npcGroup = [npcTest];//todo: refactor, add function to return array of npcs

        const pcSprite = this.add.sprite(0,0, "player_down", 0);
        const pcCopy = this.add.sprite(200, 200, "player_down", 0);
        const pcCopy2 = this.add.sprite(0, 0, "player_down", 0);

        const playerCharacter = new player(this.tweens, pcSprite, collision, new Vector2(9, 12));
        const npcTest = [
            new npc(this.tweens, pcCopy, collision, new Vector2(14, 12), "npc1"),
            new npc(this.tweens, pcCopy2, collision, new Vector2(16, 12), "npc2")
        ];

        this.player = playerCharacter;
        this.npcGroup = npcTest;


        this.events = this.time.addEvent({
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

        const text: TextBox = new TextBox(this, this.player);
        console.log(GameState.Game.NpcGridPositions);
        // text.create();
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