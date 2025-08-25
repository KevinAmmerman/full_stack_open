import { Route, Routes } from 'react-router-dom'
import UserList from './UserList'
import UserDetail from './UserDetail'
import BlogDetail from './BlogDetail'
import BlogView from './BlogView'
import PropTypes from 'prop-types'

const AppRoutes = ({ blogs, userId, removeBlog, updateBlogLikes, blogFormRef, addBlog, addComment }) => (
  <Routes>
    <Route path='/users' element={<UserList blogs={blogs} />} />
    <Route path='users/:id' element={<UserDetail blogs={blogs} />} />
    <Route
      path='blogs/:id'
      element={<BlogDetail removeBlog={removeBlog} updateBlogLikes={updateBlogLikes} userId={userId} blogs={blogs} addComment={addComment} />}
    />
    <Route path='/' element={<BlogView blogFormRef={blogFormRef} addBlog={addBlog} />} />
  </Routes>
)

AppRoutes.propTypes = {
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

  userId: PropTypes.string.isRequired,
  removeBlog: PropTypes.func.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,

  blogFormRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
}

export default AppRoutes
