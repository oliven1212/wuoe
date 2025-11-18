const Book  = require('../models/Books'); 
const upload = require('../multer');


exports.getAllBooks = (req, res) => {
    if(req.query.q){
        searchBooks(req, res);
    }
    res.render("books/index", {
        title: "Alle bøger",
        books: Book.getAll(),
    });
}; 
const searchBooks = (req, res) => {
    const searchTerm = req.query.q || '';
    console.log('Search term:', searchTerm);
    res.render("books/index", {
        title: `Søgeresultater for "${searchTerm}"`,
        books: Book.getBySearch(searchTerm),
    });
};

exports.getBookDetails = (req, res) => {
    if (Book.findById(parseInt(req.params.id))) {
        res.render("books/details", {
            book: Book.findById(parseInt(req.params.id)),
        });
    }else{
        res.render("error", {
            message: 'Book not found',
        });
    }
}; 

exports.showCreateForm = (req, res) => {
res.render("books/create",{});
}; 
exports.createBook = (req, res) => {
    console.log('Uploaded file:', req.file);
    const createBook = Book.create({
        title: req.body.title, 
        author: req.body.author, 
        year: parseInt(req.body.year), 
        image:req.file || null
    });
    if(createBook.error){
        console.log(createBook.error);
        res.render("books/create",{
            bookData: {title: req.body.title, author: req.body.author, year: req.body.year},
            error: createBook.error,
        });
    }else{
        res.redirect('/books');
    }
}; 

exports.showEditForm = (req, res) => {
    if (Book.findById(parseInt(req.params.id))) {
        res.render("books/edit", {
            book: Book.findById(parseInt(req.params.id)),
        });
    }else{
        res.render("error", {
            message: 'Book not found',
        });
    }
}; 

exports.updateBook = (req, res) => {
    Book.update(parseInt(req.params.id), {
        title: req.body.title,
        author: req.body.author,
        year: parseInt(req.body.year), 
        image:req.file
    });
    res.redirect('/books/' + req.params.id);
};

exports.deleteBook = (req, res) => {
    Book.remove(parseInt(req.params.id));
    res.redirect('/books');
}; 



exports.tempImages = (req, res) => {
    //maps the images to just their filenames
    const images = req.files.map((file) => {
        return file.filename
    });
    res.render("books/index",{
        tempImages: images,
    });
}