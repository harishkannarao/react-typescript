describe('Test New Customer Page', () => {
    it('navigates links correctly', () => {
        cy.visit("/customers/new/");
        cy.getByTestId("home-link").click();
        cy.title().should('eq', 'Next.js!!!');

        cy.visit("/customers/new/");
        cy.getByTestId("list-customers-link").click();
        cy.title().should('eq', 'List - Customers');

        cy.visit("/customers/new/");
        cy.getByTestId("cancel-button").click();
        cy.title().should('eq', 'List - Customers');
    });

    it('displays title', () => {
        cy.visit("/customers/new/");
        cy.title().should('eq', 'New - Customers');
    });

    it('creates new customer', () => {
        cy.intercept('POST', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers', (req) => {
            req.alias = 'createCustomer';
            req.reply(
                {
                    statusCode: 200,
                    delay: 500,
                    body: null
                }
            );
        });

        cy.intercept('GET', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 200,
                delay: 0,
                body: []
            }
        )

        cy.visit("/customers/new/");

        cy.getByTestId("first-name").clear().type('test-first-name');
        cy.getByTestId("last-name").clear().type('test-last-name');
        cy.getByTestId("submit-button").click();

        cy.getByTestId("submitting-content").should('exist');

        cy.wait('@createCustomer').then((interception) => {
            var reqJson = interception.request.body;
            expect(reqJson.firstName).to.equal('test-first-name');
            expect(reqJson.lastName).to.equal('test-last-name');
        });

        cy.title().should('eq', 'List - Customers');
    });

    it('displays error from api', () => {
        cy.intercept('POST', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 500,
                delay: 500,
                body: {'message': 'unit-test-error'}
            }
        );

        cy.visit("/customers/new/");
        cy.getByTestId("submit-button").click();

        cy.getByTestId("submitting-content").should('exist');
        cy.getByTestId("submitting-content").should('not.exist');

        cy.getByTestId("error-content").should('contain', 'unit-test-error');
        cy.getByTestId("error-content").should('contain', 'Internal Server Error');
    });
});