aposentado()

function aposentado (){
    const nome = prompt(`informe seu nome`) 
    const ano = prompt(`informe seu ano de nascimento`)

    const idade = calcularIdade(parseInt(ano))

    if (idade >= 65) {
        console.log(`${nome} você ja esta aposentado(a)`);
    } else {
        console.log(`${nome} você ainda não esta aposentado(a)`);
    }
}

function calcularIdade (nascimento) {
    return 2021 - nascimento;
}