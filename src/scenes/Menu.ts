import menu from "../assets/ui/html/mainMenu.html?raw";

import {display, GameState, touch} from "../main.ts";
import {SceneName} from "../game/Enums.ts";

export class Menu extends Phaser.Scene {
    constructor() {
        super(SceneName.menu);
    }

    preload(): void {
        touch.disable();
    };

    create(): void {
        display.innerHTML = menu;

        const changeScreen = () => {
            display.removeEventListener("touchstart", changeScreen);
            this.fadeToScene()
        };
        display.addEventListener("touchstart", changeScreen);
    };

    private fadeToScene () {
        const timerMS = 1000;
        display.style.animation = `fadeOut ${timerMS / 1000}s ease`;

        setTimeout(() => {
            // this will need more complex scene logic in future, though this may be handled in a seperate scene?
            this.scene.stop(SceneName.menu);
            this.scene.run(SceneName.littleRootTown)
            GameState.setNextPlayerLocation(SceneName.littleRootTown);
            touch.enable();
            display.innerHTML = "";
        }, timerMS);
    }

    update(): void {
        const cursors = this.input.keyboard?.createCursorKeys();
        if (cursors?.space.isDown) {
            this.fadeToScene();
        }
    };
}