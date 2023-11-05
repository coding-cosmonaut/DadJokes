import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.handleVote(this.props.id, event);
  }

  render() {
    return (
      <div className="Joke-list">
        <i className="fas fa-arrow-up" onClick={this.handleClick} />
        <div>{this.props.score}</div>
        <i className="fas fa-arrow-down" onClick={this.handleClick} />
        <div>{this.props.jokes}</div>
      </div>
    );
  }
}

export default Joke;
