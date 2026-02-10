<script setup>
import { ref } from 'vue';
import Card from '@/components/card.vue';

const user = ref({
  name: 'John Doe',
  age: '30',
  email: 'john@doe.com'
});

</script>
<template>
  <div>
    <Card :title="user.name">
      <p>Age: {{ user.age }}</p>
      <p>Email: {{ user.email }}</p>
    </Card>
    <Card title="user.name ;)" />
  </div>
</template>
