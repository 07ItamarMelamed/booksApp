'use strict';

import {
    getBooks    as List, 
    getBookById as Read,
    createBook  as Create,
    deleteBook  as Delete, 
    updateBook  as Update
} from '/sub.js';

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/books', (req, res) => {
    res.send(List());
})

app.get('/api/books/:id', (req, res) => {
    res.send(Read(parseInt(req.params.id)));
})

app.post('/api/books', (req, res) => {
    const newBook = Create(req.body);
    getBooks().push(newBook);
    res.send(newBook);
});

app.delete('/api/books/:id', (req, res) => {
    const deletedBook = Delete(parseInt(req.params.id));
    res.send(deletedBook);
});

app.put('/api/books/:id', (req, res) => {
    const updatedBook = Update(parseInt(req.params.id), req.body);
    res.send(updatedBook);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));