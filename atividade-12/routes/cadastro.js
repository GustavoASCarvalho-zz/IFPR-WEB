const cadastro = require('../pages/cadastro')

module.exports = (req, res) => {
	const html = cadastro()

	res.status(200).send(html)
}
