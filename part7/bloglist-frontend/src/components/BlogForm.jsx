import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleBlog}>
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)} data-testid='title' />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)} data-testid='author' />
      </Form.Group>
      <Form.Group>
        <Form.Label>url:</Form.Label>
        <Form.Control type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} data-testid='url' />
      </Form.Group>
      <Button variant='primary' type='submit' style={{ margin: '8px 0', width: 'min-content' }}>
        Create
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
