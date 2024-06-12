import './style.css';
import "./assets/ui/css/dialog.css";
import "./assets/ui/css/battleMenu.css";
import "./assets/ui/css/attackMenu.css";
import "./assets/ui/css/hpHud.css";
import "./assets/ui/css/overworldTouchUi.css";
import "./assets/ui/css/mainMenu.css";

import Phaser from "phaser";
import {constants} from "./util/util.ts";
import {SceneLoader} from "./game/SceneLoader.ts";
import {State} from "./game/State.ts";
import {TouchControls} from "./game/TouchControls.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: SceneLoader,
    parent: "container",
    physics: {
        default: "arcade"
    }
}

const game = new Phaser.Game(config);
export const display = document.querySelector<HTMLDivElement>("#display")!;

display.style.height = window.innerHeight + "px";
display.style.width = window.innerWidth + "px";

window.addEventListener("resize", () => {
    game.scale.resize(window.innerWidth, window.innerHeight);

    constants.canvasWidth = window.innerWidth;
    constants.canvasHeight = window.innerHeight;

    display.style.width = window.innerWidth + "px";
    display.style.height = window.innerHeight + "px";
    },false
);

const gameCanvas = document.querySelector<HTMLCanvasElement>("canvas")!;
gameCanvas.style.top = "0";
gameCanvas.style.left = "0";

export const controls = document.querySelector<HTMLDivElement>("#controls")!;
controls.style.position = "absolute";
controls.style.height = "100%";
controls.style.width = "100%";

export const GameState = new State();
export const touch = new TouchControls();