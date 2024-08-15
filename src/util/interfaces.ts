import {OverworldState, SceneName} from "../game/Enums.ts";
import Vector2 = Phaser.Math.Vector2;

export interface Coordinates {
    x: number,
    y: number
}

export interface Interactable extends Coordinates {
    requiredDirection: Vector2;
}

export interface InteractableObjects {
    name: string,
    positions: [Interactable, Interactable, Interactable, Interactable]
}

export interface CharacterCoordinates {
    name: string,
    position: Coordinates,
    facedPosition: Vector2
}

export interface CharacterDialogue {
    name: string,
    text: string[];
}

export interface GameState {
    PlayerParty: string[] | null,
    PlayerCurrentScene: SceneName,
    PlayerPreviousScene: SceneName,
    NpcGridPositions: CharacterCoordinates[],
    PlayerGridPosition: CharacterCoordinates,
    CurrentState: OverworldState,
}