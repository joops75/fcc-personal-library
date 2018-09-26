const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: String,
    comments: [String],
    commentcount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);