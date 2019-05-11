const express = require('express');
const router = express.Router();

books = [
    {
        'title': `Siddhartha`,
        'author': `Hermann Hesse`,
        'publisher': `New Directions`
    },
    {
        'title': `The Hobbit`,
        'author': `J. R. R. Tolkien`,
        'publisher': `George Allen & Unwin`
    }
]

/* GET result page. */
router.get('/', (req, res, next) =>
    res.render('searchResult', { title: 'Book Search Engine', books }));

module.exports = router;