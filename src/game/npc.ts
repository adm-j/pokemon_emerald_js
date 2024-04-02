import {player} from "./player.ts";
import Phaser from "phaser";
import Vector2 = Phaser.Math.Vector2;
import {setPlayerAnimations} from "../util/animations.ts";


export class npc extends player {
    constructor(
        private scene: Phaser.Scene,
        private sprite: Phaser.GameObjects.Sprite,
        private collisionLayer: Phaser.Tilemaps.TilemapLayer,
        private tilePos: Phaser.Math.Vector2
    ) {
        super(
            scene,
            sprite,
            collisionLayer,
            tilePos
        );
        this.sprite.setOrigin(0, 1);
        this.setGridPosition(new Vector2(tilePos));
        setPlayerAnimations(this.sprite.anims);
        this.scene.physics.add.collider(this.sprite, collisionLayer);
        this.sprite.setDepth(2);
    }

    wanderRange(curPos: Vector2, nextPos: Vector2, wanderDist?: Vector2) {
        const startingGridPos = this.getGridPosition(this.tilePos.x, this.tilePos.y);
        const curGridPos = this.getGridPosition(curPos.x, curPos.y);
        const nextGridPos = this.getGridPosition(nextPos.x, nextPos.y);
        let wanderGridDist;
        //this is very simplistic, we may need to build upon this
        if (wanderDist !== undefined) {
            wanderGridDist = {x: wanderDist.x, y: wanderDist.y};
        } else {
            wanderGridDist = {x: 2, y: 2};
        }
        const range: {x: number, y: number} = {
            x: startingGridPos.x - wanderGridDist.x,
            y: startingGridPos.y - wanderGridDist.y,
        };
        //9 - 7 = 2
        //9 - 11 = -2

        if (range.x > wanderGridDist.x || range.x < -Math.abs(wanderGridDist.x)) {
            return curPos;
        }

        if (range.y > wanderGridDist.y || range.y < -Math.abs(wanderGridDist.y)) {
            return curPos
        }
            return nextPos;
    }

    wander(direction: Phaser.Math.Vector2) {
    //todo: write this
        super.move(direction);
    }
}