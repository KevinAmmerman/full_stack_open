import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

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
        setUsername('')
        setPassword('')
      }
    } catch (error) {
      setMessage(['wrong username or password', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
        setMessage([`a new blog ${blog.title} by ${blog.author} added`, true])
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (error) {
      setMessage(['all fields are required', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
      }
    } catch (error) {
      console.error(error)
      setMessage(['Authorization failed', false])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <Notification message={message} />
      <div>
        {user === null ? (
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={setUsername}
            handlePasswordChange={setPassword}
            username={username}
            password={password}
          />
        ) : (
          <>
            <User
              user={user}
              handleLogout={handleLogout}
            />
            <Togglable
              buttonLabel='create new'
              ref={blogFormRef}
            >
              <BlogForm createBlog={addBlog} />
            </Togglable>
            <br />
            <BlogList
              blogs={blogs}
              updateBlogLikes={updateBlogLikes}
              userId={user.id}
              removeBlog={removeBlog}
            />
          </>
        )}
      </div>
    </>
  )
}

export default App
