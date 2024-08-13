import {OverworldState, SceneName} from "./Enums.ts";
import {game, GameState, touch} from "../main.ts";

export class SceneManager {
    constructor() {
    }

    private state = {
        playerCurrentScene: SceneName.littleRootTown,
        playerPreviousScene: "",
        currentState: OverworldState.movement,
        runEvent: false
    }

    public get getState() {
        return this.state;
    }

    public ChangeScene(scene: SceneName): void {
        this.state.playerPreviousScene = this.state.playerCurrentScene;
        this.state.playerCurrentScene = scene;
        game.scene.start(this.state.playerCurrentScene);
        game.scene.stop(this.state.playerPreviousScene);
        // this.state.runEvent = true;
    }

    public PauseScene(): void {
        // if (this.state.currentState === OverworldState.movement) {
        game.scene.pause(this.state.playerCurrentScene);
        this.state.currentState = OverworldState.pause;
            game.scene.run(SceneName.pausemenu);
            // this.state.runEvent = true;
        // } else {
        //     console.error("PauseScene: Scene state is not movement")
        // }
    }

    public ResumeScene() {
        // if (this.state.currentState === OverworldState.pause) {
            game.scene.stop(SceneName.pausemenu);
            this.state.currentState = OverworldState.movement;
            game.scene.resume(this.state.playerCurrentScene);
            // this.state.runEvent = true;
        // } else {
        //     console.error("ResumeScene: Scene state is not pause")
        // }
    }

    public StartBattleScene() {
        game.scene.pause(this.state.playerCurrentScene);
        game.scene.run(SceneName.battle);
        this.state.runEvent = true;
    }

    public EndBattleScene() {
        if (this.state.currentState === OverworldState.battle) {
            game.scene.stop(SceneName.battle);
            game.scene.resume(this.state.playerCurrentScene);
            this.state.runEvent = true;
        } else {
            console.error("EndBattleScene: BattleScene is not playing")
        }
    }

    public StartChatScene(text: string[]): void {
        if (this.state.currentState === OverworldState.movement) {
            this.state.currentState = OverworldState.chat;
            GameState.System.chat = text;
            console.log(GameState.System.chat);
            GameState.System.currentLine = 0;
            game.scene.pause(this.state.playerCurrentScene);
            game.scene.run(SceneName.chatmenu);
            touch.disable();
            this.state.runEvent = true;
        } else {
            console.error("StartChatScene: Scene state is not movement")
        }
    }

    public EndChatScene(): void {
        if (this.state.currentState === OverworldState.chat) {
            this.state.currentState = OverworldState.movement;
            game.scene.run(GameState.Game.playerCurrentScene);
            game.scene.stop(SceneName.chatmenu);
            touch.enable();
            this.state.runEvent = true;
        } else {
            console.error("EndChatScene: Chat menu is not playing")
        }
    }
}