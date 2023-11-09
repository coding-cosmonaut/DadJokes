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
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: true,
      limit: 15,
      currentPage: Math.floor(Math.random() * 25),
    };
    this.handleVote = this.handleVote.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    this.getMoreJokes = this.getMoreJokes.bind(this);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getMoreJokes();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  async getMoreJokes() {
    if (this.state.limit === 30) {
      let currStorage = JSON.parse(localStorage.getItem("jokes"));
      let currJokes = this.state.jokes.map((item) => {
        return item.id;
      });
      let newJokes = [...this.state.jokes];
      currStorage.filter((item, i) => {
        if (item.id === currJokes[i]) {
          return;
        } else {
          return newJokes.push(item);
        }
      });

      this.setState((st) => ({
        limit: (st.limit = 15),
        currentPage: st.currentPage + 1,
        jokes: newJokes,
      }));
    } else {
      let res = await axios.get(`${this.props.url}/search`, {
        headers: {
          Accept: "application/json",
        },
        params: {
          limit: 30,
          page: this.state.currentPage,
        },
      });
      this.setState(
        (st) => ({
          jokes: (st.jokes = res.data.results.map((item) => {
            item.score = 0;
            return item;
          })).slice(0, this.state.limit),
          loading: false,
          limit: st.limit + 15,
        }),
        () => localStorage.setItem("jokes", JSON.stringify(res.data.results))
      );
    }
  }

  // async handleClick() {
  //   if (this.state.jokes.length > 15) {
  //     this.setState((st) => {
  //       limit: st.limit = 30;
  //     });
  //   }
  //   let currStorage = JSON.parse(localStorage.getItem("jokes"));

  //   if (this.state.limit < 30) {
  //     let currJokes = this.state.jokes.map((item) => {
  //       return item.id;
  //     });

  //     let newJokes = [...this.state.jokes];
  //     currStorage.map((item, index) => {
  //       if (item.id !== currJokes[index]) {
  //         item.score = 0;
  //         return newJokes.push(item);
  //       }
  //     });

  //     this.setState((st) => ({
  //       limit: st.limit + 15,
  //       jokes: newJokes,
  //       currentPage: st.currentPage + 1,
  //     }));
  //   } else if (this.state.limit === 30) {
  //     let results = await axios.get(`${this.props.url}/search`, {
  //       headers: {
  //         Accept: "application/json",
  //       },
  //       params: {
  //         limit: this.state.limit,
  //         page: this.state.currentPage,
  //       },
  //     });
  //     console.log(results);
  //     //window.localStorage.setItem("newJokes", JSON.stringify(results.data.results));

  //     this.setState(
  //       (st) => ({
  //         limit: (st.limit = 15),
  //         currentPage: st.currentPage + 1,
  //         jokes: (st.jokes = results.data.results
  //           .slice(0, this.state.limit)
  //           .map((item) => {
  //             item.score = 0;
  //             return item;
  //           })),
  //       }),
  //       () =>
  //         window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
  //     );
  //   }
  // }

  //HANDLE UP/DOWN VOTES
  handleVote(jokeId, event) {
    let target = event.target.classList;

    this.setState(
      (st) => ({
        jokes: st.jokes.map((item) => {
          if (jokeId === item.id) {
            if (target.contains("fa-arrow-up")) {
              item.score = item.score + 1;
            } else {
              item.score = item.score - 1;
            }
          }
          return item;
        }),
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('UPDATE')
    console.log('preve',prevState.jokes)
    console.log('current',this.state.jokes)
    // if (previous.jokes.length > 0) {
    //   for (let i = 0; i < this.state.jokes.length; i++) {
    //     console.log(this.state.jokes[i].score);
    //     if (this.state.jokes[i].score !== previous.jokes[i].score) {
    //       console.log('DOENS"T EQUSL')
    //       this.setState((st) => ({
    //         jokes: st.jokes = st.jokes.sort((item1, item2) => item1.score - item2.score),
    //       }));
    //     }
    //   }
    // }
  }

  render() {
    return (
      <div className="List">
        <div className="List-sidebar">
          <h1 className="List-title">Dad Jokes!</h1>
          <button className="JokeList-getmore" onClick={this.getMoreJokes}>
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
