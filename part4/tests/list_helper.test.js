const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 'not a number',
    __v: 0,
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('Sums only valid like values.', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test('Ignores negative likes', () => {
    const blogs = [{ likes: -5 }]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('Treats non-numeric likes as 0', () => {
    const blogs = [{ likes: 'hello' }]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('treats missing likes as 0', () => {
    const blogs = [{ title: 'hello' }]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('Returns the likes of a single blog if the list contains only one blog.', () => {
    const singleBlogArray = [blogs[0]]
    const result = listHelper.totalLikes(singleBlogArray)
    assert.strictEqual(result, 7)
  })

  test('Returns 0 for various invalid inputs.', () => {
    const invalidInputs = [undefined, null, [], {}, 123, 'No array', true]
    invalidInputs.forEach((input) => {
      const result = listHelper.totalLikes(input)
      assert.strictEqual(result, 0)
    })
  })
})

describe('favorite blog', () => {
  test('Returns the blog with the most likes from a list of blogs.', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('When the list contains only one blog, it returns that blog.', () => {
    const singleBlogArray = [blogs[0]]
    const result = listHelper.favoriteBlog(singleBlogArray)
    assert.deepStrictEqual(result, blogs[0])
  })

  test('Ignores a blog if likes is non-numeric', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('Returns 0 for various invalid inputs.', () => {
    const invalidInputs = [undefined, null, [], {}, 123, 'No array', true]
    invalidInputs.forEach((input) => {
      const result = listHelper.favoriteBlog(input)
      assert.strictEqual(result, 0)
    })
  })
})

describe('Most blogs', () => {
  test('Author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 4,
    })
  })

  test('Returns { author: undefined, likes: 0 } for various invalid inputs', () => {
    const invalidInputs = [undefined, null, 'No string', 1234, [], {}, true]
    invalidInputs.forEach((input) => {
      const result = listHelper.mostBlogs(input)
      assert.deepStrictEqual(result, { author: undefined, blogs: 0 })
    })
  })

  test('When the list contains only one blog, it returns that blogs author.', () => {
    const singleBlogArray = [blogs[0]]
    const result = listHelper.mostBlogs(singleBlogArray)
    assert.deepStrictEqual(result, {
      author: 'Michael Chan',
      blogs: 1,
    })
  })
})

describe('max likes', () => {
  test('Returns the author with the most likes from a list of blogs.', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })

  test('Returns { author: undefined, likes: 0 } for various invalid inputs', () => {
    const invalidInputs = [undefined, null, 'No string', 1234, [], {}, true]
    invalidInputs.forEach((input) => {
      const result = listHelper.mostLikes(input)
      assert.deepStrictEqual(result, { author: undefined, likes: 0 })
    })
  })

  test('Ignores blogs where likes have a non-numeric value.', () => {
    const blogs = [
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 'not a number',
        __v: 0,
      },
    ]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', likes: 2 })
  })

  test('If the list contains only one blog, returns it.', () => {
    const blogs = [
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
      },
    ]
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', likes: 2 })
  })
})
