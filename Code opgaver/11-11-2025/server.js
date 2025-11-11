const express = require('express');
const { engine } = require('express-handlebars');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/kitten', express.static('kitten'));

app.engine('hbs', engine({ 
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/'
}));
app.set('view engine', 'hbs');
//app.set('views', './views');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'kitten/');
    },
    filename: function (req, file, cb) {
        cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    //limits: { fileSize: 1024 * 1024 * 5 } // 5 MB limit
 });


app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(`file uploaded to: ${req.file}`);
    res.render('index', { filename: req.file.filename });

});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

