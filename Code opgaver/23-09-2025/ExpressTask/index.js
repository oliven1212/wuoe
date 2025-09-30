const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(PORT, () => {
    console.log(`Server kører på http://localhost:${PORT}`);
});

//works on all run types on the path
app.all('/secret/:id', (req, res, next) => {
  console.log(req.params.id);
      res.send('Velkommen');

  next() // pass control to the next handler
})

app.get('/', (req, res) => {
    res.send('Velkommen');
});

// http://localhost:3006/user/John
app.get('/user/:id', (req, res) => {
    res.send(`<h1 style="background-color:deeppink;">${req.params.id}</h1>`);
    console.log(`hello`);
});


//Sends query data to the server http://localhost:3006/query?q=Hello
app.get('/query', (req, res) => {
    res.send(`${req.query.q}`)
})

//:id can be anything in the url and we can return its value


//Post Raw JSON {"name": "John","age": 25,"email": "john@example.com"}
app.post('/person', (req, res) => {
    res.send(req.body);
});
// http://localhost:3334/search?query=express&category=web
app.get('/search',(req, res) => {
    res.send(`${req.query.query ? req.query.query:""} ${req.query.category ?"| " + req.query.category:""} ${req.query.level ?"| " + req.query.level:""} ${req.query.framework ?"| " + req.query.framework:""} ${req.query.search ?"| " + req.query.search:""} ${req.query.lang ?"| " + req.query.lang:""} ${req.query.difficulty ?"| " + req.query.difficulty:""}`);
});

// Form-data post call that accepts files
app.post('/submit', (req, res) => {
  res.send(`${req.body.name ? "Name: " + req.body.name:""}${req.body.age ? "\nAge: " + req.body.age:""}${req.body.message ? "\nMessage: " + req.body.message:""}`);
});