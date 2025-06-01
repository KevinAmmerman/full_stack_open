import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs])

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
      console.error(error)
    }
  }

  const saveUserToLocalStorage = (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      const blog = await blogService.create(newBlog)
      if (blog) {
        setTitle('')
        setAuthor('')
        setUrl('')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      ) : (
        <>
          <User
            user={user}
            handleLogout={handleLogout}
          />
          <BlogForm
            handleBlog={handleBlog}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            title={title}
            author={author}
            url={url}
          />
          <br />
          <BlogList
            user={user}
            blogs={blogs}
            handleLogout={handleLogout}
          />
        </>
      )}
    </div>
  )
}

export default App
