/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs)) return 0
  return blogs.reduce((acc, blog) => {
    const likes = typeof blog.likes === 'number' && blog.likes >= 0 ? blog.likes : 0
    return acc + likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  const blogsCopy = [...blogs]
  if (!Array.isArray(blogsCopy) || blogsCopy.length === 0) return 0
  return blogsCopy.sort((a, b) => {
    return typeof a.likes === 'number' && typeof b.likes === 'number' ? b.likes - a.likes : {}
  })[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
