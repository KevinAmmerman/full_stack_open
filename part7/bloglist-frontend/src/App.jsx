import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setMessage } from './reducers/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogSlice'
import { setUser, clearUser } from './reducers/userSlice'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      if (user) {
        saveUserToLocalStorage(user)
        dispatch(setUser(user))
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
        dispatch(setMessage({ message: `Welcome back ${user.name}`, modificationStatus: true }))
      }
    } catch (error) {
      dispatch(setMessage({ message: 'wrong username or password', modificationStatus: false }))
    }
  }

  const saveUserToLocalStorage = (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
    dispatch(setMessage({ message: `Goodbye ${user.name} see you soon.`, modificationStatus: true }))
  }

  const addBlog = async (blogObject) => {
    try {
      if (blogObject) {
        const result = await dispatch(createBlog(blogObject)).unwrap()
        blogFormRef.current.toggleVisibility()
        dispatch(setMessage({ message: `a new blog ${result.title} by ${result.author} added`, modificationStatus: true }))
      }
    } catch (error) {
      dispatch(setMessage({ message: 'all fields are required', modificationStatus: false }))
      console.error(error)
    }
  }

  const updateBlogLikes = async (blogObject) => {
    try {
      await dispatch(updateBlog(blogObject)).unwrap()
    } catch (error) {
      dispatch(setMessage({ message: 'Update of likes failed', modificationStatus: false }))
      console.error(error)
    }
  }

  const removeBlog = async (blogId, title) => {
    try {
      await dispatch(deleteBlog(blogId)).unwrap()
      dispatch(setMessage({ message: `${title} removed`, modificationStatus: true }))
    } catch (error) {
      console.error(error)
      dispatch(setMessage({ message: 'Authorization failed', modificationStatus: false }))
    }
  }

  return (
    <>
      <Notification />
      <div>
        {user === null ? (
          <LoginForm handleSubmit={handleLogin} handleUsernameChange={setUsername} handlePasswordChange={setPassword} username={username} password={password} />
        ) : (
          <>
            <User user={user} handleLogout={handleLogout} />
            <Togglable buttonLabel='create new' ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <br />
            <BlogList updateBlogLikes={updateBlogLikes} userId={user.id} removeBlog={removeBlog} />
          </>
        )}
      </div>
    </>
  )
}

export default App
