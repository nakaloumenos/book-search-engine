const axios = require('axios');
const mapper = require('../mappers/bookResponseMapper');

const getBooks = async (queryParams) => {
    try {
        const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + queryParams);
        const items = res.data.items;
        throw new Error('testing error');
        if (items) {
            return items.map((item) => mapper.mapResponse(item))
        }
        return [];
    } catch (err) {
        throw new Error(`Error while calling books API`);
    }
}

module.exports = { getBooks };