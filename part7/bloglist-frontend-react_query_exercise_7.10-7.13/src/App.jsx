import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useBlogs } from './features/blog.queries'
import { useAddBlog, useDeleteBlog, useUpdateBlog } from './features/blog.mutations'
import { useUserLogin } from './features/user.mutations'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const newBlogMutation = useAddBlog()
  const userLoginMutation = useUserLogin()
  const deleteBlogMutation = useDeleteBlog()
  const updateBlogMutation = useUpdateBlog()
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

  const updateBlogLikes = (blogObject) => {
    updateBlogMutation.mutate(blogObject)
  }

  const removeBlog = async (blogId) => {
    deleteBlogMutation.mutate(blogId)
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
