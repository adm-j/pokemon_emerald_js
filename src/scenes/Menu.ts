import background from "../assets/maps/menu/emeraldMainMenuBackground.png";
import {constants} from "../util/util.ts";
import {GameState} from "../main.ts";
import {SceneName} from "../game/Enums.ts";

export class Menu extends Phaser.Scene {
    constructor() {
        super(SceneName.menu);
    }
    private menuBackground : Phaser.GameObjects.Image | undefined;
    private menuHeading : Phaser.GameObjects.Text | undefined;
    private menuText : Phaser.GameObjects.Text | undefined;

    preload(): void {
        this.load.image("background", background);
    };

    create(): void {

        const textConfig = {
            fontSize: "60px",
            fontFamily: "emerald"
            // color: "#636363",
            // wordWrap: {
            //     width: (constants.canvasWidth / 3) - 30,
            //     useAdvancedWrap: true
            // }
        }

        this.menuBackground = this.add.image(constants.canvasWidth / 2, constants.canvasHeight / 2, "background");
        this.menuHeading = this.add.text(constants.canvasWidth / 4, 100, "Pokemon Emerald JS", textConfig);
        this.menuText = this.add.text(constants.canvasWidth / 4, 500, "Press space to begin", textConfig);

        this.tweens.add({
            targets: this.menuText,
            alpha: {from: 1, to: 0},
            ease: "Sine.easeOut",
            duration: 800,
            yoyo: true,
            repeat: -1,
        })
    };

    update(): void {
        const cursors = this.input.keyboard?.createCursorKeys();
        if (cursors?.space.isDown) {
            const timerMS = 1000;
            this.tweens.add({
                targets: [this.menuBackground, this.menuHeading, this.menuText],
                alpha: {from: 1, to: 0},
                ease: "Sine.InOut",
                duration: timerMS,
            });
            setTimeout(() => {
                // this will need more complex scene logic in future, though this may be handled in a seperate scene?
                // this.scene.switch("LittlerootTown");
                this.scene.stop(SceneName.menu);
                this.scene.run(SceneName.littleRootTown)
                GameState.setNextPlayerLocation(SceneName.littleRootTown);
            }, timerMS);
        }
    };
}