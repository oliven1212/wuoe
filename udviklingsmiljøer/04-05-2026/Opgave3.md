# E2E Test Øvelse: Find 9 fejl i Todo-appen

## Introduktion

Du er blevet ansat som kvalitetssikringsekspert hos Biltemas softwarebureau. Et team har udviklet en simpel Todo-app med JavaScript, men der er sneget sig en række fejl ind i koden. Din opgave er at identificere disse fejl ved hjælp af E2E (End-to-End) tests.

Appen er tilgængelig på: https://todo.csharp.dk

## Øvelsens mål

1. Find de 9 fejl, der er i applikationen. Første er fundet
2. Skriv E2E tests med Cypress, der beviser fejlenes eksistens
3. Foreslå løsninger til at rette fejlene. (ikke det vigtigste)

## Om applikationen

Dette er en simpel Todo-app med følgende funktioner:
- Tilføje nye todos
- Markere todos som færdige
- Redigere eksisterende todos
- Slette todos
- Filtrere todos (alle/aktive/færdige)

## Opgaver

### 1. Opsætning af testmiljø (15 minutter)

```bash
# Opret en mappe til dit testprojekt
mkdir todo-e2e-tests
cd todo-e2e-tests

# Initialiser npm projekt
npm init -y

# Installer Cypress
npm install cypress --save-dev

# Åbn Cypress
npx cypress open
```

Følg vejledningen til at opsætte Cypress med E2E tests.

### 2. Find fejlene (45 minutter)

Udforsk applikationen manuelt og identificér så mange af de 9 fejl som muligt. Noter for hver fejl:
- Hvad er fejlen?
- Hvordan reproducerer du den?
- Hvilken forventet adfærd burde appen have?

### 3. Skriv E2E tests (60 minutter)

For hver fejl du har fundet, skal du skrive en Cypress test, der beviser fejlens eksistens.

Eksempel på en test:

```javascript
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
```


## Hints til fejltyperne

For at hjælpe dig på vej, her er nogle kategorier af fejl, du bør være opmærksom på:

1. **Valideringsfejl** - Tjek om applikationen validerer brugerinput korrekt
//Kan lave tomme tasks
2. **UI/UX problemer** - Er alle interaktioner intuitive og fungerer de som forventet?
//Scrollbar kommer når man færdigøre en opgave
//Ingen konfirmation når man fjerner en todo
//checkmark bliver hel smal når man har et meget langt navn på en todo
3. **Filtreringsproblemer** - Fungerer filtrene korrekt i alle situationer?
//
4. **Persistensproblemer** - Hvad sker der med dine data når du genindlæser siden?
5. **Dubletter** - Kontrollerer applikationen for duplikerede data?
6. **Sortering** - Er rækkefølgen af todos logisk og konsistent?
7. **Redigeringsproblemer** - Fungerer redigering af todos som forventet?
//Kan ikke redigere opgaver med tomme navne da man skal selecte bogstaver
//Kan redigere til tom stregn
8. **Brugerinput** - Kan brugeren indtaste alle typer data, og håndteres det korrekt?
//
9. **Tilgængelighed** - Kan applikationen bruges effektivt med tastatur?
//Enter når man er i et input feldt gør intet
//Intet highlight på checkmark ikonet når man bruger tab til navigation
//Kan ikke navigere til rediger navn med tab



# God arbejdslyst!