import { useSelector } from 'react-redux'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ updateBlogLikes, userId, removeBlog }) => {
  const { blogs } = useSelector((state) => state.blogs)
  return (
    <div data-testid='blogList'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} userId={userId} removeBlog={removeBlog} />
        ))}
    </div>
  )
}

BlogList.propTypes = {
  updateBlogLikes: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default BlogList
