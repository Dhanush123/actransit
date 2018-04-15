// else if (req.body.result.action == 'getRoutesForStop') {
//     getRoutesForStop(req.body.result.parameters.any,res);
//   }
const request = require('request');
// import {"token"} from "index.js"
var token = "E0CA7D29754DBC1A2945AC2B353206DD"

function getRoutesForStop (gBody, gRes) {
	var stopID = gBody.result.parameters.stopID;
	var options = { method: "GET",
	    url: "http://api.actransit.org/transit/stops/"+stopID+"/predictions/",
	    qs: { token: token }};
	request(options, function (error, response, body) {
	    if (error) throw new Error(error);
	    var msg = "The following buses come here: \n";
	    for(var i = 0; i < body.length; i++) {
	        msg += body[i]["RouteName"] +"\n";
	    }
	    console.log("msg",msg);
      	return gRes.json({
	        speech: msg,
	        displayText: msg
	    });
  	});
}

module.exports = {
    getRoutesForStop: getRoutesForStop
};