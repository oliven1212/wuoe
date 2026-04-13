# Opgave — Props, emits og computed

## Din opgave
Nedenfor er en `UserList` komponent. Din opgave er at skrive tests til den.

Du skal **ikke** ændre i komponenten — kun skrive tests til den.

---

## Komponenten

```vue
<template>
  <ul>
    <li
      v-for="user in users"
      :key="user.id"
      class="user"
      @click="$emit('select', user)"
    >
      {{ user.name }}
    </li>
  </ul>
  <p class="empty" v-if="users.length === 0">Ingen brugere at vise.</p>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select'])
</script>
```

---

## Kom i gang

Opret en fil der hedder `UserList.test.js` ved siden af komponenten:

```js
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import UserList from './UserList.vue'

const users = [
  { id: 1, name: 'Anna' },
  { id: 2, name: 'Lars' },
  { id: 3, name: 'Mia' }
]

describe('UserList', () => {

  // skriv dine tests herunder...

})
```

---

## Tænk over

- Vises alle brugere når listen har indhold?
- Vises den rigtige tekst for hver bruger?
- Hvad sker der når listen er tom?
- Hvad sker der når man klikker på en bruger?
- Emitter komponenten det rigtige event med den rigtige bruger?

---

## Nyttige metoder

```js
// Props
const wrapper = mount(UserList, {
  props: { users: users }
})

// Find flere elementer
wrapper.findAll('.user')            // returnerer et array af elementer
wrapper.findAll('.user').length     // antal elementer

// Emits
await wrapper.find('.user').trigger('click')
wrapper.emitted('select')           // returnerer alle 'select' events
wrapper.emitted('select')[0][0]     // første event, første argument
```