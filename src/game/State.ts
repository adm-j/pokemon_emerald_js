import {OverworldState, SceneName} from "./Enums.ts";

export class State {
    constructor() {
    }

    public Game = {
        playerParty: [],
        playerCurrentScene: SceneName.littleRootTown,
        playerPreviousScene: "",
        NpcGridPositions: {},
        PlayerGridPosition: {x: 0, y: 0},
        currentState: OverworldState.movement,
        runEvent: false
    };

    public System = {
        chat: [""],
        currentLine: 0,
    }

    public Level = {
        interactions: {
            girl1: ["Hi! I'm Girl 1! Yes I know, what a silly name...", "But hey, this is pretty cool right? RIGHT?!"],
            girl2: ["I don't like Pokemon. It sucks, I'm trapped in this village!"]
        }
    }

    public audio = {}

    public setNextPlayerLocation = (nextScene: string): void => {
        this.Game.playerPreviousScene = this.Game.playerCurrentScene;
        // @ts-ignore
        this.Game.playerCurrentScene = nextScene;
    }

    public setGridPosition(name: string, position: { x: number, y: number }): void {
        // @ts-ignore
        this.Game.NpcGridPositions[name] = position;
    }

    public setPlayerGridPosition(position: { x: number, y: number }): void {
        this.Game.PlayerGridPosition = position;
    }

    public clearGridPositions(): void {
        this.Game.NpcGridPositions = {};
        this.Game.PlayerGridPosition = {x: 0, y: 0};
    }

    public getGridPositions(): { x: number, y: number }[] {
        return Object.values(this.Game.NpcGridPositions);
    }
}