import { randomUUID } from 'node:crypto';
import { test, expect } from '../fixtures/base.fixture';
import { SignupPage } from '../pages/signup.page';
import { nextSignupEmail } from '../utils/test-data';

const signupUrl = process.env.SIGNUP_URL;

test.use({ trace: 'off', screenshot: 'off', video: 'off' });

test.describe('Sauce Demo signup', () => {
  test('creates a customer account with valid details', async ({ page }) => {
    const baseEmail = process.env.EMAIL;
    const password = process.env.PASSWORD;
    if (!signupUrl || !baseEmail || !password) {
      throw new Error('Set SIGNUP_URL, EMAIL, and PASSWORD in the .env file before running signup.');
    }

    const signupPage = new SignupPage(page);
    const details = {
      firstName: 'Automation',
      lastName: 'Tester',
      email: await nextSignupEmail(baseEmail),
      password,
    };

    await signupPage.open(signupUrl);
    await expect(page).toHaveURL(/\/account\/register\/?$/);
    await expect(signupPage.heading).toBeVisible();

    try {
      await test.step('Fill signup fields using the environment credentials', async () => {
        await signupPage.fillRegistration(details);
        await expect(
          await signupPage.registrationValuesMatch(details),
          'Signup form contains the configured email and password values',
        ).toBe(true);
        await expect(signupPage.createButton).toBeEnabled();
        await signupPage.submit();
      });
    } catch (error) {
      await signupPage.clearSensitiveFields();
      throw error;
    }

    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/');
  });
});

