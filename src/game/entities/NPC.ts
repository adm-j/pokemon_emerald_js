import {Character} from "./Character.ts";

export class NPC extends Character {
    constructor(name, sprite, tween, collisionLayer) {
        super(name, sprite, tween, collisionLayer);
    }
}