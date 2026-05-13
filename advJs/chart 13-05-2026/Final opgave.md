# Final opgave — Dit eget datavisualiseringsprojekt


## Opgaven

Du skal bygge en selvstændig datavisualiseringsapplikation fra bunden — med dine egne data og dit eget design.

Du bestemmer selv hvad du vil vise, og hvordan du vil vise det. Det eneste krav er at du bruger det du har lært i dag.

---

## Vælg dit datasæt

Du kan enten bruge det datasæt vi har arbejdet med, eller finde dit eget.

**Brug det fælles datasæt:**  
`GAMES_1995_2019.xlsx` — du kender det allerede, og der er masser at udforske som vi ikke har set på endnu.

**Find dit eget Excel-ark:**  
Her er nogle steder du kan finde gratis datasæt som .xlsx eller .csv:

- [Our World in Data](https://ourworldindata.org) — befolkning, klimadata, økonomi, sundhed
- [Kaggle Datasets](https://www.kaggle.com/datasets) — sport, film, musik, e-handel, og meget mere
- [Danmarks Statistik](https://www.dst.dk/da/Statistik/brug-statistikken/muligheder-i-statistikbanken) — dansk økonomi, befolkning, beskæftigelse
- [data.europa.eu](https://data.europa.eu) — åbne EU-data om alt fra landbrug til transport

> Har du et CSV-fil? SheetJS kan også læse `.csv` — du behøver ikke konvertere den.

---

## Krav

Din applikation skal opfylde disse krav:

- [ ] Data indlæses fra en fil (upload eller direkte fra et array hvis du foretrækker det)
- [ ] Mindst **to forskellige visualiseringer** af dataen
- [ ] Brugeren kan **interagere** med applikationen på en eller anden måde — fx en dropdown, knapper eller filtrering
- [ ] Koden bruger mindst **én af**: `filter()`, `map()`, `reduce()`
- [ ] Der er en **TypeScript interface** der beskriver dataens form

---

## Idéer til hvad du kan bygge

Har du valgt `GAMES_1995_2019.xlsx`? Her er nogle vinkler vi ikke har set på:

- **Platformkrig** — hvilken platform dominerede hvert årti? PS1 vs N64 vs Saturn i 90erne, PS2 vs Xbox vs GameCube i 00erne
- **Genrernes guldalder** — hvornår toppede RPG'er, shooters, platformers?
- **Publisher-analyse** — hvilke publishers har flest spil? Har de specialiseret sig i bestemte genrer?
- **Månedlig udgivelsesmønster** — udgives der flest spil i december op til jul?

Har du valgt et andet datasæt? Tænk over:

- Hvad er den mest interessante ting at vise i dette datasæt?
- Hvad ville du selv have villet vide, inden du så dataen?
- Er der en overraskende sammenhæng du kan visualisere?

---

## Frihed og stretch goals

Der er ingen fast struktur for denne opgave — du bestemmer selv. Men her er nogle idéer til at gøre det ekstra:

**Mere interaktion:**
- Tilføj et søgefelt der filtrerer data live mens du skriver
- Tilføj to `<input type="range">`-felter der lader brugeren vælge et årsinterval
- Lad brugeren klikke på en bar i grafen og se detaljer om det år/den kategori

**Mere data:**
- Kombiner to datasæt og vis en sammenhæng mellem dem
- Beregn gennemsnit, median eller procenter og vis dem i grafen

**Bedre design:**
- Tilføj en overskrift og en kort beskrivelse af hvad grafen viser
- Brug farver der understreger historien i dataen — fx rød for rekordår, grå for resten
- Tilføj animationer (Chart.js understøtter det ud af boksen)

