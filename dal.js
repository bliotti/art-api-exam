require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))

const { merge, prop, filter, split, map } = require('ramda')
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

const listPaintings = (paginate, limit, filterQuery) => {
	const opts = paginate
		? { include_docs: true, limit, start_key: `${paginate}\ufff0` }
		: { include_docs: true, limit }
	const allPaintings = db.allDocs(opts)
	if (filterQuery) {
		const filterArray = split(':', filterQuery)
		return allPaintings
			.then(result => map(row => row.doc, result.rows))
			.then(painting =>
				filter(row => prop(filterArray[0], row) === filterArray[1], painting)
			)
	}
	return db.allDocs(opts).then(result => map(row => row.doc, result.rows))
}

module.exports = {
	addPainting,
	getPainting,
	updatePainting,
	deletePainting,
	listPaintings
}
