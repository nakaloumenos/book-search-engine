const mapResponse = (item) => {
    console.log(item)
    return {
        title: item.volumeInfo.title || '',
        author: item.volumeInfo.authors[0] || '',
        publisher: item.volumeInfo.publisher || '',
        image: item.volumeInfo.imageLinks.smallThumbnail || '',
        moreDetails: item.volumeInfo.infoLink || ''
    }
}

module.exports = mapResponse;