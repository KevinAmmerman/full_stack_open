import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, updateBlogLikes, userId, removeBlog }) => (
  <div data-testid='blogList'>
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogLikes={updateBlogLikes}
          userId={userId}
          removeBlog={removeBlog}
        />
      ))}
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default BlogList
