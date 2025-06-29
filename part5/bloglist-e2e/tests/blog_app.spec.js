const { test, expect, beforeEach, describe } = require('@playwright/test')

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
})
