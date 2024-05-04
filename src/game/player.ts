import {getMapCoordinates, setMapCoordinates} from "../scripts/movement.ts";
import {MovementState, PlayerAnimationDelay} from "./Enums.ts";
import {setPlayerAnimations} from "../util/animations.ts";
import {GameState} from "../main.ts";
import Vector2 = Phaser.Math.Vector2;
import {getVectorDirectionAsString} from "../util/util.ts";

export class player {
    public isMoving: boolean = false;
    private stepCount: MovementState = MovementState.stepAnim1;
    private currentFacePosition: Vector2 = Vector2.DOWN;
    private animationDuration: PlayerAnimationDelay = PlayerAnimationDelay.move;
    private name: string = "player";

    constructor(
        private tween: Phaser.Tweens.TweenManager,
        public sprite: Phaser.GameObjects.Sprite,
        private collisionLayer: Phaser.Tilemaps.TilemapLayer,
        private tilePos: Phaser.Math.Vector2,
        // private npcGroup?: Phaser.GameObjects.Sprite[]
    ) {
        this.sprite.setOrigin(0, 1);
        this.sprite.setDepth(3);
        this.setGridPosition(new Vector2(this.tilePos));
        setPlayerAnimations(this.sprite.anims);
        // GameState.setPlayerGridPosition(tilePos)
        GameState.setGridPosition(this.name, new Vector2(tilePos));

    }

    public setGridPosition(pos: Phaser.Math.Vector2): void {
        const res = setMapCoordinates(pos.x, pos.y);
        this.sprite.setPosition(res.x, res.y);
    }

    public getGridPosition(x: number, y: number): { x: number, y: number } {
        return getMapCoordinates(x, y);
    }

    public getCurrentGridPosition(): { x: number, y: number } {
        const curPos = this.sprite.getBottomCenter();
        return getMapCoordinates(curPos.x, curPos.y);
    }

    private checkForCollison(direction: Vector2): { x: number; y: number } {


        const posX = this.sprite.x + (direction.x * 16);
        const posY = this.sprite.y + (direction.y * 16) - 16; //required to offset with the origin thats set
        const grid = this.getCurrentGridPosition();

        const npcPositions = GameState.getGridPositions();

        for (let i = 0; i < npcPositions.length; i++) {
            const npc = npcPositions[i];
            const npcPosX = grid.x + direction.x;
            const npcPosY = grid.y + direction.y;

            if (npcPosX - npc.x === 0 && npcPosY - npc.y === 0) {
                return {x: this.sprite.x, y: this.sprite.y};
            }
        }

        const tile = this.collisionLayer.getTileAtWorldXY(posX, posY);
        if (tile && tile.canCollide) {
            return {x: this.sprite.x, y: this.sprite.y}
        } else {
            return {x: posX, y: posY + 16};
        }
    }

    private walkingAnimation(direction: Vector2): Vector2 {
        const animName: string = this.name.split("_")[0]; //parse names to ensure fetching correct animation name
        const characterDirection = getVectorDirectionAsString(direction);
        if (this.currentFacePosition !== direction) {
            this.currentFacePosition = direction;
            this.sprite.anims?.play(`${animName}_face_${characterDirection}`);

            this.stepCount = MovementState.stepAnim1;
            this.animationDuration = PlayerAnimationDelay.idle;
            direction = Vector2.ZERO;
        } else if (this.stepCount === MovementState.stepAnim1) {
            this.sprite.anims.play(`${animName}_walk_${characterDirection}_1`)
            this.stepCount = MovementState.stepAnim2;
        } else if (this.stepCount === MovementState.stepAnim2) {
            this.sprite.anims.play(`${animName}_walk_${characterDirection}_2`)
            this.stepCount = MovementState.stepAnim1;
        }
        return direction;
    }

    public move(direction: Vector2): void {
        if (this.isMoving) {
            return;
        }
        this.isMoving = true

        direction = this.walkingAnimation(direction);
        const newPos = this.checkForCollison(direction);

        this.tween.add({
            targets: this.sprite,
            x: newPos.x,
            y: newPos.y,
            duration: this.animationDuration,
            ease: "linear",
            onComplete: () => {
                this.isMoving = false;
                if (this.animationDuration !== PlayerAnimationDelay.move) {
                    this.animationDuration = PlayerAnimationDelay.move;
                }
                GameState.setGridPosition(this.name, this.getCurrentGridPosition());
            }
        });
    }

    public toggleMovement() {
        this.isMoving = !this.isMoving;
    }
}