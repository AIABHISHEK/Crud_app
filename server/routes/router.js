const express = require('express');

const route = express.Router();


const services = require('../services/render');

const controller = require('../controller/controller');


/*
route route
*/

route.get('/', services.home_route);


//add-user route
route.get('/add-user', services.add_user);


//update-user
route.get('/update-user', services.update_user);


//API routes

//add-user 
route.post('/api/users', controller.create);

//find users
route.get('/api/users', controller.find);

//update-user
route.put('/api/users/:id', controller.update);

//delete users
route.delete('/api/users/:id', controller.delete);





module.exports = route;