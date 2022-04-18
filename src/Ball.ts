import { Entity } from "./Entity";
import { Utils } from "./Utils";

export class Ball extends Entity {
  x: number;
  y: number;
  speed: number;
  angle: number;
  radius: number;
  color: string;
  depth: number = 0;

  constructor() {
    super();

    this.radius = Utils.random.double() * 2 + 1;
    this.x = this.radius + Utils.random.double() * (1000 - this.radius);
    this.y = this.radius + Utils.random.double() * (1000 - this.radius);
    this.speed = Utils.random.double() * 200 + 100;
    this.angle = Utils.random.double() * Math.PI * 2;
    this.color = Utils.random.color();
  }

  update(delta: number) {
    let speed = this.speed * delta;
    if (speed > this.radius) {
      speed = this.radius;
    }

    this.x += Math.cos(this.angle) * speed;
    this.y += Math.sin(this.angle) * speed;

    const isEnteredLeft = this.x <= this.radius;
    const isEnteredRight = this.x + this.radius >= 1000;
    const isEnteredBottom = this.y + this.radius >= 1000;
    const isEnteredTop = this.y <= this.radius;

    const isEnteredHorizontal = isEnteredLeft || isEnteredRight;
    const isEnteredVertical = isEnteredTop || isEnteredBottom;

    if (isEnteredLeft) {
      this.x = this.radius;
    } else if (isEnteredRight) {
      this.x = 1000 - this.radius;
    }

    if (isEnteredTop) {
      this.y = this.radius;
    } else if (isEnteredTop) {
      this.y = 1000 - this.radius;
    }

    if (this.depth > 0) {
      this.radius -= delta * 0.1;
      if (this.radius <= 0) {
        this.radius = 0;
        this.removeEntity(this);
      }
    }

    if (isEnteredHorizontal || isEnteredVertical) {
      this.removeEntity(this);

      if (this.depth < 2) {
        const childSize = (this.depth + 1) * 2;
        const childAngle = isEnteredHorizontal ? Math.PI - this.angle : Math.PI * 2.0 - this.angle;

        for (let i = 0; i < childSize; i++) {
          const ball = new Ball();
          ball.x = this.x;
          ball.y = this.y;
          ball.color = this.color;
          ball.speed = this.speed * 0.9;
          ball.angle = childAngle;
          ball.radius = this.radius;
          ball.depth = this.depth + 1;
          this.addEntity(ball);
        }
      }
    }

    this.angle += (Utils.random.double() - 0.5) * 5.0 * delta;
  }

  render(context: CanvasRenderingContext2D, scale: number) {
    context.save();
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x * scale, this.y * scale, this.radius * scale, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }
}