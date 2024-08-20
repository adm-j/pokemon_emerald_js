import TweenManager = Phaser.Tweens.TweenManager;
import TilemapLayer = Phaser.Tilemaps.TilemapLayer;
import {Coordinates} from "../../util/interfaces.ts";
import {GameState} from "../../main.ts";
import {getVectorDirectionAsString} from "../../util/util.ts";
import {MovementState, PlayerAnimationDelay} from "../Enums.ts";
import Vector2 = Phaser.Math.Vector2;
import {Character} from "./Character.ts";

export class EntityManager {
    private tween: TweenManager;
    private collisionLayer: TilemapLayer;

    constructor(tween: TweenManager, collisionLayer: TilemapLayer) {
        this.tween = tween;
        this.collisionLayer = collisionLayer;
    }

    private checkForCollison(character: Character, direction: Vector2): Coordinates {
        const posX = character.sprite.x + (direction.x * 16);
        const posY = character.sprite.y + (direction.y * 16) - 16; //required to offset with the origin thats set
        const grid = character.getCurrentGridPosition();

        const npcPositions = GameState.getGridPositions();

        for (let i = 0; i < npcPositions.length; i++) {
            const npc = npcPositions[i];
            const npcPosX = grid.x + direction.x;
            const npcPosY = grid.y + direction.y;

            if (npcPosX - npc.x === 0 && npcPosY - npc.y === 0) {
                return {x: character.sprite.x, y: character.sprite.y};
            }
        }

        const tile = this.collisionLayer.getTileAtWorldXY(posX, posY);
        if (tile && tile.canCollide) {
            return {x: character.sprite.x, y: character.sprite.y}
        } else {
            return {x: posX, y: posY + 16};
        }
    }

    private ChangeFacingDirection(name: string, direction: Vector2): void {
        let exists = false;
        for (const el in GameState.Game.NpcFacingDirection) {
            if (GameState.Game.NpcFacingDirection[el].name === name) {
                GameState.Game.NpcFacingDirection[el].direction = direction;
                exists = true;
            }
        }
        if (!exists) {
            GameState.Game.NpcFacingDirection.push({name, direction})
        }
    }

    private walkingAnimation(character: Character, direction: Vector2): Vector2 {

        const animName: string = character.name.split("_")[0]; //parse names to ensure fetching correct animation name
        const characterDirection = getVectorDirectionAsString(direction);
        if (character.currentFacePosition !== direction) {
            character.currentFacePosition = direction;
            character.sprite.anims?.play(`${animName}_face_${characterDirection}`);

            character.stepCount = MovementState.stepAnim1;
            character.animationDuration = PlayerAnimationDelay.idle;
            direction = Vector2.ZERO;
        } else if (character.stepCount === MovementState.stepAnim1) {
            character.sprite.anims.play(`${animName}_walk_${characterDirection}_1`)
            character.stepCount = MovementState.stepAnim2;
        } else if (character.stepCount === MovementState.stepAnim2) {
            character.sprite.anims.play(`${animName}_walk_${characterDirection}_2`)
            character.stepCount = MovementState.stepAnim1;
        }
        this.ChangeFacingDirection(character.name, direction);
        return direction;
    }

    public move(character: Character, direction: Vector2): void {
        if (character.isMoving) {
            return;
        }
        character.isMoving = true

        direction = this.walkingAnimation(character, direction);
        const newPos = this.checkForCollison(character, direction);

        this.tween.add({
            targets: character.sprite,
            x: newPos.x,
            y: newPos.y,
            duration: character.animationDuration,
            ease: "linear",
            onComplete: () => {
                character.isMoving = false;
                if (character.animationDuration !== PlayerAnimationDelay.move) {
                    character.animationDuration = PlayerAnimationDelay.move;
                }
                GameState.setGridPosition(character.name, character.getCurrentGridPosition(), character.currentFacePosition);
            }
        });
    }
}