// models/todoModel.js
// In-memory database
let todos = [
{ id: 1, title: 'Lær Express', completed: false, createdAt: new Date()
},
{ id: 2, title: 'Byg API', completed: false, createdAt: new Date() }
];
let nextId = 3; // Til at generere nye IDs
// Hent alle todos
const getAllTodos = () => {
    return todos;
};
// Hent todo by ID
const getTodoById = (id) => {
    console.log(id);
    return todos.find((todo)=>{return todo.id == id});
};
// Opret ny todo
const createTodo = (title) => {
    todos.push({id: todos[todos.length-1].id+1 ? todos[todos.length-1].id+1 : 1, title: title, completed: false, createdAt: new Date()});
};
// Opdater todo
const updateTodo = (id, updates) => {
    if(updates.title && updates.title.length < 0){
        todos[todos.findIndex((todo)=>{return todo.id == id})].title = updates.title;
    }
    if("completed" in updates){
        todos[todos.findIndex((todo)=>{return todo.id == id})].completed = updates.completed;
    }
    if(updates.createdAt){
        todos[todos.findIndex((todo)=>{return todo.id == id})].createdAt = updates.createdAt;
    }
};
// Slet todo
const deleteTodo = (id) => {
    if(todos.find((todo)=>{return todo.id == id})){
        todos.splice(todos.findIndex((todo)=>{return todo.id == id}),1);
    }
};
// Eksporter alle funktioner
module.exports = {
getAllTodos,
getTodoById,
createTodo,
updateTodo,
deleteTodo
};