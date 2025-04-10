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

/**
 * Login avec sans session pour docker
 */
Cypress.Commands.add('login', (email: string, password: string) => {
    const runEnv = Cypress.env('RUN_ENV') || 'local';
  
    if (runEnv === 'docker') {
      // 🔧 Mode Docker : pas de cy.session (pas fiable en CI)
      cy.visit('/connexion');
      cy.dataCy('email', { timeout: 15000 }).should('be.visible').type(email);
      cy.dataCy('password').type(password);
      cy.contains('button', 'Connexion').click();
      cy.url().should('include', '/profil');
      cy.contains('Déconnexion').should('exist');
    } else {
      // 💻 En local : session pour plus de vitesse
      cy.session([email, password], () => {
        cy.visit('/connexion');
        cy.dataCy('email', { timeout: 15000 }).should('be.visible').type(email);
        cy.dataCy('password').type(password);
        cy.contains('button', 'Connexion').click();
        cy.url().should('include', '/profil');
        cy.contains('Déconnexion').should('exist');
      });
    }
  });

//export {}
