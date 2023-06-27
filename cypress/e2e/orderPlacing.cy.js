import user from '../fixtures/user.json'
import { login, selectAddressOrAddNewOne, selectCardOrAddNew, searchItem } from '../support/helper';

it('Make an order', () => {

  login(user);

  searchItem('juice');

  cy.log('Add a product to the cart')
  cy.get('mat-card.mat-card')
  .filter((index, element) => {
    return !Cypress.$(element).find('div.ribbon.ribbon-sold.ng-star-inserted').length;
  })
  .first()
  .within(() => {
    cy.get('button[aria-label="Add to Basket"]').click();
  });

  cy.log('Open the cart')
  cy.get('button[aria-label="Show the shopping cart"]').click();

  cy.log('Proceed checkout')
  cy.wait(2000)
  cy.get('#checkoutButton').click({ force: true });

  selectAddressOrAddNewOne();

  cy.log('Choose a delivery speed')
  cy.get('mat-radio-button.mat-accent').last().click();
  cy.get('button[aria-label="Proceed to delivery method selection"]').click();

  selectCardOrAddNew();

  cy.log('Confirm order')
  cy.get('#checkoutButton').click();
  cy.contains('Order Summary').should('be.visible');
});
