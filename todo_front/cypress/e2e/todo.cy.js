const {
  routesSettings,
  pagesTitles,
  formTodoMessages,
  mockData,
  mockTodo
} = require("../settings");

describe('Todo page E2E', () => {
  beforeEach(() => {
    cy.visit(routesSettings.signin);
    cy.intercept('https://fathomless-beyond-41199.herokuapp.com/user/signin').as('signin');
    cy.intercept('https://fathomless-beyond-41199.herokuapp.com/todo/**').as('todo');

    cy
      .get('input[name="login"]')
      .type(mockData.userName);
    cy
      .get('input[name="password"]')
      .type(mockData.userName);

    cy
      .get('input[type="submit"]')
      .click();

    cy.wait('@signin');

    cy.visit(routesSettings.todo);

    cy.get('input[name="title"]').as('addTodoTitle');
    cy.get('input[name="text"]').as('addTodoText');
    cy.get('input[type="submit"]').as('addTodoButton');
    cy.wait('@todo');
  })

  it('visit Todo page', () => {
    cy.get('h2').should('have.text', pagesTitles.todo);
    cy.get('@addTodoTitle').should('have.attr', 'placeholder', formTodoMessages.placeHolderTitle);
    cy.get('@addTodoText').should('have.attr', 'placeholder', formTodoMessages.placeHolderText);
    cy.get('@addTodoButton').should('have.attr', 'value', 'Add todo');
  })

  it('show form errors', () => {
    cy.contains(formTodoMessages.titleError).should('not.exist');
    cy.contains(formTodoMessages.textError).should('not.exist');

    cy.get('@addTodoButton').click();

    cy.contains(formTodoMessages.titleError).should('exist');
    cy.contains(formTodoMessages.textError).should('exist');

    // title error
    cy
      .get('@addTodoTitle')
      .type(mockData.smallUserName);

    cy.contains(formTodoMessages.titleError).should('not.exist');
    cy.contains(formTodoMessages.minTitleError).should('exist');

    cy
      .get('@addTodoTitle')
      .type(mockData.text);


    cy.contains(formTodoMessages.minTitleError).should('not.exist');
    cy.contains(formTodoMessages.maxTitleError).should('exist');


    // text error
    cy
    .get('@addTodoText')
    .type(mockData.smallUserName);

    cy.contains(formTodoMessages.textError).should('not.exist');
    cy.contains(formTodoMessages.minTextError).should('exist');

    cy
      .get('@addTodoText')
      .type(mockData.text);


    cy.contains(formTodoMessages.minTextError).should('not.exist');
    cy.contains(formTodoMessages.maxTextError).should('exist');
  })

  it('add, change and remove todos', () => {
    cy.contains(mockTodo[0].title).should('not.exist');
    cy.contains(mockTodo[0].text).should('not.exist');
    cy.contains('main section ul').should('not.exist');

    cy.get('@addTodoTitle').type(mockTodo[0].title);
    cy.get('@addTodoText').type(mockTodo[0].text);
    cy.get('@addTodoButton').click();
    cy.wait('@todo');
    cy.get('@addTodoTitle').should('have.text', '');
    cy.get('@addTodoText').should('have.text', '');

    cy.get('main section ul').as('listTodo');
    cy.get('main section ul li').as('listTodoItems');


    cy.get('@listTodoItems').should('have.length', 1);
    cy.get('main section ul li').eq(0).as('firstElTodo');
    cy.get('@firstElTodo').find('button').contains('Done').click();
    cy.get('@firstElTodo').should('have.css', 'background-color', 'rgb(46, 125, 50)');
    cy.get('@firstElTodo').find('button').contains('Done').should('not.exist');
    cy.get('@firstElTodo').find('button').contains('Undone').click();
    cy.get('@firstElTodo').find('button').contains('Done').should('exist');
    cy.get('@firstElTodo').find('button').contains('Undone').should('not.exist');

    cy.get('@addTodoTitle').type(mockTodo[1].title);
    cy.get('@addTodoText').type(mockTodo[1].text);
    cy.get('@addTodoButton').click();
    cy.wait('@todo');

    cy.get('@listTodoItems').should('have.length', 2);

    cy.get('@firstElTodo').find('button[aria-label="Delete"]').click();
    cy.get('button').contains('Agree').click();
    cy.wait(1000);
    cy.wait('@todo');

    cy.get('main section ul li button[aria-label="Delete"]').click();
    cy.get('button').contains('Agree').click();
    cy.wait('@todo');
  })
})
