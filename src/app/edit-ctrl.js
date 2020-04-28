
import { world } from './world-service';

import { ENTITY_ENUM } from '../world/entities/entity-enum';
import { EDIT_MODES } from './top-tools/top-tools';
import { EDIT_ACTIONS } from './top-tools/edit-actions';

export const editCtrl = {
  handleClick,
};

function handleClick(event, editMode, editAction) {
  if(!editMode || !editAction) {
    return;
  }
  switch(editMode) {
    case EDIT_MODES.ADD:
      return handleAddClick(event, editAction);
    case EDIT_MODES.EDIT:
      return handleEditClick(event, editAction);
  }
}

function handleAddClick(evt, editAction) {
  const { x, y } = evt;
  world.createStation(x, y);
}

function handleEditClick(evt, editAction) {
  const { x, y } = evt;
  switch(editAction) {
    case EDIT_ACTIONS.SELECT:
      return select(x, y);
    case EDIT_ACTIONS.MOVE:
      break;
    case EDIT_ACTIONS.LINE:
      break;
    case EDIT_ACTIONS.MARQUEE:
      break;
    case EDIT_ACTIONS.DELETE:
      break;
    case EDIT_ACTIONS.PAN:
      break;
  }
}

function select(x, y) {
  
}
