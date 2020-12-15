import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW':
    return [...state, action.data]
    case 'INIT_ANECDOTES':
    return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const vote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(id)
    dispatch({
    type: 'VOTE',
    data: votedAnecdote
  })
}
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}




export default anecdoteReducer
