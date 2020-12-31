import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS, ME } from '../queries'

const BirthForm = (props) => {

  const authors = props.authors

  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS }, { query: ME } ]
  })

  if(!props.show) {
    return null
  }
  

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setName(event.target.value)
  }

  const submit = async (event) => {
    event.preventDefault()
    const setBornTo = parseInt(born)
    console.log(setBornTo)
    console.log(name)
    editAuthor({ variables: { name, setBornTo }})
    console.log('Updated', name, born)
    setName('')
    setBorn('')
  }

  
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name <select value={name} onChange={handleChange}>
            
            {authors.map(a => 
            <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>

        </div>
        <div>
          Year <input type='number' value={born} onChange={({ target }) => setBorn(parseInt(target.value))} />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default BirthForm