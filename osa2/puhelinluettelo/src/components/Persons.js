import React from 'react';

//person building function
const Person = ({ name, onClick }) => <p>{name.name} {name.number} <button onClick={onClick}>Delete</button></p>


export default Person;
