const mapper = require('../../src/mappers/bookResponseMapper');
const assert = require('assert');

describe('BookMapper', () => {
  describe('#mapResponse()', () => {
    it('maps book resource to domain info', () => {
      const bookResource = {
        volumeInfo: {
          title: 'title',
          authors: ['author1', 'author2'],
          publisher: 'publisher',
          imageLinks: {
            thumbnail: 'thumbnailLink',
          },
          infoLink: 'infoLink',
        },
      };

      const expectedBook = {
        title: 'title',
        author: 'author1',
        publisher: 'publisher',
        image: 'thumbnailLink',
        moreDetails: 'infoLink',
      };

      assert.deepStrictEqual(mapper.mapResponse(bookResource), expectedBook);
    });

    it('maps null attributes to empty strings', () => {
      const bookResource = {
        volumeInfo: {
          title: null,
          authors: null,
          publisher: null,
          imageLinks: null,
          infoLink: null,
        },
      };

      const expectedBook = {
        title: '',
        author: '',
        publisher: '',
        image: '',
        moreDetails: '',
      };

      assert.deepStrictEqual(mapper.mapResponse(bookResource), expectedBook);
    });
  });
});
