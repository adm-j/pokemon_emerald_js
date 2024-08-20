import {OverworldState, SceneName} from "../Enums.ts";
import {CharacterCoordinates, Coordinates, NpcDirection} from "../../util/interfaces.ts";
import Vector2 = Phaser.Math.Vector2;

export class Game {
    constructor() {
    }

    public PlayerParty: string[] | null = [];
    public PlayerCurrentScene: SceneName = SceneName.littleRootTown;
    public PlayerPreviousScene: SceneName | null = null;
    public NpcGridPositions: CharacterCoordinates[] = [];
    public PlayerGridPosition: Coordinates = {x: 0, y: 0};
    public NpcFacingDirection: NpcDirection[] = [];
    public PlayerFacingDirection: Vector2 = Vector2.ZERO;
    public CurrentState: OverworldState = OverworldState.movement;
}