import './style.css'

import Phaser from "phaser";
import {constants} from "./util/util.ts";
import {SceneLoader} from "./game/SceneLoader.ts";
import {State} from "./game/State.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: constants.canvasWidth,
    height: constants.canvasHeight,
    scene: SceneLoader,
    physics: {
        default: "arcade"
    }
}

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//   </div>
// `

const game = new Phaser.Game(config);
export const GameState = new State();

const gameCanvas = document.querySelector<HTMLCanvasElement>("canvas")!;
gameCanvas.style.top = "0";
gameCanvas.style.left = "0";