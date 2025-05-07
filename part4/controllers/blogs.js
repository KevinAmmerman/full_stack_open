const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const isPropExisting = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    if (!isPropExisting(request.body, 'title') || !isPropExisting(request.body, 'url')) {
      return response.status(400).end()
    }
    const blogObject = !Object.prototype.hasOwnProperty.call(request.body, 'likes')
      ? { ...request.body, likes: 0 }
      : request.body

    const blog = new Blog(blogObject)

    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
