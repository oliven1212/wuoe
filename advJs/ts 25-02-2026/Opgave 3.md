# Opgave: Biografens Booking System

## Formål
Du skal bygge et booking system for en biograf. Opgaven er delt i to dele — første del træner functions og objects, anden del refaktorerer koden med interfaces.

---

## Del 1: Functions & Objects

Du må **ikke** bruge interfaces i denne del — brug inline object types.

### Opgave 1.1: Definer dine data

Opret følgende variabler med korrekte inline types:

```typescript
// En film
const movie: { title: string; duration: number; ageLimit: number } = {
    title: "The Matrix",
    duration: 136,
    ageLimit: 15
};

// En forestilling
const screening: {
    movie: { title: string; duration: number; ageLimit: number };
    time: string;
    room: number;
    totalSeats: number;
    bookedSeats: number;
} = {
    movie: movie,
    time: "18:30",
    room: 1,
    totalSeats: 100,
    bookedSeats: 30
};
```

Se på de to type definitioner — hvad er problemet? 

### Opgave 1.2: Implementer funktioner

```typescript
// Funktion 1: Returner antal ledige pladser
function getAvailableSeats(screening: ???): number {
    // Hint: totalSeats - bookedSeats
}

// Funktion 2: Returner true hvis der er nok ledige pladser
function isAvailable(screening: ???, seats: number): boolean {
    // Hint: brug getAvailableSeats
}

// Funktion 3: Beregn samlet pris
// Normal billet: 110 kr
// Sal 1 og 2: 130 kr (premium sale)
function calculatePrice(screening: ???, seats: number): number {
    // Din kode her
}

// Funktion 4: Book billetter
// Returner null hvis der ikke er nok pladser
// Opdater bookedSeats på forestillingen
function bookSeats(screening: ???, customerName: string, seats: number): ??? {
    // Din kode her
}
```

### Opgave 1.3: Test dit system

```typescript
const booking = bookSeats(screening, "Anna Hansen", 2);
console.log(booking);

// Hvad sker der her?
const failedBooking = bookSeats(screening, "Peter Jensen", 999);
console.log(failedBooking); // Hvad forventer du?
```

**Stop her og vis din løsning til underviser før du går videre!**

---

## Del 2: Refaktorering med Interfaces

Kig på din kode fra Del 1. Du skriver sandsynligvis den samme lange inline type flere steder. Det er præcis det interfaces løser!

### Opgave 2.1: Udskift inline types med interfaces

Definer følgende interfaces og opdater din eksisterende kode:

```typescript
interface Movie {
    id: number;
    title: string;
    duration: number;
    genre: string;
    ageLimit: number;
}

interface Screening {
    id: number;
    movie: Movie;         // Bruger Movie interface!
    time: string;
    room: number;
    totalSeats: number;
    bookedSeats: number;
}

interface Booking {
    id: number;
    screening: Screening; // Bruger Screening interface!
    customerName: string;
    seats: number;
    totalPrice: number;
}
```

Opdater nu dine funktioner fra Del 1 så de bruger de nye interfaces i stedet for inline types.

Hvad sker der med dine funktioner? Er de nemmere at læse nu?

### Opgave 2.2: Udvid systemet

Nu hvor du har interfaces er det nemt at udvide. Tilføj følgende funktioner:

```typescript
// Funktion 5: Returner info om forestillingen som string
// Output: "The Matrix - 18:30 (Sal 1) — 32/100 pladser booket"
function getScreeningInfo(screening: Screening): string {
    // Din kode her
}

// Funktion 6: Find alle forestillinger med en bestemt film
function findScreeningsByMovie(
    screenings: Screening[],
    movieTitle: string
): Screening[] {
    // Din kode her
}

// Funktion 7: Returner alle udsolgte forestillinger
function getSoldOutScreenings(screenings: Screening[]): Screening[] {
    // Din kode her
}
```

### Opgave 2.3: Test det hele

Opret testdata og kør systemet:

```typescript
const matrix: Movie = {
    id: 1,
    title: "The Matrix",
    duration: 136,
    genre: "Action",
    ageLimit: 15
};

const oppenheimer: Movie = {
    id: 2,
    title: "Oppenheimer",
    duration: 180,
    genre: "Drama",
    ageLimit: 15
};

const screenings: Screening[] = [
    {
        id: 1,
        movie: matrix,
        time: "18:30",
        room: 1,
        totalSeats: 100,
        bookedSeats: 30
    },
    {
        id: 2,
        movie: oppenheimer,
        time: "20:00",
        room: 2,
        totalSeats: 80,
        bookedSeats: 79  // Næsten fyldt!
    },
    {
        id: 3,
        movie: matrix,
        time: "21:00",
        room: 3,
        totalSeats: 60,
        bookedSeats: 0
    }
];

// Book billetter
const booking1 = bookSeats(screenings[0], "Anna Hansen", 2);
const booking2 = bookSeats(screenings[1], "Peter Jensen", 3); // Skal returnere null!
const booking3 = bookSeats(screenings[2], "Marie Nielsen", 4);

// Vis info om alle forestillinger
screenings.forEach(screening => {
    console.log(getScreeningInfo(screening));
});

// Find alle Matrix forestillinger
const matrixScreenings = findScreeningsByMovie(screenings, "The Matrix");
console.log(`Matrix vises ${matrixScreenings.length} gange`);
```

**Forventet output:**

```
The Matrix - 18:30 (Sal 1) — 32/100 pladser booket
Oppenheimer - 20:00 (Sal 2) — 79/80 pladser booket
The Matrix - 21:00 (Sal 3) — 4/60 pladser booket
Matrix vises 2 gange
```

---

## Minimum Requirements

**Del 1:**
- [ ] Variabler er defineret med korrekte inline types
- [ ] `getAvailableSeats` virker
- [ ] `isAvailable` virker
- [ ] `bookSeats` returnerer `null` når der ikke er nok pladser
- [ ] `bookSeats` opdaterer `bookedSeats` korrekt

**Del 2:**
- [ ] Alle tre interfaces er defineret korrekt
- [ ] Alle funktioner fra Del 1 bruger de nye interfaces
- [ ] `getScreeningInfo` returnerer korrekt formateret string
- [ ] `findScreeningsByMovie` virker korrekt
- [ ] Output matcher det forventede

---

## Stretch Goals

**Stretch Goal 1: `cancelBooking`**

```typescript
function cancelBooking(booking: Booking): void {
    // Frigør pladserne på forestillingen
    // Print en bekræftelse til konsollen
}
```

**Stretch Goal 2: Aldersgrænse**

Tilføj `customerAge` som parameter til `bookSeats` og returner `null` hvis kunden er for ung til filmen.

**Stretch Goal 3: Rabatter**

Tilføj en `discount` parameter til `calculatePrice`:
- `"student"` — 20% rabat
- `"pensioner"` — 25% rabat
- `"child"` — 30% rabat

---

## Hints

**Hvad er meningen med Del 1?**
Del 1 viser dig *præcis* hvorfor interfaces er nyttige. Når du skriver den samme lange inline type 3-4 gange, begynder det at gøre ondt — og det er meningen!

**Står du fast på `bookSeats` return type?**
Funktionen skal kunne returnere enten en `Booking` eller `null`:

```typescript
function bookSeats(...): Booking | null {
```

**Hvordan laver jeg et unikt id?**

```typescript
id: Date.now()
```
