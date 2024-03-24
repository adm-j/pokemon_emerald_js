import {getMapCoordinates, setMapCoordinates} from "../scripts/movement.ts";
import Vector2 = Phaser.Math.Vector2;

export class player {
    constructor(
        private sprite: Phaser.GameObjects.Sprite,
        tilePos: Phaser.Math.Vector2
    ) {
        this.sprite.setOrigin(0, 1);
        this.setGridPosition(new Vector2(tilePos))
    }

    public setGridPosition(pos: Phaser.Math.Vector2) {
        const res = setMapCoordinates(pos.x, pos.y);
        this.sprite.setPosition(res.x, res.y);
    }

    public getGridPosition() {
        const pos = this.sprite.getBottomCenter();
        return getMapCoordinates(pos.x, pos.y);
    }

    private movePlayer(direction: string) {
        this.sprite.setPosition()
    }

    public move(direction: String) {

        const currentPosition = this.getGridPosition();
        switch (direction.toLowerCase()) {
            case "left":
                this.setGridPosition(new Vector2(currentPosition.x - 1, currentPosition.y));
                break;
            case "right":
                this.setGridPosition(new Vector2(currentPosition.x + 1, currentPosition.y));
                break;
            case "up":
                this.setGridPosition(new Vector2(currentPosition.x, currentPosition.y - 1));
                break;
            case "down":
                this.setGridPosition(new Vector2(currentPosition.x, currentPosition.y + 1));
                break;
        }
    }
}