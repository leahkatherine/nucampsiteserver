const express = require('express');
const partnerRouter = express.Router(); //create a new Express router object named partnerRouter
const authenticate = require('../authenticate');

const Partner = require('../models/partner'); //import the Partner model

partnerRouter.route('/') //chain all the routing methods together on the partnerRouter object

.get((req, res, next) => {
    Partner.find() //find all documents in the Partner collection
    .then(partners => res.status(200).json(partners)) // simplified version of the code in campsiteRouter.js
    .catch(err => next(err)); //dont forget to pass the error to the overall error handler in app.js
})

.post(authenticate.verifyUser, (req, res, next) => {
    Partner.create(req.body) //create a new document in the Partner collection
    .then(partner => res.status(200).json(partner)) 
    .catch(err => next(err));
})

.put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Partner.deleteMany() //Delete all documents in the Partner collection
    .then(partners => res.status(200).json(partners)) // simplified version of the code in campsiteRouter.js
    .catch(err => next(err)); //dont forget to pass the error to the overall error handler in app.jses.end('Deleting all partners');
}); 

partnerRouter.route('/:partnerId') 
.get((req, res, next) => {
    Partner.findById(req.params.partnerId) //find the ID thats stored int he params                                                                  
    .then(partner => res.status(200).json(partner)) // simplified version of the code in campsiteRouter.js
    .catch(err => next(err)); 
})
.post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported`);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnerId, req.body, { new: true }) // use new: true to get the new record back and not the old one 
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err));
})

.delete(authenticate.verifyUser, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId) //find the ID thats stored in the params and delete it
    .then(partner => res.status(200).json(partner)) 
    .catch(err => next(err)); 
});

module.exports = partnerRouter; 