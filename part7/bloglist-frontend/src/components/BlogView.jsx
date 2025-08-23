import BlogForm from './BlogForm'
import BlogList from './BlogList'
import Togglable from './Togglable'

const BlogView = ({ blogFormRef, addBlog, updateBlogLikes, removeBlog, userId }) => {
  return (
    <>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      <BlogList updateBlogLikes={updateBlogLikes} userId={userId} removeBlog={removeBlog} />
    </>
  )
}

export default BlogView
