'use strict';

const express = require('express');
const app = express();
const Joi = require('joi');
const port = 3000;

app.use(express.json());

const validateBook = (book) => {
    const schema = {
        name: Joi.string().required(),
        price: Joi.string().required()
    };

    return Joi.validate(book, schema);
};

const getBooks = () => {
    const data = require('./books.json');
    return data;
}

const getBookById = (id) => {
    return getBooks().find((book) => book.id === id);
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
    getBooks().forEach((bookFromList) => {
        if (getBooks().indexOf(bookFromList) > index) {
            bookFromList.id--;
        }
    })
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
    book.price = content.price;
}

app.get('/api/books', (req, res) => {
    res.send(getBooks());
})

app.get('/api/books/:id', (req, res) => {
    res.send(getBookById(parseInt(req.params.id)));
})

app.post('/api/books', (req, res) => {
    const newBook = createBook(req.body);
    getBooks().push(newBook);
    res.send(newBook);
});

app.delete('/api/books/:id', (req, res) => {
    const deletedBook = deleteBook(parseInt(req.params.id));
    res.send(deletedBook);
});

app.put('/api/books/:id', (req, res) => {
    const updatedBook = updateBook(parseInt(req.params.id), req.body);
    res.send(updatedBook);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));