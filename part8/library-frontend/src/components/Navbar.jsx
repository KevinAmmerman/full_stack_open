import { Link } from 'react-router-dom'

const Navbar = () => {
  const menu_style = {
    padding: 5,
    marginRight: 8,
    textDecoration: 'none',
    border: '1px solid black',
  }

  return (
    <nav>
      <Link to='/' style={menu_style}>
        Authors
      </Link>
      <Link to='/books' style={menu_style}>
        Books
      </Link>
      <Link to='/add-book' style={menu_style}>
        Add Book
      </Link>
    </nav>
  )
}

export default Navbar
