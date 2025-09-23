const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const PORT = 3006;
const app = express();

app.listen(PORT, () => {
    console.log(`Server kører på http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Velkommen');
});
app.get('/hello', (req, res) => {
    res.send('Hello');
});