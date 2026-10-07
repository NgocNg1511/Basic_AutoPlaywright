import { test as base } from '@playwright/test';
import { BasePage } from '../pages/base.page';

type AppFixtures = {
  basePage: BasePage;
};

export const test = base.extend<AppFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

export { expect } from '@playwright/test';
