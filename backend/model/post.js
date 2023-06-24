const mongoose = require('mongoose');

// this is a blueprint of how the data should look like
const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
});

module.exports = mongoose.model('Post', postSchema); // this will create a model named post with the schema postSchema')