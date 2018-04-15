const rp = require('request-promise');
const { DialogflowApp } = require('actions-on-google');

function closestBusStop(request, response) {

    const requestPermission = (app) => {
      app.askForPermission('To locate you', app.SupportedPermissions.DEVICE_PRECISE_LOCATION);
    };
    
    const userInfo = (app) => {
        if (app.isPermissionGranted()) {
            const address = app.getDeviceLocation().coordinates;
            if (address) {            
                const search_radius = 1320
                // e.g. 58123
                //const stopID = body.result.parameters.stopID;
                const options = {
                    url: `http://api.actransit.org/transit/stops/${address.latitude}/${address.longitude}/${search_radius}`,
                    qs: { token: "E0CA7D29754DBC1A2945AC2B353206DD" },
                };

                rp(options)
                .then(response => {
                    app.tell(`Bus stop at ${response[0]} ${Object.keys(address)} https://www.google.com/maps/@?api=1&map_action=map&center=${address.latitude},${address.longitude}&zoom=12`);
                })
                .catch(err => app.tell('Sorry, I could not find any bus stops near you.'));
            }
            else {
                // Note: Currently, precise locaton only returns lat/lng coordinates on phones and lat/lng coordinates 
                // and a geocoded address on voice-activated speakers. 
                // Coarse location only works on voice-activated speakers.
                app.tell('Sorry, I could not figure out where you are.');
            }
        } else {
            app.tell('Good luck finding the bus stop, lol.');
        }
    };

    // console.log("from allen request: ", req)
    // req.body_ = req.body
    // console.log("request body: ", req.body_)

    const app = new DialogflowApp({request, response});
    const actions = new Map();
    actions.set('closestBusStop', requestPermission);
    actions.set('user_info', userInfo);
    app.handleRequest(actions);

	
	// const response = 'hello world'
	// res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
 //  	res.send(JSON.stringify({ "speech": response, "displayText": response}))
}

module.exports = { closestBusStop }

