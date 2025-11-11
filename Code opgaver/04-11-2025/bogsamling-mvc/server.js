const express = require('express');
const { engine } = require('express-handlebars');
const path = require("path");

const app = express();

const PORT = 3000; 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/bookImages', express.static(path.join(__dirname, 'bookImages')));

// View engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/books', bookRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.get('/', (req, res) => {
res.redirect('/books');

}); 