import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationSlice'
import blogSlice from './reducers/blogSlice'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
  },
})

export default store
