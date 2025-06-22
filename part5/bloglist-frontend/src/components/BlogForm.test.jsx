import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { test } from 'vitest'

test('Check if the event handler received as a prop is called with the correct details.', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByTestId('title')
  const authorInput = screen.getByTestId('author')
  const urlInput = screen.getByTestId('url')
  const submitButton = screen.getByRole('button', { name: 'create' })

  await user.type(titleInput, 'Thats a test')
  await user.type(authorInput, 'Kevin')
  await user.type(urlInput, 'www.test.de')
  await user.click(submitButton)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'Thats a test',
    author: 'Kevin',
    url: 'www.test.de',
  })
})
