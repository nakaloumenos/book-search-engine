const nock = require('nock');
const sinon = require('sinon');
const assert = require('assert');
const mapper = require('../../mappers/bookResponseMapper');
const repository = require('../../repositories/booksRepository')

describe('BooksRepository', () => {
    describe('#getBooks()', () => {
        it('should call all functions with appropriate params', async () => {
            const query = { q: 'harry' };
            const response = {
                items:
                    [
                        { title: 'title1' }
                    ]

            };
            const mappedBook = {
                title: 'title1-mapped'
            };

            nock('https://www.googleapis.com')
                .get('/books/v1/volumes')
                .query(query)
                .reply(200, response)
                .isDone();
            const mapperStub = sinon.stub(mapper, 'mapResponse').returns(mappedBook);

            const actualRes = await repository.getBooks(query.q);

            mapperStub.calledOnceWith(response.items[0]);
            assert.deepStrictEqual(actualRes, [mappedBook]);
        });

    });
});