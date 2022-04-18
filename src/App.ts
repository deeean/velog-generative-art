import { Entity } from "./Entity";
import { BallSpawner } from "./BallSpawner";

export class App {
  private static instance: App;

  public static getInstance() {
    if (!this.instance) {
      throw new Error("App is not initialized");
    }

    return this.instance;
  }

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  entities: Array<Entity> = [];

  scale: number;
  fixedDelta: number = 1 / 60;

  constructor() {
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas rendering context 2d');
    }

    this.context = context;

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);
    this.resize();
    window.addEventListener('resize', this.resize);
    window.requestAnimationFrame(this.render);
    document.body.appendChild(this.canvas);
    App.instance = this;
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);
    entity.start();
  }

  removeEntity(entity: Entity) {
    const index = this.entities.indexOf(entity);
    if (index !== -1) {
      this.entities.splice(index, 1);
    }
  }

  start() {
    this.addEntity(new BallSpawner());
  }

  render() {
    window.requestAnimationFrame(this.render);

    for (let i = 0; i < this.entities.length; i++) {
      const entity = this.entities[i];
      entity.update(this.fixedDelta);
      entity.render(this.context, this.scale);
    }
  }

  resize() {
    const side = Math.min(
      window.innerWidth,
      window.innerHeight,
    );

    this.scale = side / 1000;

    this.canvas.width = side;
    this.canvas.height = side;
  }
}