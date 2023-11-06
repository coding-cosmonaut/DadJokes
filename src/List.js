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
      limit: 15,
      currentPage: 2,
    };
    this.handleVote = this.handleVote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${this.props.url}/search`, {
        headers: {
          Accept: "application/json",
        },
        params: {
          limit: 30,
        },
      })
      .then((response) => {
        let firstTenJokes = [];
        for (let i = 0; i < 15; i++) {
          response.data.results[i].score = 0;
          firstTenJokes.push(response.data.results[i]);
        }
        this.setState({
          jokes: firstTenJokes,
          loading: false,
        });
        localStorage.setItem("id", JSON.stringify(response.data.results));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async handleClick() {
    let currStorage = JSON.parse(localStorage.getItem("id"));
    if (this.state.limit < 30) {
      let currJokes = this.state.jokes.map((item) => {
        return item.id;
      });

      let newJokes = [];
      for (let i = 0; i < currStorage.length; i++) {
        currStorage[i].score = 0;
        if (currStorage[i].id !== currJokes[i]) {
          newJokes.push(currStorage[i]);
        }
      }
      this.setState((st) => ({
        limit: st.limit + 15,
        jokes: newJokes,
      }));
    } else if (this.state.limit === 30) {
      localStorage.clear();
      let results = await axios.get(`${this.props.url}/search`, {
        headers: {
          Accept: "application/json",
        },
        params: {
          limit: this.state.limit,
          page: this.state.currentPage,
        },
      });
      localStorage.setItem("id", JSON.stringify(results.data.results));


      let jokeIds = [];
      for (let i = 0; i < 15; i++) {
        results.data.results[i].score = 0;
        jokeIds.push(results.data.results[i]);
      }

      this.setState((st) => ({
        limit: (st.limit = 15),
        currentPage: st.currentPage + 1,
        jokes: st.jokes = jokeIds
      }));
    }
  }

  //HANDLE UP/DOWN VOTES
  handleVote(jokeId, event) {
    let target = event.target.classList;
    let updatedResults = this.state.jokes.map((item) => {
      if (jokeId === item.id) {
        if (target.contains("fa-arrow-up")) {
          item.score = item.score + 1;
        } else {
          item.score = item.score - 1;
        }
      }
      return item;
    });

    this.setState((st) => ({
      jokes: (st.jokes = updatedResults),
    }));
  }

  render() {
    return (
      <div className="List">
        <div className="List-sidebar">
          <h1 className="List-title">Dad Jokes!</h1>
          <button className="JokeList-getmore" onClick={this.handleClick}>
            New Jokes!
          </button>
        </div>
        <div className="List-jokes">
          {this.state.loading ? (
            <FontAwesomeIcon icon={faCircleNotch} size="lg" spin />
          ) : (
            this.state.jokes.map((item) => {
              return (
                <Joke
                  key={item.id}
                  handleVote={this.handleVote}
                  score={item.score}
                  jokes={item.joke}
                  id={item.id}
                />
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default List;
