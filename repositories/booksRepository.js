const axios = require('axios');
const mapper = require('../mappers/bookResponseMapper');


const getBooks = async (queryParams) => {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + queryParams)
    return res.data.items.map((item) => mapper(item))
}

module.exports = getBooks;