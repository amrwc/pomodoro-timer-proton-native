import React, { Component } from 'react';
import { render, App, Window, Box } from 'proton-native';

import Timer from './components/Timer';
import ControlButtons from './components/ControlButtons';
import BreakButtons from './components/BreakButtons';

const POMODORO_LEN = 1500; // [s]

class PomodoroTimer extends Component {
  state = { timeInSeconds: POMODORO_LEN };

  componentWillMount() {
    this.updateTimer(POMODORO_LEN);
  }

  startTimer = () => {
    const { timeInSeconds } = this.state;

    if (!this.intervalId && timeInSeconds > 0) {
      this.setState({ startTime: Date.now() }); // [ms]

      // https://stackoverflow.com/a/29972322/10620237
      this.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - this.state.startTime; // [ms]
        this.updateTimer(timeInSeconds - Math.floor(elapsedTime / 1000)); // [s]
      }, 100);
    }
  };

  updateTimer = newTime => {
    // Prevent negative values.
    if (newTime <= 0) {
      this.stopTimer();
      this.setState({ timeInSeconds: 0, minutes: '00', seconds: '00' });
      return;
    }

    let minutes = Math.floor(newTime / 60);
    let seconds = newTime % 60;
    // Prepend 0 if less than 10.
    minutes = minutes <= 9 ? `0${minutes}` : minutes;
    seconds = seconds <= 9 ? `0${seconds}` : seconds;

    this.setState({ timeInSeconds: newTime, minutes, seconds });
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
    this.updateTimer(timeInSeconds);
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
      resetTimer: this.resetTimer,
      startTimer: this.startTimer
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
