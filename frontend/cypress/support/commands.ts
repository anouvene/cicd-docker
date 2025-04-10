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

/**
 * Select DOM element by data-cy attribute.
 * @example cy.dataCy('greeting')
 */
Cypress.Commands.add('dataCy', (dataValue) => {
    return cy.get(`[data-cy="${dataValue}"]`);
});

// -- Login --
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.session([email, password], () => {
        cy.visit('/connexion');

        // Attend que le champ email soit bien là
        cy.dataCy('email', { timeout: 15000 }).should('exist');
        cy.dataCy('email').type(email);
        cy.dataCy('password').type(password);
        cy.contains('button', 'Connexion').click();

        cy.url().should('include', '/profil');
        cy.contains('Déconnexion').should('be.visible');
    });
});


//export {}
