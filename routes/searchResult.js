const express = require('express');
const router = express.Router();
const getBooks = require('../repositories/booksRepository');

/* GET result page. */
router.get('/', async (req, res, next) => {
    const books = await getBooks();
    console.log(books);
    return res.render('searchResult', { title: 'Book Search Engine', books });
});

module.exports = router;