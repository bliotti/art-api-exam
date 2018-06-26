module.exports = (x, op, year) => {
	if (op === 'gt') {
		return x.yearCreated > year
	} else if (op === 'gte') {
		return x.yearCreated >= year
	} else if (op === 'lt') {
		return x.yearCreated < year
	} else if (op === 'lte') {
		return x.yearCreated <= year
	}
}
