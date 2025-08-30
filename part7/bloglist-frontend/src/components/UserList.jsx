import PropTypes from 'prop-types'
import User from './User'
import { Table } from 'react-bootstrap'

const UserList = ({ blogs }) => {
  const getUsersWithCounts = (blogs) => {
    const userMap = new Map()

    blogs.forEach((blog) => {
      const user = blog.user
      if (!user) return

      const userId = user.id

      if (userMap.has(userId)) {
        userMap.get(userId).count++
      } else {
        userMap.set(userId, {
          id: userId,
          name: user.name,
          username: user.username,
          count: 1,
        })
      }
    })

    return Array.from(userMap.values())
  }

  const users = getUsersWithCounts(blogs)

  return (
    <>
      <div>
        <h2>Users</h2>
      </div>
      <Table striped>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left' }}>User</th>
            <th>Blogs Created</th>
          </tr>
          {users.map((user) => (
            <User key={user.id} user={user}></User>
          ))}
        </tbody>
      </Table>
    </>
  )
}

UserList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
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
}

export default UserList
