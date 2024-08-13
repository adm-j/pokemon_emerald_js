import {player} from "./player.ts";
import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {getAnimations} from "../util/animations.ts";
import {GameState} from "../main.ts";


// @ts-ignore
export class Npc extends player {
    constructor(
        tween: Phaser.Tweens.TweenManager,
        public sprite: Phaser.GameObjects.Sprite,
        collisionLayer: Phaser.Tilemaps.TilemapLayer,
        tilePos: Phaser.Math.Vector2,
        private name: string,
    ) {
        super(
            tween,
            sprite,
            collisionLayer,
            tilePos,
        );
        this.sprite.setOrigin(0, 1);
        this.sprite.setDepth(2);
        this.setGridPosition(new Vector2(tilePos));
        getAnimations(this.name, this.sprite.anims);
        GameState.setGridPosition(this.name, new Vector2(tilePos));
    }

    public wander(direction: Phaser.Math.Vector2) {
        super.move(direction);
    }

    // public interact() {
    //     const npcPostion = this.getCurrentGridPosition();
    //     const playerPosition = GameState.Game.PlayerGridPosition;
    //     const coords = {x: npcPostion.x - playerPosition.x, y: npcPostion.y - playerPosition.y};
    //     if ((coords.x === 1 || coords.x === -1) && (coords.y === 1 || coords.y === -1)) {
    //         sceneManager.StartChatScene(["Testing this works!"]);
    //     }
    // }
}