<script setup>
    import { useTodoStore } from '@/stores/TodoStore';
    import { ref } from 'vue';

    const todoStore = useTodoStore();
</script>
<template>
    <ul>
        <li 
        v-for="(item, index) in todoStore.todos"
        :key="index"
        >
            {{ item.title }}
        </li>
    </ul>
</template>