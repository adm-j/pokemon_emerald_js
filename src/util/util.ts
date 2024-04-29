import Vector2 = Phaser.Math.Vector2;

export const constants = {
    canvasWidth: 800,
    canvasHeight: 600,
    tileWidth: 16,
    tileHeight: 16
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