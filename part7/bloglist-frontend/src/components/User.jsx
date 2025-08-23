const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td style={{ textAlign: 'right' }}>{user.count}</td>
    </tr>
  )
}

export default User
