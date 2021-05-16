describe('Test Customer List Page', () => {
    it('Displays data from api', () => {
        cy.intercept(Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 200,
                delay: 0,
                body: [
                    {
                        id: 1,
                        firstName: 'test-first-name-1',
                        lastName: 'test-last-name-1'
                    },
                    {
                        id: 2,
                        firstName: 'test-first-name-2',
                        lastName: 'test-last-name-2'
                    }
                ]
            }
        )

        cy.visit("/customers/list/");

        cy.getByTestId("id").eq(0).should('have.text', '1');
        cy.getByTestId("firstName").eq(0).should('have.text', 'test-first-name-1');
        cy.getByTestId("lastName").eq(0).should('have.text', 'test-last-name-1');

        cy.getByTestId("id").eq(1).should('have.text', '2');
        cy.getByTestId("firstName").eq(1).should('have.text', 'test-first-name-2');
        cy.getByTestId("lastName").eq(1).should('have.text', 'test-last-name-2');
    });

    it('Displays title', () => {
        cy.intercept(Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 200,
                delay: 0,
                body: []
            }
        )

        cy.visit("/customers/list/");

        cy.title().should('eq', 'List - Customers');
    });

    it('Deletes customer', () => {
        var listCustomersCount = 0;
        cy.intercept('GET', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers', (req) => {
            req.alias = 'listCustomers-' + listCustomersCount;
            listCustomersCount = listCustomersCount + 1;
            req.reply(
                {
                    statusCode: 200,
                    delay: 500,
                    body: [
                        {
                            id: 1,
                            firstName: 'test-first-name-1',
                            lastName: 'test-last-name-1'
                        },
                        {
                            id: 2,
                            firstName: 'test-first-name-2',
                            lastName: 'test-last-name-2'
                        }
                    ]
                }
            );
        });

        cy.intercept('DELETE', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers', (req) => {
            req.alias = 'deleteCustomer';
            req.reply(
                {
                    statusCode: 200,
                    delay: 500,
                    body: null
                }
            );
        });

        cy.visit("/customers/list/");

        cy.wait('@listCustomers-0');

        cy.getByTestId("delete-button").eq(1).click();

        cy.getByTestId("processing-content").should('exist');

        cy.getByTestId("processing-content").should('not.exist');

        cy.wait('@listCustomers-1');

        cy.wait('@deleteCustomer').then((interception) => {
            var reqJson = interception.request.body;
            expect(reqJson.id).to.equal(2);
        });
    });

    it('tests jump to bottom and top', () => {
        cy.intercept(Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 200,
                delay: 0,
                body: [
                    {
                        id: 1,
                        firstName: 'test-first-name-1',
                        lastName: 'test-last-name-1'
                    }
                ]
            }
        )

        cy.visit("/customers/list/");

        cy.getByTestId("firstName").eq(0).should('have.text', 'test-first-name-1');

        cy.getByTestId("go-to-bottom-link").should('be.visible').click();

        cy.hash().should('eq', '#customer-table-bottom');

        cy.getByTestId("go-to-top-link").should('be.visible').click();

        cy.hash().should('eq', '#customer-table-top');
    });

    it('prefills first name, title and search customer from query param', () => {
        cy.intercept({
            method: 'GET',
            url: cy.myFunctions.createCustomerApiUrlMatcher(),
            pathname: '/customers',
            query: {
                firstName: 'test-first-name'
            }
        }, (req) => {
            req.alias = 'listCustomers';
            req.reply(
                {
                    statusCode: 200,
                    delay: 500,
                    body: []
                }
            );
        });

        cy.visit("/customers/list/?firstName=test-first-name");

        cy.getByTestId("success-content").should('exist');

        cy.getByTestId("input-first-name").should('have.value', 'test-first-name');

        cy.wait('@listCustomers').then((interception) => {
            expect(interception.request.url).to.contain('firstName=test-first-name');
        });

        cy.title().should('eq', 'test-first-name :: List - Customers');
    })

    it('changing first name should change title, query param and search result', () => {
        var requestCount = 0;
        cy.intercept({
            method: 'GET',
            url: cy.myFunctions.createCustomerApiUrlMatcher(),
            pathname: '/customers',
        }, (req) => {
            req.alias = 'listCustomers-' + requestCount;
            requestCount += 1;
            req.reply(
                {
                    statusCode: 200,
                    delay: 0,
                    body: []
                }
            );
        });

        cy.visit("/customers/list/");

        cy.getByTestId("success-content").should('exist');

        cy.wait('@listCustomers-0');

        cy.getByTestId("input-first-name").clear().type('test-first-name');

        cy.title().should('eq', 'test-first-name :: List - Customers');

        cy.url().should('contain', 'firstName=test-first-name');

        cy.wait('@listCustomers-1').then((interception) => {
            expect(interception.request.url).to.contain('firstName=test-first-name');
        });

        cy.getByTestId("input-first-name").clear().type(' ');

        cy.title().should('eq', 'List - Customers');

        cy.url().should('not.contain', 'firstName');

        cy.wait('@listCustomers-2').then((interception) => {
            expect(interception.request.url).not.to.contain('firstName');
        });
    })

    it('display common header and footer information', () => {
        cy.intercept('GET', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers', (req) => {
            req.reply(
                {
                    statusCode: 200,
                    delay: 0,
                    body: []
                }
            );
        });

        cy.visit("/customers/list/?firstName=test-first-name");

        cy.getByTestId("success-content").should('exist');

        cy.getByTestId("common-header").should('have.text', 'Common Header');
        cy.getByTestId("common-footer").should('have.text', 'Common Footer');
        cy.getByTestId("footer-pathname").should('have.text', '/customers/list');
        cy.getByTestId("footer-query").should('have.text', '{"firstName":"test-first-name"}');
    })
});