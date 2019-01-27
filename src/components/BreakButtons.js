import React from 'react';
import { Box, Button } from 'proton-native';

const LONG_BREAK_LEN = 600; // [s]
const SHORT_BREAK_LEN = 300; // [s]

const BreakButtons = ({ resetTimer, startTimer } = props) => {
  const startBreak = len => {
    resetTimer(len);
    startTimer();
  };

  return (
    <Box padded={true} vertical={false}>
      <Button onClick={() => startBreak(SHORT_BREAK_LEN)}>Short Break</Button>
      <Button onClick={() => startBreak(LONG_BREAK_LEN)}>Long Break</Button>
    </Box>
  );
};

export default BreakButtons;
