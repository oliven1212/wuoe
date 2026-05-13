# Opgave 1 — Indlæs og parse Excel-filen


## Mål

Når du er færdig med denne opgave, skal du kunne uploade `GAMES_1995_2019.xlsx` i browseren og se et array af spil-objekter i konsollen — inkl. årstal — klar til at blive visualiseret.

---

## Trin 1 — Setup

Opret et nyt projekt og installer de nødvendige pakker:

```bash
npm create vite@latest spil-visualisering -- --template vanilla-ts
cd spil-visualisering
npm install
npm install xlsx chart.js
npm run dev
```

---

## Trin 2 — TypeScript interface

Åbn `src/main.ts` og definer en interface der beskriver ét spil fra datasættet.

Kolonnenavnene skal matche Excel **præcist**, inkl. parenteser. `Date` er et JavaScript `Date`-objekt — det vender vi tilbage til i trin 4:

```typescript
interface Game {
  Month: string;
  Date: Date;
  Title: string;
  "Platform(s)": string;
  "Genre(s)": string;
  "Publisher(s)": string;
  year: number; // Udregnes fra Date-kolonnen
}
```

---

## Trin 3 — Upload-knap i HTML

Åbn `index.html` i roden af projektet og erstat indholdet af `<body>` med følgende — **behold** det `<script>`-tag Vite allerede har sat ind:

```html
<body>
  <h1>Spil 1995–2019</h1>
  <input type="file" id="fileInput" accept=".xlsx" />
  <p id="status">Upload Excel-filen for at komme i gang.</p>
  <script type="module" src="/src/main.ts"></script>
</body>
```

---

## Trin 4 — Indlæs og parse filen

Excel gemmer datoer internt som antal dage siden 1. januar 1900 — så uden hjælp ville `Date`-kolonnen bare være et stort tal som `35034`. Vi løser det med `cellDates: true`, som får SheetJS til at konvertere tallene til rigtige JavaScript `Date`-objekter automatisk.

Skriv følgende i `src/main.ts`:

```typescript
import * as XLSX from "xlsx";

interface Game {
  Month: string;
  Date: Date;
  Title: string;
  "Platform(s)": string;
  "Genre(s)": string;
  "Publisher(s)": string;
  year: number;
}

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const status = document.getElementById("status") as HTMLParagraphElement;

fileInput.addEventListener("change", (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const data = e.target?.result;

    // cellDates: true konverterer Excel-datotal til rigtige Date-objekter
    const workbook = XLSX.read(data, { type: "array", cellDates: true });

    // Hent det første ark
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Konverter til array af objekter
    const rawData = XLSX.utils.sheet_to_json<Game>(sheet);

    // Filtrer rækker uden titel væk og tilføj årstal fra Date-kolonnen
    const games: Game[] = rawData
      .filter((row) => row.Title)
      .map((row) => ({
        ...row,
        year: new Date(row.Date).getFullYear(),
      }));

    console.log("Spil:", games);
    console.log("Antal spil:", games.length);
    status.textContent = `${games.length} spil indlæst!`;
  };

  reader.readAsArrayBuffer(file);
});
```

---

## Trin 5 — Verificer dataen

Tilføj disse linjer lige efter `status.textContent`-linjen for at tjekke at dataen ser rigtig ud:

```typescript
// Vis de første 5 spil
console.log("De første 5 spil:");
games.slice(0, 5).forEach((game) => {
  console.log(`${game.year} — ${game.Title} (${game["Platform(s)"]}) — ${game["Genre(s)"]}`);
});

// Vis et tilfældigt spil
const random = games[Math.floor(Math.random() * games.length)];
console.log("Tilfældigt spil:", random);
```

Outputtet i konsollen burde se nogenlunde sådan ud:

```
1995 — Battle Arena Toshinden (PS1) — Fighting
1995 — Bust-a-Move (SNES) — Puzzle
1995 — Star Wars: Dark Forces (DOS) — Shooter
...
```

---


## Stretch goal

Find ud af hvilket år der blev udgivet flest spil. Brug `reduce()` til at tælle spil per år, og print resultatet i konsollen:

```typescript
const perYear = games.reduce<Record<number, number>>((acc, game) => {
  acc[game.year] = (acc[game.year] ?? 0) + 1;
  return acc;
}, {});

const topYear = Object.entries(perYear).sort((a, b) => b[1] - a[1])[0];
console.log(`Flest spil udgivet i: ${topYear[0]} (${topYear[1]} spil)`);
```

> Dette er præcis den teknik vi bruger i Opgave 2 til at bygge vores første bar chart!

---

*Når du er klar, fortsætter vi med Opgave 2 — dit første bar chart.*