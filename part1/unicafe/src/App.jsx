import { useState } from 'react';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const calcPositive = (good, total) => {
    const positiveResult = (good / total) * 100;
    const roundedResult = Math.ceil(positiveResult * 100) / 100;
    setPositive(roundedResult);
  };

  const handleGoodClick = () => {
    setGood(good + 1);
    setTotal(total + 1);
    const updatedTotal = total + 1;
    const updatedGood = good + 1;
    const averageResult = (updatedGood - bad) / updatedTotal;
    const roundedResult = Math.ceil(averageResult * 100) / 100;
    setAverage(roundedResult);
    calcPositive(updatedGood, updatedTotal);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    const updatedTotal = total + 1;
    calcPositive(good, updatedTotal);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    const updatedTotal = total + 1;
    const updatedBad = bad + 1;
    const averageResult = (good - updatedBad) / updatedTotal;
    const roundedResult = Math.ceil(averageResult * 100) / 100;
    setAverage(roundedResult);
    calcPositive(good, updatedTotal);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
      <p>positive: {positive}%</p>
    </>
  );
};

export default App;
