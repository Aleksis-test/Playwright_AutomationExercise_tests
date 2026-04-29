import { Locator, Page } from "@playwright/test";
import { User } from "../types/user.types";


export class AccountInfoPage {
  readonly page: Page;

  // account info
  readonly titleMrRadio: Locator;
  readonly titleMrsRadio: Locator;
  readonly passwordInput: Locator;

  // date of birth
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;

  // checkboxes
  readonly newsletterCheckbox: Locator;
  readonly offersCheckbox: Locator;

  // address info
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;

  // button
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // account info
    this.titleMrRadio = page.getByRole("radio", { name: "Mr." });
    this.titleMrsRadio = page.getByRole("radio", { name: "Mrs." });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' })

    // date of birth
    this.daysSelect = page.locator("#days");
    this.monthsSelect = page.locator("#months");
    this.yearsSelect = page.locator("#years");

    // checkboxes
    this.newsletterCheckbox = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
    this.offersCheckbox = page.getByRole('checkbox', { name: 'Receive special offers from' })

    // address info
    this.firstNameInput = page.getByRole('textbox', { name: 'First name *' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name *' })
    this.companyInput = page.getByRole('textbox', { name: 'Company', exact: true })
    this.address1Input = page.getByRole('textbox', { name: 'Address * (Street address, P.' })
    this.address2Input = page.getByRole('textbox', { name: 'Address 2' })
    this.countrySelect = page.getByLabel("Country");
    this.stateInput = page.getByRole('textbox', { name: 'State *' })
    this.cityInput = page.getByRole('textbox', { name: 'City * Zipcode *' })
    this.zipcodeInput = page.locator('#zipcode')
    this.mobileNumberInput = page.getByRole('textbox', { name: 'Mobile Number *' })

    // button
    this.createAccountButton = page.getByRole("button", { name: "Create Account" });
  }
  async clickCreateButton() {
  await this.createAccountButton.click();
}

// enter account information methods

async selectMrs() {
  await this.titleMrsRadio.check();
}

async fillPassword(user:User) {
  await this.passwordInput.fill(user.password);
}

async selectDayOfBirth(user:User) {
  await this.daysSelect.selectOption(user.day);
}

async selectMonthOfBirth(user:User) {
  await this.monthsSelect.selectOption(user.month);
}

async selectYearOfBirth(user:User) {
  await this.yearsSelect.selectOption(user.year);
}

async selectDateOfBirth(user:User) {
  await this.selectDayOfBirth(user);
  await this.selectMonthOfBirth(user);
  await this.selectYearOfBirth(user);
}

async checkOptionalCheckboxes() {
  await this.newsletterCheckbox.check();
  await this.offersCheckbox.check();
}

async fillAccountInformation(user:User) {
  await this.selectMrs();
  await this.fillPassword(user);
  await this.selectDateOfBirth(user);
  await this.checkOptionalCheckboxes();
}

// address information methods

async fillFirstName(user:User){
  await this.firstNameInput.fill(user.firstName)
}
async fillLastName(user:User){
await this.lastNameInput.fill(user.lastName)
}
async fillCompany(user:User){
await this.companyInput.fill(user.company)
}
async fillAddress1(user:User){
await this.address1Input.fill(user.address1)
}
async fillAddress2(user:User){
await this.address2Input.fill(user.address2)
}

async selectCountry(user:User){
await this.countrySelect.selectOption({ label: user.country })
}
async fillState(user:User){
await this.stateInput.fill(user.state)
}
async fillCity(user:User){
await this.cityInput.fill(user.city)
}
async fillZipcode(user:User){
await this.zipcodeInput.fill(user.zipcode)
}
async fillMobileNumber(user:User){
await this.mobileNumberInput.fill(user.mobileNumber)
}

async fillAddressInformation(user:User){
  await this.fillFirstName(user)
  await this.fillLastName(user)
  await this.fillCompany(user)
  await this.fillAddress1(user)
  await this.fillAddress2(user)
  await this.selectCountry(user)
  await this.fillState(user)
  await this.fillCity(user)
  await this.fillZipcode(user)
  await this.fillMobileNumber(user)
} 
}