import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTodoStore = defineStore('todo', ()=>{
    const todos = ref([]);

    const addTodo = (title) => {
        todos.value.push({
        title, // Does the same as title: title,
        createdAt: new Date(),
        });
    };

    return {
        addTodo,
        todos,
    }
});