import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, addComment } from '../reducers/commentReducer'

const Blog = ({ blogs, updateBlog, removeBlog }) => {

  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  useEffect(() => {
    dispatch(getComments(id))
  }, [dispatch])

  if (!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    marginBottom: 5,
    paddingRight: 2,
    border: 'solid',
    borderWidth: 1
  }

  let showWhenLogged = { display: 'none' }

  if (window.localStorage.loggedBlogListUser) {
    const loggedUser = JSON.parse(window.localStorage.loggedBlogListUser)




    if (loggedUser.name === blog.user.name) {
      showWhenLogged = { display: '' }
    }
  }

  const history = useHistory()

  const addLike = (blog) => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = (blog) => {
    removeBlog({
      id: blog.id,
      title: blog.title
    })
    history.push('/')
  }

  const newComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    const commentObj = { content }
    dispatch(addComment(id, commentObj))
  }

  return (

    <div id='blogInfo' style={blogStyle}>
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <div className='extraInfo'>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button id='likeButton' onClick={() => addLike(blog)}>Like</button></p>
        <p>Added by {blog.user.name}</p>
        <p><button id='removeButton' style={showWhenLogged} onClick={() => deleteBlog(blog)}>Remove</button></p>
        <h3>Comments</h3>
        <div>
          <ul>
            {comments.map(comment =>
              <li key={comment._id}>{comment.content}</li>)}
          </ul>
          <form onSubmit={newComment}>
            <input name='comment' />
            <button type='submit'>Add comment</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Blog
