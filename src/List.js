import React, { Component } from "react";
import Joke from "./Joke";
import axios from "axios";
import "./List.css";

class List extends Component {
  static defaultProps = {
    url: "https://icanhazdadjoke.com/",
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      //JSON.parse(window.localStorage.getItem("jokes") || "[]")
      loading: true,
    };
    this.oldJokes = new Set(
      this.state.jokes.map((item) => {
        return item.id;
      })
    );
    console.log(this.oldJokes);
    this.handleVote = this.handleVote.bind(this);
    this.getMoreJokes = this.getMoreJokes.bind(this);
    //this.checkJokes = this.checkJokes.bind(this);
  }

  // checkJokes() {
  //   if (localStorage.getItem("jokes")) {
  //     return JSON.parse(window.localStorage.getItem("jokes"));
  //   } else {
  //     return this.getMoreJokes();
  //   }
  // }

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
    console.log("FIRST PART", this.oldJokes);
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    let newJokes = [];
    console.log("oldJOKEs", typeof this.oldJokes);
    while (newJokes.length < 10) {
      let res = await axios.get(`${this.props.url}`, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log("before IF --", this.oldJokes);
      if (!this.oldJokes.has(res.data.id)) {
        newJokes.push({ ...res.data, score: 0 });
      } else {
        console.log("found duplicate", res.data.id);
      }
    }
    console.log("after LOOP", this.oldJokes);

    this.setState(
      (st) => ({
        jokes: [...st.jokes, ...newJokes],
        loading: false,
      }),
      () => {
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes));
        this.oldJokes = new Set(
          this.state.jokes.map((item) => {
            return item.id;
          })
        );
      }
    );
    window.location.reload()
    console.log("AFTER SET STATE", this.oldJokes);
  }

  //HANDLE UP/DOWN VOTES
  handleVote(jokeId, event) {
    let target = event.target.classList;

    this.setState(
      (st) => ({
        jokes: st.jokes.map((item) => {
          if (jokeId === item.id) {
            if (target.contains("fa-arrow-up")) {
              item.score += 1;
            } else {
              item.score -= 1;
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
    console.log(prevState)
    // console.log("UPDATE");
    // console.log("preve", prevState.jokes);
    // console.log("current", this.state.jokes);
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
            <div className="List-spinner-cont">
              <i
                className="fa-solid fa-circle-notch fa-spin fa-2xl List-spinner"
                aria-hidden="true"
              ></i>
              <h1>New Jokes Incoming...</h1>
            </div>
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
