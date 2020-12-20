import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user, clear }) => {

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name} <button onClick={clear}>Hide</button></h2>
      <h3>Added blogs</h3>
      <div>
        <ul>
          {user.blogs.map(b =>
            <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default User

