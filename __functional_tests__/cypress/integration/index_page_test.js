describe('Test Index Page', () => {
    it('Displays message', () => {
        cy.visit("/");

        cy.title().should('eq', 'Next.js!!!');

        cy.getByTestId("message")
            .should(($div) => {
                expect($div).to.have.length(1)
                expect($div[0]).to.have.text('Welcome to Next.js!!!')
            });
    });
});