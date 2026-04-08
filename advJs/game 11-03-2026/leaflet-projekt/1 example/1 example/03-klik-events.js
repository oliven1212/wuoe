const map = L.map('map').setView([55.6761, 12.5683], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Klik på kortet → tilføj ny markør
map.on('click', function(e) {
  L.marker(e.latlng)
    .addTo(map)
    .bindPopup('Klikket på: ' + e.latlng.lat.toFixed(4) + ', ' + e.latlng.lng.toFixed(4))
    .openPopup();
});

// Markør med klik-event der IKKE bobler videre til kortet
const fastMarkør = L.marker([55.6761, 12.5683])
  .addTo(map)
  .bindPopup('<b>Rådhuspladsen</b><br>Klik på mig!')
  .on('click', function(e) {
    L.DomEvent.stopPropagation(e); // stopper kortet fra at få klikket
    alert('Du klikkede på markøren — ikke kortet!');
  });
