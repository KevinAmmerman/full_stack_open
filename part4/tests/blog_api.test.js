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

describe('GET /api/blogs', () => {
  test('succeeds with status 200 and returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct number of initial blogs', async () => {
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

describe('POST /api/blogs', () => {
  test('succeeds with valid data and adds blog to database', async () => {
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

  test('defaults likes to 0 if missing', async () => {
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

  describe('POST /api/blogs with invalid data', () => {
    test('returns status 400 if the title is missing.', async () => {
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

    test('returns status 400 if the url is missing.', async () => {
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
})

describe('DELETE /api/blogs', () => {
  test.only('returns status 204 if the blog was successfully deleted.', async () => {
    const blogId = '5a422a851b54a676234d17f7'
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${blogId}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test.only('returns status 404 if id is not existing', async () => {
    const testBlog = new Blog({
      title: 'Angular patterns',
      author: 'Hans Zimmer',
      likes: 20,
    })
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${testBlog._id}`).expect(404)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test.only('returns status 500 if id is invalid', async () => {
    const invalidId = 'asd7a8f7s89d8f7sdfd'
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${invalidId}`).expect(500)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
