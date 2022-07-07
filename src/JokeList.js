import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './JokeList.css'

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props) {
    super(props)
    this.state = { jokes: [] }

    this.generateNewJokes = this.generateNewJokes.bind(this)
    this.vote = this.vote.bind(this)
  }

  /* at mount, get jokes */

  componentDidMount() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes()
  }

  componentDidUpdate() {
    if (this.state.jokes.length < this.props.numJokesToGet) this.getJokes()
  }

  /* retrieve jokes from API */

  async getJokes() {
    let jokes = this.state.jokes
    let seenJokes = new Set()
    try {
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        })
        let { status, ...jokeObj } = res.data

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id)
          jokes.push({ ...jokeObj, votes: 0 })
        } else {
          console.error('duplicate found!')
        }
      }
      this.setState(jokes)
    } catch (e) {
      console.log(e)
    }
  }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState([])
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }))
  }

  /* render: either loading spinner or list of sorted jokes. */

  render() {
    let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes)

    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>

        {sortedJokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={this.vote}
          />
        ))}
      </div>
    )
  }
}

export default JokeList
