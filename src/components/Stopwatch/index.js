import {Component} from 'react'
import './index.css'

const initialState = {timeElapsed: 0, timeRunning: false}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  IncrementTime = () => {
    this.setState(prevState => ({timeElapsed: prevState.timeElapsed + 1}))
  }

  onStopTimer = () => {
    this.clearTimerInterval()
    this.setState(prevState => ({timeRunning: !prevState.timeRunning}))
  }

  onStartTimer = () => {
    this.intervalId = setInterval(this.IncrementTime, 1000)
    this.setState(prevState => ({timeRunning: !prevState.timeRunning}))
  }

  renderController = () => {
    const {timeRunning} = this.state

    return (
      <div className="button-container">
        <button
          type="button"
          className="button start"
          onClick={this.onStartTimer}
          disabled={timeRunning}
        >
          Start
        </button>
        <button
          type="button"
          className="button stop"
          onClick={this.onStopTimer}
          disabled={!timeRunning}
        >
          Stop
        </button>
        <button
          type="button"
          className="button reset"
          onClick={this.onResetTimer}
        >
          Reset
        </button>
      </div>
    )
  }

  getElapsedTime = () => {
    const {timeElapsed} = this.state
    const minutes = Math.floor(timeElapsed / 60)
    const seconds = Math.floor(timeElapsed % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    return (
      <div className="bg-container">
        <div className="stopwatch-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-logo-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="sub-heading">Timer</p>
            </div>
            <h1 className="timer">{this.getElapsedTime()}</h1>
            <div>{this.renderController()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
