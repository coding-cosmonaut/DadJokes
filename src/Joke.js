import React, { Component } from "react";
import "./Joke.css";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleColor = this.handleColor.bind(this);
  }

  handleClick(event) {
    this.props.handleVote(this.props.id, event);
  }

  handleColor() {
    let currScore = this.props.score;
    if (currScore > 12) {
      return { border: "3px solid #4caf50" };
    } else if (currScore > 10 && currScore < 13) {
      return { border: "3px solid #8BC34A" };
    } else if (currScore > 7 && currScore < 11) {
      return { border: "3px solid #CDDC39" };
    } else if (currScore > 5 && currScore < 8) {
      return { border: "3px solid #FFEB3B" };
    } else if (currScore > 2 && currScore < 6) {
      return { border: "3px solid #FFC107" };
    } else if (currScore > 0 && currScore < 3) {
      return { border: "3px solid #FF9800" };
    } else {
      return { border: "3px solid #F44336" };
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.handleClick} />
          <div style={this.props.score !== 0 ? this.handleColor(): {border: '3px solid gray'}} className='Joke-votes'>{this.props.score}</div>
          <i className="fas fa-arrow-down" onClick={this.handleClick} />
        </div>
        <div className="Joke-text">{this.props.jokes}</div>
        {/* 
  EMOJI ?????? MAYBE IDK 
        <div className="Joke-emoji">
          <i
            class="em em-rolling_on_the_floor_laughing"
            aria-role="presentation"
            aria-label="ROLLING ON THE FLOOR LAUGHING"
          ></i>
        </div> */}
      </div>
    );
  }
}

export default Joke;
