const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const HEROKU_API_KEY = require('./API_KEY');



const server = express();

server.use('body-parser');


server.post('/appliance',(request,response) => {
    console.log('---------------');
    console.log(request.body.params);
    console.log('---------------');
})