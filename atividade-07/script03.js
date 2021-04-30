const login = prompt("informe o login")
const senha = prompt("informe a senha")

if (login == "aluno" && senha == 123 || login == "professor" && senha == 456) {
    alert(`Sucesso no login, bem vindo ${login}`)
} else {
    alert(`Login invalido`)
}