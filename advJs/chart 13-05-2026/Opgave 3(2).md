# Opgave 3 — Den interaktive data-explorer


## Mål

Byg en data-explorer hvor brugeren kan vælge hvad de vil se via en dropdown. Mindst to forskellige graftyper skal være tilgængelige, og grafen skal opdateres dynamisk når brugeren skifter valg.

---

## Trin 1 — Tilføj en dropdown i HTML

Tilføj en `<select>` og et nyt canvas i `index.html`:

```html
<body>
  <h1>Spil 1995–2019</h1>
  <input type="file" id="fileInput" accept=".xlsx" />
  <p id="status">Upload Excel-filen for at komme i gang.</p>

  <select id="chartSelect" style="display: none;">
    <option value="year">Spil per år</option>
    <option value="genre">Fordeling på genre</option>
    <option value="platform">Top 10 platforme</option>
  </select>

  <canvas id="myChart" style="max-width: 800px;"></canvas>
  <script type="module" src="/src/main.ts"></script>
</body>
```

Dropdown er skjult til at starte med — vi viser den først når filen er indlæst.

---

## Trin 2 — Hjælpefunktioner til at gruppere data

Vi har allerede `countPerYear()` fra opgave 2. Nu tilføjer vi to mere — én til genre og én til platform.

Begge bruger samme `reduce()`-mønster, men arbejder på tekstfelter der kan indeholde flere værdier adskilt af komma (fx `"PS1, PS2"`):

```typescript
function countPerGenre(games: Game[]): Record<string, number> {
  return games.reduce<Record<string, number>>((acc, game) => {
    const genres = game["Genre(s)"]?.split(",") ?? [];
    genres.forEach((g) => {
      const genre = g.trim();
      if (genre) acc[genre] = (acc[genre] ?? 0) + 1;
    });
    return acc;
  }, {});
}

function countPerPlatform(games: Game[]): Record<string, number> {
  return games.reduce<Record<string, number>>((acc, game) => {
    const platforms = game["Platform(s)"]?.split(",") ?? [];
    platforms.forEach((p) => {
      const platform = p.trim();
      if (platform) acc[platform] = (acc[platform] ?? 0) + 1;
    });
    return acc;
  }, {});
}
```

---

## Trin 3 — En fleksibel render-funktion

I stedet for en fast `renderChart()` laver vi én funktion der kan tegne forskellige graftyper. Den modtager labels, værdier og graftype som parametre.

Tilføj en variabel til at holde styr på det aktuelle chart — vi skal kunne slette det inden vi tegner et nyt:

```typescript
let currentChart: Chart | null = null;

function renderChart(
  labels: string[],
  values: number[],
  type: "bar" | "pie",
  title: string
): void {
  const canvas = document.getElementById("myChart") as HTMLCanvasElement;

  // Slet det gamle chart inden vi laver et nyt
  if (currentChart) {
    currentChart.destroy();
  }

  currentChart = new Chart(canvas, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: [
            "rgba(99, 102, 241, 0.7)",
            "rgba(234, 88, 12, 0.7)",
            "rgba(16, 185, 129, 0.7)",
            "rgba(245, 158, 11, 0.7)",
            "rgba(239, 68, 68, 0.7)",
            "rgba(59, 130, 246, 0.7)",
            "rgba(168, 85, 247, 0.7)",
            "rgba(20, 184, 166, 0.7)",
            "rgba(251, 146, 60, 0.7)",
            "rgba(34, 197, 94, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16 },
        },
      },
    },
  });
}
```

---

## Trin 4 — En funktion der opdaterer grafen

Tilføj en funktion der læser dropdown-værdien og kalder `renderChart()` med de rigtige data:

```typescript
function updateChart(games: Game[]): void {
  const select = document.getElementById("chartSelect") as HTMLSelectElement;
  const value = select.value;

  if (value === "year") {
    const perYear = countPerYear(games);
    const labels = Object.keys(perYear).sort();
    const values = labels.map((y) => perYear[Number(y)]);
    renderChart(labels, values, "bar", "Antal spil per år");

  } else if (value === "genre") {
    const perGenre = countPerGenre(games);
    // Sortér og tag top 10
    const sorted = Object.entries(perGenre).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const labels = sorted.map(([label]) => label);
    const values = sorted.map(([, count]) => count);
    renderChart(labels, values, "pie", "Top 10 genrer");

  } else if (value === "platform") {
    const perPlatform = countPerPlatform(games);
    // Sortér og tag top 10
    const sorted = Object.entries(perPlatform).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const labels = sorted.map(([label]) => label);
    const values = sorted.map(([, count]) => count);
    renderChart(labels, values, "bar", "Top 10 platforme");
  }
}
```

---

## Trin 5 — Sæt det hele sammen

Opdater `reader.onload`-blokken så dropdown vises og lytter på ændringer:

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

  status.textContent = `${games.length} spil indlæst!`;

  // Vis dropdown og tegn startgrafen
  const select = document.getElementById("chartSelect") as HTMLSelectElement;
  select.style.display = "block";

  updateChart(games);

  // Opdater grafen når brugeren skifter valg
  select.addEventListener("change", () => updateChart(games));
};
```

---

## Stretch goal 1 — Ekstra visning

Tilføj en fjerde mulighed i dropdown — fx "Top 10 publishers". Du skal selv skrive `countPerPublisher()`-funktionen og tilføje et nyt `if`-ben i `updateChart()`.

## Stretch goal 2 — Titel på siden

Vis dynamisk hvilken graf der vises, ved at opdatere en `<h2>` på siden hver gang dropdown skifter.

## Stretch goal 3 — Filtrer på årsinterval

Tilføj to `<input type="range">`-felter der lader brugeren vælge et årsinterval (fx 2000–2010), og filtrer `games`-arrayet inden det sendes til `updateChart()`.
