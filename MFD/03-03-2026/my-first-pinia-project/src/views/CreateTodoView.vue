<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/TodoStore';

const todo = ref('');

const todoStore = useTodoStore();

const addTodo = () => {
    todoStore.addTodo(todo.value);
    todo.value = '';
};

</script>

<template>
<form @submit.prevent="addTodo">
    <input v-model="todo" placeholder="Enter a new todo"/>
    <button type="submit">Add todo</button>
</form>
</template>
