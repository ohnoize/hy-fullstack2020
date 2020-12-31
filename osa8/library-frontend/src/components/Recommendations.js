import React from 'react'

const Recommendations = (props) => {

  
  if (!props.show) {
    return null
  }

  // if (props.user.loading || props.books.loading) {
  //   return <p>Loading...</p>
  // }

  const favoriteGenre = props.user.favoriteGenre
  console.log(favoriteGenre)
  return (
    <div>
      <h2>Recommendations here</h2>
      <p>In your favorite genre <em>{favoriteGenre}</em></p>
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
          {props.books.filter(b => b.genres.includes(favoriteGenre))
                .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations