import user from '../fixtures/user.json'
import { login, addNewAddress, addNewCard, searchItem } from '../support/helper';
import OrderPage from '../support/pages/OrderPage'

it('Make an order', () => {
  login(user);

  const orderPage = new OrderPage();
  orderPage.searchItem('juice');
  orderPage.addProductToCart();
  orderPage.openCart();
  orderPage.proceedToCheckout();
  orderPage.selectAddressOrAddNew();
  orderPage.proceedToPaymentSelection();
  orderPage.chooseDeliverySpeed();
  orderPage.selectCardOrAddNew();
  orderPage.proceedToReview();
  orderPage.confirmOrder();
});