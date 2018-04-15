const request = require("request");
const moment = require("moment");


function stopRequest(gBody, gRes) {
    var stopID = gBody.result.parameters.stopID;
    var options = { method: "GET",
    url: "http://api.actransit.org/transit/stops/"+stopID+"/predictions/",
    qs: { token: "E0CA7D29754DBC1A2945AC2B353206DD" },
    };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var msg = "";
    for(var i = 0; i < body.length; i++) {
        var time = moment(body[0]["PredictedDeparture"]);
        msg += "Bus " + body[0]["VehicleId"] + ", " + body[0]["RouteName"] + ", will be arriving " + time.calendar() +"\n";
    }
  });
  
}

module.exports = {
    stopRequest: stopRequest
};