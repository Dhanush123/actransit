const request = require("request");

function stopRequest(gBody, gRes) {
    var stopID = gBody.result.parameters.stopID;
    var options = { method: "GET",
    url: "http://api.actransit.org/transit/stops/"+stopID+"/predictions/",
    qs: { token: "E0CA7D29754DBC1A2945AC2B353206DD" },
    };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
  });
  
}

module.exports = {
    stopRequest: stopRequest
};