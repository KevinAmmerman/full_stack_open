const _ = require('lodash')

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
  if (!Array.isArray(blogs) || blogs.length === 0) return 0
  const blogsCopy = [...blogs]
  return blogsCopy.sort((a, b) => {
    return typeof a.likes === 'number' && typeof b.likes === 'number' ? b.likes - a.likes : 0
  })[0]
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return 0
  const authorBlog = _.maxBy(blogs, 'author')
  const count = _.countBy(blogs, (blog) => blog.author === authorBlog.author)
  return { author: authorBlog.author, blogs: count.true }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
