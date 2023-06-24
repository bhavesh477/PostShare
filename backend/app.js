const express = require('express');

const bodyParser = require('body-parser'); // node express package to parse the body of the request
const mongoose = require('mongoose');

const Post = require('./model/post');
const app = express(); // we use app to register new middlewares

mongoose.connect('mongodb+srv://bob:7HjJUVXRtiO4KdQz@cluster0.eooijy3.mongodb.net/node-angular?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to database!');
}).catch(() =>{
    console.log('Connection failed!');
});

// middle ware funciton
app.use((req, res, next) => {
    console.log('First middleware');
    next(); // next should be called if we are not sending response else it will go in loop
});

app.use(bodyParser.json()); // this will parse the body of the request and extract json data and convert it to js object
app.use(bodyParser.urlencoded({extended: false})); // parse url encded data. extended - false to only support default features

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // * means any domain can access it
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        // res.json(posts); // we could also send it like this or more complex objects too
        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: documents
        });
        console.log(documents);
    });
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(post => {
        console.log(post);
        res.status(201).json({message: "Post added successfully", postId: post._id}); // 201 means success and new resource was added
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: 'Post deleted!'});
    });
});

// it will export the entire express app
module.exports = app;