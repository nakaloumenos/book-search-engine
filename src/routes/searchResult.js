const express = require('express');
const router = express.Router();
const booksRepository = require('../repositories/booksRepository');

/* GET result page. */
router.get('/', async (req, res, next) => {
  try {
    const { queryParams } = req.query;
    const books = await booksRepository.getBooks(queryParams);
    const filteredBooks = books.filter(hasAllInformation);
    return res.render('searchResult', { title: 'Book Search Engine', books: filteredBooks, query: queryParams });
  } catch (err) {
    return res.render('errorHandler', { title: 'Book Search Engine', errMessage: err.message || 'Uknown' });
  }
});

const hasAllInformation = (book) => {
  return book.title != '' && book.author != '' && book.publisher != '' && book.image != '' && book.moreDetails != '';
};

module.exports = router;
