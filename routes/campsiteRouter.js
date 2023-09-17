const express = require('express');
const campsiteRouter = express.Router(); //create a new Express router object named campsiteRouter

campsiteRouter.route('/') //chain all the routing methods together on the campsiteRouter object

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //passes control of the application routing to the next relevant routing method after this one
})

.get((req, res) => {
    res.end('Will send all the campsites to you');

})

.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})

.delete((req, res) => {
    res.end('Deleting all campsites');
}); //delete ALL campsites

campsiteRouter.route('/:campsiteId') //chain all the routing methods together on the campsiteRouter object
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); //passes control of the application routing to the next relevant routing method after this one  
})
.get((req, res) => {
    res.end(`The campsite id is: ${req.params.campsiteId}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported`);
})
.put((req, res) => {
    res.end(`Will update the campsite id: ${req.params.campsiteId} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting campsite id: ${req.params.campsiteId}`);
});

module.exports = campsiteRouter; //export the router object so it can be used in other files
