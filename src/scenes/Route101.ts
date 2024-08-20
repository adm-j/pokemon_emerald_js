import internalTiles from "../assets/tileset/emerald_tileset.png"
import route101 from "../assets/tilemap/route101.json";
import {SceneName} from "../game/Enums.ts";
// import {player} from "../game/player.ts";
import playerUp from "../assets/sprites/player/male_pc_up.png";
import playerDown from "../assets/sprites/player/male_pc_down.png";
import playerRight from "../assets/sprites/player/male_pc_right.png";
import playerLeft from "../assets/sprites/player/male_pc_left.png";
import {GameState, sceneManager, touch} from "../main.ts";
import Vector2 = Phaser.Math.Vector2;
import {Character} from "../game/entities/Character.ts";
import {EntityManager} from "../game/entities/EntityManager.ts";
import {handleInteract} from "../util/util.ts";

export class Route101 extends Phaser.Scene {
    constructor() {
        super(SceneName.route101);
    }

    private player! : Character;
    private entityManager!: EntityManager;

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

        const playerPos = GameState.getPlayerPosition();

        const pcSprite = this.add.sprite(0,0, "player_up", 0);

        const playerCharacter = new Character("player");
        playerCharacter.Initialise(pcSprite);
        playerCharacter.setGridPosition(new Vector2(playerPos!.x, 38));
        this.cameras.main.startFollow(pcSprite);

        this.cameras.main.zoom = 3;
        this.cameras.main.roundPixels = true;
        this.entityManager = new EntityManager(this.tweens, collision);

        this.player = playerCharacter;
    }

    update() {
        if (this.player.getCurrentGridPosition().y >= 39) {
            if (!this.player.isMoving) {
                this.player.isMoving = true;
                sceneManager.ChangeScene(SceneName.littleRootTown);
            }
        }

        const cursors = this.input.keyboard?.createCursorKeys();
        if (cursors?.left.isDown) {
            this.entityManager.move(this.player, Vector2.LEFT);
            GameState.Game.PlayerFacingDirection = Vector2.LEFT;
        } else if (cursors?.right.isDown) {
            this.entityManager.move(this.player, Vector2.RIGHT);
            GameState.Game.PlayerFacingDirection = Vector2.RIGHT;
        } else if (cursors?.up.isDown) {
            this.entityManager.move(this.player, Vector2.UP);
            GameState.Game.PlayerFacingDirection = Vector2.UP;
        } else if (cursors?.down.isDown) {
            this.entityManager.move(this.player, Vector2.DOWN);
            GameState.Game.PlayerFacingDirection = Vector2.DOWN;
        } else if (cursors?.space.isDown) {
            handleInteract();
        }

        if (touch.holdingTouch && touch.currentDirection) {
            this.entityManager.move(this.player, touch.currentDirection);
        }
    }
    //
    // shutdown() {
    //     this.load.destroy()
    // }

}