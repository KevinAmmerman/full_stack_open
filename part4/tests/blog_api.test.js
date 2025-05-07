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
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })

  test('blog post unique identifier is named id, not _id', async () => {
    const response = await api.get('/api/blogs')
    const isKeyId = response.body.every((blog) => {
      return Object.keys(blog).find((key) => key === 'id')
    })
    assert(isKeyId, true)
  })
})

describe('send new blog to server', () => {
  test('add new blog to database', async () => {
    const newBlogObject = {
      title: 'React patterns',
      author: 'Kevin Ammerman',
      url: 'https://reactpatterns.com/',
      likes: 70,
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogId = response.body.id
    const newBlogInDb = await Blog.findById(newBlogId)

    const blogsAtEnd = await helper.blogsInDb()
    assert.ok(newBlogId, 'new created blog should be found on data base')
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.strictEqual(newBlogInDb.title, newBlogObject.title)
    assert.strictEqual(newBlogInDb.author, newBlogObject.author)
    assert.strictEqual(newBlogInDb.url, newBlogObject.url)
    assert.strictEqual(newBlogInDb.likes, newBlogObject.likes)
  })
})

after(async () => {
  await mongoose.connection.close()
})
