## Setup Guide

### Forudsætninger
Ingen installation nødvendig — vi kører alt i browseren med CDN.


### Trin 1 — Opret projektmappe

```
leaflet-projekt/
├── index.html
└── main.js
```

---

### Trin 2 — Basis HTML med Leaflet

Opret `index.html` og indsæt følgende:

```html
<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mit kort</title>

  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    #map { height: 100vh; width: 100%; }
  </style>
</head>
<body>

  <div id="map"></div>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="main.js"></script>

</body>
</html>
```

---

### Trin 3 — Opret kortet i main.js

```javascript
// Opret kortet og centrer på København
const map = L.map('map').setView([55.6761, 12.5683], 13);

// Tilføj OpenStreetMap tiles (det der faktisk tegner kortet)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
```

---

### Trin 4 — Tjek at det virker

Åbn `index.html` med Live Server. Du skulle nu se et interaktivt kort over København. Du kan zoome og panorere.

**Fejler det?**
- Tjek at filnavnene stemmer overens (`main.js` i begge filer)
- Tjek browserkonsollen for fejlmeddelelser (F12)
- Tjek at du har internetforbindelse (tiles hentes live)

---

### Trin 5 — Tilføj en markør

```javascript
// Tilføj en markør med popup
L.marker([55.6761, 12.5683])
  .addTo(map)
  .bindPopup('<b>Rådhuspladsen</b><br>Vi er her!')
  .openPopup();
```

---

## Opgave 1

**"Mit personlige kort"**

Lav et kort med **mindst 5 markører** over steder du selv vælger.

Det kan fx være:

- Steder du har boet
- Byer du har besøgt
- Dine yndlingsrestauranter i København
- Seværdigheder du anbefaler
- Ynglings Biltema´er

**Krav:**
- Kortet skal centeres fornuftigt ift. dine markører
- Alle markører skal have en popup med navn og kort beskrivelse
- Mindst én markør skal have HTML i sin popup (fx fed tekst eller et link)

**Bonus:**
- Tilføj en cirkel eller polygon rundt om et område
- Lav et klik-event så der tilføjes en ny markør når du klikker på kortet
- Find og brug en alternativ tile-stil (se tip nedenfor)

---

**Tip — alternative tile-styles:**

```javascript
// CartoDB (renere, minimalistisk)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© OpenStreetMap © CARTO'
}).addTo(map);

// Stamen Toner (sort/hvid)
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by Stamen Design'
}).addTo(map);
```

**Find koordinater:** Højreklik på [Google Maps](https://maps.google.com) → klik på koordinaterne der dukker op
