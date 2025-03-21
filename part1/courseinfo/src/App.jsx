const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Content = (props) => {
  return (
    <p>
      {props.content}: {props.amount}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises: {props.total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <>
      <Header header={course} />
      <Content content={part1} amount={exercises1} />
      <Content content={part2} amount={exercises2} />
      <Content content={part3} amount={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </>
  );
};

export default App;
