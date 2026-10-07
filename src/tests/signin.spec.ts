import { test, expect } from '../fixtures/base.fixture';
import { SigninPage } from '../pages/signin.page';

const signupUrl = process.env.SIGNUP_URL;

test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test.describe('Sauce Demo signin', () => {
  test('signs in with credentials from the environment', async ({ page }) => {
    test.setTimeout(60_000);

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!signupUrl || !email || !password) {
      throw new Error('Set SIGNUP_URL, EMAIL, and PASSWORD in the .env file before running signin.');
    }

    const signinPage = new SigninPage(page);
    const signinUrl = new URL('/account/login', signupUrl).toString();
    await signinPage.open(signinUrl);
    await expect(page).toHaveURL(/\/account\/login\/?$/);
    await expect(signinPage.heading).toBeVisible();

    try {
      await test.step('Fill signin fields using the environment credentials', async () => {
        await signinPage.fillCredentials(email, password);
        await expect(
          await signinPage.credentialsMatch(email, password),
          'Signin form contains the configured email and password values',
        ).toBe(true);
        await expect(signinPage.signinButton).toBeEnabled();
        await signinPage.submit();
      });
    } catch (error) {
      await signinPage.clearSensitiveFields();
      throw error;
    }

    await expect(signinPage.accountDetailsHeading).toBeVisible({ timeout: 60_000 });
  });
});
