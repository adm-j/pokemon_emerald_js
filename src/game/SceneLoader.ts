import {LittlerootTown} from "../scenes/LittlerootTown.ts";
import {Menu} from "../scenes/Menu.ts";
import {PauseMenu} from "../scenes/PauseMenu.ts";
import {Route101} from "../scenes/Route101.ts";
import {DebugScene} from "../scenes/Debug.ts";
import {Battle} from "../scenes/Battle.ts";
import {ChatMenu} from "../scenes/ChatMenu.ts";

/**
 * Array of all scenes. Place scenes in here to be loaded by Phaser.
 */
export const SceneLoader: Class[] = [
    Menu,
    LittlerootTown,
    Route101,
    Battle,
    PauseMenu,
    ChatMenu,
    DebugScene
]