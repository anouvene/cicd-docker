/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            dataCy(
                value: string,
                options?: Partial<Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>
              ): Chainable<JQuery<HTMLElement>>;
            login(email: string, password: string): Chainable<void>
            //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>

            
        }
    }
}

export {};
