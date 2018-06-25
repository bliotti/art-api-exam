require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const bodyParser = require('body-parser')
const NodeHTTPError = require('node-http-error')
const { addPainting } = require('./dal')
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
const reqFieldChecker = require('./lib/required-field-check')
const requiredFields = ['name', 'movement', 'artist', 'yearCreated', 'museum']

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
	res.send('Welcome to the Art API. Manage all the paintings.')
})

app.post('/paintings', function(req, res, next) {
	const newArt = propOr({}, 'body', req)

	if (isEmpty(newArt)) {
		next(
			new NodeHTTPError(
				400,
				'Nothing was found in the request body. Confirm Content-Type is application/json.'
			)
		)
	}

	const missingFields = reqFieldChecker(requiredFields, newArt)

	const sendMissingFieldError = compose(
		not,
		isEmpty
	)(missingFields)

	if (sendMissingFieldError) {
		next(
			new NodeHTTPError(
				400,
				`Missing the following required fields: ${join(', ', missingFields)}`
			)
		)
	}

	addPainting(newArt)
		.then(result => res.status(201).send(result))
		.catch(err => next(new NodeHTTPError(err.status, err.message, err)))
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
