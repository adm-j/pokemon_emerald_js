import overworldTouchUI from "../assets/ui/html/overworldTouchUi.html?raw";
import "../assets/ui/css/dpad.css";
import "../assets/ui/css/actionButtons.css";
import "../assets/ui/css/debugOptions.css"
import dpad from "../assets/ui/html/dpad.html?raw";
import buttons from "../assets/ui/html/actionButtons.html?raw";
import debugOptions from "../assets/ui/html/debugOptions.html?raw";
import Vector2 = Phaser.Math.Vector2;
import {controls, sceneManager} from "../main.ts";
import {handleInteract} from "../util/util.ts";

export class TouchControls {

    constructor() {
    }

    private left: Element | null = null;
    private top: Element | null = null;
    private right: Element | null = null;
    private bottom: Element | null = null;

    private interact: Element | null = null;
    private menu: Element | null = null;

    public currentDirection: Vector2 | null = null;
    public holdingTouch: boolean = false;

    public InitialiseControls() {
        controls.innerHTML = overworldTouchUI;

        // DPAD
        const bottomLeft = document.querySelector("#overworldTouchUi_bottom_left")!;
        bottomLeft.innerHTML = dpad;

        this.left = document.querySelector("#dpad_middle_left")!;
        this.top = document.querySelector("#dpad_top_middle")!;
        this.bottom = document.querySelector("#dpad_bottom_middle")!;
        this.right = document.querySelector("#dpad_middle_right")!;

        this.left.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.currentDirection = Vector2.LEFT;
            this.holdingTouch = true;
        })
        this.left.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.left.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
        this.right.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.currentDirection = Vector2.RIGHT;
            this.holdingTouch = true;
        })
        this.right.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.right.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
        this.bottom.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.currentDirection = Vector2.DOWN;
            this.holdingTouch = true;
        })
        this.bottom.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.bottom.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
        this.top.addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.currentDirection = Vector2.UP;
            this.holdingTouch = true;
        })
        this.top.addEventListener("touchend", (e) => {
            e.preventDefault();
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.top.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })

        // buttons

        const bottomRight = document.querySelector("#overworldTouchUi_bottom_right")!;
        bottomRight.innerHTML = buttons;

        this.interact = document.querySelector(".actionButtons_interact")!;
        this.menu = document.querySelector(".actionButtons_menu")!;

        this.interact.addEventListener("touchstart", handleInteract);
        this.interact.addEventListener("click", handleInteract);

        this.menu.addEventListener("touchstart", (e) => {
            e.preventDefault();
            alert("menu button pressed - this will open the pause menu");
        });

        // debug
        if (Number(import.meta.env.VITE_DEBUG)) {
            const debug = document.querySelector("#overworldTouchUi_top_right")!;
            debug.innerHTML = debugOptions;

            const openChat = document.querySelector("#debugOptions")!;

            const debugAction = (e: Event) => {
                e.preventDefault();
                // alert("Debug button");
                sceneManager.StartChatScene("girl_1");
            }

            openChat.addEventListener("touchstart", (e) => {
                debugAction(e);
            });
            openChat.addEventListener("click", (e) => {
                debugAction(e);
            });
        }
    }

    public enable() {
        controls.style.visibility = "visible";
        this.InitialiseControls();
    }

    public disable() {
        controls.innerHTML = "";
        controls.style.visibility = "hidden";
    }
}