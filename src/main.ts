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
// import {OverworldState} from "./game/Enums.ts";
import {SceneManager} from "./game/SceneManager.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: constants.canvasWidth,
    height: constants.canvasHeight,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: SceneLoader,
    parent: "container",
    physics: {
        default: "arcade"
    }
}

// @ts-ignore
export const game = new Phaser.Game(config);
export const display = document.querySelector<HTMLDivElement>("#display")!;

const gameCanvas = document.querySelector<HTMLCanvasElement>("canvas")!;

display.style.height = constants.canvasHeight + "px";
display.style.width = constants.canvasWidth + "px";
display.style.marginLeft = gameCanvas.style.marginLeft;
display.style.marginTop = gameCanvas.style.marginTop;

// window.addEventListener("resize", () => {
//     game.scale.resize(constants.canvasWidth, constants.canvasHeight);
//
//     // constants.canvasWidth = window.innerWidth;
//     // constants.canvasHeight = window.innerHeight;
//
//     display.style.width = window.innerWidth + "px";
//     display.style.height = window.innerHeight + "px";
//     },false
// );

export const controls = document.querySelector<HTMLDivElement>("#controls")!;
controls.style.position = "absolute";
controls.style.height = constants.canvasHeight + "px";
controls.style.width = constants.canvasWidth + "px";
// settings these keeps our controls inline with the canvas
controls.style.marginLeft = gameCanvas.style.marginLeft;
controls.style.marginTop = gameCanvas.style.marginTop;

export const GameState = new State();
export const touch = new TouchControls();
export const sceneManager = new SceneManager();
