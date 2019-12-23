import React, { useState, useEffect } from 'react';

import { world } from './world-service';

import { SimView } from './sim-view/sim-view';
import { TopTools } from './top-tools/top-tools';

import './app.scss';

export function App() {
  const [ entities, _setEntities ] = useState([]);
  const [ running, setRunning ] = useState(world.running);
  const [ epochMs, setEpochMs ] = useState(world.epochMs);

  const setEntities = (entities) => {
    // always perform an array copy to tell child components to update
    _setEntities(entities.slice());
  };

  useEffect(() => {
    let deregisterCb;
    deregisterCb = world.onTick(() => {
      setEntities(world.entities);
      setEpochMs(world.epochMs);
    });
    return () => deregisterCb();
  }, []);

  const handleClick = (evt) => {
    world.createStation(evt.x, evt.y);
  };

  const handlePlayClick = () => {
    world.running
      ? world.pause()
      : world.play();
    console.log(running);
    setRunning(world.running);
  };

  return (
    <div className="sim-app">
      <TopTools
        running={running}
        onPlayClick={handlePlayClick}
      />
      <div>
        Runtime: { epochMs / 1000 }s
      </div>
      <div className="view-container">
        <SimView
          onClick={(e) => handleClick(e)}
          entities={entities}
        />
      </div>
    </div>
  );
}
