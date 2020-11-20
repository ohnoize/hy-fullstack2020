import React from 'react';

const Total = (props) => {

  return  (
  <div>
    <p><b>Total number of exercises: {props.parts.reduce(((acc, a) => a.exercises + acc), 0)}</b>
    </p>
  </div>
)
}

export default Total;
