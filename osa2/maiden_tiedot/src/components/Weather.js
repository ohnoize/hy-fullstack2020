import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({ capital }) => {

  const [ weather, setWeather ] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;


  useEffect( () => {
     axios.get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: capital
        }
      }).then(response => setWeather(response.data))

}, [])

  console.log(Object.keys(weather).length);
  if (Object.keys(weather).length) {

  return (
    <div>
    <h2>Weather in {capital}</h2>
    <p>Temperature: {weather.current.temperature}</p>
    <p>Wind: {weather.current.wind_speed} MPH direction {weather.current.wind_dir}</p>
    </div>
    )
  }

  else return (
    <div></div>
  )

}

export default Weather;
