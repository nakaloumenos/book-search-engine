const request = require('supertest');
const app = require('../../src/app');

describe('Search Result Page Integration Test', () => {
  it('has title', (done) => {
    request(app)
      .get('/searchResult?queryParams=Harry+Potter')
      .expect(200)
      .expect(/Find your favourite books!/, done);
  });

  it('has button', (done) => {
    request(app)
      .get('/searchResult?queryParams=Harry+Potter')
      .expect(200)
      .expect(/Search/, done);
  });

  it('has placeholder', (done) => {
    request(app)
      .get('/searchResult?queryParams=Harry+Potter')
      .expect(200)
      .expect(/Search the Web/, done);
  });
});
