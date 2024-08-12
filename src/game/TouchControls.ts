import overworldTouchUI from "../assets/ui/html/overworldTouchUi.html?raw";
import "../assets/ui/css/dpad.css";
import "../assets/ui/css/actionButtons.css";
import dpad from "../assets/ui/html/dpad.html?raw";
import buttons from "../assets/ui/html/actionButtons.html?raw";
import Vector2 = Phaser.Math.Vector2;
import {controls} from "../main.ts";

export class TouchControls {

    constructor() {
        this.initialise();
    }

    private left: Element | null = null;
    private top: Element | null = null;
    private right: Element | null = null;
    private bottom: Element | null = null;

    private A: Element | null = null;
    private B: Element | null = null;
    private M: Element | null = null;

    public currentDirection: Vector2 | null = null;
    public holdingTouch: boolean = false;

    private initialise () {
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

        this.A = document.querySelector(".actionButtons_A")!;
        this.B = document.querySelector(".actionButtons_B")!;
        this.M = document.querySelector(".actionButtons_M")!;

        this.A.addEventListener("touchstart", (e) => {
            e.preventDefault();
            alert("A pressed - this will be the interact button");
        });

        this.B.addEventListener("touchstart", (e) => {
            e.preventDefault();
            alert("B pressed - may be redundant");
        });

        this.M.addEventListener("touchstart", (e) => {
            e.preventDefault();
            alert("M pressed - this will be the pause menu");
            // sceneManager.PauseScene();
        })

    }

    public enable () {
        controls.style.visibility = "visible";
        this.initialise();
    }

    public disable() {
        // controls.innerHTML = "";
        controls.style.visibility = "hidden";
    }
}