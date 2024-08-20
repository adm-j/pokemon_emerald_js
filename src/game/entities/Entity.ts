import {getMapCoordinates, setMapCoordinates} from "../../scripts/movement.ts";
import {Coordinates} from "../../util/interfaces.ts";

import Sprite = Phaser.GameObjects.Sprite;

export class Entity {
    public sprite: Sprite | any; // hacky, but no better way currently...!
    public name: string;

    constructor(name: string) {
        this.name = name;
        // this.sprite = sprite;
    }

    public Initialise(sprite: Sprite) {
        this.sprite = sprite;
        this.sprite.setOrigin(0, 1);
        this.sprite.setDepth(3);
    }

    public setGridPosition(pos: Phaser.Math.Vector2): void {
        const res = setMapCoordinates(pos.x, pos.y);
        this.sprite.setPosition(res.x, res.y);
    }

    public getGridPosition(x: number, y: number): Coordinates {
        return getMapCoordinates(x, y);
    }

    public getCurrentGridPosition(): Coordinates {
        const curPos = this.sprite.getBottomCenter();
        return getMapCoordinates(curPos.x, curPos.y);
    }

}