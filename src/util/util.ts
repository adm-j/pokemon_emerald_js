export const constants = {
    canvasWidth: 800,
    canvasHeight: 600,
    tileWidth: 16,
    tileHeight: 16
}

export enum playerAnimationDelay {
    idle = 50,
    move = 250

}

export enum movementState {
    idle = -1,
    stepAnim1 = 0,
    stepAnim2 = 1
}