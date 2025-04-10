describe('Vue 3 App', () => {
  const runEnv = Cypress.env('RUN_ENV') || 'local';
  const apiBaseUrl = runEnv === 'docker' ? 'http://node-api' : 'http://localhost:3000';

  before(() => {
    cy.request({
      url: `${apiBaseUrl}/api/user/current`,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it("Visite la page d'accueil", () => {
    cy.contains('h1', 'Home');
  });

  it('Visite la page de login', () => {
    cy.contains('Connexion').click();

    cy.contains('h2', 'Connexion');
  });

  it('Visite la page de register', () => {
    cy.contains('Inscription').click();

    cy.contains('h2', 'Inscription');
  });

  it("L'inscription fonctionne", () => {
    cy.contains('Inscription').click();
    cy.get('#name').type('test');
    cy.get('#email').type('test@test.fr');
    cy.get('#password').type('riuehuhrfezhop');
    cy.get('button').contains('Inscription').click();

    cy.contains('h2', 'Connexion');
  });

  it('La connexion fonctionne', () => {
    cy.login('test@test.fr', 'riuehuhrfezhop');

    cy.contains('Mon profil');
    cy.contains('Déconnexion');
  });

  it('La déconnexion fonctionne', () => {
    cy.login('test@test.fr', 'riuehuhrfezhop');
  
    // S’assurer qu’on est bien loggé
    cy.url().should('include', '/profil');
    cy.contains('Déconnexion').should('exist');

    // Débogage DOM pour voir si l'attribut data-cy="" existe
    cy.document().then(doc => {
      console.log('DOM:', doc.body.innerHTML);
      cy.writeFile('cypress/debug/dom-before-logout.html', doc.documentElement.outerHTML);
    });
  
    // Attendre la page s’il est rendu avec un délai
    cy.contains('Déconnexion', { timeout: 15000 }).should('be.visible').click();
  
    // Vérifier qu'on revient à la page de connexion
    cy.contains('h2', 'Connexion').should('be.visible');
  });

});