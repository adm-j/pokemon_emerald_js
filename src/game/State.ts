import {SceneName} from "./Enums.ts";

export class State {
    constructor() {

    }

    public Game = {
        playerCurrentScene: SceneName.littleRootTown,
        playerPreviousScene: "",
        NpcGridPositions: {},
        PlayerGridPosition: {x: 0, y: 0},

    };

    public system = {
        gameState: ""
    }

    public audio = {

    }

    public setNextPlayerLocation = (nextScene: string) : void => {
        this.Game.playerPreviousScene = this.Game.playerCurrentScene;
        this.Game.playerCurrentScene = nextScene;
    }

    public setGridPosition(name: string, position: {x: number, y: number}): void {
        // @ts-ignore
        this.Game.NpcGridPositions[name] = position;
    }

    public setPlayerGridPosition(position: {x: number, y: number}): void {
        this.Game.PlayerGridPosition = position;
    }

    public clearGridPositions(): void {
        this.Game.NpcGridPositions = {};
        this.Game.PlayerGridPosition = {x: 0, y: 0};
    }

    public getGridPositions(): {x: number, y: number}[] {
        return Object.values(this.Game.NpcGridPositions);
    }
}