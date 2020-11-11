import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = (props) => {
  const [selected, setSelected] = useState((Math.floor(Math.random() * anecdotes.length)));
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])



  const newArray = [...votes];


  let favIndex = 0;
  let max = newArray[0];

  for (var i = 0; i<newArray.length; i++) {
    if (newArray[i] > max) {
      favIndex = i;
      max = newArray[i];
    }
  }
  console.log(votes);
  let favorite = anecdotes[favIndex];

  console.log(favIndex);
  console.log(newArray);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={()=> {
        newArray[selected] += 1;
        setVotes(newArray)}}>vote</button>
      <button onClick={()=>setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{favorite}</p>
      <p>has {newArray[favIndex]} votes</p>
    </div>

  )
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]




ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root')
);
