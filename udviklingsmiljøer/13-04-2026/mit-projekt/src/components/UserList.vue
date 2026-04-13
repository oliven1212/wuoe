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