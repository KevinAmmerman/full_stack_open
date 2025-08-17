import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes, userId, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }
  const visibility = {
    display: showDetails ? 'flex' : 'none',
  }

  const visibilityDeleteBtn = {
    display: blog.user[0].id === userId ? 'block' : 'none',
    width: 'min-content',
  }

  const updateLikes = () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      ...blog,
      likes: newLikes,
      user: blog.user[0].id,
    }
    updateBlogLikes(updatedBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id, blog.title)
    }
  }

  return (
    <div>
      <div className='blog_header'>
        <div data-testid='blogTitle'>{blog.title}</div>
        <div>{blog.author}</div>
        <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'show'}</button>
      </div>
      <div className='blog_detail' style={visibility}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button style={{ marginLeft: '8px' }} onClick={updateLikes}>
            like
          </button>
        </div>
        {blog.user && blog.user.name ? blog.user[0].name : ''}
        <button onClick={deleteBlog} style={visibilityDeleteBtn}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
