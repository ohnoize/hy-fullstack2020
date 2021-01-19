import React from 'react';
import ReactDOM from 'react-dom';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: 'Defence against the dark arts'
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  
    switch (part.name) {
      case 'Fundamentals':
        return(
          <div>
          <h4>{part.name}</h4>
          <p>Description: {part.description}</p>
          <p>Amount of exercises: {part.exerciseCount}</p>
          </div>
        )
      case 'Using props to pass data':
        return(
          <div>
          <h4>{part.name}</h4>
          <p>Amount of exercises:{part.exerciseCount} </p>
          <p>Amount of group projects: {part.groupProjectCount}</p>
          </div>
        )
      case 'Deeper type usage':
        return(
          <div>
            <h4>{part.name}</h4>
            <p>Description: {part.description}</p>
            <p>Amount of exercises: {part.exerciseCount}</p>
            <p>Submission link: <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></p>
          </div>
        )
      case 'Defence against the dark arts':
        return(
          <div>
            <h4>{part.name}</h4>
            <p>Description: {part.description}</p>
            <p>Amount of exercises: {part.exerciseCount}</p>
          </div>
        )
      default:
        return assertNever(part)
    } 
}



const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
    {courseParts.map(part =>
      <div key={part.name}><Part part={part} /></div>
      )}
      </div>
  )
}

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <div>
      <h4>
        Total number of exercises: {" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </h4>
    </div>
  )
}






const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-url.dev',
    },
    {
      name: 'Defence against the dark arts',
      exerciseCount: 10,
      description: 'How to keep the evil out of your code',
    }
  ]

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));