import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

const UserDetail = ({ blogs }) => {
  const params = useParams()
  const userId = params.id
  const filteredBlogs = blogs.filter((blog) => blog.user[0].id === userId)

  if (filteredBlogs.length === 0) {
    return (
      <section>
        <h2>User not found</h2>
        <p>No blogs found for this user.</p>
        <Link to='/users'>← Back to Users</Link>
      </section>
    )
  }

  const authorName = filteredBlogs[0].user[0].name

  return (
    <section>
      <h2>{authorName}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {filteredBlogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
      <Link to='/users'>Back</Link>
    </section>
  )
}

UserDetail.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default UserDetail
