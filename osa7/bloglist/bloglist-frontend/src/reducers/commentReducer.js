import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_COMMENTS': {
    return action.data
  }
  case 'ADD_COMMENT': {
    return action.data
  }
  default: return state
  }
}

export const getComments = (id) => {
  return async dispatch => {
    const comments = await commentService.getAll(id)
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export const addComment = (id, content) => {
  return async dispatch => {
    const newComment = await commentService.addComment(id, content)
    console.log(newComment.comments)
    dispatch({
      type: 'ADD_COMMENT',
      data: newComment.comments
    })
  }
}

export default commentReducer