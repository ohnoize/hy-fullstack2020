import React from 'react'
import {  connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteList = (props) => {

  const filter = new RegExp(props.filter, "i")
  console.log(filter)

  return (
    <div>
    {props.anecdotes.filter(a => a.content.match(filter))
              .sort((a, b) => b.votes - a.votes)
              .map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() =>{
                    props.vote(anecdote.id)
                    props.setNotification(`You voted for "${anecdote.content}"`, 5)
                  }
                  }>vote</button>
                </div>
              </div>
            )}
      </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
