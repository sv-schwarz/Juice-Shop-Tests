// const cypress = require("cypress");

class LoginPage {

    getEmailField() {
        return cy.get('#email');
    }

    getPasswordField() {
        return cy.get('#password');
    }

    getLogInButton() {
        return cy.get('#loginButton');
    }

    submitLoginForm(email, password) {
        cy.log(`Auth user with username: ${email}, and pass: ${password}`);

        this.getEmailField().click().type(email);
        this.getPasswordField().click().type(password);
        this.getLogInButton().click();
    }

    navigateToRegistrationPage() {
        cy.log('Open registration form');
        return cy.get('a.primary-link[href="#/register"]').click();
    }

    fillRegistrationForm(email, password, repeatPassword, answer) {
        cy.get('#emailControl').type(email);
        cy.get('#passwordControl').type(password);
        cy.get('#repeatPasswordControl').type(repeatPassword);
        cy.get('.mat-form-field-flex mat-select[name="securityQuestion"]').click();
        cy.get('#mat-select-2-panel')
            .scrollTo('bottom')
            .then(() => {
                cy.get('#mat-option-13').click();
            });
        cy.get('#securityAnswerControl').type(answer);
        cy.get('#registerButton').click();
    }
}
export default new LoginPage();
