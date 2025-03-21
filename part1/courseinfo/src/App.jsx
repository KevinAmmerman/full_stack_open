const Header = ({ header }) => {
  console.log('header', header);
  return <h1>{header.name}</h1>;
};

const Content = ({ parts }) => {
  console.log('Content', parts);
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
};

const Part = ({ part, exercises }) => {
  console.log('Part', part, exercises);
  return (
    <p>
      {part}: {exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  console.log('Total', parts);
  return (
    <p>
      Number of exercises:{' '}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header header={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
