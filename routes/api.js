/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

// var expect = require('chai').expect;
// var MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId;
// const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

const BookController = require('../controllers/bookController');

module.exports = function (app) {

  const bookController = new BookController();

  app.route('/api/books')
    .get(bookController.getBooks)
    
    .post(bookController.postBook)
    
    .delete(bookController.deleteBooks);



  app.route('/api/books/:_id')
    .get(bookController.getBook)
    
    .post(bookController.postComment)
    
    .delete(bookController.deleteBook);
  
};
