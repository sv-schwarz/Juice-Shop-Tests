import faker from 'faker';

export function login(user) {
    cy.log('Open website page');
    cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');

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
};

export function addNewAddress(user) {
    cy.log('Add new address')
    cy.get('button[aria-label="Add a new address"]').click();

    user.country = faker.address.country(),
        user.name = faker.name.findName(),
        user.mobileNumber = faker.phone.phoneNumber('########'),
        user.ZIPcode = faker.address.zipCode('#####'),
        user.address = faker.address.streetAddress(),
        user.city = faker.address.city(),
        user.state = faker.address.state()

    cy.get('input[placeholder="Please provide a country."]').type(user.country);
    cy.get('input[placeholder="Please provide a name."]').type(user.name);
    cy.get('input[placeholder="Please provide a mobile number."]').type(user.mobileNumber);
    cy.get('input[placeholder="Please provide a ZIP code."]').type(user.ZIPcode);
    cy.get('textarea[id="address"]').type(user.address);
    cy.get('input[placeholder="Please provide a city."]').type(user.city);
    cy.get('input[placeholder="Please provide a state."]').type(user.state);
    cy.get('#submitButton').click({ force: true });
};

export function addNewCard() {
    cy.log('Add new card')

    const cardName = faker.finance.accountName(),
        cardNumber = faker.finance.creditCardNumber('63[7-9]############L')

    cy.get('mat-expansion-panel-header[id="mat-expansion-panel-header-0"]').click();
    cy.get('input[id="mat-input-3"]').type(cardName);
    cy.get('input[id="mat-input-4"]').type(cardNumber);
    cy.get('select[id="mat-input-5"]').select('2');
    cy.get('select[id="mat-input-6"]').select('2080');
    cy.get('#submitButton').click();
}

export function selectAddressOrAddNewOne() {
    cy.log('Select an address or add a new one');
    cy.wait(2000);
    cy.get('mat-card').then(($matCard) => {
        const table = $matCard.find('.mat-table.cdk-table.ng-star-inserted');
        if (table.length > 0) {
            cy.get('mat-radio-button.mat-radio-button').first().click();
        } else {
            addNewAddress();
            cy.get('mat-radio-button.mat-radio-button').first().click();
        }
    });
    cy.get('button[aria-label="Proceed to payment selection"]').click();
}

export function selectCardOrAddNew() {
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
    cy.get('button[aria-label="Proceed to review"]').click();
  }
  
  
  