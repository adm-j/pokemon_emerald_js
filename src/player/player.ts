import {getMapCoordinates, setMapCoordinates} from "../scripts/movement.ts";
import Vector2 = Phaser.Math.Vector2;
import {constants, playerAnimationDelay} from "../util/util.ts";
import {setPlayerAnimations} from "../util/animations.ts";

export class player {
    private currentMovement: boolean;
    private stepCount = 0;
    private currentFacePosition: Vector2 = Vector2.DOWN;
    private animationDuration = playerAnimationDelay.move;

    constructor(
        private scene: Phaser.Scene,
        private sprite: Phaser.GameObjects.Sprite,
        tilePos: Phaser.Math.Vector2
    ) {
        this.sprite.setOrigin(0, 1);
        this.setGridPosition(new Vector2(tilePos))
        setPlayerAnimations(this.sprite.anims)
    }

    public setGridPosition(pos: Phaser.Math.Vector2) {
        const res = setMapCoordinates(pos.x, pos.y);
        this.sprite.setPosition(res.x, res.y);
    }

    getPosition() {
        return this.sprite.getBottomCenter();
    }

    public getGridPosition() {
        const pos = this.sprite.getBottomCenter();
        return getMapCoordinates(pos.x, pos.y);
    }

    public move(direction: Vector2) {
        if (this.currentMovement) {
            return;
        }
        this.currentMovement = true
        console.log(this.currentFacePosition);

        if (direction === Vector2.DOWN) {
            if (this.currentFacePosition !== Vector2.DOWN) {
                this.sprite.anims.play("face_down");
                this.stepCount = 0;
                this.currentFacePosition = Vector2.DOWN;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === 0) {
                this.sprite.anims.play("walk_down_1")
                this.stepCount = 1;
            } else {
                this.sprite.anims.play("walk_down_2")
                this.stepCount = 0;
            }
        } else if (direction === Vector2.UP) {
            if (this.currentFacePosition !== Vector2.UP) {
                this.sprite.anims.play("face_up");
                this.stepCount = 0;
                this.currentFacePosition = Vector2.UP;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === 0) {
                this.sprite.anims.play("walk_up_1")
                this.stepCount = 1;
            } else {
                this.sprite.anims.play("walk_up_2")
                this.stepCount = 0;
            }
            // this.sprite.anims.play("up");
        } else if (direction === Vector2.LEFT) {
            if (this.currentFacePosition !== Vector2.LEFT) {
                this.sprite.anims.play("face_left");
                this.stepCount = 0;
                this.currentFacePosition = Vector2.LEFT;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === 0) {
                this.sprite.anims.play("walk_left_1")
                this.stepCount = 1;
            } else {
                this.sprite.anims.play("walk_left_2")
                this.stepCount = 0;
            }
        } else if (direction === Vector2.RIGHT) {
            if (this.currentFacePosition !== Vector2.RIGHT) {
                this.sprite.anims.play("face_right");
                this.stepCount = 0;
                this.currentFacePosition = Vector2.RIGHT;
                direction = Vector2.ZERO;
                this.animationDuration = playerAnimationDelay.idle;
            } else if (this.stepCount === 0) {
                this.sprite.anims.play("walk_right_1")
                this.stepCount = 1;
            } else {
                this.sprite.anims.play("walk_right_2")
                this.stepCount = 0;
            }
        }

        this.scene.tweens.add({
            targets: this.sprite,
            x: this.sprite.x + (direction.x * constants.tileHeight),
            y: this.sprite.y + (direction.y * constants.tileWidth),
            duration: this.animationDuration,
            ease: "linear",
            onComplete: () => {
                this.currentMovement = false;
                if (this.animationDuration !== playerAnimationDelay.move) {
                    this.animationDuration = playerAnimationDelay.move;
                }
            }
        })
    }
}