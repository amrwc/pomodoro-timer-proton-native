import React from 'react';
import { Box, Button } from 'proton-native';

const ControlButtons = props => {
  return (
    <Box padded={true} vertical={false}>
      <Button onClick={props.startTimer}>Start</Button>
      <Button onClick={props.stopTimer}>Pause</Button>
      <Button onClick={() => props.resetTimer()}>Reset</Button>
    </Box>
  );
};

export default ControlButtons;
