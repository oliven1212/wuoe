// controllers/todoController.js
const todoModel = require('../models/todoModel');
// GET /todos - Hent alle todos
const getAllTodos = (req, res) => {
    // ??
};
// GET /todos/:id - Hent specifik todo
const getTodoById = (req, res) => {
    // ????
};
// POST /todos - Opret ny todo
const createTodo = (req, res) => {
    // ???
};
// PUT /todos/:id - Opdater todo
const updateTodo = (req, res) => {
    // ???
};
// DELETE /todos/:id - Slet todo
const deleteTodo = (req, res) => {
    // ???
};
// Eksporter alle controllers
module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};