<script setup>
  import { onBeforeMount, onMounted, ref, onUpdated, watch } from 'vue';

const message = ref('');
const messageVisible = ref(true);

onUpdated(() => {
  console.log('Updated');
});

onMounted(()=>{
  console.log('onMounted ran');
});

onBeforeMount(()=>{
  console.log('OnBeforeMount ran');
});

watch(message, () => {
  console.log('watch message ran');
  if(message.value.length > 3){
    console.log('nu er dit password sikkert');
  }
});

</script>

<template>
<input v-model="message">
<br>
<p v-if="messageVisible">{{ message }}</p>
<button @click="messageVisible = !messageVisible">Jeg er en knap</button>
</template>
