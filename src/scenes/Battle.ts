import {SceneName} from "../game/Enums.ts";
// import {GameState} from "../main.ts";

import mudkipPlayer from "../assets/sprites/pokemon/mudkip_back.png"
import torchicEnemy from "../assets/sprites/pokemon/torchic_front.png";
// import dialog from "../assets/ui/html/dialog.html?raw";
import battleMenu from "../assets/ui/html/battleMenu.html?raw";
import attackMenu from "../assets/ui/html/attackMenu.html?raw";
import hpHud from "../assets/ui/html/hpHud.html?raw";
import {parseLine} from "../util/util.ts";


export class Battle extends Phaser.Scene {

    // private friendlyParty;
    // private enemyParty;
    // private isWild: boolean | undefined;

    constructor() {
        super(SceneName.battle);
    }

    // private updatePositions(): void {
    //     const newPlayerPos = window.innerWidth / 3;
    //     const newEnemyPos = window.innerWidth - (window.innerWidth / 3);
    // }

    preload(): void {
        // hardcoded for now
        // this.friendlyParty = GameState.Game.playerParty;
        // this.enemyParty = [];
        // this.isWild = true;

        this.load.image("mudkip", mudkipPlayer);
        this.load.image("torchic", torchicEnemy);
    }

    create(): void {
        const playerActive = this.add.image(
            window.innerWidth / 3,
            window.innerHeight - 350,
            "mudkip");
        const enemyActive = this.add.image(
            window.innerWidth - (window.innerWidth / 3),
            window.innerHeight / 4,
            "torchic");

        window.addEventListener("resize", () => {
            playerActive.x = window.innerWidth / 3;
            enemyActive.x = window.innerWidth - (window.innerWidth / 3);

            playerActive.y = window.innerWidth - (window.innerWidth / 3);
            enemyActive.y = window.innerHeight / 4;
        });

        playerActive.scale = 3;
        enemyActive.scale = 3;

        const playerHud = hpHud;
        const enemyHud = hpHud;

        const display = document.querySelector<HTMLDivElement>("#display")!;
        display.innerHTML = battleMenu + attackMenu + playerHud + enemyHud;

        const testString: string = "Testing1234 functionality.";
        console.log(testString.length)
        const p = document.querySelector("#text1")!;
        p.textContent = parseLine(testString);


        // display.style.height = "100px";
        // display.style.width = "100px";
        // display.style.zIndex = "1";
        // display.style.background = "red";
//         document.querySelector<HTMLDivElement>('#display')!.innerHTML = `
//   <div id="textBox">
//   Hello world
//   </div>
// `

    }

    update(): void {

    }
}