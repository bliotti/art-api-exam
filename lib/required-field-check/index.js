const { difference, keys, curry } = require('ramda')

module.exports = curry((requiredKeys, obj) =>
	difference(requiredKeys, keys(obj))
)
