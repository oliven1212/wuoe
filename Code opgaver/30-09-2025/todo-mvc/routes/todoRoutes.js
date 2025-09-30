// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
// GET /api/todos - Hent alle todos
router.get('/', todoController.getAllTodos);
// Resterende routes
module.exports = router;