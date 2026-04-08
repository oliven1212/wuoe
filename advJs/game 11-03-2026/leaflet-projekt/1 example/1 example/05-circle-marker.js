const map = L.map('map').setView([55.6761, 12.5683], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const steder = [
  { lat: 55.6761, lon: 12.5683, name: "Rådhuspladsen", rating: 5 },
  { lat: 55.6795, lon: 12.5701, name: "The Coffee Collective", rating: 4 },
  { lat: 55.6748, lon: 12.5756, name: "Café Nørreport", rating: 3 },
  { lat: 55.6812, lon: 12.5669, name: "Democratic Coffee", rating: 5 },
  { lat: 55.6733, lon: 12.5621, name: "Café Vesterbro", rating: 2 },
];

// Farve baseret på rating
function getFarve(rating) {
  if (rating >= 5) return '#2ecc71'; // grøn
  if (rating >= 3) return '#f39c12'; // gul
  return '#e74c3c';                  // rød
}

steder.forEach(sted => {
  L.circleMarker([sted.lat, sted.lon], {
    radius: 10,
    fillColor: getFarve(sted.rating),
    color: '#fff',
    weight: 2,
    fillOpacity: 0.9
  })
    .addTo(map)
    .bindPopup('<b>' + sted.name + '</b><br>Rating: ' + sted.rating + '/5');
});
