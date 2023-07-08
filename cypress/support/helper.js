import faker from 'faker';

export function login(user) {
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
};

export function addNewAddress() {
    cy.log('Add new address')
    cy.get('button[aria-label="Add a new address"]').click();

    const user = {
        country: faker.address.country(),
        name: faker.name.findName(),
        mobileNumber: faker.phone.phoneNumber('########'),
        ZIPcode: faker.address.zipCode('#####'),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state()
    };

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
    cy.get('span.mat-form-field-label-wrapper')
        .contains('Name')
        .parent()
        .parent()
        .parent()
        .find('input')
        .type(cardName);

    cy.get('span.mat-form-field-label-wrapper')
        .contains('Card Number')
        .parent()
        .parent()
        .parent()
        .find('input')
        .type(cardNumber);

    cy.contains('Expiry Month')
        .closest('div.mat-form-field-infix')
        .find('select')
        .select('4')

    cy.contains('Expiry Year')
        .closest('div.mat-form-field-infix')
        .find('select')
        .select('2080');

    cy.get('#submitButton').click();
}

export function selectAddressOrAddNew() {
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

export function searchItem(keyword) {
    cy.log('Search for a product');
    cy.get('mat-search-bar').click().within(() => {
        cy.get('input').type(keyword);
    });
}

export function closePopUps() {
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
}