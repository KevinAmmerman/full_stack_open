import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  const style = {
    maxHeight: 'min-content',
    marginLeft: '8px',
    textDecoration: 'none',
  }
  return (
    <>
      <nav className='nav_bar'>
        <Link to='/'>Blogs</Link>
        <Link to='/Users'>Users</Link>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <h4 style={{ margin: '8px' }}>{user.name} logged in</h4>
          <button style={style} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
    </>
  )
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default NavBar
