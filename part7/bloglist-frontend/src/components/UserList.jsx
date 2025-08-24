import { useSelector } from 'react-redux'
import User from './User'

const UserList = ({ blogs }) => {
  const getUsersWithCounts = (blogs) => {
    const userMap = new Map()

    blogs.forEach((blog) => {
      const user = blog.user[0]
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
  console.log(users)
  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left' }}>User</th>
            <th>Blogs Created</th>
          </tr>
          {users.map((user) => (
            <User key={user.id} user={user}></User>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
