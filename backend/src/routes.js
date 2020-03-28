const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();


routes.get('/ongs',OngController.index);//lista as ongs
routes.post('/ongs',OngController.create);//cadastrar ongs
routes.get('/profile',ProfileController.index);//lista todos os casos de uma ong logada

routes.post('/incidents',IncidentsController.create);//lista incidents
routes.get('/incidents',IncidentsController.index);// lisratodos os incidents
routes.delete('/incidents/:id',IncidentsController.delete)//deleta um incidents

routes.post('/sessions', SessionController.create);
module.exports = routes;