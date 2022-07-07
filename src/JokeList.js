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
    this.state = {
      jokes: []
    }
    this.generateNewJokes = this.generateNewJokes.bind(this)
    this.vote = this.vote.bind(this)
    this.resetVotes = this.resetVotes.bind(this)
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
    let seenJokes = new Set(jokes.map(j => j.id))
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get('https://icanhazdadjoke.com', {
          headers: { Accept: 'application/json' }
        })
        let { status, ...joke } = res.data

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id)
          jokes.push({ ...joke, votes: 0 })
        } else {
          console.error('duplicate found!')
        }
      }
      this.setState({ jokes })
    } catch (e) {
      console.log(e)
    }
  }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState(st => ({ jokes: st.jokes.filter(j => j.locked) }))
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }))
  }

  /* reset all votes to 0 */
  resetVotes() {
    this.setState(st => ({
      jokes: st.jokes.map(j => ({ ...j, votes: 0 }))
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
        <button className="JokeList-reset" onClick={this.resetVotes}>
          Reset Votes
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

        {sortedJokes.length < this.props.numJokesToGet ? (
          <div className="loading">
            <i className="fas fa-4x fa-spinner fa-spin" />
          </div>
        ) : null}
      </div>
    )
  }
}

export default JokeList
