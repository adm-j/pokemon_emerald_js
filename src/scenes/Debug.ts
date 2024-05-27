import {SceneName} from "../game/Enums.ts";
import {GameState} from "../main.ts";


export class DebugScene extends Phaser.Scene {
    constructor() {
        super(SceneName.debug);
    }

    private gridPos = GameState.Game.NpcGridPositions;
    private debugText: Phaser.GameObjects.Text | undefined;

    create(): void {
        this.scene.bringToTop();

        const textConfig = {
            fontSize: "60px",
        }

        // @ts-ignore
        const string = `x:${this.gridPos.player.x || "n/a"} y:${this.gridPos.player.y || "n/a"}`

        this.debugText = this.add.text(0, 0, string, textConfig);
        this.debugText.setDepth(15);

    }

    update() {
        // @ts-ignore
        this.debugText?.setText(`x:${this.gridPos.player.x || "n/a"} y:${this.gridPos.player.y || "n/a"}`);
    }
}