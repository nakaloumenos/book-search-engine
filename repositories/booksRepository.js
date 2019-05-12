const axios = require('axios');
const mapper = require('../mappers/bookResponseMapper');


const getBooks = async () => {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter')
    return res.data.items.map((item) => mapper(item))
}

module.exports = getBooks;