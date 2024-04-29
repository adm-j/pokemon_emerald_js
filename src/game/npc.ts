import {player} from "./player.ts";
import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {setPlayerAnimations} from "../util/animations.ts";
import {GameState} from "../main.ts";


export class npc extends player {
    constructor(
        private tween: Phaser.Tweens.TweenManager,
        private sprite: Phaser.GameObjects.Sprite,
        private collisionLayer: Phaser.Tilemaps.TilemapLayer,
        private tilePos: Phaser.Math.Vector2,
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
        setPlayerAnimations(this.sprite.anims);
        GameState.setGridPosition(this.name, new Vector2(tilePos));
    }

    public wander(direction: Phaser.Math.Vector2) {
        super.move(direction);
    }
}