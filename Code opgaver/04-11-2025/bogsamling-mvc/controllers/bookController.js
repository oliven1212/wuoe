const Book  = require('../models/Books'); 

exports.getAllBooks = (req, res) => {
    res.render("books/index", {
        title: "Alle bøger",
        books: Book.getAll(),
    });
}; 

exports.getBookDetails = (req, res) => {
    if (Book.findById(parseInt(req.params.id))) {
        res.render("books/details", {
            book: Book.findById(parseInt(req.params.id)),
        });
    }else{
        res.status(400).json({ error: 'Book not found' });
    }
}; 

exports.showCreateForm = (req, res) => {
res.render("books/create",{});
}; 
exports.createBook = (req, res) => {
    Book.create(req.body.title, req.body.author, parseInt(req.body.year));
    res.redirect('/books');

}; 

exports.showEditForm = (req, res) => {
    if (Book.findById(parseInt(req.params.id))) {
        res.render("books/edit", {
            book: Book.findById(parseInt(req.params.id)),
        });
    }else{
        res.status(400).json({ error: 'Book not found' });
    }
}; 

exports.updateBook = (req, res) => {
    Book.update(parseInt(req.params.id), {
        title: req.body.title,
        author: req.body.author,
        year: parseInt(req.body.year)
    });
    res.redirect('/books/' + req.params.id);
};

exports.deleteBook = (req, res) => {
    Book.remove(parseInt(req.params.id));
    res.redirect('/books');
}; 