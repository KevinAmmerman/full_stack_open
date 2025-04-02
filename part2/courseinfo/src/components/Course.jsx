const Header = ({ header }) => <h1>{header}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          part={part}
        />
      ))}
    </div>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name}: {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => (acc += part.exercises), 0);
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
