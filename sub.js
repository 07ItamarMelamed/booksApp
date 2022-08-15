'use strict';

const Joi = require('joi');
const fs = require('fs');

const validateBook = (book) => {
    const schema = {
        name: Joi.string().required(),
        price: Joi.string().pattern(new RegExp('\d+'))
    };

    return Joi.validate(book, schema);
};

const getBooks = () => {
    fs.readFile('books.json', (err, data) => {
        return data;
    });
}

const getBookById = (id) => {
    fs.readFile('books.json', (err, data) => {
        return getBooks().find((book) => book.id === id);
    });
}

const createBook = (content) => {
    const { error } = validateBook(content);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    return {
        name: content.name,
        price: content.price,
        id: getBooks().length + 1
    };
}

const deleteBook = (id) => {
    const book = getBookById(id);
    if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
    }
    
    const index = getBooks().indexOf(book);
    getBooks().splice(index, 1);

    return book;
}

const updateBook = (id, content) => {
    const book = getBookById(id);
    if (!book) {
        return res.status(404).send('The book with the given ID was not found.');
    }

    const { error } = validateBook(content);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    book.name = content.name;
}

// fs.readFile('books.json', (req, res) => {
//     let table = req.body;
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
// });

export {getBooks, getBookById, createBook, deleteBook, updateBook};