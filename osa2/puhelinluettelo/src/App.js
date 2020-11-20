import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Persons'
import personTools from './services/persons'
import './index.css'
import './App.css';

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={className}>{message}</div>
  )
}

function App() {

//Set up states
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newFilter, setNewFilter ] = useState('');
  const [ notif, setNotif ] = useState(null);
  const [ error, setError ] = useState(null);

//Get data from "server"
  useEffect(() => {
    personTools
      .getPersons()
      .then(response => setPersons(response))
  }, [])

  //Build handleChange functions for tables
  const handleNameChange = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilterChange = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  }


  //Make filter into regex to make it case insensitive
  const filterRegExp = new RegExp(newFilter, "i");

  //function to add names and numbers into the phonebook
  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
          name: newName,
          number: newNumber
        }
    const index = persons.find(p => p.name.match(newName));

    if (index) {
      if (window.confirm(`${newName} already added to the phonebook, do you want to update the number?`)) {
          personTools
            .replaceNumber(index.id, nameObject)
            .then(updatedPerson =>
              setPersons(persons.map(a => a.id !== index.id ? a : updatedPerson )))
            .then(a => {
                setNotif(`${newName}'s number updated!`)
                setTimeout(() => {setNotif(null)}, 5000)
                setNewName('');
                setNewNumber('');
              })
            .catch(error => {
        setError(
          `${newName} was already removed from the server`
        )
        setPersons(persons.filter(n => n.id !== index.id));
        setTimeout(() => {setError(null)}, 5000);

      })
        };
      return;
    }

        personTools
          .addPerson(nameObject)
          .then(response => setPersons(persons.concat(response)))
          .then(a => {
            setNotif(`'${newName}' added to the phonebook!`)
            setTimeout(() => {setNotif(null)}, 5000)
            setNewName('');
            setNewNumber('');
          })

  }


    const deletePerson = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
      personTools
        .removePerson(id)
        .then(a => {
            setNotif(`${name} deleted :(`)
            setTimeout(() => {setNotif(null)}, 5000)
            setNewName('');
            setNewNumber('');
          })
      setPersons(persons.filter(a => a.id !== id))
    }
    }


console.log(persons.id);
  return (
    <div className="App">
      <header className="App-header">
      <div>
    <h1>Phonebook</h1>
    <Notification message={notif} className="notif" />
    <Notification message={error} className="error" />
    <Filter value={newFilter} onChange={handleFilterChange} />
    <h2>Add new entry</h2>
    <PersonForm onSubmit={addName}
                nameValue={newName}
                onChangeName={handleNameChange}
                numberValue={newNumber}
                onChangeNumber={handleNumberChange}
    />


    <h2>Numbers</h2>

    <div>{persons.filter(a => a.name.match(filterRegExp))
                 .map(a => <Person
                              key={a.id}
                              name={a}
                              onClick={() => deletePerson(a.id, a.name)}
                              />)}


    </div>
    </div>


      </header>
    </div>
  );
}

export default App;
