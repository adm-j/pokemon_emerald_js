import {SceneName} from "../game/Enums.ts";
import Phaser from "phaser";
import {display, GameState, sceneManager} from "../main.ts";
import "../assets/ui/css/chatMenu.css"
import chatUI from "../assets/ui/html/chatMenu.html?raw";

export class ChatMenu extends Phaser.Scene {
    constructor() {
        super(SceneName.chatmenu);
    }

    private chatLine1: HTMLDivElement | null = null;
    private chatBox: HTMLDivElement | null = null;
    private spaceHeld = false;

    create(): void {
        display.innerHTML = chatUI;
        this.chatLine1 = document.querySelector(".chatMenu_textbox_line1")!;
        this.chatBox = document.querySelector(".chatMenu_textbox_content")!;

        this.chatBox.addEventListener("touchstart", () => {
            this.Continue();
        })
        this.displayText();
    }

    private Continue() {
        if (GameState.System.CurrentLine < GameState.System.Chat.length - 1) {
            GameState.System.CurrentLine++;
            this.displayText()
        } else {
            display.innerHTML = "";
            sceneManager.EndChatScene();
        }
    }

    public displayText() {
        if (this.chatLine1) {
            this.chatLine1.innerText = GameState.System.Chat[GameState.System.CurrentLine];
        } else {
            console.error("Could not set text, chat element is not set")
        }
    }

    update(): void {
        const cursors = this.input.keyboard?.createCursorKeys();
        if (cursors?.space.isDown && !this.spaceHeld) {
            this.Continue();
            this.spaceHeld = true;
        } else if (cursors?.space.isUp) {
            this.spaceHeld = false;
        }
    }
}