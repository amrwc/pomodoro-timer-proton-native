import React from 'react';
import { Box, Button } from 'proton-native';

const LONG_BREAK_LEN = 600,
  SHORT_BREAK_LEN = 300;

const BreakButtons = props => {
  return (
    <Box padded={true} vertical={false}>
      <Button
        onClick={() => {
          props.resetTimer(SHORT_BREAK_LEN);
          props.startTimer();
        }}
      >
        Short Break
      </Button>
      <Button
        onClick={() => {
          props.resetTimer(LONG_BREAK_LEN);
          props.startTimer();
        }}
      >
        Long Break
      </Button>
    </Box>
  );
};

export default BreakButtons;
