import overworldTouchUI from "../assets/ui/html/overworldTouchUi.html?raw";
import Vector2 = Phaser.Math.Vector2;

export class TouchControls {

    constructor() {
        this.enable();
    }

    private left: Element | null = null;
    private top: Element | null = null;
    private right: Element | null = null;
    private bottom: Element | null = null;

    public currentDirection: Vector2 | null = null;
    public holdingTouch: boolean = false;

    public initialise () {

        this.left = document.querySelector("#overworldTouchUi_left")!;
        this.top = document.querySelector("#overworldTouchUi_top")!;
        this.bottom = document.querySelector("#overworldTouchUi_bottom")!;
        this.right = document.querySelector("#overworldTouchUi_right")!;

        this.left.addEventListener("touchstart", () => {
            this.currentDirection = Vector2.LEFT;
            this.holdingTouch = true;
        })
        this.left.addEventListener("touchend", () => {
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.right.addEventListener("touchstart", () => {
            this.currentDirection = Vector2.RIGHT;
            this.holdingTouch = true;
            // this.movePlayer();
        })
        this.right.addEventListener("touchend", () => {
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.bottom.addEventListener("touchstart", () => {
            this.currentDirection = Vector2.DOWN;
            this.holdingTouch = true;
            // this.movePlayer();
        })
        this.bottom.addEventListener("touchend", () => {
            this.currentDirection = null;
            this.holdingTouch = false;
        })
        this.top.addEventListener("touchstart", () => {
            this.currentDirection = Vector2.UP;
            this.holdingTouch = true;
            // this.movePlayer();
        })
        this.top.addEventListener("touchend", () => {
            this.currentDirection = null;
            this.holdingTouch = false;
        })
    }

    public enable () {
        const display = document.querySelector("#display")!;
        display.innerHTML = overworldTouchUI;
    }

    public disable() {
        const display = document.querySelector("#display")!;
        display.innerHTML = "";
    }
}