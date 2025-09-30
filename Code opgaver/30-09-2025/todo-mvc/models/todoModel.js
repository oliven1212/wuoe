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
// ???
};
// Opret ny todo
const createTodo = (title) => {
// ????
};
// Opdater todo
const updateTodo = (id, updates) => {
// ???
};
// Slet todo
const deleteTodo = (id) => {
// ????
};
// Eksporter alle funktioner
module.exports = {
getAllTodos,
getTodoById,
createTodo,
updateTodo,
deleteTodo
};