import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      anecdote.votes += 1
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { vote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
