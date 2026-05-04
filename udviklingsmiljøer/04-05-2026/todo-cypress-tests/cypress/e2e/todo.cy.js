
describe('Todo App', () => {
    beforeEach(() => {
        // Besøg applikationen før hver test
        cy.visit('https://todo.csharp.dk');

    });

    it('should load the todo app', () => {
        // Verificer at app'en er indlæst korrekt
        cy.contains('h1', 'Todo List').should('be.visible');
    });
    it('should add a new todo', () => {
        // Indtast tekst i input feltet
        cy.get('.input-todo').type('Lær Cypress testing');

        // Klik på "Add" knappen
        cy.contains('button', 'Add').click();

        // Verificer at todo'en blev tilføjet til listen
        cy.get('.todo-item').should('have.length', 1);
        cy.get('.todo-item').should('contain', 'Lær Cypress testing');
    });
    it('should mark a todo as completed', () => {
        // Tilføj en todo først
        cy.get('.input-todo').type('Marker mig som færdig');
        cy.contains('button', 'Add').click();

        // Klik på checkbox'en for at markere todo'en som færdig
        cy.get('.todo-checkbox').click();

        // Verificer at todo'en er markeret som færdig
        cy.get('.todo-item').should('have.class', 'done');
        cy.get('.todo-text').should('have.class', 'completed');
    }); it('should delete a todo', () => {
        // Tilføj en todo først
        cy.get('.input-todo').type('Slet mig');
        cy.contains('button', 'Add').click();

        // Verificer at todo'en blev tilføjet
        cy.get('.todo-item').should('have.length', 1);

        // Klik på slet-knappen
        cy.get('.delete-btn').click();

        // Verificer at todo'en blev slettet
        cy.get('.todo-item').should('not.exist');
        cy.get('.empty-state').should('be.visible');
    });
    it('should filter todos correctly', () => {
        // Tilføj to todos
        cy.get('.input-todo').type('Aktiv todo');
        cy.contains('button', 'Add').click();

        cy.get('.input-todo').type('Færdig todo');
        cy.contains('button', 'Add').click();

        // Marker den anden todo som færdig
        cy.get('.todo-item').eq(1).find('.todo-checkbox').click();

        // Verificer at begge todos vises under "All"
        cy.contains('button', 'All').click();
        cy.get('.todo-item').should('have.length', 2);

        // Verificer at kun den aktive todo vises under "Active"
        cy.contains('button', 'Active').click();
        cy.get('.todo-item').should('have.length', 1);
        cy.get('.todo-item').should('contain', 'Aktiv todo');

        // Verificer at kun den færdige todo vises under "Completed"
        cy.contains('button', 'Completed').click();
        cy.get('.todo-item').should('have.length', 1);
        cy.get('.todo-item').should('contain', 'Færdig todo');
    });
    it('should edit a todo', () => {
        // Tilføj en todo
        cy.get('.input-todo').type('Original tekst');
        cy.contains('button', 'Add').click();

        // Dobbeltklik for at redigere
        cy.get('.todo-text').dblclick();

        // Ryd input og indtast ny tekst
        cy.get('.edit-todo').clear();
        cy.get('.edit-todo').type('Redigeret tekst');

        // Tryk Enter eller klik udenfor for at gemme ændringer
        cy.get('.edit-todo').blur();

        // Verificer at teksten blev opdateret
        cy.get('.todo-text').should('contain', 'Redigeret tekst');
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