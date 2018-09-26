const Book = require('../models/Book');

module.exports = class {
    postBook(req, res) {
        //response will contain new book object including at least _id and title
        const { title } = req.body;
        Book.create({ title }, (err, doc) => {
            if (err) throw err;
            res.send(doc);
        });
    }

    getBooks(req, res) {
        //response will be array of book objects
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        Book.find({}, (err, docs) => {
            if (err) throw err;
            res.send(docs);
        })
    }

    getBook(req, res) {
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        const { _id } = req.params;
        Book.findById(_id, (err, doc) => {
            if (err) return res.send('no book exists');
            res.send(doc);
        });
    }

    postComment(req, res) {
        //json res format same as .get
        const { _id } = req.params;// value also available from req.body
        const { comment } = req.body;
        Book.findByIdAndUpdate(_id, { $push: { comments: comment }, $inc: { commentcount: 1 } }, { new: true }, (err, doc) => {
            if (err) return res.send('no book exists');
            res.send(doc);
        })
    }

    deleteBook(req, res) {
        //if successful response will be 'delete successful'
        const { _id } = req.params;
        Book.findByIdAndRemove(_id, err => {
            if (err) return res.send('no book exists');
            res.send('delete successful');
        })
    }

    deleteBooks(req, res) {
        //if successful response will be 'complete delete successful'
        Book.deleteMany({}, (err, docs) => {
            if (err) return res.send('complete delete unsuccessful');
            if (!docs.n) return res.send('no books to delete');
            res.send('complete delete successful');
        })
    }
}