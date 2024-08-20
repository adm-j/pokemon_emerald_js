import {Entity} from "./Entity.ts";
import {MovementState, PlayerAnimationDelay} from "../Enums.ts";
import Vector2 = Phaser.Math.Vector2;
import {setPlayerAnimations} from "../../util/animations.ts";
import Sprite = Phaser.GameObjects.Sprite;

export class Character extends Entity {
    stepCount: MovementState = MovementState.stepAnim1;
    animationDuration: PlayerAnimationDelay = PlayerAnimationDelay.move;

    public isMoving: boolean = false;
    public currentFacePosition: Vector2 = Vector2.DOWN;

    constructor(name: string) {
        super(name);
    }

    public Initialise(sprite: Sprite) {
        this.sprite = sprite;
        this.sprite.setOrigin(0, 1);
        this.sprite.setDepth(3);
        setPlayerAnimations(sprite.anims);
    }
}