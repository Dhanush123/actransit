const request = require("request");
const rp = require('request-promise');
const moment = require("moment");


function stopPredict(gBody, gRes) {

	var op1 = {
		method: "GET", 
		url: "http://api.actransit.org/transit/stops?token=E0CA7D29754DBC1A2945AC2B353206DD"
	}

	var stops = []

	rp(op1)
    .then(response => {
        stops = JSON.parse(response)
        console.log("The stops are " + stops[0])
    })
    .catch(err => console.error(err))


    var stopID = null;
    if (gBody.result.parameters.stopID == undefined && gBody.result.parameters.address != undefined){
    	stopID = stops.find(o => o.Name == gBody.result.parameters.address)
    }
    else if (gBody.result.parameters.stopID != undefined){
    	stopID = gBody.result.parameters.stopID;
    }
    else{
    	gRes.json({
	        speech: "I need either stop id or the address",
	        displayText: "I need either stop id or the address"
	    });
    }
    
    var options = { method: "GET",
    	url: "http://webservices.nextbus.com/service/publicJSONFeed?command=predictions&a=actransit&stopId="+stopID
    };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var msg = "";
    if (response.statusCode !== 200) {
      msg = "Currently, predictions are not available for stop " + stopID + ". Please try later.";
    } else {
      body = JSON.parse(body);
      var predictions = []
      if (body.predictions.length != undefined){
      	predictions = body.predictions.slice()
      }
      else{
      	predictions.push(body.predictions)
      }

      for(var i = 0; i < predictions.length; i++) {
      	msg += "Route " + predictions[i]["routeTitle"] + " will be arriving at "
      	for(var j = 0; j < predictions[i].direction.prediction.length; j++){
	        var time = moment.unix(predictions[i].direction.prediction[j]["epochTime"]).format('hh:mm a');
	        msg += time;
	        if(j != predictions[i].direction.prediction.length-1){
	        	msg += ", ";
	        }
      	}
      	msg += "\n\n"
      }
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
