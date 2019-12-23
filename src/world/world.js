
import { Graph } from '@dagrejs/graphlib';

import { Runtime } from './runtime';
import { Station } from './entities/station/station';

export class World {
  constructor() {
    this.graph = new Graph({
      multigraph: true,
    });
    this.runtime = new Runtime();
    this.entities = [];
    this.idCounter = 0;
  }

  onTick(cb) {
    return this.runtime.onTick(cb);
  }

  play() {
    this.runtime.start();
  }

  pause() {
    this.runtime.stop();
  }

  createStation(x, y) {
    let station;
    station = new Station(this.idCounter++, {
      x,
      y,
    });
    this.entities.push(station);
    return station;
  }

  get running() {
    return this.runtime.running;
  }

  get epochMs() {
    return this.runtime.epochMs;
  }

}
