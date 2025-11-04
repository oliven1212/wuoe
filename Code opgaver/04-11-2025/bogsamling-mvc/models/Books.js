let books = [

{ id: 1, title: 'Harry Potter og De Vises Sten', author: 'J.K. Rowling', year: 1997 },

{ id: 2, title: '1984', author: 'George Orwell', year: 1949 },

{ id: 3, title: 'Ringenes Herre', author: 'J.R.R. Tolkien', year: 1954 }

]; 
let nextId = 4; 

const getAll = () => {
  return books;
}

const getBySearch = (searchTerm) => {
  return books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()));
}

const findById = (id) => {
  return books.find(book => book.id === id);
}
const create = (bookData) => {
  if(bookData.title.length <= 2){
    return {error: 'Title must be longer than 2 characters'};
  }
  if(bookData.year < 1000 || bookData.year >= new Date().getFullYear()){
    return {error: 'Year must be a valid year'};
  }

  const newBook = { id: nextId++, title: bookData.title, author: bookData.author, year: bookData.year };
  books.push(newBook);
  return {book: newBook};
}
const update = (id, bookData) => {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books[index] = { id:books[index].id, title: bookData.title, author: bookData.author, year: bookData.year};
    }
    return books[index];
}

const remove = (id) => {
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
    }
}; 

module.exports = {
    getAll,
    getBySearch,
    findById,
    create,
    update,
    remove
}; 