const Header = ({ header }) => {
  console.log('header', header);
  return <h1>{header}</h1>;
};

const Content = ({ part1, part2, part3 }) => {
  console.log('Content', part1, part2, part3);
  return (
    <div>
      <Part part={part1.name} exercises={part1.exercises} />
      <Part part={part2.name} exercises={part2.exercises} />
      <Part part={part3.name} exercises={part3.exercises} />
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

const Total = ({ part1, part2, part3 }) => {
  console.log('Total', part1, part2, part3);
  return (
    <p>
      Number of exercises: {part1.exercises + part2.exercises + part3.exercises}
    </p>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <>
      <Header header={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </>
  );
};

export default App;
