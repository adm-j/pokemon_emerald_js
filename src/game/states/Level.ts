import {CharacterDialogue, InteractableObjects} from "../../util/interfaces.ts";

export class Level {
    constructor() {
    }

    public Interactions: CharacterDialogue[] = [];
    public InteractableZones: InteractableObjects[] = [];
}