import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notificationActions, useNotificationDispatch } from './contexts/notificationContext'
import { useBlogs } from './features/blog.queries'
import { useAddBlog } from './features/blog.mutations'
import { useUserLogin } from './features/user.mutations'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useNotificationDispatch()
  const newBlogMutation = useAddBlog()
  const userLoginMutation = useUserLogin()
  const { data: blogs, isLoading, isError } = useBlogs()

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
    userLoginMutation.mutate(
      { username, password },
      {
        onSuccess: (user) => {
          saveUserToLocalStorage(user)
          setUser(user)
          blogService.setToken(user.token)
          setUsername('')
          setPassword('')
        },
      }
    )
  }

  const saveUserToLocalStorage = (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    newBlogMutation.mutate(blogObject, {
      onSuccess: () => blogFormRef.current.toggleVisibility(),
    })
  }

  const updateBlogLikes = async (blogObject) => {
    try {
      const returnedData = await blogService.update(blogObject)
      if (returnedData) {
        const newBlogs = blogs.map((blog) => (blog.id === returnedData.id ? returnedData : blog))
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
        dispatch(notificationActions.setNotification('Blog successfully deleted'))
      }
    } catch (error) {
      console.error(error)
      dispatch(notificationActions.setNotification('Authorization failed', 'error'))
    }
  }

  if (isLoading) {
    return <div>loading data..</div>
  }

  if (isError) {
    return <div>Error loading blogs. Please refresh.</div>
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
