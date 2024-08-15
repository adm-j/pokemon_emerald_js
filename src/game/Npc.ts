import {player} from "./player.ts";
import Phaser from "phaser";
import {getAnimations} from "../util/animations.ts";
import {GameState} from "../main.ts";
import Vector2 = Phaser.Math.Vector2;
import {InteractableObjects} from "../util/interfaces.ts";

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
        // note: Setting vector 2 as temp fix, might be good to know face direction in future.
        // It's ok for now because we don't need the npc's faced direction here.
        GameState.setGridPosition(this.name, new Vector2(tilePos), Vector2.ZERO);
        this.setInteractableZones();
    }

    private setInteractableZones() {
        const curLocation = this.getCurrentGridPosition();
        const positions: InteractableObjects = {
            name: this.name,
            positions: [
                {requiredDirection: Vector2.DOWN, x: curLocation.x, y: curLocation.y - 1},
                {requiredDirection: Vector2.UP, x: curLocation.x, y: curLocation.y + 1},
                {requiredDirection: Vector2.RIGHT, x: curLocation.x - 1, y: curLocation.y},
                {requiredDirection: Vector2.LEFT, x: curLocation.x + 1, y: curLocation.y}]
        }
        GameState.updateNpcInteractableZones(positions);
    }

    public setDialogue(text: string[]) {
        GameState.updateNpcDialogue({name: this.name, text})
    }

    public wander(direction: Phaser.Math.Vector2) {
        super.move(direction);
        this.setInteractableZones();
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