import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
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

export const { setMessage, clearMessage } = notificationSlice.actions

export default notificationSlice.reducer
