import { Entity } from "./Entity";
import { Ball } from "./Ball";

export class BallSpawner extends Entity {
  start() {
    this.spawn();
  }

  spawn() {
    for (let i = 0; i < 10; i++) {
      this.addEntity(new Ball());
    }
  }
}