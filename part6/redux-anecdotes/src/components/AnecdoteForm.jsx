import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    const content = event.target.anecdote.value.trim()
    event.preventDefault()
    if (!content) {
      dispatch(setTimedNotification('You need to provide an anecdote.', 3))
      return
    }
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    dispatch(setTimedNotification(`You created '${content}'`, 5))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
