import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

const BlogDetail = ({ blogs, updateBlogLikes, userId, removeBlog }) => {
  const params = useParams()
  const blogId = params.id
  const blog = blogs.find((blog) => blog.id === blogId)

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
        <div data-testid='blogTitle' className='blog_title'>
          {blog.title}
          <button style={{ height: 'fit-content' }}>
            <Link to='/' className='back_button'>
              Back
            </Link>
          </button>
        </div>
        <div className='blog_detail'>
          <a href={`${blog.url}`} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
          <div>
            {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
            <button style={{ marginLeft: '8px' }} onClick={updateLikes}>
              like
            </button>
          </div>
          <div>added by {blog.author}</div>
        </div>
      </div>
      <div>
        {blog.user && blog.user.name ? blog.user[0].name : ''}
        <button onClick={deleteBlog} style={visibilityDeleteBtn}>
          remove
        </button>
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
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default BlogDetail
