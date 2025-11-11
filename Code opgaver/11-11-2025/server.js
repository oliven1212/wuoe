const express = require('express');
const { engine } = require('express-handlebars');
const multer = require('multer');

const app = express();
const PORT = 3000;

app.engine('hbs', engine({ 
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/'
}));
app.set('view engine', 'hbs');
//app.set('views', './views');

const upload = multer({ dest: 'kitten/' });

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(`file uploaded to: ${req.file}`);
    res.send('File uploaded successfully');
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

