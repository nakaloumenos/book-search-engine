const request = require('supertest');
const app = require('../../src/app');

describe('index', () => {
  describe('integration tests', () => {
    it('has title', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect(/<h3>Find your favourite books!<\/h3>/, done);
    });

    it('has button', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect(/<button type="submit" class="(.*)">Search<\/button>/, done);
    });

    it('has placeholder', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect(/placeholder="Search the Web"/, done);
    });
  });
});
