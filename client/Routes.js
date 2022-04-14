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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (this.state.guess == this.state.answer) {
      this.setState({
        guess: 0,
        points: this.state.points + 1,
        hint: "woo hoo! Great job!",
      });
      this.props.loadFactThuck();
    }

    if (this.state.guess < this.state.answer) {
      this.setState({ hint: "too low, try again!", try: this.state.try - 1 });
    }
    if (this.state.guess > this.state.answer) {
      this.setState({ hint: "too high, try again!", try: this.state.try - 1 });
    }
  }

  componentDidMount() {
    this.props.loadFactThuck();
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.fact.split(" ")[0] != this.state.answer) {
      this.state.answer = this.props.fact.split(" ")[0];
      console.log(this.state);
    }
    if (this.state.time < 0) {
      //end game
    }
  }

  render() {
    let { answer, guess, time, hint } = this.state;
    const { handleSubmit, handleChange } = this;
    /*  let countdown = setInterval((time) => {
      this.setState({ time: this.state.time - 1 });
    }, 1000); */

    return (
      <>
        Tries remaining: {this.state.try}
        <div>
          ___ {this.props.fact.substr(this.props.fact.indexOf(" ") + 1)}
        </div>
        <form id="submit-answer" onSubmit={handleSubmit}>
          <label htmlFor="answer">enter a number</label>
          <input name="guess" onChange={handleChange} value={guess} />
          <button type="submit">Submit answer</button>
        </form>
        TOTAL POINTS: {this.state.points}
        <h2>{hint}</h2>
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
    loadFactThuck: () => dispatch(loadFact()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
