/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- Login --
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.getCookie('token').then((cookie) => {
        if (!cookie) {
            cy.session([email, password], () => {
                cy.visit('/connexion');
                cy.dataCy('email').type(email);
                cy.dataCy('password').type(password);
                cy.contains('button', 'Connexion').click();
            }, {
                validate: () => {
                    cy.visit('/profil');
                }
            });

            // cy.session([email, password], () => {
            //     cy.request({
            //         method: 'POST',
            //         url: '/api/auth',
            //         body: {email, password}

            //     }).then(({body}) => {
            //         console.log(body);
            //         console.log('Token: ', window.localStorage.getItem('token'));
            //     });
                
            // });
        } 
        
        cy.visit('/profil');
        
        
    });
});

/**
 * Select DOM element by data-cy attribute.
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add('dataCy', (dataValue) => {
    return cy.get(`[data-cy=${dataValue}]`);
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//


//export {}
