import {SceneName} from "../game/Enums.ts";

export class PauseMenu extends Phaser.Scene {

    // private menuState;
    // private menuOptions;
    private pointer: Phaser.GameObjects.Triangle | undefined;

    constructor() {
        super(SceneName.pausemenu);
    }

    preload() : void {
    }

    create(): void {

        this.scene.bringToTop();

        const textConfig = {
            fontSize: "60px",
            fontFamily: "emerald",
            color: "#636363",
            x: 575,
            y: 50
        }

        const menuConfig = {
            x: 650,
            y: 300,
            width: 250,
            height: 550
        }

        const pointerConfig = {
            x: textConfig.x - 25,
            y: textConfig.y + 25,
        }

        this.pointer = this.add.triangle(pointerConfig.x, pointerConfig.y, 0, 32, 16, 0, 32, 32, 0x636363, 1);
        const menuText = this.add.text(textConfig.x, textConfig.y, "POKEMON\nBAG\nOPTION\nEXIT", textConfig);
        const menuBackground = this.add.rectangle(menuConfig.x, menuConfig.y, menuConfig.width, menuConfig.height, 0xffffff, 1);

        menuText.setDepth(10);
        this.pointer.setDepth(10);

        menuBackground.setStrokeStyle(10, 0x636363, 1);
        menuBackground.setDepth(9);

    }

    // private next = () => {
    //
    // }
    //
    // private previous = () => {
    //
    // }

    update(): void {
        const cursors = this.input.keyboard?.createCursorKeys();
        if (cursors?.space.isDown) {
            this.scene.stop(SceneName.pausemenu);
            this.scene.resume(SceneName.littleRootTown);
        }
    }
}