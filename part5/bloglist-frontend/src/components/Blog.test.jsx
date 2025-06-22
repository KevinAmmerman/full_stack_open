import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

let component

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

beforeEach(() => {
  component = render(
    <Blog
      blog={blog}
      isVisible={false}
      toggleVisibility={mockToggleVisibility}
      updateBlogLikes={mockUpdateBlogLikes}
      userId='684573dad9a3deb38032558e'
      removeBlog={mockRemoveBlog}
    />
  )
})

test('renders title and author, hides url and likes by default', () => {
  const titleElement = component.getByText('How to', { exact: false, ignoreCase: true })
  const authorElement = component.getByText('Kevin')

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
  expect(titleElement).toBeVisible()
  expect(authorElement).toBeVisible()

  const urlElement = component.getByText('www.kevin-ammerman.com')
  const likesElement = component.getByText('12')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()
})

test('Checks if the blogs URL and likes are visible when the show button is clicked.', async () => {
  const urlElement = component.getByText('www.kevin-ammerman.com')
  const likesElement = component.getByText('12')
  const user = userEvent.setup()
  const button = component.getByText('show')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(urlElement).not.toBeVisible()
  expect(likesElement).not.toBeVisible()

  await user.click(button)

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
  expect(urlElement).toBeVisible()
  expect(likesElement).toBeVisible()
})
