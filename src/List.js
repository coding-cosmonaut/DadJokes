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
      limit: 30,
      currentPage: 1,
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

  async handleClick() {
    // if (this.state.limit < 30) {
    //   this.setState((st) => ({
    //     limit: st.limit + 10,
    //   }));
    // } else if (this.state.limit === 30) {
    //   this.setState((st) => ({
    //     limit: (st.limit = 10),
    //     currentPage: st.currentPage + 1,
    //   }));
    // }

//GET DAD JOKES
    let results = await axios.get(`${this.props.url}/search`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        limit: this.state.limit,
        page: this.state.currentPage,
      },
    });

    console.log(results.data.results.id, "FIRST")
//ADD SCORE PROPERTY - CREATE JOKEID ARRAY AND PUSH IT TO LOCALSTORAGE
    let jokeIds = [];
    results.data.results.map((item) => {
      jokeIds.push(item.id)
      return item.score = 0;
    })
    localStorage.setItem("id", JSON.stringify(jokeIds));
    let parsed = JSON.parse(localStorage.getItem("id"));
    console.log(parsed)
    
    for (let i = 0; i < results.data.results.length; i++) {
      if (!results.data.results[i].id === parsed[i]) {
        
      }
    }

//SET NEW STATE
    this.setState((st) => ({
      jokes: (st.jokes = results.data.results),
    }));
  }

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
