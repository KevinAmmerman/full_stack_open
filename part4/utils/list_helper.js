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
const blogs = [
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: '10',
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: '10',
    __v: 0,
  },
]
const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return 0
  const blogsCopy = [...blogs]
  return blogsCopy.sort((a, b) => {
    return typeof a.likes === 'number' && typeof b.likes === 'number' ? b.likes - a.likes : 0
  })[0]
}

console.log(favoriteBlog(blogs))

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
