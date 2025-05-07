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
    const newBlog = {
      title: 'React patterns',
      author: 'Kevin Ammerman',
      url: 'https://reactpatterns.com/',
      likes: 70,
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogId = response.body.id
    const newBlogInDb = await Blog.findById(newBlogId)

    const blogsAtEnd = await helper.blogsInDb()
    assert.ok(newBlogId)
    assert.ok(newBlogInDb, 'new created blog should be found on database')
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.strictEqual(newBlogInDb.title, newBlog.title)
    assert.strictEqual(newBlogInDb.author, newBlog.author)
    assert.strictEqual(newBlogInDb.url, newBlog.url)
    assert.strictEqual(newBlogInDb.likes, newBlog.likes)
  })

  test('Verify the blog post`s likes count defaults to zero when not provided in the initial request.', async () => {
    const newBlogWithoutLikes = {
      title: 'Angular patterns',
      author: 'Hans Zimmer',
      url: 'https://angularpatterns.com/',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const newBlogId = response.body.id
    const newBlogInDb = await Blog.findById(newBlogId)

    assert.ok(newBlogId)
    assert.ok(newBlogInDb, 'new created blog should be found on database')
    assert.strictEqual(newBlogInDb.likes, 0)
  })

  test.only('Should return status 400 if the title is missing.', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlogWithoutTitle = {
      author: 'Hans Zimmer',
      url: 'https://angularpatterns.com/',
      likes: 20,
    }

    await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test.only('Should return status 400 if the url is missing.', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlogWithoutUrl = {
      title: 'Angular patterns',
      author: 'Hans Zimmer',
      likes: 20,
    }

    await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
