require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const bodyParser = require('body-parser')
const NodeHTTPError = require('node-http-error')
const {} = require('./dal')
const {
	propOr,
	map,
	isEmpty,
	compose,
	not,
	join,
	pathOr,
	filter
} = require('ramda')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
	res.send('Welcome to the Art API. Manage all the paintings.')
})

app.use((err, req, res, next) => {
	console.log(
		`ERROR \nMETHOD ${req.method} \nPATH ${req.path}\n${JSON.stringify(
			err,
			null,
			2
		)}`
	)
	res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('The port is', port))
