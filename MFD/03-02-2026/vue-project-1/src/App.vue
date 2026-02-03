<script setup>
  import { ref } from "vue";
  import Message from "@/components/Message.vue";

  const isMessageVisible = ref(true);
</script>

<template>
  <button @click="isMessageVisible = !isMessageVisible;"> Toggle Message</button>

<Message v-show="isMessageVisible" />
</template>

<style scoped></style>
