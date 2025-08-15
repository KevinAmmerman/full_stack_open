import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    modificationStatus: null,
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message
      state.modificationStatus = action.payload.modificationStatus ? 'success' : 'error'
    },
    clearMessage: (state) => {
      state.message = null
      state.modificationStatus = null
    },
  },
})

export const { setMessage, clearMessage } = notificationReducer.actions

export default notificationReducer.reducer
