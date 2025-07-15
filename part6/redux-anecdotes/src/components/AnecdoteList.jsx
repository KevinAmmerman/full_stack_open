import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return [...anecdotes]
      .filter((ane) => ane.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(updateAnecdote(updatedAnecdote))
    dispatch(setTimedNotification(`You voted '${anecdote.content}'`, 5))
  }

  const style = {
    border: '2px solid black',
    padding: '8px',
    marginBottom: '8px',
  }
  return (
    <>
      {anecdotes.map((anecdote) => (
        <div
          style={style}
          key={anecdote.id}
        >
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
