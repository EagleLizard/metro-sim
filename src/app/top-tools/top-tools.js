import React from 'react';
import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';

import './top-tools.scss';

export function TopTools(props) {

  const handlePlayClick = (evt) => {
    props.onPlayClick(evt);
  };

  return (
    <div className='top-tools'>
      <div className="time-control">
        <IconButton onClick={e => handlePlayClick(e)}>
          {
            props.running
              ? <Pause/>
              : <PlayArrow/>
          }
        </IconButton>
      </div>
    </div>
  );
}
