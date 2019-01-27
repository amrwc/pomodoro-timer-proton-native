import React from 'react';
import { Box, Button } from 'proton-native';

const LONG_BREAK_LEN = 600;
const SHORT_BREAK_LEN = 300;

const BreakButtons = props => {
  const startBreak = len => {
    props.resetTimer(len);
    props.startTimer();
  };

  return (
    <Box padded={true} vertical={false}>
      <Button onClick={() => startBreak(SHORT_BREAK_LEN)}>Short Break</Button>
      <Button onClick={() => startBreak(LONG_BREAK_LEN)}>Long Break</Button>
    </Box>
  );
};

export default BreakButtons;
