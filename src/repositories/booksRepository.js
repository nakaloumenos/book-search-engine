const axios = require('axios');
const mapper = require('../mappers/bookResponseMapper');

const getBooks = async (queryParams) => {
  try {
    const res = await axios.get('https://www.googleapis.com/books/v1/volumes?q=' + queryParams);
    console.log(res);
    const items = res.data.items;

    if (items) {
      return items.map((item) => mapper.mapResponse(item));
    }

    return [];
  } catch (err) {
    throw new Error(`Error while calling books API`);
  }
};

module.exports = { getBooks };
