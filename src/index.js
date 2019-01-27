import React, { Component } from 'react';
import { render, App, Window, Box } from 'proton-native';

import Timer from './components/Timer';
import ControlButtons from './components/ControlButtons';
import BreakButtons from './components/BreakButtons';

const POMODORO_LEN = 1500;

class PomodoroTimer extends Component {
  state = { timeInSeconds: POMODORO_LEN };

  componentWillMount() {
    this.refreshTimer();
  }

  startTimer = () => {
    const { timeInSeconds } = this.state;

    if (!this.intervalId && timeInSeconds > 0) {
      // All numbers in this scope are miliseconds [ms].
      this.setState({ startTime: Date.now() });

      // https://stackoverflow.com/a/29972322/10620237
      this.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - this.state.startTime;
        const newTime = timeInSeconds - Math.floor(elapsedTime / 1000);

        this.updateTime(newTime);
        this.refreshTimer();
      }, 100);
    }
  };

  stopTimer = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null; // This line helps startTimer's condition.
    }
  };

  resetTimer = (timeInSeconds = POMODORO_LEN) => {
    this.stopTimer();
    this.setState({ timeInSeconds, startTime: undefined });
    this.refreshTimer();
  };

  updateTime = newTime => {
    this.state.timeInSeconds > 0
      ? this.setState({ timeInSeconds: newTime })
      : this.stopTimer();
  };

  refreshTimer = () => {
    const { timeInSeconds } = this.state;
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = timeInSeconds % 60;
    // Prepend 0 if less than 10.
    minutes = minutes <= 9 ? `0${minutes}` : minutes;
    seconds = seconds <= 9 ? `0${seconds}` : seconds;

    this.setState({ minutes, seconds });
  };

  render() {
    const { minutes, seconds } = this.state;
    const windowProps = {
      title: `Pomodoro Timer ${minutes}:${seconds}`,
      size: { w: 500, h: 300 },
      menuBar: false,
      margined: true
    };
    const btnProps = {
      startTimer: this.startTimer,
      resetTimer: this.resetTimer
    };

    return (
      <App>
        <Window {...windowProps}>
          <Box padded={true}>
            <Timer minutes={minutes} seconds={seconds} />
            <ControlButtons {...btnProps} stopTimer={this.stopTimer} />
            <BreakButtons {...btnProps} />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<PomodoroTimer />);
