require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5001
const bodyParser = require('body-parser')
const NodeHTTPError = require('node-http-error')
const {
	addPainting,
	getPainting,
	updatePainting,
	deletePainting,
	listPaintings
} = require('./dal')
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

	const requiredFields = ['name', 'movement', 'artist', 'yearCreated', 'museum']

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

app.get('/paintings/:id', function(req, res, next) {
	const paintingID = req.params.id
	getPainting(paintingID)
		.then(result => res.status(200).send(result))
		.catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})

app.put('/paintings/:id', function(req, res, next) {
	//const paintingID = req.params.id
	const updatedPainting = propOr({}, 'body', req)

	if (isEmpty(updatedPainting)) {
		next(
			new NodeHTTPError(
				400,
				'Nothing was found in the request body. Confirm Content-Type is application/json.'
			)
		)
	}

	// TODO type field not req.
	// TODO join both missings USE ... operator before msg create

	const requiredFields = [
		'_id',
		'_rev',
		'name',
		'movement',
		'artist',
		'yearCreated',
		'museum',
		'type'
	]

	const requiredMuseumFields = ['name', 'location']

	const missingFields = reqFieldChecker(requiredFields, updatedPainting)

	const missingMuseumFields = reqFieldChecker(
		requiredMuseumFields,
		updatedPainting.museum
	)

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
		return // This return is mandtory!!!
	}

	updatePainting(updatedPainting)
		.then(result => res.status(200).send(result))
		.catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})

app.delete('/paintings/:id', function(req, res, next) {
	const paintingID = req.params.id
	deletePainting(paintingID)
		.then(result => res.status(200).send(result))
		.catch(err => next(new NodeHTTPError(err.status, err.message, err)))
})

//TODO

app.get('/paintings', function(req, res, next) {
	const limit = Number(pathOr(5, ['query', 'limit'], req))
	const paginate = pathOr(null, ['query', 'lastItem'], req)
	listPaintings(paginate, limit)
		.then(result => res.status(200).send(map(row => row.doc, result.rows)))
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
