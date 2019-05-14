const mapResponse = (item) => {
  return {
    title: item.volumeInfo.title || '',
    author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : '',
    publisher: item.volumeInfo.publisher || '',
    image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : '',
    moreDetails: item.volumeInfo.infoLink || '',
  };
};

module.exports = { mapResponse };
