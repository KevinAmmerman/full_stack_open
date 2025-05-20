const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
    const randomUsers = await User.aggregate([{ $sample: { size: 1 } }])
    if (randomUsers[0]) {
      const baseBlogObject = { ...request.body }
      if (!Object.prototype.hasOwnProperty.call(baseBlogObject, 'likes')) baseBlogObject.likes = 0
      baseBlogObject.user = randomUsers[0]._id

      const savedBlog = new Blog(baseBlogObject)
      await User.findByIdAndUpdate(randomUsers[0]._id, {
        $push: { blogs: savedBlog._id },
      })
      const result = await savedBlog.save()

      response.status(201).json(result)
    } else {
      return response.status(400).json({ error: 'No user found' })
    }
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
