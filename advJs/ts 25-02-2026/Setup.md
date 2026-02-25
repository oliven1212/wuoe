# Setup: TypeScript Projekt fra skratch

## Forudsætninger

Tjek at Node.js er installeret: (Hvilket det er for jer)

```bash
node --version
npm --version
```

Hvis ikke, download fra [nodejs.org](https://nodejs.org) (LTS version)

---

## Trin 1: Opret projekt mappe

```bash
mkdir mit-projekt
cd mit-projekt
```
---

## Trin 2: Initialiser npm

```bash
npm init -y
```

Dette opretter en `package.json` fil.

---

## Trin 3: Installer TypeScript

```bash
npm install -D typescript
```

`-D` betyder "developer dependency" — TypeScript bruges kun under udvikling, ikke i produktion.

---

## Trin 4: Opret TypeScript config

```bash
npx tsc --init
```

Dette opretter en `tsconfig.json`. Udskift hele indholdet med dette:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Trin 5: Opret mappestruktur

```bash
mkdir src
```

Din mappestruktur ser nu sådan ud:

```
mit-projekt/
├── src/
├── node_modules/
├── package.json
└── tsconfig.json
```

---

## Trin 6: Tilføj scripts til package.json

Åbn `package.json` og tilføj scripts:

```json
{
  "name": "mit-projekt",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

---

## Trin 7: Opret din første TypeScript fil

Opret filen `src/index.ts`:

```typescript
const greeting: string = "Hello TypeScript!";
console.log(greeting);

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(5, 3));
```

---

## Trin 8: Kør projektet

**Kompilér TypeScript til JavaScript:**

```bash
npm run build
```

**Kør programmet:**

```bash
npm start
```

**Eller brug watch mode under udvikling** (auto-kompilér ved ændringer):
```bash
npm run dev
```

---

## Din færdige mappestruktur

```
mit-projekt/
├── src/
│   └── index.ts        ← Din TypeScript kode
├── dist/               ← Genereres automatisk af tsc
│   └── index.js        ← Kompileret JavaScript
├── node_modules/
├── package.json
└── tsconfig.json
```

> **Husk:** `dist/` mappen genereres automatisk — du redigerer aldrig filer her.

---

## Hvad betyder tsconfig indstillingerne?

| Indstilling | Hvad den gør |
|---|---|
| `target: ES2020` | Hvilken JavaScript version der genereres |
| `module: commonjs` | Node.js module format |
| `strict: true` | Slår alle type checks til — brug altid denne! |
| `outDir: ./dist` | Hvor de kompilerede filer lægges |
| `rootDir: ./src` | Hvor dine TypeScript filer ligger |
