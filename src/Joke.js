import React, { Component } from "react";
import "./Joke.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }
  componentDidMount() {}

  handleUpvote(event) {
    this.props.upvote(this.props.id);
  }

  handleDownvote() {
    this.props.downvote(this.props.id);
  }

  render() {
    return (
      <div className="Joke-list">
        <button>
          <FontAwesomeIcon icon={faArrowUp} onClick={this.handleUpvote} />
        </button>
        <div>{this.props.score}</div>
        <button>
          <FontAwesomeIcon onClick={this.handleDownvote} icon={faArrowDown} />
        </button>
        <div>{this.props.jokes}</div>
      </div>
    );
  }
}

export default Joke;
