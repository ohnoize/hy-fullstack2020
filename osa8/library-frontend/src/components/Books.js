import React, {useState, useEffect} from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {

  const [filter, setFilter] = useState(null)
  const [genreBooks, setGenreBooks] = useState([])
  console.log('Filter:', filter)

  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks()
  }, []) //eslint-disable-line

  const showGenre = (genre) => {
    getBooks({ variables: { genreFilter: genre } })
    setFilter(genre)
  }

  const showAll = () => {
    getBooks()
    setFilter('')
  }

  useEffect(() => {
    if (result.data) {
      setGenreBooks(result.data.allBooks)
    }
  }, [result])




  if (!props.show) {
    return null
  }

  const books = props.books
  const genres = books.map(b => b.genres).flat()
  const uniques = new Set(genres)
  const genreArr = [ ...uniques ]

  return (
    <div>
      <h2>books</h2>
      { filter ? <p>In genre {filter}</p> : ''
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {genreBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genreArr.map(g => 
          <button 
            key={g}
            onClick={() => showGenre(g)}
            >{g}</button>
        )}
        <button onClick={() => showAll()}>All genres</button>
      </div>
    </div>
  )
}

export default Books