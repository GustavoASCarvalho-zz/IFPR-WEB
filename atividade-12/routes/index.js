const index = require('../pages/index')

module.exports = (req, res) => {
	const html = index()
	res.status(200).send(html)
}
