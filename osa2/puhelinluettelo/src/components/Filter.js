import React from 'react';

const Filter = (props) => {
  return (
  <div>
  <h2>Filter entries</h2>
  <div>
    <form>
      <input value={props.value} onChange={props.onChange}/>
    </form>
  </div>
  </div>
)
}

export default Filter;
