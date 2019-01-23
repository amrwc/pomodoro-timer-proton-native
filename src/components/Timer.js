import React from 'react';
import { StyledText } from 'proton-native';

const Timer = props => {
  return (
    <StyledText style={{ fontSize: 50, color: 'darkred' }}>
      {`${props.minutes}:${props.seconds}`}
    </StyledText>
  );
};

export default Timer;
