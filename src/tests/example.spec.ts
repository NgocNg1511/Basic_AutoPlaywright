import { test, expect } from '../fixtures/base.fixture';

test('example page opens', async ({ page, basePage }) => {
  await basePage.open('/');
  await expect(page).toHaveURL(/127\.0\.0\.1:3000/);
});
