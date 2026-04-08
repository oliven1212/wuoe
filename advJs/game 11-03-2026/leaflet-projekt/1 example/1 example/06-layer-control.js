const map = L.map('map').setView([55.6761, 12.5683], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Opret to separate lag
const cafeLayer = L.layerGroup().addTo(map);
const apotekLayer = L.layerGroup().addTo(map);

const caféer = [
  { lat: 55.6761, lon: 12.5683, name: "Café Rådhuspladsen" },
  { lat: 55.6795, lon: 12.5701, name: "The Coffee Collective" },
  { lat: 55.6748, lon: 12.5756, name: "Café Nørreport" },
];

const apoteker = [
  { lat: 55.6772, lon: 12.5710, name: "Rådhusapoteket" },
  { lat: 55.6801, lon: 12.5648, name: "Nørreport Apotek" },
];

// Tilføj caféer til cafeLayer
caféer.forEach(sted => {
  L.circleMarker([sted.lat, sted.lon], {
    radius: 9,
    fillColor: '#e67e22',
    color: '#fff',
    weight: 2,
    fillOpacity: 0.9
  }).addTo(cafeLayer).bindPopup('☕ ' + sted.name);
});

// Tilføj apoteker til apotekLayer
apoteker.forEach(sted => {
  L.circleMarker([sted.lat, sted.lon], {
    radius: 9,
    fillColor: '#27ae60',
    color: '#fff',
    weight: 2,
    fillOpacity: 0.9
  }).addTo(apotekLayer).bindPopup('💊 ' + sted.name);
});

// Layer control — tænd/sluk lag i UI
L.control.layers(null, {
  '☕ Caféer': cafeLayer,
  '💊 Apoteker': apotekLayer
}).addTo(map);
