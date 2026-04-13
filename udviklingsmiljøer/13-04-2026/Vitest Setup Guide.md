# Vitest Setup Guide


## 1. Opret et nyt Vue-projekt

```bash
npm create vue@latest mit-projekt
cd mit-projekt
npm install
```

> Vælg **Yes** til Vitest når installeren spørger — så er alt sat op automatisk.

Installer derefter jsdom og tilføj det til din `vite.config.js` — det simulerer en browser så Vue-komponenter kan rendere i tests:

```bash
npm install -D jsdom
```

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
```

> Uden `jsdom` får du fejlen `document is not defined` når du tester Vue-komponenter.

---

## 2. Har du et eksisterende projekt?

Installer Vitest manuelt:

```bash
npm install -D vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

Tilføj følgende til din `vite.config.js`:

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
})
```

Tilføj test-script til `package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run"
}
```

---

## 3. Projektstruktur

```
src/
├── components/
│   └── MinKomponent.vue
├── utils/
│   ├── add.js
│   └── add.test.js     ← testfil ligger ved siden af koden
└── App.vue
```

> Testfiler skal hedde `noget.test.js` eller `noget.spec.js` for at Vitest finder dem automatisk.

---

## 4. Din første test

Opret `src/utils/add.js`:

```js
export function add(tal1, tal2) {
  return Number(tal1) + Number(tal2)
}
```

Opret `src/utils/add.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { add } from './add'

describe('add', () => {
  it('kan lægge to positive tal sammen', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('kan lægge to negative tal sammen', () => {
    expect(add(-1, -1)).toBe(-2)
  })

  it('returnerer 0 når begge tal er 0', () => {
    expect(add(0, 0)).toBe(0)
  })

  it('håndterer strings fra HTML input-felter', () => {
    expect(add('5', '2')).toBe(7)
  })
})
```

---

## 5. Kør dine tests

```bash
npm run test
```

Vitest kører i **watch-mode** som standard — den genkører automatisk når du gemmer en fil.

Vil du køre tests én gang og afslutte (f.eks. i CI):

```bash
npm run test:run
```

---

## 6. Teststruktur — de vigtigste byggeklodser

```js
describe('navn på det du tester', () => {   // grupperer tests sammen

  it('beskriver hvad der skal ske', () => {  // én test

    // Arrange — gør klar
    const input = 5

    // Act — udfør
    const result = add(input, 3)

    // Assert — tjek resultatet
    expect(result).toBe(8)

  })

})
```

---

## 7. De vigtigste matchers

```js
expect(result).toBe(5)              // præcis lig med (tal, strings, booleans)
expect(result).toEqual({ a: 1 })    // dyb sammenligning (objekter, arrays)
expect(result).toBeTruthy()         // er sand/truthy
expect(result).toBeFalsy()          // er falsk/falsy
expect(result).toContain('hej')     // indeholder værdien
expect(result).toHaveLength(3)      // har den rigtige længde
expect(() => fn()).toThrow()        // kaster en fejl
expect(result).not.toBe(5)         // det modsatte af en matcher
```

---

## 8. Hvad skal jeg teste?

| Test dette | Test ikke dette |
|---|---|
| Forretningslogik og beregninger | At Vue kan rendere en template |
| Validering af input | At JavaScript kan lægge tal sammen |
| Formatering af data | Ting du ikke selv har skrevet |
| Edge cases (nul, tomme strings, negative tal) | Unødvendige negative tests |

---

## 9. Huskereglen

> **Logik hører hjemme i `.js` filer hvis det bruges mere end ét sted — ikke i komponenter.**
>
> Kode der er nem at teste er næsten altid bedre struktureret.
