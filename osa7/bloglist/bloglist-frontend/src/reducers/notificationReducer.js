const initialState = ''

const notificationReducer = (state=initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIF': {
    return action.notif
  }
  default: return state
  }
}

let timeoutId
export const setNotification = (notif, time) => {
  return async dispatch => {

    dispatch({
      type: 'SET_NOTIF',
      notif
    })

    const timeInMS = time * 1000

    const clearMSG = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() =>
        dispatch({
          type: 'SET_NOTIF',
          notif: ''
        }), timeInMS
      )
    }

    clearMSG()

  }
}
export default notificationReducer
