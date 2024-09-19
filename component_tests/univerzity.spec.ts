import { test, expect } from '@playwright/experimental-ct-vue'
import TheUniverzity from '../src/components/TheUniverzity.vue'

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
})
