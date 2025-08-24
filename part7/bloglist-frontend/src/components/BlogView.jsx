import PropTypes from 'prop-types'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './Togglable'

const BlogView = ({ blogFormRef, addBlog }) => {
  return (
    <>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      <BlogList />
    </>
  )
}

BlogView.propTypes = {
  blogFormRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]).isRequired,
  addBlog: PropTypes.func.isRequired,
}

export default BlogView
