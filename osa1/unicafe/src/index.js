import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Button = (props) =>
  <button onClick={props.onClick}>{props.name}</button>

const StatisticsLine = (props) => {
  return (
<>
  <td>{props.name}</td>
  <td>{props.value}</td>
</>

)
}

const Statistics = ({ good, neutral, bad }) =>
  {
    let average = (good + (bad * -1)) / (good + bad + neutral);
    let positive = good / (good + bad + neutral);

    if (good + neutral + bad === 0) {
      return (
        <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </div>
      )
    }

    return (
    <div>
  <h1>Statistics</h1>
  <table>
  <tbody>
  <tr><StatisticsLine name="Good" value={good} /></tr>
  <tr><StatisticsLine name="Neutral" value={neutral} /></tr>
  <tr><StatisticsLine name="Bad" value={bad} /></tr>
  <tr><StatisticsLine name="All" value={good+bad+neutral} /></tr>
  <tr><StatisticsLine name="Average" value={average} /></tr>
  <tr><StatisticsLine name="Positive" value={positive} /></tr>
  </tbody>
  </table>

  </div>
)
}

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);
  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);
  return (
    <div>
    <h1>Give feedback</h1>
    <div>
      <Button name="good" onClick={() => addGood()} />
      <Button name="neutral" onClick={() => addNeutral()} />
      <Button name="bad" onClick={() => addBad()} />
    </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
