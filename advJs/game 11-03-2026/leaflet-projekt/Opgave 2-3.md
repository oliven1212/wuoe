## Opgave 2

**"Hent rigtige data"**

Brug Overpass API til at hente steder i nærheden og vis dem på kortet.

**Krav:**
- Vælg én type sted (café, restaurant, apotek, cykelstation — hvad I synes)
- Hent data via `fetch()` og Overpass API
- Plot alle resultater som markører med popup der viser stedsnavnet

**Bounding box til København centrum:**

```
55.65, 12.50, 55.70, 12.60
```

**Startkode:**

```javascript
const query = `
  [out:json];
  node["amenity"="cafe"]
    (55.65,12.50,55.70,12.60);
  out;
`;

fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query))
  .then(r => r.json())
  .then(data => {
    data.elements.forEach(element => {
      L.marker([element.lat, element.lon])
        .addTo(map)
        .bindPopup(element.tags.name || 'Ukendt navn');
    });
  });
```

**Bonus:**
- Vis antal resultater et sted på siden
- Tilføj flere oplysninger i popup'en (fx `element.tags.opening_hours`)
- Brug `circleMarker` i stedet for standard markør og giv den en farve


## Opgave 3

**"Lag og styling"**

Byg videre på opgave 2 — hent **to forskellige typer steder** og vis dem i hvert sit lag med layer control.

**Krav:**
- Mindst to forskellige amenity-typer (fx caféer og apoteker)
- Hvert type skal have sit eget `layerGroup`
- Brug `circleMarker` med **forskellig farve** per type
- Tilføj layer control så man kan tænde/slukke de to lag

**Startkode til layer control:**

```javascript
const cafeLayer = L.layerGroup().addTo(map);
const apotekLayer = L.layerGroup().addTo(map);

// Tilføj markører til det rigtige lag:
L.circleMarker([element.lat, element.lon], {
  radius: 8,
  fillColor: '#3498db',
  color: '#2980b9',
  fillOpacity: 0.8
}).addTo(cafeLayer).bindPopup(element.tags.name || 'Café');

// Layer control
L.control.layers(null, {
  "☕ Caféer": cafeLayer,
  "💊 Apoteker": apotekLayer
}).addTo(map);
```

