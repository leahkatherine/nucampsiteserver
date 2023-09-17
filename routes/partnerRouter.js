const express = require('express');
const partnerRouter = express.Router(); //create a new Express router object named partnerRouter

partnerRouter.route('/') //chain all the routing methods together on the partnerRouter object

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //passes control of the application routing to the next relevant routing method after this one
})

.get((req, res) => {
    res.end('Will send all the partners to you');

})

.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})

.delete((req, res) => {
    res.end('Deleting all partners');
}); //delete ALL partners

partnerRouter.route('/:partnerId') //chain all the routing methods together on the partnerRouter object
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //passes control of the application routing to the next relevant routing method after this one  
})
.get((req, res) => {
    res.end(`The partner id is: ${req.params.partnerId}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported`);
})
.put((req, res) => {
    res.end(`Will update the partner id: ${req.params.partnerId} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting partner id: ${req.params.partnerId}`);
});

module.exports = partnerRouter; //export the router object so it can be used in other files