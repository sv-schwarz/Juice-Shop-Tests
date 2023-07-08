import faker from 'faker';
import { closePopUps } from '../support/helper';
import ContactPage from '../support/pages/ContactPage';

const testMessage = faker.lorem.sentence();
const contactPage = new ContactPage();

it('should fill out the contact form', () => {
    contactPage.visit();
    closePopUps();

    cy.log('Write a comment');
    contactPage.commentField().type(testMessage);

    cy.log('Rate');
    const desiredRating = 4;
    contactPage.setRating(desiredRating);

    cy.log('Resolve CAPTCHA');
    contactPage.solveCaptcha();

    cy.log('Submit');
    contactPage.submitForm();

    contactPage.feedbackConfirmation();
});
