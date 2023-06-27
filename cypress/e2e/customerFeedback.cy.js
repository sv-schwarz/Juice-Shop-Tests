import faker from 'faker';
import { closePopUps } from '../support/helper';

const testMessage = faker.lorem.sentence();

it('should fill out the contact form', () => {
    cy.visit('http://juice-shop-sanitarskyi.herokuapp.com/#/contact')
    closePopUps();

    cy.log('Write a comment');
    cy.get('textarea[aria-label="Field for entering the comment or the feedback"]')
    .type(testMessage);

    cy.log('Rate');
    cy.get('mat-slider[aria-label="Slider for selecting the star rating"]').click().then(($slider) => {
        const desiredRating = 4;
        const position = (desiredRating - 3) * 25;
        $slider.attr('aria-valuenow', desiredRating);
        $slider.find('.mat-slider-track-fill').css('transform', `translateX(${position}%)`);
        $slider.find('.mat-slider-thumb-container').css('transform', `translateX(-${position}%)`);
        $slider.trigger('input');
    });

    cy.log('Resolve CAPTCHA');
    cy.get('code[aria-label="CAPTCHA code which must be solved"]').then(($captcha) => {
        const captchaText = $captcha.text().trim();
        const captchaResult = eval(captchaText);

        cy.get('input[aria-label="Field for the result of the CAPTCHA code"]')
            .type(captchaResult)
            .should('have.value', captchaResult.toString()); 
    });

    cy.log('Submit');
    cy.wait(3000);
    cy.get('#submitButton').should('be.visible').click()
    cy.contains('Thank you for your feedback.').should('be.visible')

});

