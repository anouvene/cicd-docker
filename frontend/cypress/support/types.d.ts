/// <reference types="cypress" />

declare global {
    namespace Cypress {
      interface Chainable {
        dataCy(
          value: string,
          options?: Partial<Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
        ): Chainable<JQuery<HTMLElement>>;
        login(email: string, password: string): Chainable<void>;
      }
    }
  }
  
  export {};