const request = require("request");
const moment = require("moment");


function stopPredict(gBody, gRes) {
    var stopID = gBody.result.parameters.stopID;
    var options = { method: "GET",
    url: "http://api.actransit.org/transit/stops/"+stopID+"/predictions/",
    qs: { token: "E0CA7D29754DBC1A2945AC2B353206DD" },
    };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var msg = "";
    for(var i = 0; i < body.length; i++) {
        var time = moment(body[i]["PredictedDeparture"]);
        msg += "Bus " + body[i]["VehicleId"] + ", " + body[i]["RouteName"] + ", will be arriving " + time.calendar() +"\n  \n";
    }
    gRes.json({
        speech: msg,
        displayText: msg
    });
  });
  
}

module.exports = {
    stopPredict: stopPredict
};