# Opgave — Test af Vue-komponenter

## Din opgave
Nedenfor er en Counter-komponent. Din opgave er at skrive så mange meningsfulde tests du kan finde til den.

Du skal **ikke** ændre i komponenten — kun skrive tests til den.

---

## Komponenten

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button class="add" @click="increment">Add</button>
    <button class="subtract" @click="decrement">Subtract</button>
    <p class="warning" v-if="count === 0">Count is already 0!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() { count.value++ }
function decrement() { if (count.value > 0) count.value-- }
</script>
```

---

## Kom i gang

Opret en fil der hedder `Counter.test.js` ved siden af din komponent:

```js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Counter from './Counter.vue'

describe('Counter', () => {

  it('shows 0 when it starts', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('0')
  })

  // skriv dine tests herunder...

})
```

---

## Tænk over

- Hvad viser komponenten når den indlæses første gang?
- Hvad sker der når du klikker Add?
- Hvad sker der når du klikker Subtract?
- Hvad sker der når count er 0 og du klikker Subtract?
- Er der noget der skal vises eller skjules afhængigt af count?

---

## Nyttige metoder

```js
wrapper.text()                         // al tekst i komponenten
wrapper.find('.add')                   // find element via class
wrapper.find('p').text()               // tekst inde i et bestemt element
wrapper.find('.warning').exists()      // eksisterer elementet?
await wrapper.find('.add').trigger('click')  // simuler et klik
```