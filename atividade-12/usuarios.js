const usuarios = []

module.exports.mostrar = (email, senha) => {
	for (let i = 0; i < usuarios.length; i += 1) {
		if (usuarios[i].loginUser(email, senha)) {
			return usuarios[i].nome
		}
	}
}

module.exports.cadastro = (nome, email, senha) => {
	const user = {
		nome: undefined,
		email: undefined,
		senha: undefined,
		// eslint-disable-next-line no-shadow
		cadastrarUser: function (nome, email, senha) {
			this.nome = nome
			this.email = email
			this.senha = senha
		},
		// eslint-disable-next-line no-shadow
		loginUser: function (email, senha) {
			if (this.email === email && this.senha === senha) {
				return true
			}
			return false
		},
	}
	user.cadastrarUser(nome, email, senha)
	usuarios.push(user)
}

module.exports.login = (email, senha) => {
	for (let i = 0; i < usuarios.length; i += 1) {
		if (usuarios[i].loginUser(email, senha)) {
			return true
		}
	}
	return false
}
