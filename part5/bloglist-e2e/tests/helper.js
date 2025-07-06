const loginWith = async (page, username, password) => {
  await page.getByRole('textbox', { name: 'Username...' }).click()
  await page.getByRole('textbox', { name: 'Username...' }).fill(username)
  await page.getByRole('textbox', { name: 'Password...' }).click()
  await page.getByRole('textbox', { name: 'Password...' }).fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new' }).click()
  await page.getByTestId('title').click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').click()
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').click()
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
}

const likeBlog = async (page, blogTitle, numberOfTimes) => {
  const blogElement = page.locator('.blog_header').filter({ hasText: blogTitle }).locator('..')
  const detailElement = blogElement.locator('.blog_detail')
  await blogElement.getByRole('button', { name: 'show' }).click()
  for (let i = 0; i < numberOfTimes; i++) {
    await detailElement.getByRole('button', { name: 'like' }).click()
    await page.waitForTimeout(100)
  }
  await blogElement.getByRole('button', { name: 'hide' }).click()
}

export { loginWith, createBlog, likeBlog }
