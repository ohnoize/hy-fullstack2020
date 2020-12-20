import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import User from './User'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const [user, setUser ] = useState(null)

  const linkStyle = {
    cursor: 'pointer',
    color: 'blue',
    textDecoration: 'underline'
  }

  return (
    <div>
      <h2>Users</h2>
      <div>
        <Table striped bordered hover size='sm'>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Blogs created</td>
            </tr>
            {users.map(u =>
              <tr key={u.id}>
                <td key={u.id} style={linkStyle} onClick={() => setUser(u)}>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <User user={user} clear={() => setUser(null)} />
    </div>
  )
}

export default Users

