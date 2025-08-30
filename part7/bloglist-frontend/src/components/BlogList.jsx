import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blogs)
  return (
    <Table striped data-testid='blogList'>
      <tbody>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <tr key={blog.id}>
              <td>
                {' '}
                {blog.name}
                <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default BlogList
