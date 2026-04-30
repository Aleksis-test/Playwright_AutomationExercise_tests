import { test, expect } from "../../fixtures/payment.fixture";
import { Payment } from "../../pages/payment.page";
import { PaymentDetails } from "../../types/payment.types";

let payment:Payment
const validPaymentData: PaymentDetails = {
  nameCard: "Card Name",
  numberCard: "123123123123",
  cvcCard: "123",
  monthCard: "10",
  yearCard: "2050",
};
test.beforeEach(async({page, orderReadyToPayment})=>{
    payment=new Payment(page)
  
})

test("PAY_001 Widoczność pól formularza płatności", async ({ orderReadyToPayment}) => {
 await payment.correctView()
});
test('PAY_002 Wysłanie pustego formularza', async({ orderReadyToPayment})=>{
await payment.sendOrder()
await payment.messageValidationNameOnCard()
})
test('PAY_003 Wysłanie formularza bez numeru karty', async({ orderReadyToPayment})=>{
    await payment.fillFormwithoutCardNumber(validPaymentData)
    await payment.sendOrder()
    await payment.messageValidationCardNumber();
})
test('PAY_004 Wysłanie formularza bez CVC', async({ orderReadyToPayment})=>{
    await payment.fillFormwithoutCVC(validPaymentData)
    await payment.sendOrder()
    await payment.messageValidationCVC();
})
test('PAY_005 Wysłanie formularza bez podania miesiąca', async({ orderReadyToPayment})=>{
    await payment.fillFormwithoutMonth(validPaymentData)
    await payment.sendOrder()
    await payment.messageValidationMonth();
})
test('PAY_006 Wysłanie formularza bez podania roku', async({ orderReadyToPayment})=>{
    await payment.fillFormwithoutYear(validPaymentData)
    await payment.sendOrder()
    await payment.messageValidationYear();
})
test('PAY_007 Wysłanie poprawinie wypełnionego formularza', async({ orderReadyToPayment})=>{
    await payment.fillAllForm(validPaymentData)
    await payment.sendOrder()
  await payment.orderConfirmedMessageVisible()

})
test("PAY_008 Formularz płatności akceptuje niepoprawne dane @bug", async () => {
  await payment.fillAllForm({
    nameCard: "Test User",
    numberCard: "ABCD@@@@",
    cvcCard: "ABC",
    monthCard: "99",
    yearCard: "2020",
  });
  await payment.sendOrder();
  await payment.orderConfirmedMessageVisible();
// BUG: Formularz płatności akceptuje:
// litery w numerze karty, liter w cvc, nieisniejący miesiąc, przestarzały rok karty.
// Expected: formularz powinien zablokować wysłanie.
// Actual: zamówienie zostaje potwierdzone.
});

test("PAY_009 Pobranie faktury po złożeniu zamówienia", async ({ page, orderReadyToPayment }) => {
  await payment.fillAllForm(validPaymentData);
  await payment.sendOrder();
  await payment.orderConfirmedMessageVisible();

  const downloadPromise = page.waitForEvent("download");

  await page.getByRole("link", { name: "Download Invoice" }).click();

  const download = await downloadPromise;

  expect(download.suggestedFilename()).toContain("invoice");
});
