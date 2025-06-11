import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({
  blogs,
  visibleBlogIds,
  toggleVisibility,
  updateBlogLikes,
  userId,
  removeBlog,
}) => (
  <div>
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isVisible={visibleBlogIds.has(blog.id)}
          toggleVisibility={() => toggleVisibility(blog.id)}
          updateBlogLikes={updateBlogLikes}
          userId={userId}
          removeBlog={removeBlog}
        />
      ))}
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default BlogList
