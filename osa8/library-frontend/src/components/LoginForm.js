import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setToken, setError, show, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [getUser] = useLazyQuery(ME)

    const [ login, result ] = useMutation(LOGIN, {
      onError: (error) => {
        setError(error.graphQLErrors[0].message)
      }
    })

    useEffect(() => {
      if ( result.data ) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('library-user-token', token)
      }
    }, [result.data]) //eslint-disable-line

    if (!show) {
      return null
    }

    

    const submit = (event) => {
      event.preventDefault()
      login({ variables: { username, password } })
      getUser()
      setUsername('')
      setPassword('')
      setPage('authors')
    }

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <div>
            Username <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </div>
    )
}

export default LoginForm