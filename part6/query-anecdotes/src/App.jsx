import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateAnecdote } from './services/anecdotes'
import { useNotificationDispatch } from './NotificationContext'
import { useRef } from 'react'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const timeoutRef = useRef(null)

  const handleVote = (anecdote) => {
    votingMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: 'SET_MESSAGE',
      payload: `anecdote '${anecdote.content}' voted`,
    })
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const queryClient = useQueryClient()
  const {
    data: anecdotes = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ['anecdotes'], queryFn: getAll })

  const votingMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (changedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
        )
      )
    },
  })

  if (isLoading) {
    return <div>loading data...</div>
  } else if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
