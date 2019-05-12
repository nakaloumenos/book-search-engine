const axios = require('axios');


const getBooks = async () => {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=harry+potter')
    return res.data.items;
}

module.exports = getBooks;