# Opgave 2 — Dit første bar chart


## Mål

Når du er færdig med denne opgave, skal du kunne se et bar chart i browseren der viser antal spil udgivet per år fra 1995 til 2019.

---

## Trin 1 — Tilføj et canvas-element

Chart.js tegner grafer på et `<canvas>`-element. Tilføj det i `index.html` under upload-knappen:

```html
<body>
  <h1>Spil 1995–2019</h1>
  <input type="file" id="fileInput" accept=".xlsx" />
  <p id="status">Upload Excel-filen for at komme i gang.</p>
  <canvas id="myChart"></canvas>
  <script type="module" src="/src/main.ts"></script>
</body>
```

---

## Trin 2 — Importer Chart.js

Tilføj importen øverst i `src/main.ts`:

```typescript
import * as XLSX from "xlsx";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
```

`registerables` sørger for at alle chart-typer og hjælpefunktioner er klar til brug.

---

## Trin 3 — Gruppér data per år

Vi skal tælle hvor mange spil der er udgivet hvert år. Det gør vi med `reduce()` — samme teknik som i stretch goalet fra opgave 1.

Tilføj denne funktion i `src/main.ts`:

```typescript
function countPerYear(games: Game[]): Record<number, number> {
  return games.reduce<Record<number, number>>((acc, game) => {
    acc[game.year] = (acc[game.year] ?? 0) + 1;
    return acc;
  }, {});
}
```

`reduce()` løber alle spil igennem og bygger et objekt op, fx:
```
{ 1995: 42, 1996: 67, 1997: 89, ... }
```

---

## Trin 4 — Byg bar chart

Tilføj en funktion der tager de grupperede data og renderer et bar chart:

```typescript
function renderChart(perYear: Record<number, number>): void {
  // Sortér årene kronologisk
  const labels = Object.keys(perYear).sort();
  const values = labels.map((year) => perYear[Number(year)]);

  const canvas = document.getElementById("myChart") as HTMLCanvasElement;

  new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Antal spil udgivet",
          data: values,
          backgroundColor: "rgba(99, 102, 241, 0.7)",
          borderColor: "rgba(99, 102, 241, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Antal spil udgivet per år (1995–2019)",
          font: { size: 16 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Antal spil" },
        },
        x: {
          title: { display: true, text: "År" },
        },
      },
    },
  });
}
```

---

## Trin 5 — Kald funktionerne

Find `reader.onload`-blokken fra opgave 1 og tilføj de to funktionskald helt til sidst, efter `console.log`:

```typescript
// Tæl spil per år og render chart
const perYear = countPerYear(games);
renderChart(perYear);
```

Den samlede `reader.onload`-blok skal nu se sådan ud:

```typescript
reader.onload = (e) => {
  const data = e.target?.result;

  const workbook = XLSX.read(data, { type: "array", cellDates: true });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json<Game>(sheet);

  const games: Game[] = rawData
    .filter((row) => row.Title)
    .map((row) => ({
      ...row,
      year: new Date(row.Date).getFullYear(),
    }));

  console.log("Antal spil:", games.length);
  status.textContent = `${games.length} spil indlæst!`;

  const perYear = countPerYear(games);
  renderChart(perYear);
};
```

---


## Stretch goal

Kan du fremhæve det år der blev udgivet flest spil med en anden farve?

`backgroundColor` kan også være et array af farver — én per bar:

```typescript
const maxValue = Math.max(...values);

const backgroundColor = values.map((v) =>
  v === maxValue ? "rgba(234, 88, 12, 0.8)" : "rgba(99, 102, 241, 0.7)"
);
```

Brug derefter `backgroundColor` i stedet for den faste farvestreng i `datasets`.
