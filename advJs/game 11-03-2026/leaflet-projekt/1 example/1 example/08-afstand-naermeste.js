const map = L.map('map').setView([55.6761, 12.5683], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const cafeData = [
  { lat: 55.6761, lon: 12.5683, name: "Café Rådhuspladsen" },
  { lat: 55.6795, lon: 12.5701, name: "The Coffee Collective" },
  { lat: 55.6748, lon: 12.5756, name: "Café Nørreport" },
  { lat: 55.6812, lon: 12.5669, name: "Democratic Coffee" },
  { lat: 55.6733, lon: 12.5621, name: "Café Vesterbro" },
];

navigator.geolocation.getCurrentPosition(
  function(position) {
    const brugerPos = L.latLng(position.coords.latitude, position.coords.longitude);

    map.setView(brugerPos, 15);

    L.marker(brugerPos)
      .addTo(map)
      .bindPopup('📍 Du er her!')
      .openPopup();

    // Find nærmeste café
    let nærmest = null;
    let kortestAfstand = Infinity;

    cafeData.forEach(sted => {
      const stedPos = L.latLng(sted.lat, sted.lon);
      const afstand = brugerPos.distanceTo(stedPos);

      // Vis alle caféer som grå markører
      L.circleMarker(stedPos, {
        radius: 8,
        fillColor: '#95a5a6',
        color: '#fff',
        weight: 2,
        fillOpacity: 0.8
      }).addTo(map).bindPopup(sted.name + '<br>' + afstand.toFixed(0) + ' meter væk');

      if (afstand < kortestAfstand) {
        kortestAfstand = afstand;
        nærmest = sted;
      }
    });

    // Fremhæv den nærmeste
    if (nærmest) {
      const nærmestPos = L.latLng(nærmest.lat, nærmest.lon);

      // Grøn markør til nærmeste
      L.circleMarker(nærmestPos, {
        radius: 12,
        fillColor: '#2ecc71',
        color: '#fff',
        weight: 3,
        fillOpacity: 1
      }).addTo(map).bindPopup('🏆 Nærmest: ' + nærmest.name + '<br>' + kortestAfstand.toFixed(0) + ' meter').openPopup();

      // Linje fra bruger til nærmeste
      L.polyline([brugerPos, nærmestPos], {
        color: '#2ecc71',
        dashArray: '6, 8'
      }).addTo(map);
    }
  },
  function(error) {
    alert('Kunne ikke hente position: ' + error.message);
  }
);
