import { configureStore } from '@reduxjs/toolkit'
import notificationSlice from './reducers/notificationSlice'
import blogSlice from './reducers/blogSlice'
import userSlice from './reducers/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogSlice,
    user: userSlice,
  },
})

export default store
