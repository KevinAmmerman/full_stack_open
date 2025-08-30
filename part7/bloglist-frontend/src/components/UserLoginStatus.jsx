import PropTypes from 'prop-types'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark' style={{ padding: '8px' }}>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='me-auto' style={{ display: 'flex', alignItems: 'center' }}>
          <Nav.Link href='#' as='span'>
            <Link to='/'>Blogs</Link>
          </Nav.Link>
          <Nav.Link href='#' as='span'>
            <Link to='/Users'>Users</Link>
          </Nav.Link>
          <Nav.Link href='#' as='div' style={{ display: 'flex' }}>
            <h4 style={{ margin: '8px' }}>{user.name} is logged in</h4>
            <Button variant='primary' onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

NavBar.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default NavBar
