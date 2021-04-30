const { cadastro } = require('../usuarios')
const sucesso = require('../pages/cadastroSucesso')

module.exports = (req, res) => {
	const params = req.body
	const { nome, email, senha } = params
	cadastro(nome, email, senha)
	res.status(200).send(sucesso())
}
