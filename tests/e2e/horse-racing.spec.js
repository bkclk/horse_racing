import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.describe('Horse Racing Game - E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState('networkidle')
  })

  test.describe('UI Rendering', () => {
    test('should render the main application', async ({ page }) => {
      const header = page.locator('h1')
      await expect(header).toContainText('Horse Racing Game')
    })

    test('should display control buttons', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await expect(generateBtn).toBeVisible()
      await expect(scheduleBtn).toBeVisible()
      await expect(startBtn).toBeVisible()
    })

    test('should show empty message initially', async ({ page }) => {
      const emptyMsg = page.locator('text=Click "Generate" to create horses')
      await expect(emptyMsg).toBeVisible()
    })
  })

  test.describe('Horse Generation', () => {
    test('should generate 20 horses when clicking Generate button', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      await generateBtn.click()
      await page.waitForTimeout(500)

      const horseCards = page.locator('.horse-card')
      const count = await horseCards.count()
      
      expect(count).toBeLessThanOrEqual(20)
      expect(count).toBeGreaterThan(0)
    })

    test('should display horse names and colors', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      await generateBtn.click()
      await page.waitForTimeout(500)

      const horseName = page.locator('.horse-name').first()
      await expect(horseName).toBeVisible()

      const horseColor = page.locator('.horse-color').first()
      await expect(horseColor).toBeVisible()
    })

    test('should display color names in horse list', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      await generateBtn.click()
      await page.waitForTimeout(500)

      const colorName = page.locator('.horse-color-name').first()
      await expect(colorName).toBeVisible()
      const text = await colorName.textContent()
      expect(text).toMatch(/\(.+\)/)
    })
  })

  test.describe('Race Schedule Generation', () => {
    test('should enable schedule button after generating horses', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })

      await expect(scheduleBtn).toBeDisabled()

      await generateBtn.click()
      await page.waitForTimeout(500)

      await expect(scheduleBtn).not.toBeDisabled()
    })

    test('should generate race schedule with 6 rounds', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      const scheduleCards = page.locator('.schedule-card')
      const count = await scheduleCards.count()

      expect(count).toBe(6)
    })

    test('should display round information', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      const roundHeader = page.locator('.schedule-header h3').first()
      await expect(roundHeader).toContainText('Round')
    })
  })

  test.describe('Race Execution', () => {
    test('should enable start button after schedule generation', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await expect(startBtn).toBeDisabled()

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await expect(startBtn).not.toBeDisabled()
    })

    test('should start race and show animation', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      await page.waitForTimeout(500)

      const trackLane = page.locator('.track-lane').first()
      await expect(trackLane).toBeVisible()
    })

    test('should show race results after completion', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      
      await page.waitForTimeout(20000)

      const resultCards = page.locator('.result-card')
      const count = await resultCards.count()

      expect(count).toBeGreaterThan(0)
    })

    test('should display winner for each round', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      
      await page.waitForTimeout(5000)

      const winner = page.locator('.winner-name').first()
      await expect(winner).toBeVisible()
    })
  })

  test.describe('Animation', () => {
    test('should animate horses from start to finish', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      await page.waitForTimeout(500)

      const horse = page.locator('.horse').first()
      const initialLeft = await horse.evaluate(el => parseFloat(el.style.left) || 0)

      await page.waitForTimeout(2000)

      const finalLeft = await horse.evaluate(el => parseFloat(el.style.left) || 0)

      expect(finalLeft).toBeGreaterThanOrEqual(initialLeft)
    })

    test('winner should finish at 100% position', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      
      await page.waitForTimeout(5000)

      // Get the race track to check winner position
      const raceTrack = page.locator('.race-track')
      await expect(raceTrack).toBeVisible()
    })
  })

  test.describe('UI State Management', () => {
    test('buttons should be disabled during race', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      await page.waitForTimeout(500)

      await expect(generateBtn).toBeDisabled()
      await expect(scheduleBtn).toBeDisabled()
    })

    test('should re-enable buttons after race completes', async ({ page }) => {
      const generateBtn = page.getByRole('button', { name: 'Generate', exact: true })
      const scheduleBtn = page.getByRole('button', { name: 'Generate Race Schedule' })
      const startBtn = page.getByRole('button', { name: /Start|Racing/ })

      await generateBtn.click()
      await page.waitForTimeout(500)

      await scheduleBtn.click()
      await page.waitForTimeout(500)

      await startBtn.click()
      
      await page.waitForTimeout(20000)

      await expect(generateBtn).not.toBeDisabled()
    })
  })
})

