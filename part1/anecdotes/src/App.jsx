import { useState } from 'react';

const HighestVotedAnecdote = ({ anecdote, votes }) => {
  if (anecdote !== undefined && votes !== undefined) {
    return (
      <div>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </div>
    );
  }
  return <p>No votes so far!</p>;
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const checkMostVoted = (votes) => {
    const highestVote = Object.entries(votes).reduce((max, [key, value]) =>
      value >= votes[max[0]] ? key : max[0]
    );
    setHighest(highestVote);
  };

  const createObject = () => {
    const newObject = {};
    for (let i = 0; i < anecdotes.length; i++) {
      newObject[i] = 0;
    }
    return newObject;
  };

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(createObject);
  const [highest, setHighest] = useState('');

  const randomAnecdote = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const handleRandomAnecdote = () => {
    const randomNumber = randomAnecdote();
    setSelected(randomNumber);
  };

  const handleVotes = () => {
    const copy = { ...votes };
    copy[selected] += 1;
    setVotes(copy);
    checkMostVoted(copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <br />
      <h2>Anecdote with most votes</h2>
      <HighestVotedAnecdote
        anecdote={anecdotes[highest]}
        votes={votes[highest]}
      />
    </>
  );
};

export default App;
