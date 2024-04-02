import {constants, placeholderText} from "../util/util.ts";
import {player} from "./player.ts";

// import font from "../fonts/pokemon-emerald.otf";

export class TextBox {
    private textField: Phaser.GameObjects.Text | undefined;
    private textBox!: Phaser.GameObjects.Rectangle;
    private isOpen: boolean = false;

    constructor(
        private scene: Phaser.Scene,
        private player: player
    ) {
    }

    create() {
        if (!this.isOpen) {
            this.isOpen = true;

            this.player.toggleMovement();

            const textBoxConfig = {
                x: this.player.sprite.x,
                y: this.player.sprite.y + 70,
                width: (constants.canvasWidth / 3) - 15, //need to divide by 3 to account for camera zoom
                height: 50,
                colour: 0xffffff,
                borderRadius: 10,
                borderColour: 0x00ff9c,
            }

            const textConfig = {
                x: this.player.sprite.x - 120,
                y: this.player.sprite.y + 45,
                fontSize: "24px",
                fontFamily: "emerald",
                color: "#636363",
                wordWrap: {
                    width: (constants.canvasWidth / 3) - 30,
                    useAdvancedWrap: true
                }
            }
            this.textField = this.scene.add.text(textConfig.x, textConfig.y, placeholderText(), textConfig);
            this.textField.setDepth(11);
            this.textBox = this.scene.add.rectangle(textBoxConfig.x, textBoxConfig.y, textBoxConfig.width, textBoxConfig.height, textBoxConfig.colour, 1);
            this.textBox.setStrokeStyle(3, textBoxConfig.borderColour, 1);
            this.textBox.setDepth(10);
        }
    }

    remove() {
        if (this.isOpen) {
            this.isOpen = false;
            this.textBox.destroy();
        } else {
            console.warn("Textbox is not open, can't destroy.");
        }
    }
}