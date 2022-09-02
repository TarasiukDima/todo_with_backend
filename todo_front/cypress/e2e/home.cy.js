const { routesSettings, pagesTitles, navigationLinksText } = require("../settings");

describe('Home page E2E', () => {
  it('visit home page', () => {
    cy.visit(routesSettings.home);

    cy.get('h2').should('have.text', pagesTitles.home);
    cy
      .get('a[href="#/signup"]')
      .should('have.text', pagesTitles.signup)
      .click()
      .url()
      .should('include', routesSettings.signup);
  })

  it('routing', () => {
    cy.visit(routesSettings.home);

    cy.get('header nav ul a').as('navItems');

    cy.get('@navItems').should('have.length', 2);

    cy.get('@navItems').eq(0).should('have.text', navigationLinksText.home).click();
    cy.url().should('not.include', routesSettings.signin);

    cy.get('@navItems').eq(1).should('have.text', navigationLinksText.signin).click();
    cy.url().should('include', routesSettings.signin);

    cy.get('@navItems').eq(0).click();
    cy.url().should('not.include', routesSettings.signin);
  })
})
