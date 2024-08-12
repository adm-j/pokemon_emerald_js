import {SceneName} from "../game/Enums.ts";
import Phaser from "phaser";
import {display} from "../main.ts";

import "../assets/ui/css/chatMenu.css"
import chatUI from "../assets/ui/html/chatMenu.html?raw";


export class ChatMenu extends Phaser.Scene {
    constructor() {
        super(SceneName.chatmenu);
    }

    create(): void {
        display.innerHTML = chatUI;
    }

}