import homePage from "../support/pages/HomePage.js";
import loginPage from "../support/pages/LoginPage.js";
import user from '../fixtures/user.json'
import { closePopUps } from '../support/helper.js'

it('Authorization', () => {
  homePage.visit();

  cy.log('Check and close Welcome banner');
  cy.get('app-welcome-banner').then(($welcomeBanner) => {
    if ($welcomeBanner.is(':visible')) {
      homePage.closeWelcomeBanner().click();
    } else {
      homePage.getAccountButton().click();
    }
  });

  cy.log('Accept cookies')
  cy.get('.cc-btn cc-dismiss').click();

  cy.log('Open the Login form');
  homePage.getAccountButton().click();
  homePage.getLoginButton().click();

  cy.log('Log in a user');
  loginPage.submitLoginForm(user.email, user.password);
});
