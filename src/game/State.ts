import {Game} from "./states/Game.ts";
import {System} from "./states/System.ts";
import {Level} from "./states/Level.ts";
import {CharacterDialogue, Coordinates, InteractableObjects} from "../util/interfaces.ts";
import {SceneName} from "./Enums.ts";
import Vector2 = Phaser.Math.Vector2;

export class State {
    constructor() {
    }

    public Game = new Game();
    public System = new System();
    public Level = new Level();
    public audio = {}

    public setNextPlayerLocation = (nextScene: SceneName): void => {
        this.Game.PlayerPreviousScene = this.Game.PlayerCurrentScene;
        this.Game.PlayerCurrentScene = nextScene;
    }

    public setGridPosition(name: string, position: Coordinates, facedPosition: Vector2): void {
        let exists = false;
        for (const el in this.Game.NpcGridPositions) {
            if (this.Game.NpcGridPositions[el].name === name) {
                this.Game.NpcGridPositions[el].position = position;
                exists = true;
            }
        }
        if (!exists) {
            this.Game.NpcGridPositions.push({name, position, facedPosition})
        }
    }

    public setPlayerGridPosition(position: { x: number, y: number }): void {
        this.Game.PlayerGridPosition = position;
    }

    public clearGridPositions(): void {
        this.Game.NpcGridPositions = [];
        this.Game.PlayerGridPosition = {x: 0, y: 0};
    }

    public getPlayerPosition(): Coordinates | undefined {
        for (const char in this.Game.NpcGridPositions) {
            if (this.Game.NpcGridPositions[char].name === "player") {
                return this.Game.NpcGridPositions[char].position;
            }
        }
        console.error("Could not find player position! Something very wrong has happened.");
        return undefined;
    }

    public getGridPositions(): Coordinates[] {
        let arr: Coordinates[] = [];
        for (const char in this.Game.NpcGridPositions) {
            arr.push(this.Game.NpcGridPositions[char].position)
        }
        return arr;
        // const values = Object.values(this.Game.NpcGridPositions.position);
        // console.debug("values: ", values)
        // return values;
    }

    public updateNpcInteractableZones(data: InteractableObjects): void {
        let exists = false;
        for (const el in this.Level.InteractableZones) {
            if (this.Level.InteractableZones[el].name === data.name) {
                this.Level.InteractableZones[el] = data;
                exists = true;
            }
        }
        if (!exists) {
            this.Level.InteractableZones.push(data);
        }
    }

    public checkInteractableHit(): string | undefined {
        const playerPos = this.getPlayerPosition();
        if (!playerPos) {
            return undefined;
        }
        for (const el in this.Level.InteractableZones) {
            const npc = this.Level.InteractableZones[el];
            for (const pos of npc.positions) {
                if (playerPos.x === pos.x && playerPos.y === pos.y) {
                    console.debug("Hit!");
                    return npc.name;
                }
            }
        }
    }

    public updateNpcDialogue(data: CharacterDialogue): void {
        let exists = false;
        for (const el in this.Level.Interactions) {
            if (this.Level.Interactions[el].name === data.name) {
                this.Level.Interactions[el] = data;
                exists = true;
            }
        }
        if (!exists) {
            this.Level.Interactions.push(data);
        }
    }

    public getNpcDialogue(name: string): string[] | undefined {
        console.log(this.Level.Interactions);
        for (const el in this.Level.Interactions) {
            if (this.Level.Interactions[el].name === name) {
                return this.Level.Interactions[el].text;
            }
        }
        return undefined;
    }
}