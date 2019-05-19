const axios = require('axios');
const mapper = require('../mappers/bookResponseMapper');

const getBooks = async (queryParams) => {
  return axios
    .get('https://www.googleapis.com/books/v1/volumes?q=' + queryParams)
    .then(handleResponse)
    .catch(handleError)
    .finally(function() {
      // always executed
      console.log('Got here!');
    });
};

const handleResponse = (res) => {
  console.log('handling response...');
  const items = res.data.items;
  if (items) {
    return items.map((item) => mapper.mapResponse(item));
  }
  return [];
};

const handleError = (err) => {
  console.log('handling error...');
  let errMsg;
  if (err.response) {
    // Request made and server responded
    errMsg = `API returned with ${err.response.status}: ${err.response.data.error.message}`;
  } else if (err.request) {
    // The request was made but no response was received
    console.log(err.request);
    errMsg = `No response received`;
  } else {
    // Something happened in setting up the request that triggered an Error
    errMsg = `Setting request failed`;
  }

  throw new Error(errMsg);
};

module.exports = { getBooks };
