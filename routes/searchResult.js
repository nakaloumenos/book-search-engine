const express = require('express');
const router = express.Router();
const booksRepository = require('../repositories/booksRepository');

/* GET result page. */
router.get('/', async (req, res, next) => {
    try {
        const { queryParams } = req.query;
        const books = await booksRepository.getBooks(queryParams);
        return res.render('searchResult', { title: 'Book Search Engine', books });
    } catch (err) {
        return res.render('errorHandler', { title: 'Book Search Engine', errMessage: err.message || 'Uknown' })
    }
});

module.exports = router;