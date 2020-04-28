import React, { useState, useEffect } from 'react';

import { world } from './world-service';
import { Runtime } from '../world/runtime';
import { editCtrl } from './edit-ctrl';

import { SimView } from './sim-view/sim-view';
import { TopTools, EDIT_MODES } from './top-tools/top-tools';

import './app.scss';

export function App() {
  const [ entities, _setEntities ] = useState([]);
  const [ running, setRunning ] = useState(world.running);
  const [ epochMs, setEpochMs ] = useState(world.epochMs);
  const [ drawRt, setDrawRt ] = useState(null);
  const [ editMode, setEditMode ] = useState(null);
  const [ editAction, setEditAction ] = useState(null);

  const setEntities = (entities) => {
    // always perform an array copy to tell child components to update
    _setEntities(entities.slice());
  };

  useEffect(() => {
    let worldDeregisterCb, drawDeregisterCb, _drawRt;
    _drawRt = new Runtime();
    setDrawRt(_drawRt);

    worldDeregisterCb = world.onTick(() => {
      setEpochMs(world.epochMs);
    });
    drawDeregisterCb = _drawRt.onTick(() => {
      setEntities(world.entities);
    });

    _drawRt.start();

    return () => {
      world.pause();
      drawRt.pause();
      worldDeregisterCb();
      drawDeregisterCb();
    };
  }, []);

  const handleClick = (evt) => {
    editCtrl.handleClick(evt, editMode, editAction);
  //   world.createStation(evt.x, evt.y);
  };

  const handlePlayClick = () => {
    world.running
      ? world.pause()
      : world.play();
    setRunning(world.running);
  };

  const handleEditorChange = (mode, selected) => {
    let selectedEditAction;
    if(selected !== undefined) {
      switch(mode) {
        case EDIT_MODES.ADD:
          selectedEditAction = selected.entityType;
          break;
        case EDIT_MODES.EDIT:
          selectedEditAction = selected.editType;
          break;
      }
    }
    console.log(mode);
    console.log(selectedEditAction);
    setEditMode(mode);
    setEditAction(selectedEditAction);
  };

  return (
    <div className="sim-app">
      <TopTools
        running={running}
        onPlayClick={handlePlayClick}
        onEditorChange={handleEditorChange}
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
