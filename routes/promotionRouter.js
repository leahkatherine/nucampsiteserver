const express = require('express');
const promotionRouter = express.Router(); //create a new Express router object named promotionRouter

promotionRouter.route('/') //chain all the routing methods together on the promotionRouter object

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //passes control of the application routing to the next relevant routing method after this one
})

.get((req, res) => {
    res.end('Will send all the promotions to you');

})

.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete((req, res) => {
    res.end('Deleting all promotions');
}); //delete ALL promotions

promotionRouter.route('/:promotionId') //chain all the routing methods together on the promotionRouter object
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //passes control of the application routing to the next relevant routing method after this one  
})
.get((req, res) => {
    res.end(`The promotion id is: ${req.params.promotionId}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported`);
})
.put((req, res) => {
    res.end(`Will update the promotion id: ${req.params.promotionId} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting promotion id: ${req.params.promotionId}`);
});

module.exports = promotionRouter; //export the router object so it can be used in other files