import PropTypes from 'prop-types'
import { useState } from 'react'
import { Button, Form, Card } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

const BlogDetail = ({ blogs, updateBlogLikes, userId, removeBlog, addComment }) => {
  const params = useParams()
  const blogId = params.id
  const blog = blogs.find((blog) => blog.id === blogId)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const visibilityDeleteBtn = {
    display: blog && blog.user.id === userId ? 'block' : 'none',
    width: 'min-content',
  }

  const updateLikes = () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      ...blog,
      likes: newLikes,
      user: blog.user.id,
    }
    updateBlogLikes(updatedBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id, blog.title)
      navigate('/')
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    addComment(blogId, comment)
    setComment('')
  }

  if (!blog) {
    return (
      <div>
        <h2>Blog not found</h2>
        <Link to='/'>Back to blogs</Link>
      </div>
    )
  }

  return (
    <div>
      <div className='blog_header'>
        <div data-testid='blogTitle' className='blog_title'>
          {blog.title}
          <Button variant='primary' style={{ height: 'fit-content' }}>
            <Link to='/' className='back_button'>
              Back
            </Link>
          </Button>
        </div>
        <div className='blog_detail'>
          <a href={`${blog.url}`} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
          <div>
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
            <Button variant='primary' style={{ marginLeft: '8px' }} onClick={updateLikes}>
              like
            </Button>
          </div>
          <div>Added by {blog.author}</div>
        </div>
      </div>
      <div>
        <Button variant='primary' onClick={deleteBlog} style={visibilityDeleteBtn}>
          Remove
        </Button>
      </div>
      <div>
        <h3>Comments</h3>
        <Form onSubmit={handleComment}>
          <Form.Group>
            <Form.Label htmlFor='comment'></Form.Label>
            <Form.Control type='text' name='comment' value={comment} onChange={({ target }) => setComment(target.value)} />
          </Form.Group>
          <Button type='submit' style={{ marginTop: '8px' }}>
            Add Comment
          </Button>
        </Form>
        <br />
        <div>
          {blog.comments &&
            blog.comments.length > 0 &&
            blog.comments.map((comment) => (
              <Card key={comment.id} style={{ marginBottom: '16px' }}>
                <Card.Body>{comment.comment}</Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

BlogDetail.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          comment: PropTypes.string,
          createdAt: PropTypes.string,
          id: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
}

export default BlogDetail
