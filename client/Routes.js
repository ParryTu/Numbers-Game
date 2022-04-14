import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import { loadFact } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor() {
    super();
    this.state = {
      answer: 0,
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
    this.props.updateCampusThuck({ ...this.state, id: this.props.id });
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
  }

  render() {
    return (
      <>
        <div>
          ___ {this.props.fact.substr(this.props.fact.indexOf(" ") + 1)}
        </div>
        {<button onClick={() => this.props.loadFactThuck()}>New fact</button>}
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
