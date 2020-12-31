import React, { useEffect, useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import BirthForm from './components/BirthForm'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './queries'
import LoginForm from './components/LoginForm'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 1000
  })
  const user = useQuery(ME, {
    pollInterval: 1000
  })
  const client = useApolloClient()

  useEffect(() => {
    const loggedToken = window.localStorage.getItem('library-user-token')
    if (loggedToken) {
      setToken(loggedToken)
    }
  }, []) //eslint-disable-line

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }



  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} just added`)
    },
  })

  let showIfLogged = { display: 'none' }
  let hideIfLogged = { display: '' }

  if (token) {
    showIfLogged = { display: '' }
    hideIfLogged = { display: 'none' }
  }

  if (authors.loading || books.loading || user.loading) {
    return (
      <div>Loading...</div>
    )
  }
  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={showIfLogged} onClick={() => setPage('add')}>add book</button>
        <button style={hideIfLogged} onClick={() => setPage('login')}>log in</button>
        <button style={showIfLogged} onClick={() => setPage('recommendations')}>recommendations</button>
        <button style={showIfLogged} onClick={logout}>log out</button>
      </div>
      <Notification error={error} />
      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        setError={notify}
      />
      <div style={showIfLogged}>
      <BirthForm
        show={page === 'authors'}
        authors={authors.data.allAuthors}
        setError={notify}
      />
      </div>

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setPage={setPage}
        setError={notify}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Recommendations 
        show={page === 'recommendations'}
        books={books.data.allBooks}
        user={user.data.me}
      />

    </div>
  )
}

export default App