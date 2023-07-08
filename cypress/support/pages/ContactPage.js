class ContactPage {
    visit() {
        cy.visit('http://juice-shop-sanitarskyi.herokuapp.com/#/contact');
    }

    commentField() {
        return cy.get('textarea[aria-label="Field for entering the comment or the feedback"]');
    }

    setRating() {
        cy.get('div.rating-container mat-slider#rating').click().type('{rightArrow}')
    }

    solveCaptcha() {
        cy.get('code[aria-label="CAPTCHA code which must be solved"]').then(($captcha) => {
            const captchaText = $captcha.text().trim();
            const captchaResult = eval(captchaText);

            cy.get('input[aria-label="Field for the result of the CAPTCHA code"]')
                .type(captchaResult)
                .should('have.value', captchaResult.toString());
        });
    }

    submitForm() {
        cy.wait(2000);
        cy.get('#submitButton').should('be.visible').click();
    }

    feedbackConfirmation() {
        cy.get('mat-slider#rating').invoke('attr', 'aria-valuenow').then(rating => {
            rating = parseInt(rating);
            if (rating === 5) {
                cy.contains('Thank you so much for your amazing 5-star feedback!').should('be.visible');
            } else {
                cy.contains('Thank you for your feedback.').should('be.visible');
            }
        });
    }
}

export default ContactPage;
