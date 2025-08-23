import { useSelector } from 'react-redux'
import User from './User'

const UserList = ({ blogs }) => {
  const counts = blogs.reduce((acc, blog) => {
    const username = blog.user[0].username
    acc[username] = (acc[username] || 0) + 1
    return acc
  }, {})

  const countsArray = Object.entries(counts).map(([username, count]) => ({ username: username, count }))

  const countsWithNamesArray = (arr1, arr2, props) => {
    const combinations = arr1.flatMap((obj1) => arr2.map((obj2) => ({ obj1, obj2 })))

    const matches = combinations.filter(({ obj1, obj2 }) => props.some((prop) => obj1.user[0][prop] === obj2[prop]))

    const matchesArray = matches.map(({ obj1, obj2 }) => ({
      name: obj1.user[0].name,
      count: obj2.count,
      id: obj1.user[0].id,
    }))

    return Array.from(new Map(matchesArray.map((item) => [item.name, item])).values())
  }

  const users = countsWithNamesArray(blogs, countsArray, ['username'])

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
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
