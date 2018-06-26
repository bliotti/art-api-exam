require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))

const {
	merge,
	prop,
	filter,
	split,
	map,
	take,
	match,
	concat
} = require('ramda')
const pkGen = require('./lib/pk-gen')

const db = new PouchDB(
	`${process.env.COUCH_HOSTNAME}${process.env.COUCH_DBNAME}`
)

const addPainting = painting => {
	const modifiedPainting = merge(painting, {
		type: 'painting',
		_id: pkGen('painting_', '_', prop('name', painting))
	})
	return db.put(modifiedPainting)
}

const getPainting = id => db.get(id)

const updatePainting = painting => {
	// merge fn will always overwrite prop "type" and it's value, if included or not.
	const modifiedPainting = merge(painting, { type: 'painting' })
	return db.put(modifiedPainting)
}

const deletePainting = id => db.get(id).then(doc => db.remove(doc))

const listPaintings = (lastItem, limit, filterQuery) => {
	if (filterQuery) {
		if (match(/:/g, filterQuery).length === 1) {
			const [property, value] = split(':', filterQuery)
			console.log(property, value)
			return db
				.allDocs({ include_docs: true })
				.then(result => map(row => row.doc, result.rows))
				.then(result =>
					filter(row => prop(property, row) === Number(value), result)
				)
				.then(result => take(limit, result))
		}

		if (match(/:/g, filterQuery).length === 2) {
			const [property, op, value] = split(':', filterQuery)
			console.log(property, op, value)
			return db
				.find({
					selector: {
						[property]: { [`$${op}`]: Number(value) }
					}
				})
				.then(result => take(limit, result.docs))
		}
	} else {
		const opts = lastItem
			? { include_docs: true, limit, start_key: `${lastItem}\ufff0` }
			: { include_docs: true, limit }
		return db.allDocs(opts).then(result => map(row => row.doc, result.rows))
	}
}

module.exports = {
	addPainting,
	getPainting,
	updatePainting,
	deletePainting,
	listPaintings
}
