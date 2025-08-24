import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={handleBlog}>
        <div>
          title:
          <input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} data-testid='title' />
        </div>
        <div>
          author:
          <input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} data-testid='author' />
        </div>
        <div>
          url:
          <input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} data-testid='url' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
