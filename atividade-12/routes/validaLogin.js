const { login, mostrar } = require('../usuarios')
const sucesso = require('../pages/loginSucesso')
const erro = require('../pages/loginErro')

module.exports = (req, res) => {
	const params = req.body
	const { email, senha } = params
	if (login(email, senha)) {
		res.status(200).send(sucesso(mostrar(email, senha)))
	} else {
		res.status(400).send(erro())
	}
}
