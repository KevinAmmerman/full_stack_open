const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')
const { createBlog } = require('./helper')
const { likeBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Kevin Ammerman',
        username: 'kevin90',
        password: 'sagichdirnicht',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Hans Zimmer',
        username: 'hans70',
        password: 'sagichdirnicht',
      },
    })
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Username...' }).click()
      await page.getByRole('textbox', { name: 'Username...' }).fill('kevin90')
      await page.getByRole('textbox', { name: 'Password...' }).click()
      await page.getByRole('textbox', { name: 'Password...' }).fill('sagichdirnicht')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
      await expect(page.getByText('Kevin Ammerman logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Username...' }).click()
      await page.getByRole('textbox', { name: 'Username...' }).fill('hans90')
      await page.getByRole('textbox', { name: 'Password...' }).click()
      await page.getByRole('textbox', { name: 'Password...' }).fill('immerwieder')
      await page.getByRole('button', { name: 'login' }).click()

      const errorMessage = page.getByText('wrong username or password')

      await expect(errorMessage).toBeVisible()
      await expect(page.getByRole('textbox', { name: 'Username...' })).toBeVisible()
      await expect(page.getByRole('textbox', { name: 'Password...' })).toBeVisible()
      await expect(errorMessage).not.toBeVisible({ timeout: 6000 })
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'kevin90', 'sagichdirnicht')
      await expect(page.getByText('Kevin Ammerman logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Das ist ein test', 'Kevin', 'www.test.de')

      const successMessage = page.getByText('a new blog Das ist ein test by Kevin added')

      await expect(successMessage).toBeVisible()
      await expect(successMessage).toBeVisible({ timeout: 6000 })
      await expect(page.getByText('Das ist ein test').last()).toBeVisible()
      await expect(page.getByText('Kevin').last()).toBeVisible()
    })

    describe('When blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Das ist ein test für likes', 'Kevin', 'www.test.de')
      })
      test('Blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('1')).toBeVisible()
      })

      test('Blog can be deleted by user who created it', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await page.once('dialog', (dialog) => {
          dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Das ist ein test', { exact: true })).not.toBeVisible()
      })
    })

    describe('When different user is logged in', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Das ist ein zweiter test', 'Niemand', 'www.hallo.de')
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'hans70', 'sagichdirnicht')
      })

      test('Only user who added blog is able to see remove button', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })

    describe('With multiple blogs having different numbers of likes', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Das ist Blog Nummer 1', 'Ich', 'www.eins.de')
        await createBlog(page, 'Und dazu kommt noch dieser', 'Ich', 'www.zwei.de')
        await createBlog(page, 'warum nicht gleich noch einen', 'Ich', 'www.drei.de')
        await likeBlog(page, 'Das ist Blog Nummer 1', 8)
        await likeBlog(page, 'Und dazu kommt noch dieser', 5)
        await likeBlog(page, 'warum nicht gleich noch einen', 2)
      })

      test('Blog with most likes is first in order', async ({ page }) => {
        const blogElement = page
          .locator('.blog_header')
          .filter({ hasText: 'Das ist Blog Nummer 1' })
          .locator('..')
        const detailElement = blogElement.locator('.blog_detail')
        await blogElement.getByRole('button', { name: 'show' }).click()
        await expect(detailElement.getByText('8')).toBeVisible()
      })

      test('All blogs are in correct order', async ({ page }) => {
        const blogTitles = await page
          .locator('.blog_header')
          .getByTestId('blogTitle')
          .allTextContents()
        expect(blogTitles).toEqual([
          'Das ist Blog Nummer 1',
          'Und dazu kommt noch dieser',
          'warum nicht gleich noch einen',
        ])
      })
    })
  })
})
