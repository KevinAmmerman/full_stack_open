import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, isVisible, toggleVisibility, updateBlogLikes }) => {
  const visibility = {
    display: isVisible ? 'flex' : 'none',
  }

  const updateLikes = () => {
    const newLikes = blog.likes + 1
    const updatedBlog = {
      ...blog,
      likes: newLikes,
      user: blog.user && blog.user[0] && blog.user[0].id ? blog.user[0].id : blog.user.id,
    }
    updateBlogLikes(updatedBlog)
  }

  return (
    <div>
      <div className='blog_header'>
        <div>{blog.title}</div>
        <button onClick={toggleVisibility}>{isVisible ? 'hide' : 'show'}</button>
      </div>
      <div
        className='blog_detail'
        style={visibility}
      >
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={updateLikes}>like</button>
        </div>
        {blog.user && blog.user.name ? blog.user[0].name : ''}
      </div>
    </div>
  )
}
export default Blog
