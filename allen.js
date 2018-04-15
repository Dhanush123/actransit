module.exports  = (req, res) => {
	console.log('bus_stop called')
	
	const response = 'hello world'
	res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  	res.send(JSON.stringify({ "speech": response, "displayText": response}))
}

