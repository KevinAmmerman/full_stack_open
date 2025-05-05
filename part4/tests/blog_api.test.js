const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('read blogs from server', () => {
  test.only('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test.only('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })

  test.only('blog post unique identifier is named id, not _id', async () => {
    const response = await api.get('/api/blogs')
    const isKeyId = response.body.some((blog) => {
      return Object.keys(blog).find((key) => key === 'id')
    })
    assert(isKeyId, true)
  })
})

after(async () => {
  await mongoose.connection.close()
})
