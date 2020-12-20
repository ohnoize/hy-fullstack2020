import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import {
  Container,
  Table,
  Button,
  Form,
  Navbar,
  Nav,
  Alert,
} from 'react-bootstrap'
import Users from './components/Users'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { logIn, logOut, getUser } from './reducers/userReducer'


import './index.css'

const App = () => {

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()

  const blogFormRef = useRef()


  const user = useSelector(state => state.user)
  const notif = useSelector(state => state.notif)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])



  useEffect(() => {
    const loggedUser = dispatch(getUser())
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUser) {
      blogService.setToken(loggedUser.token)
    }
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logIn(user))
      blogService.setToken(user.token)
    }
  }, [])





  const handleLogin = async (event) => {
    event.preventDefault()


    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      dispatch(logIn(user))
      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      dispatch(setNotification(`Welcome ${user.name}`, 5))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      dispatch(setNotification('Incorrect username or password', 5))
    }
  }



  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject, user))
    dispatch(setNotification(`Blog by ${blogObject.author} added to the list`, 5))
  }

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const deleteBlog = (blog) => {
    const id = blog.id
    if (window.confirm(`Delete the blog: ${blog.title}?`)) {
      dispatch(removeBlog(id))
    }
  }


  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:
            <Form.Control
              type='text'
              id='username'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Label>
          <Form.Label>password:
            <Form.Control
              type='password'
              id='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Button variant='dark' id="loginButton" type='Submit'>Login</Button>
        </Form.Group>
      </Form>
      <p> Use username <em>testuser</em> & password <em>testpassword</em> to test full funcionality</p>
    </div>
  )

  const blogList = () => {

    let showWhenLogged = { display: 'none' }
    let hideWhenLogged = { display: '' }

    if (user) {
      showWhenLogged = { display: '' }
      hideWhenLogged = { display: 'none' }
    }
    return (
      <div>
        <div className='blogStyle'>
          <h2>Blogs</h2>
          <br></br>
          <br></br>
          <Table bordered hover striped>
            <tbody>
              {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                  <td>
                    {blog.author}
                  </td>
                  <td>
                    <a href={`http://${blog.url}`}>{blog.url}</a>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div style={showWhenLogged}>
          <Togglable buttonLabel='Add blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
        <div style={hideWhenLogged}>
          <p>Log in to add blogs.</p>
        </div>
      </div>
    )}

  const logOutButton = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logOut())
  }

  const padding = {
    padding: 5
  }


  const buttonstyle = {
    marginLeft: '20px'
  }

  return (
    <Container fluid>
      {(notif &&
    <Alert variant="light">
      {notif}
    </Alert>
      )}
      <Router>
        <div>
          <div>
            <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/'>Blogs</Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    <Link style={padding} to='/users'>Users</Link>
                  </Nav.Link>
                  <Nav.Link href='#' as='span'>
                    {user
                      ? <div><em>{user.name} logged in</em><Button variant='dark' style={buttonstyle} onClick={logOutButton}>Log out</Button></div>
                      : <Link to='/login'>Login</Link>
                    }
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>

            <Switch>
              <Route path='/blogs/:id'>
                <Blog blogs={blogs} updateBlog={addLike} removeBlog={deleteBlog}/>
              </Route>
              <Route path='/users'><Users /></Route>
              <Route path='/login'>
                {user === null ? loginForm() : <Redirect to='/' />}
              </Route>
              <Route path='/'>
                {blogList()}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Container>
  )
}

export default App

