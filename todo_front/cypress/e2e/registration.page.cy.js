const { routesSettings, pagesTitles, registrationMessages, userFormMessages, mockData } = require("../settings");

describe('Authorization page E2E', () => {
  beforeEach(() => {
    cy.visit(routesSettings.signup);
    cy.get('input[name="username"]').as('username');
    cy.get('input[name="login"]').as('login');
    cy.get('input[name="password"]').as('password');
    cy.get('button').as('passwordEye');
    cy.get('form').find('a').as('loginPageLink');
    cy.get('input[type="submit"]').as('submitBtn');
  })

  it('should have form and title', () => {
    cy.get('h2').should('have.text', pagesTitles.signup);

    cy
      .get('@username')
      .should('have.attr', 'placeholder', registrationMessages.placeHolder);

    cy
      .get('@login')
      .should('have.attr', 'placeholder', userFormMessages.placeHolderLogin)

    cy
      .get('@passwordEye')
      .children()
      .should('have.attr', 'focusable', 'false');

    cy.get('@password').should('have.attr', 'type', 'password');
    cy.get('@passwordEye').click();
    cy.get('@password').should('have.attr', 'type', 'text');

    cy.get('@submitBtn').should('not.have.attr', 'disabled');

    cy.contains(registrationMessages.changePage).should('exist');
    cy.get('@loginPageLink').should('have.text', registrationMessages.anotherFormPageName);

    cy.get('@loginPageLink').click()
    cy
      .get('@username')
      .should('not.exist');
  })

  it('should show Errors fields', () => {
    cy.contains(registrationMessages.nameUserError).should('not.exist');
    cy.contains(userFormMessages.loginError).should('not.exist');
    cy.contains(userFormMessages.passwordError).should('not.exist');

    cy
      .get('@submitBtn')
      .click();

    cy.contains(registrationMessages.nameUserError).should('exist');
    cy.contains(userFormMessages.loginError).should('exist');
    cy.contains(userFormMessages.passwordError).should('exist');

    // username errors
    cy
      .get('@username')
      .type(mockData.smallUserName)

    cy.contains(registrationMessages.nameUserError).should('not.exist');
    cy.contains(registrationMessages.minUserError).should('exist');

    cy
      .get('@username')
      .type(mockData.bigUserName)

    cy.contains(registrationMessages.minUserError).should('not.exist');
    cy.contains(registrationMessages.maxUserError).should('exist');


    // login errors
    cy
      .get('@login')
      .type(mockData.smallUserName)

    cy.contains(userFormMessages.loginError).should('not.exist');
    cy.contains(userFormMessages.minLoginError).should('exist');

    cy
      .get('@login')
      .type(mockData.bigUserName)

    cy.contains(userFormMessages.minLoginError).should('not.exist');
    cy.contains(userFormMessages.maxLoginError).should('exist');


    // password errors
    cy
      .get('@password')
      .type(mockData.smallUserName);

    cy.contains(userFormMessages.passwordError).should('not.exist');
    cy.contains(userFormMessages.minPasswordError).should('exist');

    cy
      .get('@password')
      .type(mockData.bigUserName);

    cy.contains(userFormMessages.minPasswordError).should('not.exist');
    cy.contains(userFormMessages.maxPasswordError).should('exist');
  })
})
