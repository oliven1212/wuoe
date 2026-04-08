const map = L.map('map').setView([55.6761, 12.5683], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Simpel markør
L.marker([55.6761, 12.5683]).addTo(map);

// Markør med popup
L.marker([55.6795, 12.5701])
  .addTo(map)
  .bindPopup('<b>The Coffee Collective</b><br>Fantastisk kaffe på Nørrebro');

// Cirkel
L.circle([55.6733, 12.5621], {
  radius: 300,
  color: '#e74c3c',
  fillOpacity: 0.2
}).addTo(map);
