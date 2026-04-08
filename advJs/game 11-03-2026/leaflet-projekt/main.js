const map = L.map('map').setView([55.40551906426421, 10.384022093201379], 13);

// Tilføj OpenStreetMap tiles (det der faktisk tegner kortet)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const cafeLayer = L.layerGroup().addTo(map);
const apotekLayer = L.layerGroup().addTo(map);



L.marker([55.4032795, 10.3798224])
  .addTo(map)
  .bindPopup('<b>UCL!</b>');
L.marker([55.4037952, 10.382052])
  .addTo(map)
  .bindPopup('<b>Storms!</b>');
L.marker([55.4074011, 10.3822933])
  .addTo(map)
  .bindPopup('<b>Chicago!</b>');
L.marker([55.383892942722596, 10.426427308908007])
  .addTo(map)
  .bindPopup('<b>Rosengårdscenteret!</b>');
L.marker([55.6761, 12.5683])
  .addTo(map)
  .bindPopup('<b>Rådhuspladsen!</b><br>Vi er her!');
L.circle([55.383892942722596, 10.426427308908007], {
  radius: 300,
  color: '#e74c3c',
  fillOpacity: 0.2
}).addTo(map);


const query = `
  [out:json];
  node["amenity"="cafe"]
    (55.65,12.50,55.70,12.60);
  out;
`;

fetch('./cafes.json')
  .then(r => r.json())
  .then(data => {
    data.elements.forEach(element => {
      L.marker([element.lat, element.lon])
        .addTo(cafeLayer)
        .bindPopup(element.tags.name || 'Ukendt navn');
    });
  });




// Layer control
L.control.layers(null, {
  "☕ Caféer": cafeLayer,
  "💊 Apoteker": apotekLayer
}).addTo(map);