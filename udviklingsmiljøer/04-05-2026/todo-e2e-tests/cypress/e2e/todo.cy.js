describe('Todo App Bugs', () => {
  beforeEach(() => {
    cy.visit('https://todo.csharp.dk');
  });

  it('should persist todos after page refresh', () => {
    // Tilføj en todo
    cy.get('.input-todo').type('Husk mig');
    cy.contains('button', 'Add').click();

    // Genindlæs siden
    cy.reload();

    // Verificer at todo'en stadig findes
    cy.get('.todo-item').should('have.length', 1);
    cy.get('.todo-text').should('contain', 'Husk mig');
  });
});