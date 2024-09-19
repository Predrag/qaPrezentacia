import { test, expect } from '@playwright/experimental-ct-vue'
import TheInput from '../src/components/TheInput.vue'

test.use({ viewport: { width: 500, height: 500 } })

test.describe('Otestuj formular na hladanie mien', () => {
  test('Najdi nadpis', async ({ mount }) => {
    const component = await mount(TheInput)
    const nadpisH3 = await component.locator('h3')
    await expect(nadpisH3).toContainText('Nájdi svoje meno v zozname')
  })
})
