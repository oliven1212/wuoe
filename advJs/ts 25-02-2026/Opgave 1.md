# Basic types
[Types Docs](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
## Opgave: Patientjournal

Du skal lave et simpelt system til at registrere patienter på en lægeklinik. Opgaven er delt i trin, og hvert trin bygger videre på det forrige.

---

### Trin 1 – Registrer en patient

Opret variabler der beskriver en patient. Patienten skal have følgende informationer – sørg for at give hver variabel den korrekte type:

- Fornavn
- Efternavn
- Alder
- Vægt i kg (kan have decimaler)
- Om patienten er ryger
- Blodtype som en tekststreng (fx `"A+"`) eller `enum`
- Et valgfrit felt til allergier – en liste af tekststrenge, men feltet behøver ikke at være udfyldt

Når du har oprettet variablerne, så prøv at tildele en forkert type til to af dem og se hvilke fejlmeddelelser TypeScript giver dig.

---

### Trin 2 – Type inference

Opret de samme variabler igen, men denne gang *uden* at skrive typerne eksplicit. Lad TypeScript gætte dem selv ud fra værdierne.

Prøv derefter at ændre en af variablerne til en forkert type og bekræft at TypeScript stadig fanger fejlen, selv uden at du har skrevet typen selv.

---

### Trin 3 – Blodtryk og målinger

En patient har fået målt blodtryk tre gange i løbet af dagen. Opret to arrays – ét til de systoliske værdier (det øverste tal) og ét til de diastoliske værdier (det nederste tal). Begge skal kun måtte indeholde tal.

Prøv at tilføje en tekststreng til et af arrays og se hvad TypeScript siger.

Skriv derefter en udregning der finder gennemsnittet af de tre systoliske målinger og gemmer det i en variabel med den korrekte type.

---

### Trin 4 – Journalnummer og unknown data

Klinikken modtager nogle gange patientdata fra et eksternt system, og det er ikke altid klart hvilken type dataen har. Opret en variabel `eksternData` med typen `unknown` og sæt den til et journalnummer som et tal.

Prøv at lægge 1000 til `eksternData` direkte. Hvad sker der?

Fix det bagefter ved at tjekke typen med `typeof` først, og gem resultatet i en ny variabel med typen `number`.

Opret derefter en variabel `journalNummer` der enten kan være et `number` eller en `string`, fordi nogle gamle journaler bruger tekstbaserede numre som `"KBH-4421"`. Sæt den til begge typer på skift og bekræft at begge er gyldige.

---

### Trin 5 – Patientstatus

Opret en variabel `status` der beskriver om patienten er indlagt, udskrevet eller på venteliste. Den skal kun kunne indeholde én af disse tre tekststrenge:

```typescript
type PatientStatus = "indlagt" | "udskrevet" | "venteliste";
```

Opret tre forskellige variabler med typen `PatientStatus` og sæt dem til hver sin gyldige værdi. Prøv derefter at sætte en af dem til `"hjemsendt"` og se hvad TypeScript siger.

Opret til sidst en variabel `aktivPatient` af typen `boolean` der er `true` hvis status er `"indlagt"`, og `false` i alle andre tilfælde.

---

### Trin 6 – Saml det hele

Nu skal du samle alle variablerne fra de foregående trin og printe en lille opsummering til konsollen med `console.log`. Outputtet skal ligne dette:

```
Patient: Anna Larsen, 54 år
Blodtype: A+
Ryger: Ja
Gennemsnitligt systolisk blodtryk: 132
Journalnummer: KBH-4421
Status: indlagt
```

Brug `typeof`-tjek hvor det er nødvendigt, og sørg for at TypeScript ikke viser nogen fejl i din kode når du er færdig.

---

### Ekstraopgave (hvis der er tid)

Klinikken vil gerne kunne registrere om en patient har givet samtykke til at deres data må deles med andre læger. Opret en variabel `samtykke` der enten er `true`, `false` eller `null` – hvor `null` betyder at patienten endnu ikke er blevet spurgt. Skriv en linje der printer en passende besked for alle tre tilfælde.

---

Opgaven dækker `string`, `number`, `boolean`, `array`, `unknown`, union types og literal types, og holder sig hele vejen igennem til de grundlæggende byggesten uden at introducere interfaces eller funktioner.