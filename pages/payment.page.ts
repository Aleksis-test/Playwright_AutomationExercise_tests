import { Page, Locator , expect } from "@playwright/test";
import { PaymentDetails } from "../types/payment.types";

export class Payment{
readonly page:Page;
readonly inputNameOnCard:Locator;
readonly inputCardNumber:Locator;
readonly textboxCVC:Locator;
readonly textboxMonth:Locator;
readonly inputYear:Locator;
readonly buttonToOrder:Locator
readonly confirmedMessage:Locator



constructor (page:Page) {
this.page=page
this.inputNameOnCard=page.locator('input[name="name_on_card"]')
this.inputCardNumber=page.locator('input[name="card_number"]')
this.textboxCVC=page.getByRole('textbox', { name: 'ex.' })
this.textboxMonth=page.getByRole('textbox', { name: 'MM' })
this.inputYear=page.locator('input[name="expiry_year"]' )
this.buttonToOrder=page.getByRole('button', { name: 'Pay and Confirm Order' })
this.confirmedMessage=page.getByText("Congratulations! Your order has been confirmed!")
}

async correctView(){
   await expect(this.inputNameOnCard).toBeVisible()
    await expect(this.inputCardNumber).toBeVisible()
    await expect(this.textboxCVC).toBeVisible()
    await expect(this.textboxMonth).toBeVisible()
    await expect(this.inputYear).toBeVisible()
    await expect(this.buttonToOrder).toBeVisible()
}

async sendOrder(){
    await this.buttonToOrder.click()
}
async messageValidationNameOnCard(){
    
    const message = await this.inputNameOnCard.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(message).not.toBe("")
}
async messageValidationCardNumber(){
    
    const message = await this.inputCardNumber.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(message).not.toBe("")
}
async messageValidationCVC(){
    
    const message = await this.textboxCVC.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(message).not.toBe("")
}
async messageValidationMonth(){
    
    const message = await this.textboxMonth.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(message).not.toBe("")
}
async messageValidationYear(){
    
    const message = await this.inputYear.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(message).not.toBe("")
}

async fillNameOnCard(PaymentDetails:PaymentDetails){
    await this.inputNameOnCard.fill(PaymentDetails.nameCard)
}
async fillCardNumber(PaymentDetails:PaymentDetails){
    await this.inputCardNumber.fill(PaymentDetails.numberCard)
}
async fillCVC(PaymentDetails:PaymentDetails){
    await this.textboxCVC.fill(PaymentDetails.cvcCard)
}
async fillMonth(PaymentDetails:PaymentDetails){
    await this.textboxMonth.fill(PaymentDetails.monthCard)
}
async fillYear(PaymentDetails:PaymentDetails){
    await this.inputYear.fill(PaymentDetails.yearCard)
}

async fillFormwithoutCardNumber(PaymentDetails:PaymentDetails){
    await this.fillNameOnCard(PaymentDetails)
    await this.fillCVC(PaymentDetails)
    await this.fillMonth(PaymentDetails)
    await this.fillYear(PaymentDetails)
}
async fillFormwithoutCVC(PaymentDetails:PaymentDetails){
    await this.fillNameOnCard(PaymentDetails)
    await this.fillCardNumber(PaymentDetails)
    await this.fillMonth(PaymentDetails)
    await this.fillYear(PaymentDetails)
}
async fillFormwithoutMonth(PaymentDetails:PaymentDetails){
    await this.fillNameOnCard(PaymentDetails)
    await this.fillCardNumber(PaymentDetails)
    await this.fillCVC(PaymentDetails)
    await this.fillYear(PaymentDetails)
}
async fillFormwithoutYear(PaymentDetails:PaymentDetails){
    await this.fillNameOnCard(PaymentDetails)
    await this.fillCardNumber(PaymentDetails)
    await this.fillCVC(PaymentDetails)
    await this.fillMonth(PaymentDetails)
}

async fillAllForm(PaymentDetails:PaymentDetails){
    await this.fillNameOnCard(PaymentDetails)
    await this.fillCardNumber(PaymentDetails)
    await this.fillCVC(PaymentDetails)
    await this.fillMonth(PaymentDetails)
    await this.fillYear(PaymentDetails)
}

async orderConfirmedMessageVisible() {
  await expect(this.confirmedMessage).toBeVisible();
}


}