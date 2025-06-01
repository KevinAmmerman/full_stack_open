import Blog from './Blog'

const BlogList = ({ user, blogs, handleLogout }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
      />
    ))}
  </div>
)

export default BlogList
