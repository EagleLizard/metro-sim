
import { Entity } from '../entity';

const DEFAULT_SIZE = 50;

export class Station extends Entity {
  constructor(id, options) {
    super(id);
    this.x = options.x;
    this.y = options.y;
    this.size = options.size || DEFAULT_SIZE;
  }

  draw(ctx) {
    let radius;
    radius = Math.ceil(this.size / 2);
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
