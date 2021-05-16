cy.myFunctions = {
    createCustomerApiUrlMatcher: () => {
        return Cypress.env('CUSTOMER_API_BASE_URL') + '/*';
    }
}