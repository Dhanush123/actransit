const request = require("request");
const moment = require("moment");


function stopPredict(gBody, gRes) {
    var stopID = gBody.result.parameters.stopID;
    var options = { method: "GET",
    url: "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=actransit&stopId="+stopID
    };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var msg = "";
    if (response.statusCode !== 200) {
      msg = "Currently, predictions are not available for stop " + stopID + ". Please try later.";
    } else {
      body = JSON.parse(body);
      for(var i = 0; i < body.length; i++) {
        var time = moment(body[i]["PredictedDeparture"]);
        msg += body[i]["RouteName"] + " will be arriving " + time.calendar() +"\n  \n";
      }
      console.log(JSON.stringify(body));
      msg = msg.substring(0, 1600);
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
