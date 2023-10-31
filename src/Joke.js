import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

class Joke extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <button>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <div>{this.props.jokes}</div>
        <button>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    );
  }
}

export default Joke;
