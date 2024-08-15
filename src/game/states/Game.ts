import {OverworldState, SceneName} from "../Enums.ts";
import {CharacterCoordinates, Coordinates} from "../../util/interfaces.ts";

export class Game {
    constructor() {
    }
    public PlayerParty: string[] | null = [];
    public PlayerCurrentScene: SceneName = SceneName.littleRootTown;
    public PlayerPreviousScene: SceneName | null = null;
    public NpcGridPositions: CharacterCoordinates[] = [];
    public PlayerGridPosition: Coordinates = {x: 0, y: 0};
    public CurrentState: OverworldState = OverworldState.movement;
}