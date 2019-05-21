const nock = require('nock');
const sinon = require('sinon');
const assert = require('assert');
const mapper = require('../../src/mappers/bookResponseMapper');
const repository = require('../../src/repositories/booksRepository');

const sandbox = sinon.createSandbox();

const GOOGLE_BOOKS_BASE_PATH = 'https://www.googleapis.com';
const GOOGLE_BOOKS_RESOURCE = '/books/v1/volumes';

describe('BooksRepository', () => {
  describe('.getBooks()', () => {
    beforeEach(() => {
      sandbox.restore();
    });

    it('should call all functions with appropriate params', async () => {
      const query = { q: 'harry' };
      const httpStatus = 200;

      const bookResources = {
        items: [{ title: 'title1' }],
      };
      const expectedMappedBook = {
        title: 'title1-mapped',
      };

      nock(GOOGLE_BOOKS_BASE_PATH)
        .get(GOOGLE_BOOKS_RESOURCE)
        .query(query)
        .reply(httpStatus, bookResources)
        .isDone();
      const mapperStub = sandbox.stub(mapper, 'mapResponse').returns(expectedMappedBook);

      const actualMappedBooks = await repository.getBooks(query.q);

      mapperStub.calledOnceWith(bookResources.items[0]);
      assert.deepStrictEqual(actualMappedBooks, [expectedMappedBook]);
    });

    it('it should handle error when response is 500', async () => {
      const query = { q: 'harry' };
      const httpStatus = 500;
      const errMessage = 'this is the reason';
      const errResponse = {
        error: {
          message: errMessage,
        },
      };

      nock(GOOGLE_BOOKS_BASE_PATH)
        .get(GOOGLE_BOOKS_RESOURCE)
        .query(query)
        .reply(httpStatus, errResponse)
        .isDone();

      try {
        await repository.getBooks(query.q);
      } catch (err) {
        assert(err);
        assert.equal(err.message, `API returned with ${httpStatus}: ${errMessage}`);
      }
    });

    it('should handle a response of undifiend items', async () => {
      const query = { q: 'harry' };
      const httpStatus = 200;

      nock(GOOGLE_BOOKS_BASE_PATH)
        .get(GOOGLE_BOOKS_RESOURCE)
        .query(query)
        .reply(httpStatus, {})
        .isDone();

      const actualRes = await repository.getBooks(query.q);

      assert.deepStrictEqual(actualRes, []);
    });

    it('should return only books with all the details', async () => {
      const query = { q: 'harry' };
      const httpStatus = 200;

      const completeBookResource = {
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

      const incompleteBookResource = {
        volumeInfo: {
          title: 'title',
          authors: ['author1', 'author2'],
        },
      };

      const bookResources = {
        items: [completeBookResource, incompleteBookResource],
      };
      const expectedMappedBook = {
        title: 'title',
        author: 'author1',
        publisher: 'publisher',
        image: 'thumbnailLink',
        moreDetails: 'infoLink',
      };

      nock(GOOGLE_BOOKS_BASE_PATH)
        .get(GOOGLE_BOOKS_RESOURCE)
        .query(query)
        .reply(httpStatus, bookResources)
        .isDone();

      const actualMappedBooks = await repository.getBooks(query.q);

      assert.deepStrictEqual(actualMappedBooks, [expectedMappedBook]);
    });
  });
});
