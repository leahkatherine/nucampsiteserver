const express = require('express');
const promotionRouter = express.Router(); //create a new Express router object named promotionRouter
const authenticate = require('../authenticate');

const Promotion = require('../models/promotion'); //import the Promotion model

promotionRouter.route('/') //chain all the routing methods together on the promotionRouter object

.get((req, res, next) => {
    Promotion.find() //find all documents in the Promotion collection
    .then(promotions => res.status(200).json(promotions)) // simplified version of the code in campsiteRouter.js
    .catch(err => next(err)); //dont forget to pass the error to the overall error handler in app.js
})

.post(authenticate.verifyUser, (req, res, next) => {
    Promotion.create(req.body) //create a new document in the Promotion collection
    .then(promotion => res.status(200).json(promotion)) 
    .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.deleteMany() //Delete all documents in the Promotion collection
    .then(promotions => res.status(200).json(promotions)) // simplified version of the code in campsiteRouter.js
    .catch(err => next(err)); //dont forget to pass the error to the overall error handler in app.jses.end('Deleting all promotions');
}); 

promotionRouter.route('/:promotionId') 
.get((req, res, next) => {
    Promotion.findById(req.params.promotionId) //find the ID thats stored int he params                                                                  
    .then(promotion => res.status(200).json(promotion)) // simplified version of the code in campsiteRouter.js
    .catch(err => next(err)); 
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, req.body, { new: true }) // use new: true to get the new record back and not the old one 
    .then(promotion => res.status(200).json(promotion))
    .catch(err => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId) //find the ID thats stored in the params and delete it
    .then(promotion => res.status(200).json(promotion)) 
    .catch(err => next(err)); 
});

module.exports = promotionRouter; 