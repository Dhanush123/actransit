const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
	console.log('sdf')
	
	const response = 'hello world'
	res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
  	res.send(JSON.stringify({ "speech": response, "displayText": response}))
})

module.exports = router