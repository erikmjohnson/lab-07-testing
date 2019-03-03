'use strict';

const supertest = require('supertest');

// What's up with the {}????

//Answer: It is deconstructoring, it is the same as const server = export.server;
const {server} = require('../server.js');

const mockClient = supertest(server);

describe('The Server', () => {
  it('responds with a 200 on a good route', () => {
    // Why do we return here?
    //Answer: returns a fake API
    return mockClient.get('/a')
      .then( result => {
        expect(result.status).toEqual(200);
      });
  });

  it('responds with a 500 on an error', () => {
    return mockClient.get('/e')
      .then(result => {
        expect(result.status).toEqual(500);
      })
  });

  it('responds with a 404 on an unknown route', () => {
    return mockClient.get('/*')
      .then(result => {
        expect(result.status).toEqual(404)
      })
  });

});