/* Map book information or empty string if not found. */
const mapResponse = (bookResource) => {
  return {
    title: bookResource.volumeInfo.title || '',
    author: bookResource.volumeInfo.authors ? bookResource.volumeInfo.authors[0] : '',
    publisher: bookResource.volumeInfo.publisher || '',
    image: bookResource.volumeInfo.imageLinks ? bookResource.volumeInfo.imageLinks.thumbnail : '',
    moreDetails: bookResource.volumeInfo.infoLink || '',
  };
};

module.exports = { mapResponse };
