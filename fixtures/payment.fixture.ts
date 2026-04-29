import{test as base,expect} from '@playwright/test';
import { CartPage } from '../pages/cart.page';

type OrderFixture = {
  orderReadyToPayment: CartPage;
};

export const test = base.extend<OrderFixture>({
    orderReadyToPayment: async({page},use)=>{
        const cartPage = new CartPage(page)
        await page.goto("/");
        await cartPage.goToOrder()
        await page.getByRole('link', { name: 'Place Order' }).click()
        await expect(page.getByRole('heading', {name:"Payment"})).toBeVisible()
        await use(cartPage);
    }
})
export { expect };