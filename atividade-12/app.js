const express = require('express')
const index = require('./routes/index')
const cadastro = require('./routes/cadastro')
const validaCadastro = require('./routes/validaCadastro')
const login = require('./routes/login')
const validaLogin = require('./routes/validaLogin')

const app = express()

const port = 3054

//app.use(express.static('pages'))
app.use(express.urlencoded({ extended: false }))

app.get('/', index)
app.get('/cadastro', cadastro)
app.get('/login', login)
app.get('/excluirConta')
app.post('/cadastro', validaCadastro)
app.post('/login', validaLogin)

app.listen(port, () => {
	console.log(`servidor rodando: http://localhost:${port}`)
})
