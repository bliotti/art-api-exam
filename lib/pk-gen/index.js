const { compose, replace, concat, trim, toLower } = require('ramda')

module.exports = (prefix, delimeter, pkValue) =>
	compose(
		replace(/ /g, delimeter),
		concat(prefix),
		toLower,
		trim,
		replace(/^A|^The/g, '')
	)(pkValue)
