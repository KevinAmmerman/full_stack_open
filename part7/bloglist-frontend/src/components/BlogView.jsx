import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './Togglable'

const BlogView = ({ blogFormRef, addBlog, updateBlogLikes, removeBlog, userId }) => {
  return (
    <>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      <BlogList updateBlogLikes={updateBlogLikes} userId={userId} removeBlog={removeBlog} />
    </>
  )
}

BlogView.propTypes = {
  blogFormRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]).isRequired,
  addBlog: PropTypes.func.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default BlogView
