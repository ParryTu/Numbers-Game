import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

import { loadFact } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      answer: 0,
      guess: "",
      points: 0,
      hint: "hint",
      try: 10,
      start: "",
      mode: 20,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      guess: evt.target.value,
    });
    console.log(this.state);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.guess == this.state.answer) {
      this.setState({
        guess: "",
        points: this.state.points + this.state.try,
        hint: "woo hoo! Great job!",
        try: 10,
      });
      this.props.loadFactThuck(this.state.mode);
    }

    if (this.state.guess < this.state.answer) {
      this.setState({ hint: "too low, try again!", try: this.state.try - 1 });
    }
    if (this.state.guess > this.state.answer) {
      this.setState({ hint: "too high, try again!", try: this.state.try - 1 });
    }
  }

  componentDidMount() {
    this.props.loadFactThuck(20);
  }

  componentDidUpdate(prevProps) {
    if (this.props.fact.split(" ")[0] != this.state.answer) {
      this.state.answer = this.props.fact.split(" ")[0];
      console.log(this.state);
    }
    if (this.state.try == 0) {
      this.setState({
        hint: `Game over! Your score was: ${this.state.points} points!!`,
        points: 0,
        try: 10,
        start: "Refresh to Play again",
      });
    }
  }

  render() {
    let { answer, start, guess, time, hint, mode } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        Difficulty Selection:
        <div id="buttons">
          <button
            className="tooltip"
            onClick={() => {
              this.setState({ mode: 20, points: 0, hint: "hint", try: 10 });
              this.props.loadFactThuck(mode);
            }}
          >
            {" "}
            Easy{" "}
            <span className="tooltiptext">
              For beginners. Numbers are limited and relatively easy to guess.
            </span>
          </button>
          <button
            className="tooltip"
            onClick={() => {
              this.setState({ mode: 100, points: 0, hint: "hint", try: 10 });
              this.props.loadFactThuck(mode);
            }}
          >
            {" "}
            Hard
            <span className="tooltiptext">
              For experienced players those who want a considerable challenge.
              Includes 4x the amount of trivia numbers of Easy mode.
            </span>
          </button>
          <button
            className="tooltip"
            onClick={() => {
              this.setState({
                mode: "random",
                points: 0,
                hint: "hint",
                try: 10,
              });
              this.props.loadFactThuck(mode);
            }}
          >
            {" "}
            Grounded{" "}
            <span className="tooltiptext">
              For only the most hardcore. Leverages the infinite set of counting
              numbers to provide one of the most challenging gaming experiences
              on this generation of browsers.
            </span>
          </button>
        </div>
        <hr />
        <p>
          Tries remaining: <span>{this.state.try}</span>
        </p>
        <div id="fact">
          ___ {this.props.fact.substr(this.props.fact.indexOf(" ") + 1)}
        </div>
        <form id="submit-answer" onSubmit={handleSubmit}>
          <label htmlFor="answer"></label>
          <input name="guess" value={guess} onChange={handleChange} />
          <button type="submit">Submit answer</button>
        </form>
        TOTAL POINTS: {this.state.points}
        <h2>{hint}</h2>
        <h1 id="start">{start}</h1>
      </>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (reduxState) => {
  return {
    fact: reduxState.fact,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadFactThuck: (mode) => dispatch(loadFact(mode)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
