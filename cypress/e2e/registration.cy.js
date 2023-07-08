import { faker } from '@faker-js/faker';
import homePage from '../support/pages/HomePage.js';
import loginPage from '../support/pages/LoginPage.js';
import { closePopUps } from '../support/helper';

it('should register a new user', () => {
  homePage.visit();
  closePopUps()

  const user = {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    answer: faker.lorem.sentence({ max: 5 }),
  };

  homePage.getAccountButton().click();
  homePage.getLoginButton().click();
  loginPage.navigateToRegistrationPage();
  loginPage.fillRegistrationForm(user.email, user.password, user.password, user.answer);

  cy.writeFile('cypress/fixtures/user.json', user);
});
