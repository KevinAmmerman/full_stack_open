import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

export const initializeBlogs = createAsyncThunk('blogs/initializeBlogs', async () => {
  const blogs = await blogService.getAll()
  return blogs
})

export const createBlog = createAsyncThunk('blogs/createBlog', async (blog) => {
  const response = await blogService.create(blog)
  return response
})

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload
      })
      .addCase(initializeBlogs.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload)
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default blogSlice.reducer
