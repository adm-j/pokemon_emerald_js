import {SceneName} from "../game/Enums.ts";
import {GameState} from "../main.ts";
import {Coordinates} from "../util/interfaces.ts";


export class DebugScene extends Phaser.Scene {
    constructor() {
        super(SceneName.debug);
    }

    private gridPos: Coordinates | undefined = undefined;
    private debugText: Phaser.GameObjects.Text | undefined;

    private GetPlayerCoordinates(): void {
        const pos = GameState.Game.NpcGridPositions;
        pos.forEach(element => {
            if (element.name === "player") {
                this.gridPos = element.position;
            }
        })
    }

    create(): void {
        this.scene.bringToTop();

        const textConfig = {
            fontSize: "60px",
        }

        const string = `x: n/a y:" n/a"`

        this.debugText = this.add.text(0, 0, string, textConfig);
        this.debugText.setDepth(15);

    }

    update() {
        this.GetPlayerCoordinates();
        if (this.gridPos) {
            this.debugText?.setText(`x:${this.gridPos.x || "n/a"} y:${this.gridPos.y || "n/a"}`);
        }
    }
}