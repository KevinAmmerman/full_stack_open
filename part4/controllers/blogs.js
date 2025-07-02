const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'Operation requires authentication' })
    }
    const baseBlogObject = { ...request.body }
    if (!Object.prototype.hasOwnProperty.call(baseBlogObject, 'likes')) baseBlogObject.likes = 0
    baseBlogObject.user = request.user.id
    console.log(baseBlogObject)

    const savedBlog = new Blog(baseBlogObject)
    savedBlog.populate('user', { username: 1, name: 1, id: 1 })
    console.log(savedBlog)
    await User.findByIdAndUpdate(request.user.id, {
      $push: { blogs: savedBlog._id },
    })
    const result = await savedBlog.save()
    console.log(result)

    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blogId = request.params.id
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'Operation requires authentication' })
    }
    const blogToDelete = await Blog.findById(blogId)
    if (!blogToDelete) return response.status(404).end()
    if (blogToDelete.user.toString() === request.user.id) {
      await blogToDelete.deleteOne()
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'invalid user' })
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blogId = request.params.id
  const updatedBlog = request.body

  try {
    const returnedData = await Blog.findByIdAndUpdate(blogId, updatedBlog, {
      new: true,
    }).populate('user', { username: 1, name: 1, id: 1 })
    if (!returnedData) {
      return response.status(404).end()
    }
    response.json(returnedData)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
