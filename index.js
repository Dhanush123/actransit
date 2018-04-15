'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const bus_stop = require('./allen')

//custom imports
const dhanush = require('dhanush.js');
//end here

const server = express();
server.use(bodyParser.json());
server.use('/bus_stop', bus_stop);

// server.post('/', function (req, res) {
//     console.log('webhook request:',req.body);
//     if (req.body.result.action == "stopPredict") {
//       //call function here
//     }
//     else {
//       var speech = "An error has occured.";
//       return res.json({
//         speech: speech,
//         displayText: speech
//       });
//     }
// });
  
server.listen((process.env.PORT || 8000), function () {
    console.log('Server listening');
});