/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const mongoose = require('mongoose');

chai.use(chaiHttp);

let _id;

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function(done){
  //    chai.request(server)
  //     .get('/api/books')
  //     .end(function(err, res){
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  before(done => {
    mongoose.connection.dropDatabase()
      .then(() => done())
      .catch(err => { throw err });
  });

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: 'My book' })
          .end((err, { status, body }) => {
            assert.strictEqual(status, 200);
            assert.property(body, '_id');
            assert.isArray(body.comments);
            assert.strictEqual(body.comments.length, 0);
            assert.strictEqual(body.commentcount, 0);
            assert.equal(body.title, 'My book');
            _id = body._id;
            done();
          })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai.request(server)
          .post('/api/books')
          .send({ title: ''})
          .end((err, { status, text }) => {
            assert.strictEqual(status, 200);
            assert.equal(text, 'no title given');
            done();
          });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
          .get('/api/books')
          .end((err, { status, body }) => {
            assert.strictEqual(status, 200);
            assert.isArray(body);
            assert.property(body[0], '_id');
            assert.property(body[0], 'comments');
            assert.property(body[0], 'commentcount');
            assert.property(body[0], 'title');
            assert.equal(body[0]._id, _id);
            assert.isArray(body[0].comments);
            assert.strictEqual(body[0].commentcount, 0);
            assert.equal(body[0].title, 'My book');
            done();
          });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
          .get('/api/books/nonexistentBookId')
          .end((err, { status, text }) => {
            assert.strictEqual(status, 200);
            assert.equal(text, 'no book exists');
            done()
          });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
          .get('/api/books/' + _id)
          .end((err, { status, body }) => {
            assert.strictEqual(status, 200);
            assert.equal(body._id, _id);
            assert.isArray(body.comments);
            assert.strictEqual(body.comments.length, 0);
            assert.strictEqual(body.commentcount, 0);
            assert.equal(body.title, 'My book');
            done();
          })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
          .post('/api/books/' + _id)
          .send({ comment: 'A great comment' })
          .end((err, { status, body }) => {
            assert.strictEqual(status, 200);
            assert.equal(body._id, _id);
            assert.isArray(body.comments);
            assert.strictEqual(body.comments.length, 1);
            assert.equal(body.comments[0], 'A great comment');
            assert.strictEqual(body.commentcount, 1);
            assert.equal(body.title, 'My book');
            done();
          })
      });
      
    });

  });

});
