import {constants} from "../util/util.ts";

/**
 * Returns coordinates for the grid based on canvas position
 * @param canvasPositionX
 * @param canvasPositionY
 */
    export const getMapCoordinates = (canvasPositionX: number, canvasPositionY: number) => {
        return {
            x: Math.floor(canvasPositionX / constants.tileWidth),
            y: Math.floor(canvasPositionY / constants.tileHeight)
        }
    }

/**
 * Return single grid coordinate based on canvas position
 * @param pos
 */
export const getMapCoordinate = (pos: number) => {
        return Math.floor(pos / 16);
    }

/**
 * Returns canvas position based on grid based coordinates
 * @param positionX
 * @param positionY
 */
export const setMapCoordinates = (positionX: number, positionY: number) => {
        return {
            x: Math.floor(positionX * constants.tileWidth),
            y: Math.floor(positionY * constants.tileHeight)
        }
    }


/**
 * Return single coordinate based on grid position
 * @param pos
 */
export const newMapCoordinate = (pos: number) => {
    return Math.floor(pos * 16);
    }