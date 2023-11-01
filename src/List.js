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
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
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
        //console.log(response.data.results)
        response.data.results.forEach((item) => {
          return (item.score = 0);
        });
        this.setState({
          jokes: response.data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  upvote(jokeId) {

    // console.log("this is jokeID", jokeId);
    // let resultsID = this.state.jokes.filter((item) => {
    //   if (item.id === jokeId) {
    //     return item;
    //   }
    // });

    let updatedResults = this.state.jokes.map((item) => {
      if (jokeId === item.id) {
        item.score = item.score + 1;
      }
      return item;
    });

    this.setState((st) => ({
      jokes: st.jokes = updatedResults,
    }));
  }

  downvote(jokeId) {
    let updatedResults = this.state.jokes.map((item) => {
      if (jokeId === item.id) {
        item.score = item.score - 1;
      }
      return item;
    });

    this.setState((st) => ({
      jokes: st.jokes = updatedResults,
    }));
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <FontAwesomeIcon icon={faCircleNotch} size="lg" spin />
        ) : (
          this.state.jokes.map((item) => {
            return (
              <Joke
                key={item.id}
                upvote={this.upvote}
                downvote={this.downvote}
                score={item.score}
                jokes={item.joke}
                id={item.id}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default List;
