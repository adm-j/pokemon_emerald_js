import internalTiles from "../assets/tileset/emerald_tileset.png"
import route101 from "../assets/tilemap/route101.json";
import {SceneName} from "../game/Enums.ts";
import {npc} from "../game/npc.ts";
import {player} from "../game/player.ts";
import playerUp from "../assets/sprites/player/male_pc_up.png";
import playerDown from "../assets/sprites/player/male_pc_down.png";
import playerRight from "../assets/sprites/player/male_pc_right.png";
import playerLeft from "../assets/sprites/player/male_pc_left.png";
import Vector2 = Phaser.Math.Vector2;
import {GameState} from "../main.ts";

export class Route101 extends Phaser.Scene {
    constructor() {
        super(SceneName.route101);
    }

    private player! : player;

    preload() {
        this.load.image("internal_tiles", internalTiles);
        this.load.tilemapTiledJSON("route_101", route101);
        this.load.spritesheet("player_up", playerUp, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_down", playerDown, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_right", playerRight, {frameWidth: 15, frameHeight: 22, spacing: 1});
        this.load.spritesheet("player_left", playerLeft, {frameWidth: 15, frameHeight: 22, spacing: 1});
    }

    create() {
        const map = this.make.tilemap({key: "route_101"});
        const tileset = map.addTilesetImage("emerald_exterior", "internal_tiles")!;
        const ground = map.createLayer("ground", tileset, 0, 0);
        const trees = map.createLayer("trees", tileset, 0, 0);
        // const buildings = map.createLayer("buildings", tileset, 0, 0);
        const objects = map.createLayer("objects", tileset, 0, 0);
        const grass = map.createLayer("grass", tileset, 0, 0);
        const collision = map.createLayer("collision", tileset, 0, 0)!;

        ground?.setDepth(0);
        trees?.setDepth(1);
        objects?.setDepth(0);
        grass?.setDepth(1);
        collision?.setDepth(-1);
        collision?.setCollisionByExclusion([0, 1])

        const playerPos = GameState.Game.NpcGridPositions.player;

        const pcSprite = this.add.sprite(0,0, "player_up", 0);
        const playerCharacter = new player(this.tweens, pcSprite, collision, new Vector2(playerPos.x, 38));

        this.player = playerCharacter;

        this.cameras.main.startFollow(pcSprite);
        this.cameras.main.zoom = 3;
        this.cameras.main.roundPixels = true;

    }

    update() {

        if (this.player.getCurrentGridPosition().y >= 39) {
            if (!this.player.isMoving) {
                GameState.Game.playerPreviousScene = SceneName.route101;
                GameState.Game.playerCurrentScene = SceneName.littleRootTown;
                this.scene.start(SceneName.littleRootTown);
            }
        }

        const cursors = this.input.keyboard?.createCursorKeys();

        if (cursors?.left.isDown) {
            this.player.move(Vector2.LEFT);
        } else if (cursors?.right.isDown) {
            this.player.move(Vector2.RIGHT);
        } else if (cursors?.up.isDown) {
            this.player.move(Vector2.UP);
        } else if (cursors?.down.isDown) {
            this.player.move(Vector2.DOWN);
        } else if (cursors?.space.isDown) {
            this.scene.pause(SceneName.route101);
            this.scene.run(SceneName.pausemenu);
        }
    }
}