import React from 'react';
import { StyledText } from 'proton-native';

const Timer = ({ minutes, seconds } = props) => {
  return (
    <StyledText style={{ fontSize: 50, color: 'darkred' }}>
      {`${minutes}:${seconds}`}
    </StyledText>
  );
};

export default Timer;
