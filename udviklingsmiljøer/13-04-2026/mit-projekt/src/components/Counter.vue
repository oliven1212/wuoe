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