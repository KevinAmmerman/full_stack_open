import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const { blogs } = useSelector((state) => state.blogs)
  return (
    <div data-testid='blogList' className='blog_list'>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={{ width: '100vw' }}>
            {' '}
            {blog.name}
            <Link to={`/blogs/${blog.id}`} className='blog_link'>
              {' '}
              {blog.title}{' '}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
