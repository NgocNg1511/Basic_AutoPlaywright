import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async open(path = '/') {
    await this.page.goto(path);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/.+/);
  }
}
