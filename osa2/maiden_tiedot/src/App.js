import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Countries from './components/Countries'





import './App.css';

function App() {

  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');

  const handleFilterChange = event => setFilter(event.target.value);




  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {setCountries(response.data)
      })}, [])

  return (
    <div>
      <p>Find countries: <input value={filter} onChange={handleFilterChange}></input></p>
      <Countries countries={countries} filter={filter} />

    </div>

  );
}

export default App;
