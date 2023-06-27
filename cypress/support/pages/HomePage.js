// const cypress = require("cypress");

class HomePage {
    visit() {
        cy.log('Open website page');
        cy.visit('https://juice-shop-sanitarskyi.herokuapp.com/#/');
    }

    closeWelcomeBanner() {
        return cy.contains('button', 'Dismiss');
    }

    getAccountButton() {
        return cy.contains('button', 'Account');
    }

    getLoginButton() {
        cy.log('Open Login form');
        return cy.contains('button', 'Login');
    }
}
export default new HomePage();