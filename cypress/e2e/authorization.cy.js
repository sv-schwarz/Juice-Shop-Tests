import homePage from "../support/pages/HomePage.js";
import loginPage from "../support/pages/LoginPage.js";
import { closePopUps} from '../support/helper.js'
import user from "../fixtures/user.json"

it('Authorization', () => {
  homePage.visit();
  closePopUps();
  
  cy.log('Open the Login form');
  homePage.getAccountButton().click();
  homePage.getLoginButton().click();

  cy.log('Log in a user');
  loginPage.submitLoginForm(user.email, user.password);
});
