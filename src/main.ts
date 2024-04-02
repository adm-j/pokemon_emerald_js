import './style.css'

import Phaser from "phaser";
import {mainScene} from "./scenes/mainScene.ts";
import {constants} from "./util/util.ts";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: constants.canvasWidth,
    height: constants.canvasHeight,
    scene: mainScene,
    physics: {
        default: "arcade"
    }
}

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//   </div>
// `

const game = new Phaser.Game(config);

const gameCanvas = document.querySelector<HTMLCanvasElement>("canvas")!;
gameCanvas.style.top = "0";
gameCanvas.style.left = "0";