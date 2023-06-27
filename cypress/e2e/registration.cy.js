import { faker } from '@faker-js/faker';
import user from '../fixtures/user.json';
import homePage from '../support/pages/HomePage.js';
import loginPage from '../support/pages/LoginPage.js';

user.email = faker.internet.email();
user.password = faker.internet.password({ length: 10 });
user.answer = faker.lorem.sentence({ max: 5 });

it('should register a new user', () => {
  homePage.visit();

  cy.get('app-welcome-banner').then(($welcomeBanner) => {
    if ($welcomeBanner.is(':visible')) {
      homePage.closeWelcomeBanner().click();
    } else {
      homePage.getAccountButton().click();
    }
  });

  homePage.getAccountButton().click();
  homePage.getLoginButton().click();
  loginPage.navigateToRegistrationPage();
  loginPage.fillRegistrationForm(user.email, user.password, user.password, user.answer);
});
