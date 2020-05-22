'use strict';

/* ------------------------------------------------------------------------------------------------

Complete the createServer function to include routes
a GET request to / should respond with status of 200
a DELETE request to /things/1 should respond with status of 405
any other route should return status of 404
------------------------------------------------------------------------------------------------ */
const createServer = () => {
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    res.send().status(200);
  });

  app.delete('/things/1', (req, res) => {
    res.status(405).send();
  });

  var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Example app listening at port', port);
  });
  return server;
};

describe('Testing challenge', function () {

  const request = require('supertest');

  let server;

  beforeEach(function () {
    server = createServer();
  });

  afterEach(function () {
    server.close();
  });

  test('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  test('responds to /things/1', function testSlash(done) {
    request(server)
      .delete('/things/1')
      .expect(405, done);
  });

  test('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

