import { Page } from '@playwright/test';

export type SignupDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class SignupPage {
  constructor(private readonly page: Page) {}

  get heading() {
    return this.page.getByRole('heading', { name: 'Create Account', exact: true });
  }

  get firstNameInput() {
    return this.page.locator('input[name="customer[first_name]"]');
  }

  get lastNameInput() {
    return this.page.locator('input[name="customer[last_name]"]');
  }

  get emailInput() {
    return this.page.locator('input[name="customer[email]"]');
  }

  get passwordInput() {
    return this.page.locator('input[name="customer[password]"]');
  }

  get createButton() {
    return this.page.getByRole('button', { name: 'Create', exact: true });
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  async fillRegistration(details: SignupDetails) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.passwordInput.fill(details.password);
  }

  async submit() {
    await this.createButton.click();
  }

  async registrationValuesMatch(details: SignupDetails): Promise<boolean> {
    return (await this.firstNameInput.inputValue()) === details.firstName
      && (await this.lastNameInput.inputValue()) === details.lastName
      && (await this.emailInput.inputValue()) === details.email
      && (await this.passwordInput.inputValue()) === details.password;
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




