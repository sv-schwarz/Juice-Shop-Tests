import { addNewAddress, addNewCard } from "../helper";

class OrderPage {
    login(user) {
      cy.log('Open website page');
      cy.visit('/');
  
      cy.log('Check and close Welcome banner');
      cy.get('app-welcome-banner').then(($welcomeBanner) => {
        if ($welcomeBanner.is(':visible')) {
          cy.get('button.close-dialog').click();
        } else {
          cy.contains('#navbarAccount').click();
        }
      });
  
      cy.log('Accept cookies')
      cy.get('div.cc-compliance a.cc-btn.cc-dismiss').click();
  
      cy.log('Open Login form');
      cy.get('#navbarAccount').click();
      cy.get('#navbarLoginButton').click();
  
      cy.log('Authorize user');
      cy.get('#email').type(user.email);
      cy.get('#password').type(user.password);
      cy.get('#loginButton').click();
    }
  
    searchItem(keyword) {
      cy.log('Search for a product');
      cy.get('mat-search-bar').click().within(() => {
        cy.get('input').type(keyword);
      });
    }
  
    addProductToCart() {
      cy.log('Add a product to the cart');
      cy.get('mat-card.mat-card')
        .filter((index, element) => {
          return !Cypress.$(element).find('div.ribbon.ribbon-sold.ng-star-inserted').length;
        })
        .first()
        .within(() => {
          cy.get('button[aria-label="Add to Basket"]').click();
        });
    }
  
    openCart() {
      cy.log('Open the cart');
      cy.get('button[aria-label="Show the shopping cart"]').click();
    }
  
    proceedToCheckout() {
      cy.log('Proceed checkout');
      cy.wait(2000);
      cy.get('#checkoutButton').click({ force: true });
    }
  
    selectAddressOrAddNew() {
      cy.log('Select an address or add a new one');
      cy.wait(2000);
      cy.get('app-address').then(($matCard) => {
        const table = $matCard.find('.mat-table.cdk-table.ng-star-inserted');
        if (table.length > 0) {
          cy.get('mat-radio-button.mat-radio-button').first().click();
        } else {
          addNewAddress();
          cy.get('mat-radio-button.mat-radio-button').first().click();
        }
      });
    }

    proceedToPaymentSelection() {
        cy.log('Proceed to payment selection');
        cy.get('button[aria-label="Proceed to payment selection"]').click();
      }
  
    chooseDeliverySpeed() {
      cy.log('Choose a delivery speed');
      cy.get('mat-radio-button.mat-accent').last().click();
      cy.get('button[aria-label="Proceed to delivery method selection"]').click();
    }
  
    selectCardOrAddNew() {
      cy.log('Select a card or add a new one');
      cy.wait(2000);
      cy.get('app-payment').within(() => {
        cy.get('mat-card').then(($matCard) => {
          const table = $matCard.find('.mat-table.cdk-table');
          if (table.length > 0) {
            cy.get('.mat-row').first().within(() => {
              cy.get('.mat-cell').first().within(() => {
                cy.get('.mat-radio-button').first().click();
              });
            });
          } else {
            addNewCard();
            cy.get('mat-radio-button').first().click();
          }
        });
      });
    }
  
    proceedToReview() {
      cy.log('Proceed to review');
      cy.get('button[aria-label="Proceed to review"]').click();
    }
  
    confirmOrder() {
      cy.log('Confirm order');
      cy.get('#checkoutButton').click();
      cy.contains('Order Summary').should('be.visible');
    }
  }
  
  export default OrderPage;
  