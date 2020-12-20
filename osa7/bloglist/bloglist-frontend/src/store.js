import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
  user: userReducer,
  blogs: blogReducer,
  notif: notificationReducer,
  users: usersReducer,
  comments: commentReducer
})

const middleware = applyMiddleware(thunk)
const enhancers = compose(middleware, composeWithDevTools())

const store = createStore(
  reducer,
  enhancers
)

export default store