## Opgave: Temperatursystem

Du skal lave et system der kan arbejde med temperaturer og vejrdata. Opgaven bygger trin for trin videre, og alle løsninger skrives som funktioner.

[TypeScript Docs functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)

---

### Trin 1 – Din første typede funktion

Skriv en funktion `celsiusTilFahrenheit` der tager en temperatur i Celsius som et tal og returnerer temperaturen i Fahrenheit. Formlen er: `(celsius * 9/5) + 32`.

Sørg for at både parameteren og returtypen er eksplicit angivet. Test den med et par værdier:

```typescript
celsiusTilFahrenheit(0);   // 32
celsiusTilFahrenheit(100); // 212
celsiusTilFahrenheit(-40); // -40
```

Prøv derefter at kalde funktionen med en streng i stedet for et tal og se hvad TypeScript siger.

---

### Trin 2 – Flere parametre og returtype

Skriv en funktion `beskriv­Vejr` der tager to parametre: en temperatur i Celsius (`number`) og en vejrbeskrivelse (`string`). Funktionen skal returnere en samlet streng.

```typescript
beskriv­Vejr(22, "solrigt");  // "Det er 22 grader og solrigt"
beskriv­Vejr(-3, "snestorm"); // "Det er -3 grader og snestorm"
```

Skriv derefter en funktion `erVarmt` der tager en temperatur og returnerer en `boolean` – `true` hvis temperaturen er over 25 grader, ellers `false`. Angiv returtypen eksplicit.

---

### Trin 3 – Optional parameter

Skriv en funktion `formatérTemperatur` der tager en temperatur som tal og en valgfri enhed som streng (`"C"` eller `"F"`). Hvis enheden ikke er angivet, skal funktionen bruge `"C"` som standard.

```typescript
formatérTemperatur(22);      // "22°C"
formatérTemperatur(72, "F"); // "72°F"
```

Prøv at kalde funktionen både med og uden den valgfri parameter og bekræft at begge varianter virker uden fejl.

---

### Trin 4 – void og side effects

Skriv en funktion `logTemperatur` der tager en by (`string`) og en temperatur (`number`), printer en besked til konsollen og ikke returnerer noget. Angiv eksplicit at returtypen er `void`.

```typescript
logTemperatur("København", 12); // Logger: "København: 12°C"
```

Prøv at tilføje en `return`-sætning der returnerer et tal og se hvad TypeScript siger.

---



### Trin 5 – Saml det hele

Brug alle dine funktioner til at lave en lille vejrrapport. Outputtet skal ligne dette:

```
København: 18°C
Er det varmt? Nej
I Fahrenheit: 64.4°F
Det er 18 grader og overskyet
```

Brug `logTemperatur` til at printe, `erVarmt` til at tjekke temperaturen, `celsiusTilFahrenheit` og `formatérTemperatur` til at omregne og formatere, og `beskriv­Vejr` til den sidste linje. Sørg for at der ikke er nogen TypeScript-fejl når du er færdig.

---


Opgaven dækker typede parametre, returtyper, optional parameters, `void`, og funktioner som værdier – og holder sig hele vejen igennem til function types uden at introducere interfaces eller generics.