import { test, expect } from '@playwright/experimental-ct-vue'
import TheUniverzity from '../src/components/TheUniverzity.vue'

const univerzity = [
  {
    country: 'C1',
    web_pages: ['W1'],
    name: 'N1'
  },
  {
    country: 'C2',
    web_pages: ['W2'],
    name: 'N2'
  },
  {
    country: 'C3',
    web_pages: ['W3'],
    name: 'N3'
  }
]

test.use({ viewport: { width: 500, height: 500 } })

test.describe('Otestuj formular na hladanie univerzit', () => {
  test('Otestuj, ci sa na stranke nachadza Nadpis', async ({ mount }) => {
    const component = await mount(TheUniverzity)
    const nadpisH3 = await component.getByTestId('nadpis')
    await expect(nadpisH3).toContainText('Univerzity na Slovensku')
  })
  test('Otestuj, ze textove pole obsahuje text "Zadaj univerzitu"', async ({ mount }) => {
    const component = await mount(TheUniverzity)
    const textovePole = await component.getByTestId('formular-input')
    await expect(textovePole).toHaveAttribute('placeholder', 'Zadaj univerzitu')
  })
  test('Otestuj, ze sa do textoveho pola da zadat nazov univerzity', async ({ mount }) => {
    const component = await mount(TheUniverzity)
    const textovePole = await component.getByTestId('formular-input')
    await textovePole.fill('Univerzita Komenskeho')
    await expect(textovePole).toHaveValue('Univerzita Komenskeho')
  })
  test('Otestuj, ze tlacidlo je zelenej farby', async ({ mount }) => {
    const component = await mount(TheUniverzity)
    const tlacidlo = await component.getByTestId('formular-btn')
    const farbaTlacidlo = await tlacidlo.evaluate((tl) => {
      return window.getComputedStyle(tl).backgroundColor
    })
    expect(farbaTlacidlo).toBe('rgb(76, 175, 80)')
  })
  test('Otestuj, tlacidlo Odoslat', async ({ mount, page }) => {
    await page.route('**/search?country=slovakia', (route) => {
      const json = [univerzity][0]
      route.fulfill({ status: 200, body: JSON.stringify(json) })
    })
    const component = await mount(TheUniverzity)
    const tlacidloOdoslat = await component.getByTestId('formular-btn')
    const textovePole = await component.getByTestId('formular-input')
    await textovePole.fill('N1')
    await tlacidloOdoslat.click()
    await expect(page.locator('[data-test-id="N1"]')).toHaveText('N1')
  })
})
