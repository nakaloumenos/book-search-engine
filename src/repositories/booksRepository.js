const axios = require('axios');
const mapper = require('../mappers/bookResponseMapper');

const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

const getBooks = async (queryParams) => {
  return axios
    .get(GOOGLE_BOOKS_URL + queryParams)
    .then(handleResponse)
    .catch(handleError);
};

const handleResponse = (res) => {
  const bookResources = res.data.items;
  if (bookResources) {
    const mappedBooks = bookResources.map((bookResource) => mapper.mapResponse(bookResource));
    return mappedBooks.filter(hasAllInformation);
  }
  return [];
};

const handleError = (err) => {
  let errMsg;
  if (err.response) {
    /* Request made and server responded. */
    errMsg = `API returned with ${err.response.status}: ${err.response.data.error.message}`;
  } else if (err.request) {
    /* The request was made but no response was received. */
    errMsg = `No response received`;
  } else {
    /* Something happened in setting up the request that triggered an Error. */
    errMsg = `Setting request failed`;
  }

  throw new Error(errMsg);
};

const hasAllInformation = (book) => {
  return book.title != '' && book.author != '' && book.publisher != '' && book.image != '' && book.moreDetails != '';
};

module.exports = { getBooks };
