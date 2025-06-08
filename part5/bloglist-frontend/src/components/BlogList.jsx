import Blog from './Blog'

const BlogList = ({
  blogs,
  visibleBlogIds,
  toggleVisibility,
  updateBlogLikes,
  userId,
  removeBlog,
}) => (
  <div>
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          isVisible={visibleBlogIds.has(blog.id)}
          toggleVisibility={() => toggleVisibility(blog.id)}
          updateBlogLikes={updateBlogLikes}
          userId={userId}
          removeBlog={removeBlog}
        />
      ))}
  </div>
)

export default BlogList
