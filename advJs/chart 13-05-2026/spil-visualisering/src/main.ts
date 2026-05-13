import * as XLSX from "xlsx";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

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

  reader.readAsArrayBuffer(file);
});



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

  } else if (value === "month"){
    const perMonth = countPerMonth(games);
    const labels = Object.keys(perMonth).sort();
    const values = labels.map((y) => perMonth[y]);
    renderChart(labels, values, "bar", "Antal spil per år");
  }
}

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

function countPerYear(games: Game[]): Record<number, number> {
  return games.reduce<Record<number, number>>((acc, game) => {
    acc[game.year] = (acc[game.year] ?? 0) + 1;
    return acc;
  }, {});
}

function countPerMonth(games: Game[]): Record<string, number> {
  return games.reduce<Record<string, number>>((acc, game) => {
    acc[game.Month] = (acc[game.Month] ?? 0) + 1;
    return acc;
  }, {});
}