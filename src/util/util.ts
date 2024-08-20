import Vector2 = Phaser.Math.Vector2;
import {Nature, SceneName} from "../game/Enums.ts";
import {game, GameState, sceneManager} from "../main.ts";

const getWidth = () => {
    const screenWidth: number = window.innerWidth;
    const breakpoint = 480
    if (screenWidth > breakpoint) {
        return breakpoint;
    }
    return screenWidth;
}

const getHeight = () => {
    const screenHeight: number = window.innerHeight;
    const breakpoint = 780
    if (screenHeight > breakpoint) {
        return breakpoint;
    }
    return screenHeight;
}

export const constants = {
    canvasWidth: getWidth(),
    canvasHeight: getHeight(),
    tileWidth: 16,
    tileHeight: 16,
}

export const placeholderText = () => {
    let retValue = "";
    for (let i = 0; i < 10; i++) {
        retValue += "hello ";
    }
    console.log(retValue.length);
    return retValue;
}

export const getVectorDirectionAsString = (vector: Vector2): string => {
    switch (vector) {
        case Vector2.UP:
            return "up";
        case Vector2.DOWN:
            return "down";
        case Vector2.LEFT:
            return "left";
        case Vector2.RIGHT:
            return "right";
        default:
            return "";
    }
}

export const randomVector = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    switch (randomNumber) {
        case 0:
            return Vector2.UP;
        case 1:
            return Vector2.LEFT;
        case 2:
            return Vector2.RIGHT;
        case 3:
            return Vector2.DOWN;
        default:
            return Vector2.ZERO;
    }
}

export const getNatureBonus = (nature: Nature) => {
    switch (nature) {
        case Nature.adamant:
            return [1.1, 1, 1, 0.9, 1];
        case Nature.bashful:
            return [1, 1, 1, 1, 1];
        case Nature.careful:
            return [1, 1, 1, 1.1, 0.9];
        case Nature.bold:
            return [0.9, 1.1, 1, 1, 1];
        case Nature.brave:
            return [1.1, 1, 0.9, 1, 1];
        default:
            return [1, 1, 1, 1, 1];
    }
}

export const parseLine = (text: string) => {
    const txtPixelCount = 15
    const width = Math.floor(window.innerWidth);

    const textTotalCount = Math.floor(width / txtPixelCount);
    console.log(textTotalCount);
    if (textTotalCount < width) {
        let lineEnd = textTotalCount; // todo: We need to inverse this to remove the word instead of finishing it
        while (lineEnd < textTotalCount && text[lineEnd] !== " ") {
            lineEnd++
        }
        return text.slice(0, lineEnd);
    } else {
        return text;
    }
}

export const handleInteract = (e?: Event): void => {
    e?.preventDefault();
    const interactable = GameState.checkInteractableHit();
    if (interactable) {
        sceneManager.StartChatScene(interactable);
    }
}

/**
 * Starts debug scene if DEBUG environment variable exists
 */
export const enableDebugOptions = () => {
    const debug = Number(import.meta.env.VITE_DEBUG);
    if (debug) {
        game.scene.run(SceneName.debug);
    }
}