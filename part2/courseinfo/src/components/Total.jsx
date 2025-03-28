const Total = ({ parts }) => {
  const total = parts.reduce((acc, part) => (acc += part.exercises), 0);
  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  );
};

export default Total;
