// controllers/todoController.js
const todoModel = require('../models/todoModel');
// GET /todos - Hent alle todos
const getAllTodos = (req, res) => {
    res.json(todoModel.getAllTodos());
};
// GET /todos/:id - Hent specifik todo
const getTodoById = (req, res) => {
    res.json(todoModel.getTodoById(req.params.id));
};
// POST /todos - Opret ny todo
const createTodo = (req, res) => {
    todoModel.createTodo(req.body.title);
    res.json(todoModel.getAllTodos());
};
// PUT /todos/:id - Opdater todo
const updateTodo = (req, res) => {
    todoModel.updateTodo(req.params.id,{title: req.body.title, completed: req.body.completed, createdAt: req.body.createdAt});
    res.json(todoModel.getAllTodos());
};
// DELETE /todos/:id - Slet todo
const deleteTodo = (req, res) => {
    todoModel.deleteTodo(req.params.id);
    res.json(todoModel.getAllTodos());
};
// Eksporter alle controllers
module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};