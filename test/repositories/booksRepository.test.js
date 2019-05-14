const nock = require('nock');
const sinon = require('sinon');
const assert = require('assert');
const mapper = require('../../src/mappers/bookResponseMapper');
const repository = require('../../src/repositories/booksRepository');

const sandbox = sinon.createSandbox();

describe('BooksRepository', () => {
  describe('.getBooks()', () => {
    beforeEach(() => {
      sandbox.restore();
    });

    it('should call all functions with appropriate params', async () => {
      const query = { q: 'harry' };
      const response = {
        items: [{ title: 'title1' }],
      };
      const mappedBook = {
        title: 'title1-mapped',
      };

      nock('https://www.googleapis.com')
        .get('/books/v1/volumes')
        .query(query)
        .reply(200, response)
        .isDone();
      const mapperStub = sandbox.stub(mapper, 'mapResponse').returns(mappedBook);

      const actualRes = await repository.getBooks(query.q);

      mapperStub.calledOnceWith(response.items[0]);
      assert.deepStrictEqual(actualRes, [mappedBook]);
    });

    it('it should handle error when response is 500', async () => {
      const query = { q: 'harry' };

      nock('https://www.googleapis.com')
        .get('/books/v1/volumes')
        .query(query)
        .reply(500, {})
        .isDone();

      try {
        await repository.getBooks(query.q);
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'Response returned status: 500');
      }
    });

    it('should handle a response of undifiend items', async () => {
      const query = { q: 'harry' };

      nock('https://www.googleapis.com')
        .get('/books/v1/volumes')
        .query(query)
        .reply(200, {})
        .isDone();

      const actualRes = await repository.getBooks(query.q);

      assert.deepStrictEqual(actualRes, []);
    });
  });
});
