export class Controller {
    constructor(
        private context: Phaser.Scene
    ) {
    }
    public AddKeyboardControls() : void {
        this.context.input.keyboard?.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER
        }); //todo: test this
    }

    public addGamepadControls() : void {
        this.context.input.gamepad?.once("connected", (e)=> {
            e.index;
            //todo: Test this
        })
    }

    public addMobileControls() : void {
        //todo: Add mobile UI
    }
}