import React from 'react';
import { Box, Button } from 'proton-native';

const ControlButtons = ({ startTimer, stopTimer, resetTimer } = props) => {
  return (
    <Box padded={true} vertical={false}>
      <Button onClick={startTimer}>Start</Button>
      <Button onClick={stopTimer}>Pause</Button>
      <Button onClick={() => resetTimer()}>Reset</Button>
    </Box>
  );
};

export default ControlButtons;
