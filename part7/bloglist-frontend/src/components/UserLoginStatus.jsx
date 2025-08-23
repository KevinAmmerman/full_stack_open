import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

const UserLoginStatus = ({ user, handleLogout }) => {
  const location = useLocation()
  const isOnUsersPage = location.pathname === '/users'

  const style = {
    maxHeight: 'min-content',
    marginLeft: '8px',
    textDecoration: 'none',
  }
  return (
    <>
      <h2>blogs</h2>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <h4>{user.name} logged in</h4>
        <button style={style} onClick={handleLogout}>
          logout
        </button>
        <button style={style}>
          <Link style={{ textDecoration: 'none', color: 'black' }} to={isOnUsersPage ? '/' : 'users'}>
            {isOnUsersPage ? 'Home' : 'Users'}
          </Link>
        </button>
      </div>
    </>
  )
}

UserLoginStatus.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default UserLoginStatus
