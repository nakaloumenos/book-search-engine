const request = require('supertest');
const app = require('../../src/app');
const nock = require('nock');
const sinon = require('sinon');
const repository = require('../../src/repositories/booksRepository');
const mapper = require('../../src/mappers/bookResponseMapper');

const GOOGLE_BOOKS_BASE_PATH = 'https://www.googleapis.com';
const GOOGLE_BOOKS_RESOURCE = '/books/v1/volumes';
const QUERY_PARAMS = 'Harry';
const QUERY = { q: QUERY_PARAMS };

describe('searchResult', async () => {
  describe('integration tests', () => {
    it('has title', (done) => {
      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(200)
        .expect(/<h3>Find your favourite books!<\/h3>/, done);
    });

    it('has button', (done) => {
      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(200)
        .expect(/<button type="submit" class="(.*)">Search<\/button>/, done);
    });

    it('has placeholder', (done) => {
      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(200)
        .expect(/placeholder="Search the Web"/, done);
    });

    it('has result information', (done) => {
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

      const bookResources = {
        items: [completeBookResource],
      };

      nock(GOOGLE_BOOKS_BASE_PATH)
        .get(GOOGLE_BOOKS_RESOURCE)
        .query(QUERY)
        .reply(httpStatus, bookResources)
        .isDone();

      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(200)
        .expect(/Top 1 results for "<b>Harry<\/b>":/)
        .expect(/<u>title<\/u>/)
        .expect(/<img class="(.*)" src=thumbnailLink/)
        .expect(/Written by author1./)
        .expect(/Published by publisher./)
        .expect(/href=infoLink/, done);
    });

    it('handles zero results', (done) => {
      const httpStatus = 200;

      const bookResources = {
        items: [],
      };

      nock(GOOGLE_BOOKS_BASE_PATH)
        .get(GOOGLE_BOOKS_RESOURCE)
        .query(QUERY)
        .reply(httpStatus, bookResources)
        .isDone();

      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(200)
        .expect(/No books found for "<b>Harry<\/b>"./, done);
    });

    it('handles error', (done) => {
      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(200)
        .expect(/No Books Found!/)
        .expect(/Reason: No response received/, done);
    });

    it('verify repository call with right args', () => {
      const repositorySpy = sinon.spy(repository, 'getBooks');
      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(repositorySpy.calledOnce)
        .expect(repositorySpy.calledWith(QUERY_PARAMS));
    });

    it('verify no mapper call on error', () => {
      const mapperSpy = sinon.spy(mapper, 'mapResponse');
      request(app)
        .get(`/searchResult?queryParams=${QUERY_PARAMS}`)
        .expect(mapperSpy.notCalled);
    });
  });
});
