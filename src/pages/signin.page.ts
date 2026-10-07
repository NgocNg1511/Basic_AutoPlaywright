import { Page } from '@playwright/test';

export class SigninPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Customer Login', exact: true });
  }

  get accountDetailsHeading() {
    return this.page.getByRole('heading', { name: 'Account Details and Order History', exact: true, level: 1 });
  }

  get emailInput() {
    return this.page.locator('input[name="customer[email]"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="customer[password]"]');
  }

  get signinButton() {
    return this.page.getByRole('button', { name: 'Sign In', exact: true });
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signinButton.click();
  }

  async credentialsMatch(email: string, password: string): Promise<boolean> {
    return (await this.emailInput.inputValue()) === email
      && (await this.passwordInput.inputValue()) === password;
  }

  async clearSensitiveFields() {
    if (await this.emailInput.count()) {
      await this.emailInput.fill('');
    }
    if (await this.passwordInput.count()) {
      await this.passwordInput.fill('');
    }
  }


}



