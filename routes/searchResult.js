const express = require('express');
const router = express.Router();
const booksRepository = require('../repositories/booksRepository');

/* GET result page. */
router.get('/', async (req, res, next) => {
    const { queryParams } = req.query;
    const books = await booksRepository.getBooks(queryParams);
    return res.render('searchResult', { title: 'Book Search Engine', books });
});

module.exports = router;