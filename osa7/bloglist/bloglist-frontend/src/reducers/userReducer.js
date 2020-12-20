
const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN': {
    return action.data
  }
  case 'LOG_OUT': {
    return null
  }
  case 'QUERY': {
    return state
  }
  default: return state
  }
}

export const logIn = user => {
  return dispatch => {
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const getUser = () => {
  return dispatch => {
    dispatch({
      type: 'QUERY'
    })
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export default userReducer