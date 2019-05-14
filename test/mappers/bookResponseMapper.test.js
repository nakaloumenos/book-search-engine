const mapper = require('../../mappers/bookResponseMapper');
const assert = require('assert');

describe('BookMapper', () => {
    describe('#mapResponse()', () => {
        it('maps item to domain info', () => {
            const item = {
                volumeInfo: {
                    title: 'title',
                    authors: ['author1', 'author2'],
                    publisher: 'publisher',
                    imageLinks: {
                        smallThumbnail:
                            'smallThumbnailLink',
                    },
                    infoLink:
                        'infoLink'
                }
            };

            const expected = {
                title: 'title',
                author: 'author1',
                publisher: 'publisher',
                image: 'smallThumbnailLink',
                moreDetails: 'infoLink'
            }

            assert.deepStrictEqual(mapper.mapResponse(item), expected);
        });

        it("maps null attributes to empty strings", () => {
            const item = {
                volumeInfo: {
                    title: null,
                    authors: null,
                    publisher: null,
                    imageLinks: null,
                    infoLink: null
                }
            };

            const expected = {
                title: '',
                author: '',
                publisher: '',
                image: '',
                moreDetails: ''
            }

            assert.deepStrictEqual(mapper.mapResponse(item), expected);
        });
    });
});
