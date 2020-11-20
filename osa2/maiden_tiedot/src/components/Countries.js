import React, { useState } from 'react';
import Weather from './Weather'


const FinalCountry = ({ country, onChange }) => {


  return (
  <div>
    <h1>{country.name}</h1>
    <p>Capital: {country.capital}</p>
    <p>Population: {country.population}</p>
    <h2>Languages:</h2>
    {country.languages.map(a => <p key={a.name}>{a.name}</p>)}
    <p><img src={country.flag} alt="Flag" width="200"/></p>
    <Weather capital={country.capital} />

  </div>
)
}

const Countries = ({ countries, filter, onChange }) => {

  const [ clickedCountry, setClickedCountry ] = useState('');
  const handleClick = (name) => setClickedCountry(name);

  if (filter === '') {
    return(
      <div></div>
    )
  }



  if (clickedCountry) {
    const clickedFull = countries.filter(a => a.name === clickedCountry);
    return (

      <FinalCountry country={clickedFull[0]} />

    )
  }




  const filterRegExp = new RegExp(filter, "i");
  const filtered = countries.filter(a => a.name.match(filterRegExp))

  if (filtered.length > 10) {
    return (
      <div><p>Too many matches, specify your filter</p></div>
    )
  }

  if (filtered.length > 1) {
  return (
    <div>
      {filtered.map(a => <p key={a.name}>{a.name} <button onClick={()=>handleClick(a.name)}>Show</button></p>)}
    </div>
  )
  }
  if (filtered.length === 0) {
  return (
    <div>
      <p>No countries match</p>
    </div>
  )
  }


  return (
    <FinalCountry country={filtered[0]} />
  )

}


export default Countries;
