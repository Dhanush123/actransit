'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

//custom imports
const dhanush = require('./dhanush');
const allen = require('./allen');
const sang = require('./sang');
//end here

const server = express();
server.use(bodyParser.json());

server.post('/', function (req, res) {
    console.log('webhook request:',req.body);

    switch (req.body.result.action) {
        case "stopPredict":
            dhanush.stopPredict(req.body,res);
            break;
        case "closestBusStop":
            allen.closestBusStop(req, res);
            break;
        case "user_info":
            allen.closestBusStop(req, res)
        case "getServiceNotices":
            sang.getServiceNotices(req.body,res);
            break;
        default:
            var speech = "An error has occured.";
            return res.json({
                speech: speech,
                displayText: speech
            });
    }
});
  
server.listen((process.env.PORT || 8000), function () {
    console.log('Server listening');
});