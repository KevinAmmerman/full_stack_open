import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const visibility = {
    display: detailsVisible ? 'flex' : 'none',
  }

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div>
      <div className='blog_header'>
        <div>{blog.title}</div>
        <button onClick={toggleVisibility}>{detailsVisible ? 'hide' : 'show'}</button>
      </div>
      <div
        className='blog_detail'
        style={visibility}
      >
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button>like</button>
        </div>
        {blog.user && blog.user.name ? blog.user[0].name : ''}
      </div>
    </div>
  )
}
export default Blog
