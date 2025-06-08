import Blog from './Blog'

const BlogList = ({ blogs, visibleBlogIds, toggleVisibility, updateBlogLikes }) => (
  <div>
    {blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        isVisible={visibleBlogIds.has(blog.id)}
        toggleVisibility={() => toggleVisibility(blog.id)}
        updateBlogLikes={updateBlogLikes}
      />
    ))}
  </div>
)

export default BlogList
