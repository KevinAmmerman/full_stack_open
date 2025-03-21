const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} amount={props.parts[0].amount} />
      <Part part={props.parts[1].name} amount={props.parts[1].amount} />
      <Part part={props.parts[2].name} amount={props.parts[2].amount} />
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part}: {props.amount}
    </p>
  );
};

const Total = (props) => {
  return <p>Number of exercises: {props.total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      amount: 10,
    },
    {
      name: 'Using props to pass data',
      amount: 7,
    },
    {
      name: 'State of a component',
      amount: 14,
    },
  ];

  return (
    <>
      <Header header={course} />
      <Content parts={parts} />
      <Total total={parts[0].amount + parts[1].amount + parts[2].amount} />
    </>
  );
};

export default App;
