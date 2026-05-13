import * as XLSX from "xlsx";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface DogData {
  ID: string;
  name: string | null;
  age: number;
  sex: "male" | "female";
  breed: string;
  date_found: Date;
  adoptable_from: Date;
  posted: Date;
  color: string;
  coat: "short" | "medium" | "wirehaired" | "long" ;
  size: "small" | "medium" | "large";
  neutered: boolean | null;
  housebroken: boolean | null;
  likes_people: boolean | null;
  likes_children: boolean | null;
  get_along_males: boolean | null;
  get_along_females: boolean | null;
  get_along_cats: boolean | null;
  keep_in: string | null;

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
    const rawData = XLSX.utils.sheet_to_json<DogData>(sheet);

    const dogs: DogData[] = rawData
      .map((row) => ({
        ...row,
        neutered: parseBoolean(row.neutered),
        housebroken: parseBoolean(row.housebroken),
        likes_people: parseBoolean(row.likes_people),
        likes_children: parseBoolean(row.likes_children),
        get_along_males: parseBoolean(row.get_along_males),
        get_along_females: parseBoolean(row.get_along_females),
        get_along_cats: parseBoolean(row.get_along_cats),
      }));

    status.textContent = `${dogs.length} DogData indlæst!`;
    // Vis dropdown og tegn startgrafen
    const select = document.getElementById("chartSelect") as HTMLSelectElement;
    select.style.display = "block";

    updateChart(dogs);

    // Opdater grafen når brugeren skifter valg
    select.addEventListener("change", () => updateChart(dogs));
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


function updateChart(dogs: DogData[]): void {
  const select = document.getElementById("chartSelect") as HTMLSelectElement;
  const value = select.value;

  switch (value) {
  case 'gender':{
    const genders = countPerGender(dogs);
    const labels = Object.keys(genders).sort();
    const values = labels.map((y) => genders[y]);
    renderChart(labels, values, "pie", "Dogs from each gender");
    break;
  }
  case '':
    const colors = countPerColor(dogs);
    const labels = Object.keys(colors).sort();
    const values = labels.map((y) => colors[y]);
    renderChart(labels, values, "pie", "Dogs from each gender");
    break;
}

}

const parseBoolean = (val: unknown): boolean | null => {
  if (val === "yes") return true;
  if (val === "no") return false;
  return null;
};


function countPerGender(dogs: DogData[]): Record<string, number> {
  return dogs.reduce<Record<string, number>>((acc, dog) => {
    acc[dog.sex] = (acc[dog.sex] ?? 0) + 1;
    return acc;
  }, {});
}

function countPerColor(dogs: DogData[]): Record<string, number> {
  return dogs.reduce<Record<string, number>>((acc, dog) => {
    acc[dog.color] = (acc[dog.color] ?? 0) + 1;
    return acc;
  }, {});
}