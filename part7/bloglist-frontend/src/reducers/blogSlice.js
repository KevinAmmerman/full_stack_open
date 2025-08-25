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

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (updateBlog) => {
  const response = await blogService.update(updateBlog)
  return response
})

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (blogId) => {
  await blogService.deleteBlog(blogId)
  return blogId
})

export const createComment = createAsyncThunk('blogs/createComment', async ({ blogId, comment }) => {
  const response = await blogService.createComment(blogId, comment)
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
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) => (blog.id === action.payload.id ? action.payload : blog))
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload)
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.error = action.error.message
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.blogs = state.blogs.map((blog) => (blog.id === action.payload.id ? action.payload : blog))
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.error.message
      })
  },
})

export default blogSlice.reducer
