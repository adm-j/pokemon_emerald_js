import {getMapCoordinates, setMapCoordinates} from "../scripts/movement.ts";
import {movementState, playerAnimationDelay} from "../util/util.ts";
import {setPlayerAnimations} from "../util/animations.ts";
import Vector2 = Phaser.Math.Vector2;

export class player {
    private isMoving: boolean = false;
    private stepCount: movementState = movementState.stepAnim1;
    private currentFacePosition: Vector2 = Vector2.DOWN;
    private animationDuration: playerAnimationDelay = playerAnimationDelay.move;

    constructor(
        private scene: Phaser.Scene,
        public sprite: Phaser.GameObjects.Sprite,
        private collisionLayer: Phaser.Tilemaps.TilemapLayer,
        private tilePos: Phaser.Math.Vector2,
        private npcGroup?: Phaser.GameObjects.Sprite[]
    ) {
        this.sprite.setOrigin(0, 1);
        this.setGridPosition(new Vector2(this.tilePos));
        setPlayerAnimations(this.sprite.anims);
        // this.scene.physics.add.collider(this.sprite, collisionLayer);
    }

    public setGridPosition(pos: Phaser.Math.Vector2): void {
        const res = setMapCoordinates(pos.x, pos.y);
        this.sprite.setPosition(res.x, res.y);
    }

    public getGridPosition(x: number, y: number): {x: number, y: number} {
        return getMapCoordinates(x, y);
    }

    public getCurrentGridPosition(): {x: number, y: number} {
        const curPos = this.sprite.getBottomCenter();
        return getMapCoordinates(curPos.x, curPos.y);
    }

    private checkForCollison(direction: Vector2): { x: number; y: number } {
        const posX = this.sprite.x + (direction.x * 16);
        const posY = this.sprite.y + (direction.y * 16) - 16; //required to offset with the origin thats set

        if (this.npcGroup) {
            for (let i=0; i<this.npcGroup.length; i++) {
                const npc = {x: this.npcGroup[i].x, y: this.npcGroup[i].y - 16};
                console.log(posX, posY)
                console.log(npc.x, npc.y)
                if (posX - npc.x === 0 && posY - npc.y === 0) {
                    return {x: this.sprite.x, y: this.sprite.y};
                }
            }
        }

        const tile = this.collisionLayer.getTileAtWorldXY(posX, posY);
        if (tile && tile.canCollide) {
            return {x: this.sprite.x, y: this.sprite.y}
        } else {
            return {x: posX, y: posY + 16};
        }
    }

    public move(direction: Vector2): void {
        if (this.isMoving) {
            return;
        }
        this.isMoving = true

        if (direction === Vector2.DOWN) {
            if (this.currentFacePosition !== Vector2.DOWN) {
                this.sprite.anims.play("face_down");
                this.stepCount = movementState.stepAnim1;
                this.currentFacePosition = Vector2.DOWN;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === movementState.stepAnim1) {
                this.sprite.anims.play("walk_down_1")
                this.stepCount = movementState.stepAnim2;
            } else {
                this.sprite.anims.play("walk_down_2")
                this.stepCount = movementState.stepAnim1;
            }
        } else if (direction === Vector2.UP) {
            if (this.currentFacePosition !== Vector2.UP) {
                this.sprite.anims.play("face_up");
                this.stepCount = movementState.stepAnim1;
                this.currentFacePosition = Vector2.UP;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === movementState.stepAnim1) {
                this.sprite.anims.play("walk_up_1")
                this.stepCount = movementState.stepAnim2;
            } else {
                this.sprite.anims.play("walk_up_2")
                this.stepCount = movementState.stepAnim1;
            }
        } else if (direction === Vector2.LEFT) {
            if (this.currentFacePosition !== Vector2.LEFT) {
                this.sprite.anims.play("face_left");
                this.stepCount = movementState.stepAnim1;
                this.currentFacePosition = Vector2.LEFT;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === movementState.stepAnim1) {
                this.sprite.anims.play("walk_left_1")
                this.stepCount = movementState.stepAnim2;
            } else {
                this.sprite.anims.play("walk_left_2")
                this.stepCount = movementState.stepAnim1;
            }
        } else if (direction === Vector2.RIGHT) {
            if (this.currentFacePosition !== Vector2.RIGHT) {
                this.sprite.anims.play("face_right");
                this.stepCount = movementState.stepAnim1;
                this.currentFacePosition = Vector2.RIGHT;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === movementState.stepAnim1) {
                this.sprite.anims.play("walk_right_1")
                this.stepCount = movementState.stepAnim2;
            } else {
                this.sprite.anims.play("walk_right_2")
                this.stepCount = movementState.stepAnim1;
            }
        }

        const newPos = this.checkForCollison(direction);

        this.scene.tweens.add({
            targets: this.sprite,
            x: newPos.x,
            y: newPos.y,
            // x: this.sprite.x + (direction.x * constants.tileHeight),
            // y: this.sprite.y + (direction.y * constants.tileWidth),
            duration: this.animationDuration,
            ease: "linear",
            onComplete: () => {
                this.isMoving = false;
                if (this.animationDuration !== playerAnimationDelay.move) {
                    this.animationDuration = playerAnimationDelay.move;
                }
            }
        });
    }

    public toggleMovement() {
        this.isMoving = !this.isMoving;
    }
}