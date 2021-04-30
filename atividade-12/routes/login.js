const login = require('../pages/login')

module.exports = (req, res) => {
	const html = login()
	res.status(200).send(html)
}
