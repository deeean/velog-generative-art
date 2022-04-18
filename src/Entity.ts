import { App } from "./App";

export class Entity {
  addEntity(entity: Entity) {
    App.getInstance().addEntity(entity);
  }

  removeEntity(entity: Entity) {
    App.getInstance().removeEntity(entity);
  }

  start() {

  }

  update(delta: number) {

  }

  render(context: CanvasRenderingContext2D, scale: number) {

  }
}