// app.js
const express = require('express');
const todoRoutes = require('./routes/todoRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Simple logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
    next();
});
// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'TODO API - MVC Architecture',
        version: '1.0.0',
        endpoints: {
            getAllTodos: 'GET /api/todos',
            getTodoById: 'GET /api/todos/:id',
            createTodo: 'POST /api/todos',
            updateTodo: 'PUT /api/todos/:id',
            deleteTodo: 'DELETE /api/todos/:id'
        }
    });
});
// Mount todo routes
app.use('/api/todos', todoRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route ikke fundet'
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});
// Start server
app.listen(PORT, () => {
    console.log(`Server kører på http://localhost:${PORT}`);
    console.log(`Test API: http://localhost:${PORT}/api/todos`);
});
module.exports = app;