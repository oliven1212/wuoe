const map = L.map('map').setView([55.6761, 12.5683], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// --- MULIGHED A: Hent fra Overpass API ---
const query = `
  [out:json];
  node["amenity"="cafe"]
    (55.65,12.50,55.70,12.60);
  out;
`;

// Skift URL til en alternativ server
fetch('https://overpass.kumi.systems/api/interpreter?data=' + encodeURIComponent(query))
  .then(r => r.json())
  .then(data => {
    data.elements.forEach(element => {
      L.marker([element.lat, element.lon])
        .addTo(map)
        .bindPopup(element.tags.name || 'Ingen navn');
    });
  })
  .catch(err => {
    console.warn('Overpass fejlede, bruger testdata:', err);
    visTestdata(); // fallback til testdata
  });


// --- MULIGHED B: Testdata (bruges hvis Overpass er nede) ---
function visTestdata() {
  const cafeData = [
    { lat: 55.6761, lon: 12.5683, name: "Café Rådhuspladsen" },
    { lat: 55.6795, lon: 12.5701, name: "The Coffee Collective" },
    { lat: 55.6748, lon: 12.5756, name: "Café Nørreport" },
    { lat: 55.6812, lon: 12.5669, name: "Democratic Coffee" },
    { lat: 55.6733, lon: 12.5621, name: "Café Vesterbro" },
  ];

  cafeData.forEach(element => {
    L.marker([element.lat, element.lon])
      .addTo(map)
      .bindPopup(element.name);
  });
}
