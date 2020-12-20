import blogService from '../services/blogs'
// const initialBlogs = []

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS': {
    return action.data
  }
  case 'CREATE_NEW': {
    return [...state, action.data]
  }
  case 'LIKE': {
    const id = action.data.id
    const blogToLike = state.find(b => b.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    }
    return state.map(blog => blog.id !== id ? blog : likedBlog)
  }
  case 'DELETE': {
    const id = action.data
    console.log(id)
    return state.filter(blog => blog.id !== id)
  }
  default: return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll({})
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content, user) => {
  return async dispatch  => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE_NEW',
      data: { ...newBlog, user: {
        ...user,
        name: user.name
      } }
    })
  }
}

export const likeBlog = (blog) => {
  const id = blog.id
  const blogToLike = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const likedBlog = await blogService.update(id, blogToLike)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export default blogReducer