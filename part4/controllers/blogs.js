const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const baseBlogObject = { ...request.body }
    if (!Object.prototype.hasOwnProperty.call(baseBlogObject, 'likes')) baseBlogObject.likes = 0
    baseBlogObject.user = decodedToken.id

    const savedBlog = new Blog(baseBlogObject)
    await User.findByIdAndUpdate(decodedToken.id, {
      $push: { blogs: savedBlog._id },
    })
    const result = await savedBlog.save()

    response.status(201).json(result)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id
  try {
    const blogToDelete = await Blog.findByIdAndDelete(blogId)
    if (blogToDelete) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blogId = request.params.id
  const editLikes = request.body.likes

  try {
    const blogToUpdate = await Blog.findById(blogId)

    if (!blogToUpdate) {
      return response.status(404).end()
    } else {
      blogToUpdate.likes = editLikes

      const updatedBlog = await blogToUpdate.save()
      response.json(updatedBlog)
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
