import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./List.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

class List extends Component {
  static defaultProps = {
    url: "https://icanhazdadjoke.com/",
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      loading: true,
    };
  }
  componentDidMount() {
    axios
      .get(`${this.props.url}/search`, {
        headers: {
          "User-Agent": "Making a Dad-Joke Application",
          Accept: "application/json",
        },
        params: {
          limit: 10,
        },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          jokes: response.data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(localStorage)
    return (
      <div>
        {this.state.loading ? (
          <FontAwesomeIcon icon={faCircleNotch} size="lg" spin />
        ) : (
          this.state.jokes.map((item) => {
            return <Joke jokes={item.joke} id={item.id} />;
          })
        )}
      </div>
    );
  }
}

export default List;