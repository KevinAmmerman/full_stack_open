import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions

let timeoutId = null
export const setTimedNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
      timeoutId = null
    }, time * 1000)
  }
}
export default notificationSlice.reducer
