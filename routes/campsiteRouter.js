const express = require('express');
const Campsite = require('../models/campsite'); //import the Campsite model
const { response } = require('../app');

const campsiteRouter = express.Router(); //create a new Express router object named campsiteRouter

campsiteRouter.route('/') //chain all the routing methods together on the campsiteRouter object
.get((req, res, next) => {
    Campsite.find() //find all documents in the Campsite collection
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites); //send the campsites back to the client in the response body
    })
    .catch(err => next(err)); //pass the error to the overall error handler in app.js
})

.post((req, res, next) => {
    Campsite.create(req.body) //create a new document in the Campsite collection
    .then(campsite => {
        console.log('Campsite Created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite); //send the campsite back to the client in the response body
    })
    .catch(err => next(err)); //pass the error to the overall error handler in app.js
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

.delete((req, res, next) => {
    Campsite.deleteMany() //delete all documents in the Campsite collection
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response); //send the response back to the client in the response body
    })
    .catch(err => next(err)); //pass the error to the overall error handler in app.js
}); 

campsiteRouter.route('/:campsiteId') //chain all the routing methods together on the campsiteRouter object
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId) //find the document with the specified ID in the Campsite collection
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite); //send the campsite back to the client in the response body
    })
    .catch(err => next(err)); //pass the error to the overall error handler in app.js
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported`);
})
.put((req, res, next) => {
    Campsite.findByIdAndUpdate(req.params.campsiteId, {
        $set:req.body
    }, { new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite); //send the campsite back to the client in the response body
    })
    .catch(err => next(err)); //pass the error to the overall error handler in app.js
})

.delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId) //delete the document with the specified ID in the Campsite collection
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response); //send the response back to the client in the response body
    })
    .catch(err => next(err)); //pass the error to the overall error handler in app.js
});

module.exports = campsiteRouter; //export the router object so it can be used in other files
