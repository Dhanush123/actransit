const request = require("request");

function stopRequest(gBody, gRes) {
    var stopID = gBody.result.parameters.stopID;
    var options = { method: 'GET',
    url: 'http://api.actransit.org/transit/stops/56888/predictions/',
    qs: { token: 'E0CA7D29754DBC1A2945AC2B353206DD' },
    headers: 
     { 'postman-token': '5d6cdc57-141e-4f22-0309-5a41f229461f',
       'cache-control': 'no-cache' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
  
}

module.exports = {
    stopRequest: stopRequest
};