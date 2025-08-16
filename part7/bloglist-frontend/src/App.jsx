import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setMessage } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      if (user) {
        saveUserToLocalStorage(user)
        setUser(user)
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
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
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      if (blog) {
        setBlogs(blogs.concat(blog))
        blogFormRef.current.toggleVisibility()
        dispatch(setMessage({ message: `a new blog ${blog.title} by ${blog.author} added`, modificationStatus: true }))
      }
    } catch (error) {
      dispatch(setMessage({ message: 'all fields are required', modificationStatus: false }))
      console.error(error)
    }
  }

  const updateBlogLikes = async (blogObject) => {
    try {
      const returnedData = await blogService.update(blogObject)
      if (returnedData) {
        const newBlogs = blogs.map((blog) => (blog.id === returnedData.id ? returnedData : blog))
        setBlogs(newBlogs)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      const status = await blogService.deleteBlog(blogId)
      if (status === 204) {
        const newBlogs = blogs.filter((blog) => blog.id !== blogId)
        setBlogs(newBlogs)
        dispatch(setMessage({ message: `${blogId} removed`, modificationStatus: true }))
      }
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
            <BlogList blogs={blogs} updateBlogLikes={updateBlogLikes} userId={user.id} removeBlog={removeBlog} />
          </>
        )}
      </div>
    </>
  )
}

export default App
