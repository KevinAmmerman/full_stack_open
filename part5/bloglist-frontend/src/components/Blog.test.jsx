import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author, hides url and likes by default', () => {
  const blog = {
    title: 'How to test react components',
    author: 'Kevin',
    url: 'www.kevin-ammerman.com',
    likes: 12,
    user: [
      {
        username: 'kevin',
        name: 'Thomas',
        id: '684573dad9a3deb38032558e',
      },
    ],
  }

  const mockToggleVisibility = vi.fn()
  const mockUpdateBlogLikes = vi.fn()
  const mockRemoveBlog = vi.fn()

  render(
    <Blog
      blog={blog}
      isVisible={false}
      toggleVisibility={mockToggleVisibility}
      updateBlogLikes={mockUpdateBlogLikes}
      userId='684573dad9a3deb38032558e'
      removeBlog={mockRemoveBlog}
    />
  )

  const titleElement = screen.getByText('How to', { exact: false, ignoreCase: true })
  const authorElement = screen.getByText('Kevin')

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
  expect(titleElement).toBeVisible()
  expect(authorElement).toBeVisible()

  const urlElement = screen.getByText('www.kevin-ammerman.com')
  const likesElement = screen.getByText('12')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
})
