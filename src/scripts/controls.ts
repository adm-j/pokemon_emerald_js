import Phaser from "phaser";

export class controls {
    constructor(
        private input: Phaser.Input.InputPlugin
    ) {
    }

    public move() {
        this.input.keyboard?.on("keydown", (e) => {
            console.log(e);
        })
    }
}