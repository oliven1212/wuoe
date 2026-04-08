const map = L.map('map').setView([55.6761, 12.5683], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

navigator.geolocation.getCurrentPosition(
  function(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Centrer kortet på brugeren
    map.setView([lat, lon], 15);

    // Markør
    L.marker([lat, lon])
      .addTo(map)
      .bindPopup('📍 Du er her!')
      .openPopup();

    // Cirkel der viser usikkerhed
    L.circle([lat, lon], {
      radius: position.coords.accuracy,
      color: '#3498db',
      fillColor: '#3498db',
      fillOpacity: 0.1
    }).addTo(map);
  },
  function(error) {
    switch (error.code) {
      case 1: alert('Adgang nægtet — tillad lokation i browseren'); break;
      case 2: alert('Position ikke tilgængelig'); break;
      case 3: alert('Timeout — prøv igen'); break;
    }
  }
);
